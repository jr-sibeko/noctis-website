"use server";

import { Resend } from "resend";
import { z } from "zod";
import { getService } from "@/lib/services";

export type BookingState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

// Rules each field must pass
const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().min(9, "Please enter a valid phone number."),
  email: z.string().trim().email("Please enter a valid email address."),
  vehicle: z.string().trim().min(2, "Tell us the make and model."),
  service: z.string().trim().min(1, "Please choose a service."),
  location: z.string().trim().min(2, "Tell us your suburb or area."),
  date: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .max(1000, "Please keep your message under 1000 characters.")
    .optional(),
  consent: z.literal("on", {
    message: "Please tick the box so we can contact you.",
  }),
});

// Stops anyone injecting HTML into your email
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Turns 082 123 4567 into 27821234567 for a WhatsApp link
function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("0") ? `27${digits.slice(1)}` : digits;
}

export async function sendBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // Collect what the customer typed (so we can refill the form if something is wrong)
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }

  // Spam trap: real people never see or fill in the "company" field
  if (values.company) {
    return {
      status: "success",
      message: "Thank you. We will be in touch shortly.",
    };
  }

  // Check every field
  const result = schema.safeParse(values);
  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from =
    process.env.BOOKING_FROM_EMAIL ?? "Noctis Bookings <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or BOOKING_TO_EMAIL in .env.local");
    return {
      status: "error",
      message:
        "Online booking is temporarily unavailable. Please WhatsApp us instead.",
      values,
    };
  }

  const data = result.data;
  const serviceName =
    getService(data.service)?.name ??
    (data.service === "membership"
      ? "Membership enquiry"
      : "Not sure, please advise");

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Vehicle", data.vehicle],
    ["Service", serviceName],
    ["Area", data.location],
    ["Preferred date", data.date || "Flexible"],
    ["Message", data.message || "-"],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0b;color:#edeae3;padding:32px">
      <p style="letter-spacing:4px;color:#c8a96a;font-size:12px;margin:0">NOCTIS AUTO ATELIER</p>
      <h1 style="font-weight:normal;font-size:26px;margin:12px 0 24px">New booking request</h1>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:12px 16px 12px 0;color:#8b8b92;vertical-align:top;white-space:nowrap">${label}</td>
            <td style="padding:12px 0;border-bottom:1px solid #2a2a2e">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:28px">
        <a href="https://wa.me/${toWhatsAppNumber(data.phone)}"
           style="background:#c8a96a;color:#0a0a0b;padding:12px 20px;text-decoration:none;letter-spacing:2px;font-size:12px">
          REPLY ON WHATSAPP
        </a>
      </p>
    </div>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email, // pressing "Reply" in your inbox emails the customer
      subject: `New booking: ${serviceName} from ${data.name}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        status: "error",
        message:
          "We could not send your request. Please try again or WhatsApp us.",
        values,
      };
    }
  } catch (err) {
    console.error("Booking email failed:", err);
    return {
      status: "error",
      message:
        "We could not send your request. Please try again or WhatsApp us.",
      values,
    };
  }

  const firstName = data.name.split(" ")[0];
  return {
    status: "success",
    message: `Thank you, ${firstName}. We have received your request and will be in touch shortly.`,
  };
}

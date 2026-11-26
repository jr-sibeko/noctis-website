"use server";

import { Resend } from "resend";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

export type ReviewState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

// Rules each field must pass
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(60, "Please shorten your name."),
  vehicle: z.string().trim().max(60, "Please keep this short.").optional(),
  service: z.string().trim().max(60).optional(),
  rating: z.coerce.number().int().min(1, "Please choose a star rating.").max(5),
  comment: z
    .string()
    .trim()
    .min(10, "Please write at least one sentence.")
    .max(1000, "Please keep your review under 1000 characters."),
  consent: z.literal("on", {
    message: "Please tick the box so we can publish your review.",
  }),
});

export async function submitReview(
  _prev: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  // Collect what the customer typed (to refill the form if something is wrong)
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }

  // Spam trap: real people never fill in the hidden "website" field
  if (values.website) {
    return { status: "success", message: "Thank you for your review." };
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

  const supabase = getSupabase();
  if (!supabase) {
    console.error(
      "Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY in .env.local",
    );
    return {
      status: "error",
      message: "Reviews are temporarily unavailable. Please try again later.",
      values,
    };
  }

  const review = result.data;

  // Save the review (it starts unapproved, so it stays hidden until you approve it)
  const { error } = await supabase.from("reviews").insert({
    name: review.name,
    vehicle: review.vehicle || null,
    service: review.service || null,
    rating: review.rating,
    comment: review.comment,
  });

  if (error) {
    console.error("Supabase error:", error);
    return {
      status: "error",
      message: "We could not save your review. Please try again.",
      values,
    };
  }

  // Let you know a new review is waiting (if this email fails, the review is still saved)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  if (apiKey && to) {
    try {
      await new Resend(apiKey).emails.send({
        from:
          process.env.BOOKING_FROM_EMAIL ??
          "Noctis Bookings <onboarding@resend.dev>",
        to,
        subject: `New ${review.rating}-star review from ${review.name}`,
        text: [
          `Name: ${review.name}`,
          `Vehicle: ${review.vehicle || "-"}`,
          `Service: ${review.service || "-"}`,
          `Rating: ${review.rating}/5`,
          "",
          review.comment,
          "",
          "To publish it: Supabase → Table Editor → reviews → set approved to TRUE.",
        ].join("\n"),
      });
    } catch (err) {
      console.error("Review notification email failed:", err);
    }
  }

  const firstName = review.name.split(" ")[0];
  return {
    status: "success",
    message: `Thank you, ${firstName}. Your review has been received and will appear once it has been approved.`,
  };
}

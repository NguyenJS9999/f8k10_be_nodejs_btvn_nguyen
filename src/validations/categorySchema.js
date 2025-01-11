import * as z from "zod";

export const categorySchema = z.object({
  title: z.string().min(6, "Phải hơn 6 ký tự"),
  price: z.number().min(0, "Giá không được âm"),
  description: z.string().optional(),
  slug: z.string().optional(),
});

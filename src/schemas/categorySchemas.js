import { z } from "zod";

const categorySchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  slug: z.string().optional(),
});

export default categorySchema;

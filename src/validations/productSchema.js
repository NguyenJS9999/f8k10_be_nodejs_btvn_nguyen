import { z } from "zod";

const productSchema = z.object({
	title: z.string().min(6, "Khong du ky tu"),
	price: z.number().min(0, "Phai lon hon 0"),
	description: z.string().optional(),
});

export default productSchema;

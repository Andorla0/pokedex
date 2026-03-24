import { z } from 'zod';

export const sightingSchema = z.object({
  trainerName: z.string().min(2, "Name must be at least 2 characters"),
  location:    z.string().min(3, "Location is required"),
  date:        z.date({ required_error: "Date is required" }),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
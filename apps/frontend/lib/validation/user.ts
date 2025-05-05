import { z } from "zod";

export const UserValidation = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      return !isNaN(parsedDate.getTime()) && parsedDate <= now;
    },
    {
      message: "Birthday cannot be in the future",
    }
  ),
});

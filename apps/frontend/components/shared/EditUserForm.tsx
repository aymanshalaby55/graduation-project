"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import ImageUploader from "./ImageUploader";
import { UserValidation } from "@/lib/validations/user";
import api from "@/app/utils/api";
import { useMutation } from "@tanstack/react-query";

// Define the validation schema

interface UserProps {
  username: string;
  email: string;
  dateOfBirth: string;
  userId: string;
}

const EditUserForm = ({ username, email, dateOfBirth, userId }: UserProps) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: username || "",
      email: email || "",
      dateOfBirth: dateOfBirth || "",
    },
  });

  const { mutate: editUser, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      const { data } = await api.patch(`/users/edit/${userId}`, formData);
      return data;
    },
  });

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof UserValidation>) {
    editUser(values);
    // Add any further form submission logic here
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5 p-12 rounded-lg"
      >
        {/* <div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <ImageUploader />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Username</FormLabel>
                <FormControl>
                  <Input
                    className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Birthday</FormLabel>
                <FormControl>
                  <Input
                    type="date" // Ensure the input is of type date
                    className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="default" disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditUserForm;

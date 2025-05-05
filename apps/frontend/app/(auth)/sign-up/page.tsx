"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/UserContext";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, FormEvent } from "react";

const Register = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(Date);

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await api.post(`/users/register`, {
          username,
          email,
          password,
          confirmPassword,
          dateOfBirth,
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast({
        title: "You've successfully signed up!",
        description: "Please sign in now.",
        variant: "default",
      });
      redirect("/sign-in");
    },
    onError: (err: any) => {
      console.log(err);
      if (err.response.status === 409) {
        toast({
          title: "هناك مستخدم بالفعل لهذه البيانات",
          variant: "destructive",
        });
      }
      if (err.response.status === 404) {
        toast({
          title: "تأكد من كتابتك لجميع البيانات",
          variant: "destructive",
        });
      }
    },
  });

  const { user }: any = useUserContext();

  if (user) {
    redirect("/");
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp();
  };

  return (
    <div className="flex justify-center mt-5 pt-5">
      <div className="card p-4 w-2/6">
        <h2 className="text-center mb-8 text-xl font-semibold ">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-2 outline-none focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-2 outline-none focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-2 outline-none focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 block w-full  rounded-md border-2 outline-none focus:ring-gray-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-2 outline-none focus:ring-gray-500"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 mt-3 text-base font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800"
          >
            Sign up
          </Button>
        </form>
        <p className="mt-3 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link className="text-indigo-600 underline" href="/sign-in" passHref>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

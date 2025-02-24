"use client";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, user }: any = useUserContext();
  const handleLogin = () => {
    login(email, password);
  };
  if (user) {
    redirect("/");
  }
  return (
    <div className="flex justify-center mt-5 pt-5">
      <div className="card p-4 w-2/6">
        <h2 className="text-center mb-8 text-xl font-semibold">Login</h2>
        <form>
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
              className="mt-1 p-2 block w-full border-2 outline-none rounded-md focus:ring-gray-500"
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
              className="mt-1 p-2 block w-full border-2 outline-none rounded-md"
              required
            />
          </div>
          <Button
            onClick={() => handleLogin()}
            disabled={loading}
            type="submit" 
            className="w-full mt-5 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Button>
        </form>
        <p className="mt-3 text-sm text-center text-gray-600">
          Do not have an account?{" "}
          <Link
            className="text-indigo-600 underline"
            href="/sign-up"
            passHref
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

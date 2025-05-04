"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useUserContext } from "@/app/context/UserContext";
import { Button } from "../ui/button";
import Dropdown from "./Dropdown";
import { Logo } from "./Logo";

const Navbar = () => {
  const { logout, user }: any = useUserContext();
  const loggedIn = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="text-white bg-black shadow-md border-b border-gray-600">
      <div className="container flex justify-between items-center py-3 ">
        <Link href="/" className="flex gap-2 items-center">
          <Logo
            title={"VisionAI Chrono"}
            styles="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent text-2xl md:text-4xl font-medium tracking-tight text-center"
          />
          {/* <p className="max-sm:hidden font-satoshi font-semibold text-lg text-white tracking-wide">
            VisionAI Chrono
          </p> */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden min-[980px]:flex items-center gap-6">
          <Link href="/" className="hover:text-gray-400 transition-colors">
            {/* <Logo
              title={'Home'}
              styles="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent text-2xl md:text-2xl font-medium tracking-tight text-center"
            /> */}
            Home
          </Link>
          <Link
            href="/#features"
            className="hover:text-gray-400 transition-colors"
          >
            {/* <Logo
              title={'Features'}
              styles="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent text-2xl md:text-2xl font-medium tracking-tight text-center"
            /> */}
            Feature
          </Link>
          <Link
            href="#features"
            className="hover:text-gray-400 transition-colors"
          >
            {/* <Logo
              title={'Contact'}
              styles="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent text-2xl md:text-2xl font-medium tracking-tight text-center"
            /> */}
            Contact
          </Link>
        </div>
        <div className="hidden min-[980px]:flex items-center gap-6">
          {loggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/videos/user"
                className="hover:text-gray-400 transition-colors"
              >
                {/* <Logo
                  title={'Videos Manager'}
                  styles="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent text-2xl md:text-2xl font-medium tracking-tight text-center"
                /> */}
                Video Manager
              </Link>
              <Dropdown />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button className="hover:bg-gray-700">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="default" className="hover:bg-gray-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className=" min-[980px]:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-80 z-50 transition-transform ${
            isMenuOpen
              ? "transform translate-x-0"
              : "transform translate-x-full"
          } `}
        >
          <div className="flex flex-col p-6 space-y-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-white text-2xl focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#features"
                className="text-white text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/"
                className="text-white text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {loggedIn ? (
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/videos/user"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="secondary" className="w-full">
                      Videos Manager
                    </Button>
                  </Link>
                  {/* <Dropdown /> */}
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="default"
                      className="w-full hover:bg-gray-700"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

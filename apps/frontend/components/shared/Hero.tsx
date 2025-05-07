"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";

export function Hero() {
  const { user }: any = useUserContext();
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="flex flex-col text-2xl px-4 md:text-4xl lg:text-5xl font-bold max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Unlock the Power of Your Videos—Transcribe, summarize, and capture
        insights effortlessly
        <br />
        <Highlight className="text-black  mt-4">
          with our cutting-edge AI analyzer
        </Highlight>
        {!user ? (
          <div className="w-full flex justify-center">
            <button className="inline-flex mt-10 w-fit text-3xl py-3 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors cursor-pointer">
              <Link href="/sign-in">Try For Free</Link>
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <button className="inline-flex mt-10 w-fit text-3xl py-3 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors  cursor-pointer">
              <Link href={`/flow`}>Start Analyzing</Link>
            </button>
          </div>
        )}
      </motion.h1>
    </HeroHighlight>
  );
}

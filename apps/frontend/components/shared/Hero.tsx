"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { useUserContext } from "@/app/context/UserContext";
import Link from "next/link";

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
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-100 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Unlock the Power of Your Videos—Transcribe, summarize, and capture
        insights effortlessly
        <br />
        <Highlight className="text-black dark:text-white">
          with our cutting-edge AI analyzer
        </Highlight>
        {!user ? (
          <Link href="/sign-in">
            <button className="inline-flex mt-10 w-fit text-3xl py-3 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors">
              Try For Free
            </button>
          </Link>
        ) : (
          <Link href={`/flow`}>
            <button className="inline-flex mt-10 w-fit text-3xl py-3 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors ">
              Start Analyzing
            </button>
          </Link>
        )}
      </motion.h1>
    </HeroHighlight>
  );
}

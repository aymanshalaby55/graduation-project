"use client";

import CardsContainer from "@/components/shared/CardsContainer";
import { Hero } from "@/components/shared/Hero";
import { HowItWorks } from "@/components/shared/HowItWork";
import { TeamInfo } from "@/components/shared/TeamInfo";
import { Vortex } from "@/components/ui/vortex";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Vortex
        rangeY={1200}
        particleCount={500}
        baseHue={120}
        className="flex items-start flex-col bg-background dark:bg-black justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <Hero />
        <CardsContainer />
        <HowItWorks />
        <TeamInfo />
      </Vortex>
    </main>
  );
}

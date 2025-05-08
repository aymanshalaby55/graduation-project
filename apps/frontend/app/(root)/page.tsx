"use client";

import CardsContainer from "@/components/shared/CardsContainer";
import { Hero } from "@/components/shared/Hero";
import { HowItWorks } from "@/components/shared/HowItWork";
import { TeamInfo } from "@/components/shared/TeamInfo";
import { GridBackgroundDemo } from "@/components/ui/bg-boxes";
import { Vortex } from "@/components/ui/vortex";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  return (
    <main className="overflow-hidden">
      {theme === "dark" ? (
        <Vortex rangeY={200} particleCount={500} baseHue={120}>
          <Hero />
        </Vortex>
      ) : (
        <GridBackgroundDemo>
          <Hero />
        </GridBackgroundDemo>
      )}

      <CardsContainer />
      <HowItWorks />
      <TeamInfo />
    </main>
  );
}

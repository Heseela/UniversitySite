"use client";

import { THeroSectionDto } from "@/schemas/hero-section.schema";
import SplitHero from "./split-hero";
import JumboTron from "./jumbotron";
import dynamic from "next/dynamic";

const SwiperWithModules = dynamic(
  () => import("./swiper-hero").then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="h-[80vh] max-h-[700px] bg-gray-100 animate-pulse" aria-label="Loading hero section" />
  }
);

export type RenderHeroProps = {
  heroSections: THeroSectionDto[];
}

const heros = {
  jumbotron: JumboTron,
  splitHero: SplitHero
}

export default function RenderHero({ heroSections }: RenderHeroProps) {
  if (!heroSections.length) return null;

  if (heroSections.length === 1) return <Hero hero={heroSections[0]} />;

  return <SwiperWithModules heroSections={heroSections} />;
}

function Hero({ hero }: { hero: THeroSectionDto }) {
  const type = hero.layout.type;
  if (!type) return null;

  const HeroToRender = heros[type as keyof typeof heros];
  if (!HeroToRender) return null;

  return <HeroToRender hero={hero} />;
}
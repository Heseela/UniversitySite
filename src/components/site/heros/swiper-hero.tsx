"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, A11y } from "swiper/modules";
import { THeroSectionDto } from "@/schemas/hero-section.schema";
import JumboTron from "./jumbotron";
import SplitHero from "./split-hero";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const heros = {
  jumbotron: JumboTron,
  splitHero: SplitHero
}

function Hero({ hero }: { hero: THeroSectionDto }) {
  const type = hero.layout.type;
  if (!type) return null;

  const HeroToRender = heros[type as keyof typeof heros];
  if (!HeroToRender) return null;

  return <HeroToRender hero={hero} />;
}

export default function SwiperHero({ heroSections }: { heroSections: THeroSectionDto[] }) {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      speed={1000}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
        renderBullet: (index: number, className: string) => {
          return `<span class="${className} custom-bullet" aria-label="Go to slide ${index + 1}"></span>`;
        },
      }}
      aria-label="Hero carousel"
    >
      {heroSections.map((hero, index) => (
        <SwiperSlide key={index}>
          <Hero hero={hero} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}


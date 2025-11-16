"use client";

import { THeroSectionDto } from "@/schemas/hero-section.schema";
import SplitHero from "./split-hero";
import JumboTron from "./jumbotron";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export type RenderHeroProps = {
  heroSections: THeroSectionDto[];
}

const heros = {
  jumbotron: JumboTron,
  splitHero: SplitHero
}

export default function RenderHero({ heroSections }: RenderHeroProps) {
  if (!heroSections.length) return null;

  if (heroSections.length === 1) {
    const hero = heroSections[0];
    const type = hero.layout.type;
    if (!type) return null;
    
    const HeroToRender = heros[type];
    if (!HeroToRender) return null;

    return <HeroToRender hero={hero} />;
  }

  return (
    <div className="relative w-full">
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
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet" aria-label="Go to slide ${index + 1}"></span>`;
          },
        }}
        className="w-full h-[80vh] min-h-[400px] max-h-[800px]"
      >
        {heroSections.map((hero, index) => (
          <SwiperSlide key={index}>
            <HeroSlide hero={hero} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function HeroSlide({ hero }: { hero: THeroSectionDto }) {
  const type = hero.layout.type;
  if (!type) return null;

  const HeroToRender = heros[type];
  if (!HeroToRender) return null;

  return <HeroToRender hero={hero} />;
}
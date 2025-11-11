import { THeroSectionDto } from "@/schemas/hero-section.schema"
import SplitHero from "./split-hero"
import JumboTron from "./jumbotron"

export type RenderHeroProps = {
    heroSections: THeroSectionDto[]
}

const heros = {
    jumbotron: JumboTron,
    splitHero: SplitHero
}

export default function RenderHero({ heroSections }: RenderHeroProps) {
    if (!heroSections.length) return null;

    const hero = heroSections[0];

    const type = hero.layout.type;

    if (!type) return null;

    const HeroToRender = heros[type];

    if (!HeroToRender) return null;

    return (
        <HeroToRender hero={hero} />
    )
}
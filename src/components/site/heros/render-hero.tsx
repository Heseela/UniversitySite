import { THeroSectionDto } from "@/schemas/hero-section.schema"
import SplitHero from "./split-hero"
import JumboTron from "./jumbotron"

export type RenderHeroProps = {
    hero: THeroSectionDto
}

const heros = {
    jumbotron: JumboTron,
    splitHero: SplitHero
}

export default function RenderHero(props: RenderHeroProps) {
    const type = props.hero.layout.type;

    if (!type) return null;

    const HeroToRender = heros[type];

    if (!HeroToRender) return null;

    return (
        <HeroToRender {...props} />
    )
}
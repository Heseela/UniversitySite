import RenderSections from '@/components/site/blocks/render-sections'
import RenderHero from '@/components/site/heros/render-hero'
import { TPageDto } from '@/schemas/page.schema'

type Props = {
    page: TPageDto
}

export default function PageLivePreview({ page }: Props) {
    return (
        <div>
            <RenderHero heroSections={page.heroSections} />
            <RenderSections sections={page.sections} />
        </div>
    )
}
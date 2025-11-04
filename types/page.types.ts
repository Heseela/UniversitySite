import { EAlignment, EAlignmentExcludeCenter, PaginatedResponse } from "./global.types"
import { TMetadataDto, TPageSection } from "@/schemas/page.schema";
import { THeroSectionDto } from "@/schemas/hero-section.schema";

export enum EHeroLayoutTypes {
    Jumbotron = "jumbotron",
    Split_Hero = "splitHero"
}

export type THeroLayout = {
    type: EHeroLayoutTypes.Jumbotron,
    alignment: EAlignment
} | {
    type: EHeroLayoutTypes.Split_Hero,
    imagePosition: EAlignmentExcludeCenter,
}

export type TPagesResponse = PaginatedResponse<{
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}>

export type TPage = {
    id: string;
    name: string;
    slug: string;
    sections: TPageSection[];
    metadata: TMetadataDto;
    heroSections: THeroSectionDto[];
    updatedAt: Date;
    createdAt: Date;
}
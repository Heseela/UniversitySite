import { TBlock } from "@/schemas/page.schema";
import jumboCenter from "@/assets/layouts/hero-layout/jumbotron-center.svg";
import { EBlock, ECardsBlockLayout } from "../../../types/blocks.types";
import { EAlignment, EOrder, ERefRelation } from "../../../types/global.types";
import { StaticImageData } from "next/image";
import { richTextDefaultValues } from "@/schemas/rich-text.schema";

export const blockLayouts: {
    block: TBlock;
    image: StaticImageData;
    alt: string;
}[] = [
        {
            block: {
                type: EBlock.Text,
                headline: "",
                subheadline: "",
                body: richTextDefaultValues,
                cta: [],
                align: EAlignment.Left,
            },
            alt: "Text",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Image,
                images: [],
            },
            alt: "Images",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Cards,
                layout: ECardsBlockLayout.Grid,
                cards: [],
                columns: {
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                },
            },
            alt: "Cards",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.RefItem,
                refRelation: ERefRelation.Blogs,
                limit: 3,
                cols: 3,
                order: EOrder.Desc,
                selected: undefined,
            },
            alt: "Referenced Items",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Form,
                form: {
                    id: "",
                    title: "",
                },
            },
            alt: "Form",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Faq,
            },
            alt: "FAQs",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Testimonial,
            },
            alt: "Testimonials",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Alumni,
            },
            alt: "Alumni",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Partner,
            },
            alt: "Partners",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Certification,
            },
            alt: "Certifications",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.ContactText,
            },
            alt: "Contact Text",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.Map,
            },
            alt: "Map",
            image: jumboCenter,
        }
    ];

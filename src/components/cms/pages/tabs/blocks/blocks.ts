import { FC } from "react";
import { EBlock } from "../../../../../../types/blocks.types";
import TextBlock from "./text-block";
import ImageBlock from "./image-block";
import CardsBlock from "./card/card-block";
import RefItemBlock from "./ref-item.block";
import FormBlock from "./form-block";
import FaqBlock from "./faq-block";

export type BlockComponentProps = {
  sectionIdx: number;
  blockIdx: number;
};

export const blocks: Partial<Record<EBlock, FC<BlockComponentProps>>> = {
  [EBlock.Text]: TextBlock,
  [EBlock.Image]: ImageBlock,
  [EBlock.Cards]: CardsBlock,
  [EBlock.RefItem]: RefItemBlock,
  [EBlock.Form]: FormBlock,
  [EBlock.Faq]: FaqBlock, // FaqBlock means no setting block
  [EBlock.Testimonial]: FaqBlock,
  [EBlock.Alumni]: FaqBlock,
  [EBlock.Partner]: FaqBlock,
  [EBlock.Certification]: FaqBlock,
  [EBlock.ContactText]: FaqBlock,
  [EBlock.Map]: FaqBlock,
};

import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import BlogsBlock from "./blogs-block";
import TeamsBlock from "./teams-block";
import EventsBlock from "./event-block";

export const gridClassName = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
  5: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5",
}

export default function RenderRefItems(props: RefItemBlockDto) {
  return props.refRelation === ERefRelation.Blogs ? (
    <BlogsBlock {...props} refRelation={props.refRelation} />
  ) : props.refRelation === ERefRelation.Teams ? (
    <TeamsBlock {...props} refRelation={props.refRelation} />
  ) : props.refRelation === ERefRelation.Events ? (
    <EventsBlock {...props} refRelation={props.refRelation} />
  ) : null;
}

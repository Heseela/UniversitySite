import { ENavLinkType } from "@/schemas/globals.schema";
import { THeaderSelect } from "../schema/globals";
import { ECtaVariant } from "../../../types/blocks.types";

export const headerData: THeaderSelect[] = [
  {
    "id": "c7e95b23-d7f1-49fd-b98f-4b212a887fd4",
    "navLinks": [
      {
        "url": "home",
        "text": "Home",
        "type": ENavLinkType.Internal,
        "newTab": false,
        "variant": ECtaVariant.Link,
        "subLinks": []
      },
      {
        "url": "about",
        "text": "About",
        "type": ENavLinkType.Internal,
        "newTab": false,
        "variant": ECtaVariant.Link,
        "subLinks": []
      },
      {
        "url": "blogs",
        "text": "Our Blogs",
        "type": ENavLinkType.Internal,
        "newTab": false,
        "variant": ECtaVariant.Link,
        "subLinks": []
      },
      {
        "url": "our-team",
        "text": "Our Team",
        "type": ENavLinkType.Internal,
        "newTab": false,
        "variant": ECtaVariant.Link,
        "subLinks": []
      },
      {
        "url": "events",
        "text": "Events",
        "type": ENavLinkType.Internal,
        "newTab": false,
        "variant": ECtaVariant.Link,
        "subLinks": []
      },
      {
        "url": "contact",
        "text": "Contact Us",
        "type": ENavLinkType.Internal,
        "newTab": false,
        "variant": ECtaVariant.Default,
        "subLinks": []
      }
    ],
    "createdAt": new Date("2025-10-10 10:28:35.16678"),
    "updatedAt": new Date("2025-10-14 09:55:04.23")
  }
]

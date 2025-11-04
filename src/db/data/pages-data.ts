import { EBlock, ECardsBlockLayout, ECtaVariant } from "../../../types/blocks.types";
import { EAlignment, EAlignmentExcludeCenter, ELinkType, EOrder, ERefRelation } from "../../../types/global.types";
import { EHeroLayoutTypes } from "../../../types/page.types";
import { TPageTableSelect } from "../schema/page";

export const pagesData: TPageTableSelect[] = [
  {
    "id": "1d75dcc3-941e-4722-8a29-8a2ce35f5463",
    "name": "Blogs",
    "slug": "blogs",
    "sections": [],
    "metadata": { "title": "Our Blogs", "keywords": [], "description": "" },
    "heroSections": [
      {
        "cta": [],
        "layout": { "type": EHeroLayoutTypes.Jumbotron, "alignment": EAlignment.Center as EAlignment },
        "headline": {
          "html": "<p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">Our Blog</strong></b></p><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 50px; white-space: pre-wrap;\">Educational </span><span style=\"color: var(--primary); font-size: 50px; white-space: pre-wrap;\">Insights &amp; Resources</span></h1><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 18px; white-space: pre-wrap;\">Explore our collection of articles, guides, and resources designed to inspire </span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 18px; white-space: pre-wrap;\">and empower educators on their teaching journey.</span></p>",
          "json": {
            "root": {
              "type": "root",
              "format": "",
              "indent": 0,
              "version": 1,
              "children": [
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Our Blog",
                      "type": "text",
                      "style": "color: var(--primary);",
                      "detail": 0,
                      "format": 1,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);",
                  "textFormat": 1
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Educational ",
                      "type": "text",
                      "style": "font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    },
                    {
                      "mode": "normal",
                      "text": "Insights & Resources",
                      "type": "text",
                      "style": "color: var(--primary);font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 50px;"
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);font-size: 50px;",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Explore our collection of articles, guides, and resources designed to inspire ",
                      "type": "text",
                      "style": "color: var(--muted-foreground);font-size: 18px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--muted-foreground);font-size: 18px;",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "and empower educators on their teaching journey.",
                      "type": "text",
                      "style": "color: var(--muted-foreground);font-size: 18px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--muted-foreground);font-size: 18px;",
                  "textFormat": 0
                }
              ],
              "direction": "ltr",
              "textStyle": "color: var(--muted-foreground);font-size: 18px;"
            }
          }
        }
      }
    ],
    "createdAt": new Date("2025-10-10 10:29:21.39104"),
    "updatedAt": new Date("2025-10-15 15:29:49.357")
  },
  {
    "id": "89401602-eba6-4124-8ce3-b0d5aeca0fd1",
    "name": "Events",
    "slug": "events",
    "sections": [],
    "metadata": { "title": "Our Events", "keywords": [], "description": "" },
    "heroSections": [
      {
        "cta": [],
        "layout": { "type": EHeroLayoutTypes.Jumbotron, "alignment": EAlignment.Center },
        "headline": {
          "html": "<p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">Events</strong></b></p><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 50px; white-space: pre-wrap;\">Join Our </span><span style=\"color: var(--primary); font-size: 50px; white-space: pre-wrap;\">Educational Events</span></h1><p class=\"leading-6\"><br></p><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 18px; color: var(--muted-foreground); white-space: pre-wrap;\">Discover workshops, webinars, conferences, and other events designed to inspire and</span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 18px; color: var(--muted-foreground); white-space: pre-wrap;\">empower educators with new skills and perspectives.</span></p>",
          "json": {
            "root": {
              "type": "root",
              "format": "",
              "indent": 0,
              "version": 1,
              "children": [
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Events",
                      "type": "text",
                      "style": "color: var(--primary);",
                      "detail": 0,
                      "format": 1,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);",
                  "textFormat": 1
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Join Our ",
                      "type": "text",
                      "style": "font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    },
                    {
                      "mode": "normal",
                      "text": "Educational Events",
                      "type": "text",
                      "style": "color: var(--primary);font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 50px;"
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": "ltr",
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Discover workshops, webinars, conferences, and other events designed to inspire and",
                      "type": "text",
                      "style": "font-size: 18px;color: var(--muted-foreground);",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 18px;color: var(--muted-foreground);",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "empower educators with new skills and perspectives.",
                      "type": "text",
                      "style": "font-size: 18px;color: var(--muted-foreground);",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 18px;color: var(--muted-foreground);",
                  "textFormat": 0
                }
              ],
              "direction": "ltr",
              "textStyle": "font-size: 18px;color: var(--muted-foreground);"
            }
          }
        }
      }
    ],
    "createdAt": new Date("2025-10-10 10:30:02.120299"),
    "updatedAt": new Date("2025-10-15 15:32:05.297")
  },
  {
    "id": "9e919999-8cad-4d32-9240-932bb6e31891",
    "name": "Contact",
    "slug": "contact",
    "sections": [
      {
        "title": "Contact Form",
        "blocks": {
          "items": [
            { "type": EBlock.ContactText },
            {
              "form": {
                "id": "7e8ced0f-d36b-430a-82ee-9d1d61b680a8",
                "title": "Contact Form"
              },
              "type": EBlock.Form,
              "introContent": {
                "html": "<h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\"><span style=\"white-space: pre-wrap;\">Send us message</span></h3>",
                "json": {
                  "root": {
                    "type": "root",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "children": [
                      {
                        "tag": "h3",
                        "type": "heading",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Send us message",
                            "type": "text",
                            "style": "",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr"
                      }
                    ],
                    "direction": "ltr"
                  }
                }
              }
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "",
        "headline": "",
        "container": false,
        "subheadline": "",
        "headlineAlignment": EAlignment.Center
      },
      {
        "title": "Map",
        "blocks": { "items": [{ "type": EBlock.Map }], "direction": "horizontal" },
        "tagline": "",
        "headline": "",
        "container": false,
        "subheadline": "",
        "headlineAlignment": EAlignment.Center
      }
    ],
    "metadata": { "title": "Contact Us", "keywords": [], "description": "" },
    "heroSections": [
      {
        "cta": [],
        "layout": { "type": EHeroLayoutTypes.Jumbotron, "alignment": EAlignment.Center },
        "headline": {
          "html": "<p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">Contact</strong></b></p><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 50px; white-space: pre-wrap;\">Let's </span><span style=\"color: var(--primary); font-size: 50px; white-space: pre-wrap;\">Connect</span></h1><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 18px; color: var(--muted-foreground); white-space: pre-wrap;\">Whether you're an educator looking for resources, a school interested in our programs, </span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 18px; color: var(--muted-foreground); white-space: pre-wrap;\">or just want to learn more about what we do, we'd love to hear from you.</span></p>",
          "json": {
            "root": {
              "type": "root",
              "format": "",
              "indent": 0,
              "version": 1,
              "children": [
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Contact",
                      "type": "text",
                      "style": "color: var(--primary);",
                      "detail": 0,
                      "format": 1,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);",
                  "textFormat": 1
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Let's ",
                      "type": "text",
                      "style": "font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    },
                    {
                      "mode": "normal",
                      "text": "Connect",
                      "type": "text",
                      "style": "color: var(--primary);font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 50px;"
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);font-size: 50px;",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Whether you're an educator looking for resources, a school interested in our programs, ",
                      "type": "text",
                      "style": "font-size: 18px;color: var(--muted-foreground);",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 18px;color: var(--muted-foreground);",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "or just want to learn more about what we do, we'd love to hear from you.",
                      "type": "text",
                      "style": "font-size: 18px;color: var(--muted-foreground);",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 18px;color: var(--muted-foreground);",
                  "textFormat": 0
                }
              ],
              "direction": "ltr",
              "textStyle": "font-size: 18px;color: var(--muted-foreground);"
            }
          }
        }
      }
    ],
    "createdAt": new Date("2025-10-14 09:50:05.032633"),
    "updatedAt": new Date("2025-10-15 15:30:10.802")
  },
  {
    "id": "bd3e68d1-2c0d-4d24-b906-0bcdbdba40da",
    "name": "Our Team",
    "slug": "our-team",
    "sections": [
      {
        "title": "Leadership",
        "blocks": {
          "items": [
            {
              "cols": 3,
              "type": EBlock.RefItem,
              "limit": 3,
              "order": EOrder.Desc,
              "selected": [
                {
                  "label": "Anju Chhetri",
                  "value": "69b5f1a1-b823-4b49-bb9b-89ebfd014656"
                },
                {
                  "label": "Marcus Johnson",
                  "value": "943fd8ca-c606-46a1-a2e8-77d7bd6e5f2e"
                },
                {
                  "label": "Dr. Sofia Rodriguez",
                  "value": "1212b76d-2295-4cb3-babe-7fbb7c8bd1e4"
                }
              ],
              "refRelation": ERefRelation.Teams
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "Leadership",
        "headline": "Our Visionary Leaders",
        "container": false,
        "subheadline": "Meet the dedicated individuals who guide our mission and drive our organization forward.",
        "headlineAlignment": EAlignment.Center
      },
      {
        "title": "Education Experts",
        "blocks": {
          "items": [
            {
              "cols": 4,
              "type": EBlock.RefItem,
              "limit": 5,
              "order": EOrder.Desc,
              "refRelation": ERefRelation.Teams
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "Education Experts",
        "headline": "Our Curriculum Specialists",
        "container": true,
        "subheadline": "These talented educators develop our innovative programs and provide expert guidance.",
        "headlineAlignment": EAlignment.Center
      },
      {
        "title": "Become part",
        "blocks": {
          "items": [
            {
              "cta": [
                {
                  "link": "https://www.facebook.com/profile.php?id=61574613294350",
                  "text": "View Open Positions",
                  "type": ELinkType.External,
                  "arrow": true,
                  "newTab": true,
                  "variant": ECtaVariant.Default
                }
              ],
              "body": {
                "html": "<p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">Join Our Team</strong></b></p><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 40px; white-space: pre-wrap;\">Become Part of Our Mission</span></h1><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 16px; white-space: pre-wrap;\">We're always looking for passionate educators and professionals to join our team. If </span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 16px; white-space: pre-wrap;\">you're committed to transforming education and making a difference in students' lives,</span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 16px; white-space: pre-wrap;\">we'd love to hear from you.</span></p>",
                "json": {
                  "root": {
                    "type": "root",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "children": [
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Join Our Team",
                            "type": "text",
                            "style": "color: var(--primary);",
                            "detail": 0,
                            "format": 1,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--primary);",
                        "textFormat": 1
                      },
                      {
                        "tag": "h1",
                        "type": "heading",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Become Part of Our Mission",
                            "type": "text",
                            "style": "font-size: 40px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-size: 40px;"
                      },
                      {
                        "type": "paragraph",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "We're always looking for passionate educators and professionals to join our team. If ",
                            "type": "text",
                            "style": "color: var(--muted-foreground);font-size: 16px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "you're committed to transforming education and making a difference in students' lives,",
                            "type": "text",
                            "style": "color: var(--muted-foreground);font-size: 16px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "we'd love to hear from you.",
                            "type": "text",
                            "style": "color: var(--muted-foreground);font-size: 16px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);font-size: 16px;",
                        "textFormat": 0
                      }
                    ],
                    "direction": "ltr",
                    "textStyle": "color: var(--muted-foreground);font-size: 16px;"
                  }
                }
              },
              "type": EBlock.Text,
              "align": EAlignment.Center,
              "headline": "",
              "subheadline": ""
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "",
        "headline": "",
        "container": false,
        "subheadline": "",
        "headlineAlignment": EAlignment.Center
      }
    ],
    "metadata": { "title": "Our Team", "keywords": [], "description": "" },
    "heroSections": [
      {
        "cta": [],
        "layout": { "type": EHeroLayoutTypes.Jumbotron, "alignment": EAlignment.Center },
        "headline": {
          "html": "<p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">Our Team</strong></b></p><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 50px; white-space: pre-wrap;\">Meet the </span><span style=\"color: var(--primary); font-size: 50px; white-space: pre-wrap;\">Passionate Educators</span></h1><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 50px; white-space: pre-wrap;\"> Behind Future Creatify</span></h1><p class=\"leading-6\"><br></p><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 18px; white-space: pre-wrap;\">Our team brings together diverse expertise in education, curriculum design, technology, and more to </span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 18px; white-space: pre-wrap;\">create innovative solutions for educators worldwide.</span></p>",
          "json": {
            "root": {
              "type": "root",
              "format": "",
              "indent": 0,
              "version": 1,
              "children": [
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Our Team",
                      "type": "text",
                      "style": "color: var(--primary);",
                      "detail": 0,
                      "format": 1,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);",
                  "textFormat": 1
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Meet the ",
                      "type": "text",
                      "style": "font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    },
                    {
                      "mode": "normal",
                      "text": "Passionate Educators",
                      "type": "text",
                      "style": "color: var(--primary);font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 50px;"
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": " Behind Future Creatify",
                      "type": "text",
                      "style": "font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 50px;"
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": "ltr",
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Our team brings together diverse expertise in education, curriculum design, technology, and more to ",
                      "type": "text",
                      "style": "color: var(--muted-foreground);font-size: 18px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--muted-foreground);font-size: 18px;",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "create innovative solutions for educators worldwide.",
                      "type": "text",
                      "style": "color: var(--muted-foreground);font-size: 18px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--muted-foreground);font-size: 18px;",
                  "textFormat": 0
                }
              ],
              "direction": "ltr",
              "textStyle": "color: var(--muted-foreground);font-size: 18px;"
            }
          }
        }
      }
    ],
    "createdAt": new Date("2025-10-10 10:31:04.785834"),
    "updatedAt": new Date("2025-10-15 15:31:49.649")
  },
  {
    "id": "c0b050c4-2a23-4242-8c38-94fd01663fc1",
    "name": "About",
    "slug": "about",
    "sections": [
      {
        "title": "Story",
        "blocks": {
          "items": [
            {
              "type": EBlock.Image,
              "images": [
                {
                  "alt": "<No alt>",
                  "name": "pexels-photo-3184360.webp",
                  "bytes": 207312,
                  "width": 2250,
                  "format": "webp",
                  "height": 1500,
                  "caption": "<No caption>",
                  "public_id": "blogs/hjgmgvufbqjsf76i4zfd",
                  "secure_url": "https://res.cloudinary.com/dbj0ffzhn/image/upload/v1760076045/blogs/hjgmgvufbqjsf76i4zfd.webp",
                  "originalName": "pexels-photo-3184360.webp",
                  "resource_type": "image"
                }
              ]
            },
            {
              "cta": [],
              "body": {
                "html": "<p class=\"leading-6\" dir=\"ltr\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">Our Story</strong></b></p><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"font-size: 35px; white-space: pre-wrap;\">How Future Creatify Began</span></h1><p class=\"leading-6\"><br></p><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"font-size: 16px; color: var(--secondary-foreground); white-space: pre-wrap;\">Future Creatify was founded in 2015 by a group of passionate educators who recognized the need for innovation in teaching methodologies. What started as a small initiative has grown into a comprehensive education hub serving thousands of educators worldwide.</span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"font-size: 16px; color: var(--secondary-foreground); white-space: pre-wrap;\">Our journey has been defined by a commitment to excellence, a passion for creativity, and a belief in the transformative power of education. Through our work, we aim to inspire a new generation of educators who approach teaching with innovation, compassion, and a focus on student-centered learning.</span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><br></p><p class=\"leading-6\" style=\"text-align: start;\"><br></p><p class=\"leading-6\" style=\"text-align: start;\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><br></p><p class=\"leading-6\" style=\"text-align: start;\"><b><strong class=\"font-bold\" style=\"font-size: 30px; color: var(--primary); white-space: pre-wrap;\">5000+</strong></b><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><b><strong class=\"font-bold\" style=\"font-size: 30px; color: var(--primary); white-space: pre-wrap;\">100+</strong></b></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"font-size: 16px; color: var(--muted-foreground); white-space: pre-wrap;\">Educators Trained</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"font-size: 16px; color: var(--muted-foreground); white-space: pre-wrap;\">Programs Created</span></p><p class=\"leading-6\" style=\"text-align: start;\"><br></p><p class=\"leading-6\" style=\"text-align: start;\"><br></p><p class=\"leading-6\" style=\"text-align: start;\"><br></p><p class=\"leading-6\" style=\"text-align: start;\"><b><strong class=\"font-bold\" style=\"font-size: 30px; color: var(--primary); white-space: pre-wrap;\">30+</strong></b><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">    </span><b><strong class=\"font-bold\" style=\"font-size: 30px; color: var(--primary); white-space: pre-wrap;\">200+</strong></b></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"font-size: 16px; color: var(--muted-foreground); white-space: pre-wrap;\">Countries Reached</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"white-space: pre-wrap;\">\t</span><span style=\"font-size: 16px; color: var(--muted-foreground); white-space: pre-wrap;\">Partnerships</span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><br></p>",
                "json": {
                  "root": {
                    "type": "root",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "children": [
                      {
                        "type": "paragraph",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Our Story",
                            "type": "text",
                            "style": "color: var(--primary);",
                            "detail": 0,
                            "format": 1,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--primary);",
                        "textFormat": 1
                      },
                      {
                        "tag": "h1",
                        "type": "heading",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "How Future Creatify Began",
                            "type": "text",
                            "style": "font-size: 35px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-size: 35px;"
                      },
                      {
                        "type": "paragraph",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Future Creatify was founded in 2015 by a group of passionate educators who recognized the need for innovation in teaching methodologies. What started as a small initiative has grown into a comprehensive education hub serving thousands of educators worldwide.",
                            "type": "text",
                            "style": "font-size: 16px;color: var(--secondary-foreground);",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-size: 16px;color: var(--secondary-foreground);",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Our journey has been defined by a commitment to excellence, a passion for creativity, and a belief in the transformative power of education. Through our work, we aim to inspire a new generation of educators who approach teaching with innovation, compassion, and a focus on student-centered learning.",
                            "type": "text",
                            "style": "font-size: 16px;color: var(--secondary-foreground);",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-size: 16px;color: var(--secondary-foreground);",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "5000+",
                            "type": "text",
                            "style": "font-size: 30px;color: var(--primary);",
                            "detail": 0,
                            "format": 1,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "100+",
                            "type": "text",
                            "style": "font-size: 30px;color: var(--primary);",
                            "detail": 0,
                            "format": 1,
                            "version": 1
                          }
                        ],
                        "direction": null,
                        "textStyle": "font-size: 30px;color: var(--primary);",
                        "textFormat": 1
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Educators Trained",
                            "type": "text",
                            "style": "font-size: 16px;color: var(--muted-foreground);",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "Programs Created",
                            "type": "text",
                            "style": "font-size: 16px;color: var(--muted-foreground);",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-size: 16px;color: var(--muted-foreground);",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "font-size: 16px;color: var(--muted-foreground);",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "font-size: 16px;color: var(--muted-foreground);",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "font-size: 16px;color: var(--muted-foreground);",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "30+",
                            "type": "text",
                            "style": "font-size: 30px;color: var(--primary);",
                            "detail": 0,
                            "format": 1,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "    ",
                            "type": "text",
                            "style": "",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "200+",
                            "type": "text",
                            "style": "font-size: 30px;color: var(--primary);",
                            "detail": 0,
                            "format": 1,
                            "version": 1
                          }
                        ],
                        "direction": null,
                        "textStyle": "font-size: 30px;color: var(--primary);",
                        "textFormat": 1
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Countries Reached",
                            "type": "text",
                            "style": "font-size: 16px;color: var(--muted-foreground);",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "\t",
                            "type": "tab",
                            "style": "",
                            "detail": 2,
                            "format": 0,
                            "version": 1
                          },
                          {
                            "mode": "normal",
                            "text": "Partnerships",
                            "type": "text",
                            "style": "font-size: 16px;color: var(--muted-foreground);",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-size: 16px;color: var(--muted-foreground);",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "start",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "font-size: 16px;color: var(--muted-foreground);",
                        "textFormat": 0
                      }
                    ],
                    "direction": "ltr",
                    "textStyle": "font-size: 30px;color: var(--primary);",
                    "textFormat": 1
                  }
                }
              },
              "type": EBlock.Text,
              "align": EAlignment.Left,
              "headline": "",
              "subheadline": ""
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "",
        "headline": "",
        "container": false,
        "subheadline": "",
        "headlineAlignment": EAlignment.Center
      },
      {
        "title": "Our Values",
        "blocks": {
          "items": [
            {
              "type": EBlock.Cards,
              "cards": [
                {
                  "title": "",
                  "newTab": false,
                  "subtitle": "",
                  "borderLess": false,
                  "description": {
                    "html": "<p class=\"leading-6\" style=\"text-align: center;\"><span data-lexical-icon=\"BookOpenIcon\" style=\"display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; line-height: 0; color: var(--primary); background: var(--background); padding: 8px; border-radius: 16%; border: 2px solid var(--primary);\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-book-open\" aria-hidden=\"true\"><path d=\"M12 7v14\"></path><path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\"></path></svg></span></p><p class=\"leading-6\" style=\"text-align: center;\"><br></p><h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">Innovation</span></h3><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); white-space: pre-wrap;\">We constantly evolve our methods and embrace new ideas to stay at the forefront of educational excellence</span></p>",
                    "json": {
                      "root": {
                        "type": "root",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "size": 24,
                                "type": "icon",
                                "color": "var(--primary)",
                                "radius": 16,
                                "padding": 8,
                                "version": 1,
                                "iconName": "BookOpenIcon",
                                "background": "var(--background)",
                                "borderColor": "var(--primary)",
                                "borderWidth": 2
                              }
                            ],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "tag": "h3",
                            "type": "heading",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Innovation",
                                "type": "text",
                                "style": "",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr"
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": "ltr",
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "We constantly evolve our methods and embrace new ideas to stay at the forefront of educational excellence",
                                "type": "text",
                                "style": "color: var(--muted-foreground);",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr",
                            "textStyle": "color: var(--muted-foreground);",
                            "textFormat": 0
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);"
                      }
                    }
                  }
                },
                {
                  "title": "",
                  "newTab": false,
                  "subtitle": "",
                  "borderLess": false,
                  "description": {
                    "html": "<p class=\"leading-6\" style=\"text-align: center;\"><span data-lexical-icon=\"MedalIcon\" style=\"display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; line-height: 0; color: var(--primary); background: var(--background); padding: 8px; border-radius: 16%; border: 2px solid var(--primary);\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-medal\" aria-hidden=\"true\"><path d=\"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15\"></path><path d=\"M11 12 5.12 2.2\"></path><path d=\"m13 12 5.88-9.8\"></path><path d=\"M8 7h8\"></path><circle cx=\"12\" cy=\"17\" r=\"5\"></circle><path d=\"M12 18v-2h-.5\"></path></svg></span></p><p class=\"leading-6\" style=\"text-align: center;\"><br></p><h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">Excellence</span></h3><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); white-space: pre-wrap;\">We strive for the highest standards in all our programs, resources, and interactions with our community.</span></p>",
                    "json": {
                      "root": {
                        "type": "root",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "size": 24,
                                "type": "icon",
                                "color": "var(--primary)",
                                "radius": 16,
                                "padding": 8,
                                "version": 1,
                                "iconName": "MedalIcon",
                                "background": "var(--background)",
                                "borderColor": "var(--primary)",
                                "borderWidth": 2
                              }
                            ],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "tag": "h3",
                            "type": "heading",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Excellence",
                                "type": "text",
                                "style": "",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr"
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": "ltr",
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "We strive for the highest standards in all our programs, resources, and interactions with our community.",
                                "type": "text",
                                "style": "color: var(--muted-foreground);",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr",
                            "textStyle": "color: var(--muted-foreground);",
                            "textFormat": 0
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);"
                      }
                    }
                  }
                },
                {
                  "title": "",
                  "newTab": false,
                  "subtitle": "",
                  "borderLess": false,
                  "description": {
                    "html": "<p class=\"leading-6\" style=\"text-align: center;\"><span data-lexical-icon=\"LucideUsers2\" style=\"display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; line-height: 0; color: var(--primary); background: var(--backgrond); padding: 8px; border-radius: 16%; border: 2px solid var(--primary);\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-users-round\" aria-hidden=\"true\"><path d=\"M18 21a8 8 0 0 0-16 0\"></path><circle cx=\"10\" cy=\"8\" r=\"5\"></circle><path d=\"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3\"></path></svg></span></p><p class=\"leading-6\" style=\"text-align: center;\"><br></p><h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">Collaboration</span></h3><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); white-space: pre-wrap;\">We believe in the power of working together, sharing knowledge, and learning from diverse perspectives.</span></p>",
                    "json": {
                      "root": {
                        "type": "root",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "size": 24,
                                "type": "icon",
                                "color": "var(--primary)",
                                "radius": 16,
                                "padding": 8,
                                "version": 1,
                                "iconName": "LucideUsers2",
                                "background": "var(--backgrond)",
                                "borderColor": "var(--primary)",
                                "borderWidth": 2
                              }
                            ],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "tag": "h3",
                            "type": "heading",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Collaboration",
                                "type": "text",
                                "style": "",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr"
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": "ltr",
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "We believe in the power of working together, sharing knowledge, and learning from diverse perspectives.",
                                "type": "text",
                                "style": "color: var(--muted-foreground);",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr",
                            "textStyle": "color: var(--muted-foreground);",
                            "textFormat": 0
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);"
                      }
                    }
                  }
                },
                {
                  "title": "",
                  "newTab": false,
                  "subtitle": "",
                  "borderLess": false,
                  "description": {
                    "html": "<p class=\"leading-6\" style=\"text-align: center;\"><span data-lexical-icon=\"Heart\" style=\"display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; line-height: 0; color: var(--primary); background: var(--background); padding: 8px; border-radius: 16%; border: 2px solid var(--primary);\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-heart\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"></path></svg></span></p><p class=\"leading-6\" style=\"text-align: center;\"><br></p><h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"white-space: pre-wrap;\">Compassion</span></h3><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); white-space: pre-wrap;\">We approach education with empathy, understanding that each learner and educator has unique needs and challenges.</span></p>",
                    "json": {
                      "root": {
                        "type": "root",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "size": 24,
                                "type": "icon",
                                "color": "var(--primary)",
                                "radius": 16,
                                "padding": 8,
                                "version": 1,
                                "iconName": "Heart",
                                "background": "var(--background)",
                                "borderColor": "var(--primary)",
                                "borderWidth": 2
                              }
                            ],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "tag": "h3",
                            "type": "heading",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Compassion",
                                "type": "text",
                                "style": "",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr"
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": "ltr",
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": EAlignment.Center,
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "We approach education with empathy, understanding that each learner and educator has unique needs and challenges.",
                                "type": "text",
                                "style": "color: var(--muted-foreground);",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr",
                            "textStyle": "color: var(--muted-foreground);",
                            "textFormat": 0
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);"
                      }
                    }
                  }
                }
              ],
              "layout": ECardsBlockLayout.Grid,
              "columns": { "lg": 3, "md": 2, "sm": 1, "xl": 4 }
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "Our Values",
        "headline": "What Drives Us Forward",
        "container": true,
        "subheadline": "Our core values guide everything we do at Future Creatify. They shape our programs, inform our interactions, and inspire our innovation.",
        "headlineAlignment": EAlignment.Center
      },
      {
        "title": "Our Vision",
        "blocks": {
          "items": [
            {
              "cta": [],
              "body": {
                "html": "<p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">Our Vision</strong></b></p><h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 30px; white-space: pre-wrap;\">Looking to the Future</span></h3><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 16px; white-space: pre-wrap;\">We envision a world where every educator is empowered with the tools, knowledge, and</span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 16px; white-space: pre-wrap;\">support to create transformative learning experiences. A world where education is not just</span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 16px; white-space: pre-wrap;\">about imparting knowledge but about inspiring curiosity, fostering creativity, and </span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 16px; white-space: pre-wrap;\">nurturing holistic development.</span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><i><b><strong class=\"font-bold italic\" style=\"font-family: &quot;Times New Roman&quot;; font-size: 16px; white-space: pre-wrap;\">\"How do we, as educators, make a difference every day in shaping the minds and futures of our</strong></b></i></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><i><b><strong class=\"font-bold italic\" style=\"font-family: &quot;Times New Roman&quot;; font-size: 16px; white-space: pre-wrap;\">students? This question guides our work every day at Future Creatify.\"</strong></b></i></p>",
                "json": {
                  "root": {
                    "type": "root",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "children": [
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Our Vision",
                            "type": "text",
                            "style": "color: var(--primary);",
                            "detail": 0,
                            "format": 1,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--primary);",
                        "textFormat": 1
                      },
                      {
                        "tag": "h3",
                        "type": "heading",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Looking to the Future",
                            "type": "text",
                            "style": "font-size: 30px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-size: 30px;"
                      },
                      {
                        "type": "paragraph",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": null,
                        "textStyle": "",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "We envision a world where every educator is empowered with the tools, knowledge, and",
                            "type": "text",
                            "style": "color: var(--muted-foreground);font-size: 16px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "support to create transformative learning experiences. A world where education is not just",
                            "type": "text",
                            "style": "color: var(--muted-foreground);font-size: 16px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "about imparting knowledge but about inspiring curiosity, fostering creativity, and ",
                            "type": "text",
                            "style": "color: var(--muted-foreground);font-size: 16px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "nurturing holistic development.",
                            "type": "text",
                            "style": "color: var(--muted-foreground);font-size: 16px;",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);font-size: 16px;",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [],
                        "direction": "ltr",
                        "textStyle": "",
                        "textFormat": 0
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "\"How do we, as educators, make a difference every day in shaping the minds and futures of our",
                            "type": "text",
                            "style": "font-family: Times New Roman;font-size: 16px;",
                            "detail": 0,
                            "format": 3,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-family: Times New Roman;font-size: 16px;",
                        "textFormat": 3
                      },
                      {
                        "type": "paragraph",
                        "format": EAlignment.Center,
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "students? This question guides our work every day at Future Creatify.\"",
                            "type": "text",
                            "style": "font-family: Times New Roman;font-size: 16px;",
                            "detail": 0,
                            "format": 3,
                            "version": 1
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "font-family: Times New Roman;font-size: 16px;",
                        "textFormat": 3
                      }
                    ],
                    "direction": "ltr",
                    "textStyle": "color: var(--muted-foreground);font-size: 16px;"
                  }
                }
              },
              "type": EBlock.Text,
              "align": EAlignment.Center,
              "headline": "",
              "subheadline": ""
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "",
        "headline": "",
        "container": false,
        "subheadline": "",
        "headlineAlignment": EAlignment.Center
      }
    ],
    "metadata": {
      "title": "About Us",
      "keywords": [],
      "description": "Learn more about us."
    },
    "heroSections": [
      {
        "cta": [],
        "layout": { "type": EHeroLayoutTypes.Jumbotron, "alignment": EAlignment.Center },
        "headline": {
          "html": "<p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">About Us</strong></b></p><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"font-size: 50px; white-space: pre-wrap;\">Our Journey in&nbsp;</span><span style=\"color: var(--primary); font-size: 50px; white-space: pre-wrap;\">Educational</span></h1><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--primary); font-size: 50px; white-space: pre-wrap;\"> Innovation</span></h1><p class=\"leading-6\"><br></p><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 18px; white-space: pre-wrap;\">We're passionate about transforming education through innovative pedagogy and empowering educators </span></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: center;\"><span style=\"color: var(--muted-foreground); font-size: 18px; white-space: pre-wrap;\">to make a difference in shaping the minds and futures of students.</span></p>",
          "json": {
            "root": {
              "type": "root",
              "format": "",
              "indent": 0,
              "version": 1,
              "children": [
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "About Us",
                      "type": "text",
                      "style": "color: var(--primary);",
                      "detail": 0,
                      "format": 1,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);",
                  "textFormat": 1
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Our Journey in ",
                      "type": "text",
                      "style": "font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    },
                    {
                      "mode": "normal",
                      "text": "Educational",
                      "type": "text",
                      "style": "color: var(--primary);font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 50px;"
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": " Innovation",
                      "type": "text",
                      "style": "color: var(--primary);font-size: 50px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);font-size: 50px;"
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": "ltr",
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "We're passionate about transforming education through innovative pedagogy and empowering educators ",
                      "type": "text",
                      "style": "color: var(--muted-foreground);font-size: 18px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--muted-foreground);font-size: 18px;",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": EAlignment.Center,
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "to make a difference in shaping the minds and futures of students.",
                      "type": "text",
                      "style": "color: var(--muted-foreground);font-size: 18px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--muted-foreground);font-size: 18px;",
                  "textFormat": 0
                }
              ],
              "direction": "ltr",
              "textStyle": "color: var(--muted-foreground);font-size: 18px;"
            }
          }
        }
      }
    ],
    "createdAt": new Date("2025-10-10 10:31:40.240684"),
    "updatedAt": new Date("2025-10-15 15:30:43.362")
  },
  {
    "id": "f9fa01a9-1e66-4cfe-b1ba-63c89b0ec345",
    "name": "Home",
    "slug": "home",
    "sections": [
      {
        "title": "Our Mission",
        "blocks": {
          "items": [
            {
              "type": EBlock.Cards,
              "cards": [
                {
                  "title": "",
                  "newTab": false,
                  "subtitle": "",
                  "borderLess": false,
                  "description": {
                    "html": "<p class=\"leading-6\"><span data-lexical-icon=\"BookOpen\" style=\"display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; line-height: 0; color: var(--primary); background: var(--background); padding: 0px; border-radius: 0%;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-book-open\" aria-hidden=\"true\"><path d=\"M12 7v14\"></path><path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\"></path></svg></span></p><p class=\"leading-6\"><br></p><h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\"><span style=\"white-space: pre-wrap;\">Innovative Pedagogy</span></h3><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"color: var(--muted-foreground); white-space: pre-wrap;\">Developing cutting-edge teaching methods that inspire creativity and critical thinking in students.</span></p>",
                    "json": {
                      "root": {
                        "type": "root",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "size": 28,
                                "type": "icon",
                                "color": "var(--primary)",
                                "radius": 0,
                                "padding": 0,
                                "version": 1,
                                "iconName": "BookOpen",
                                "background": "var(--background)",
                                "borderColor": "#000000",
                                "borderWidth": 0
                              }
                            ],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "tag": "h3",
                            "type": "heading",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Innovative Pedagogy",
                                "type": "text",
                                "style": "",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr"
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": "ltr",
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": "start",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Developing cutting-edge teaching methods that inspire creativity and critical thinking in students.",
                                "type": "text",
                                "style": "color: var(--muted-foreground);",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr",
                            "textStyle": "color: var(--muted-foreground);",
                            "textFormat": 0
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);"
                      }
                    }
                  }
                },
                {
                  "title": "",
                  "newTab": false,
                  "subtitle": "",
                  "borderLess": false,
                  "description": {
                    "html": "<p class=\"leading-6\"><span data-lexical-icon=\"LucideUsers\" style=\"display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; line-height: 0; color: var(--primary); background: var(--background); padding: 0px; border-radius: 0%;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-users\" aria-hidden=\"true\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path><path d=\"M16 3.128a4 4 0 0 1 0 7.744\"></path><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle></svg></span></p><p class=\"leading-6\"><br></p><h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\"><span style=\"white-space: pre-wrap;\">Educator Support</span></h3><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"color: var(--muted-foreground); white-space: pre-wrap;\">Providing resources, training, and community for educators to excel in their noble profession.</span></p>",
                    "json": {
                      "root": {
                        "type": "root",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "size": 28,
                                "type": "icon",
                                "color": "var(--primary)",
                                "radius": 0,
                                "padding": 0,
                                "version": 1,
                                "iconName": "LucideUsers",
                                "background": "var(--background)",
                                "borderColor": "#000000",
                                "borderWidth": 0
                              }
                            ],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "tag": "h3",
                            "type": "heading",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Educator Support",
                                "type": "text",
                                "style": "",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr"
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": "ltr",
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": "start",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Providing resources, training, and community for educators to excel in their noble profession.",
                                "type": "text",
                                "style": "color: var(--muted-foreground);",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr",
                            "textStyle": "color: var(--muted-foreground);",
                            "textFormat": 0
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);"
                      }
                    }
                  }
                },
                {
                  "title": "",
                  "newTab": false,
                  "subtitle": "",
                  "borderLess": false,
                  "description": {
                    "html": "<p class=\"leading-6\"><span data-lexical-icon=\"Calendar\" style=\"display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; line-height: 0; color: var(--primary); background: var(--backgrond); padding: 0px; border-radius: 0%;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-calendar\" aria-hidden=\"true\"><path d=\"M8 2v4\"></path><path d=\"M16 2v4\"></path><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect><path d=\"M3 10h18\"></path></svg></span></p><p class=\"leading-6\"><br></p><h3 class=\"scroll-m-20 text-2xl font-semibold tracking-tight\" dir=\"ltr\"><span style=\"white-space: pre-wrap;\">Project-Based Learning</span></h3><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"color: var(--muted-foreground); white-space: pre-wrap;\">Facilitating hands-on, engaging projects that make learning relevant and memorable for students.</span></p>",
                    "json": {
                      "root": {
                        "type": "root",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "size": 28,
                                "type": "icon",
                                "color": "var(--primary)",
                                "radius": 0,
                                "padding": 0,
                                "version": 1,
                                "iconName": "Calendar",
                                "background": "var(--backgrond)",
                                "borderColor": "#000000",
                                "borderWidth": 0
                              }
                            ],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": null,
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "tag": "h3",
                            "type": "heading",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Project-Based Learning",
                                "type": "text",
                                "style": "",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr"
                          },
                          {
                            "type": "paragraph",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [],
                            "direction": "ltr",
                            "textStyle": "",
                            "textFormat": 0
                          },
                          {
                            "type": "paragraph",
                            "format": "start",
                            "indent": 0,
                            "version": 1,
                            "children": [
                              {
                                "mode": "normal",
                                "text": "Facilitating hands-on, engaging projects that make learning relevant and memorable for students.",
                                "type": "text",
                                "style": "color: var(--muted-foreground);",
                                "detail": 0,
                                "format": 0,
                                "version": 1
                              }
                            ],
                            "direction": "ltr",
                            "textStyle": "color: var(--muted-foreground);",
                            "textFormat": 0
                          }
                        ],
                        "direction": "ltr",
                        "textStyle": "color: var(--muted-foreground);"
                      }
                    }
                  }
                }
              ],
              "layout": ECardsBlockLayout.Grid,
              "columns": { "lg": 3, "md": 2, "sm": 1, "xl": 3 }
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "Our Mission",
        "headline": "Making a Difference in Education",
        "container": false,
        "subheadline": "At Future Creatify, we believe in the power of education to transform lives. Our mission is to empower educators with innovative teaching methodologies and resources to create meaningful learning experiences.",
        "headlineAlignment": EAlignment.Center
      },
      {
        "title": "Recent Blogs",
        "blocks": {
          "items": [
            {
              "cols": 3,
              "type": EBlock.RefItem,
              "limit": 3,
              "order": EOrder.Desc,
              "refRelation": ERefRelation.Blogs
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "Recent Blogs",
        "headline": "Educational Insights & Resources",
        "container": true,
        "subheadline": "",
        "headlineAlignment": EAlignment.Left
      },
      {
        "title": "Testimonials",
        "blocks": {
          "items": [{ "type": EBlock.Testimonial }],
          "direction": "horizontal"
        },
        "tagline": "Testimonials",
        "headline": "What Our Community Says",
        "container": false,
        "subheadline": "At Future Creatify, we believe in the power of education to transform lives. Our mission is to empower educators with innovative teaching methodologies and resources to create meaningful learning experiences.",
        "headlineAlignment": EAlignment.Center
      },
      {
        "title": "Contact Form",
        "blocks": {
          "items": [
            { "type": EBlock.ContactText },
            {
              "form": {
                "id": "7e8ced0f-d36b-430a-82ee-9d1d61b680a8",
                "title": "Contact Form"
              },
              "type": EBlock.Form,
              "introContent": {
                "html": "<h2 class=\"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0\" dir=\"ltr\"><span style=\"white-space: pre-wrap;\">Send Us a Message</span></h2>",
                "json": {
                  "root": {
                    "type": "root",
                    "format": "",
                    "indent": 0,
                    "version": 1,
                    "children": [
                      {
                        "tag": "h2",
                        "type": "heading",
                        "format": "",
                        "indent": 0,
                        "version": 1,
                        "children": [
                          {
                            "mode": "normal",
                            "text": "Send Us a Message",
                            "type": "text",
                            "style": "",
                            "detail": 0,
                            "format": 0,
                            "version": 1
                          }
                        ],
                        "direction": "ltr"
                      }
                    ],
                    "direction": "ltr"
                  }
                }
              }
            }
          ],
          "direction": "horizontal"
        },
        "tagline": "",
        "headline": "",
        "container": true,
        "subheadline": "",
        "headlineAlignment": EAlignment.Center
      }
    ],
    "metadata": { "title": "Home", "keywords": [], "description": "" },
    "heroSections": [
      {
        "cta": [
          {
            "link": "about",
            "text": "Learn More",
            "type": ELinkType.Internal,
            "arrow": false,
            "newTab": false,
            "variant": ECtaVariant.Default
          },
          {
            "link": "blogs",
            "text": "Read Our Blogs",
            "type": ELinkType.Internal,
            "arrow": true,
            "newTab": false,
            "variant": ECtaVariant.Outline
          }
        ],
        "image": {
          "alt": "",
          "name": "pexels-photo-3769714.webp",
          "bytes": 340444,
          "width": 2423,
          "format": "webp",
          "height": 1500,
          "caption": "",
          "public_id": "meszr7mikafahxenzu5m",
          "secure_url": "https://res.cloudinary.com/dbj0ffzhn/image/upload/v1760079597/meszr7mikafahxenzu5m.webp",
          "originalName": "pexels-photo-3769714.webp",
          "resource_type": "image"
        },
        "layout": { "type": EHeroLayoutTypes.Split_Hero, "imagePosition": EAlignmentExcludeCenter.Right },
        "headline": {
          "html": "<p class=\"leading-6\" dir=\"ltr\"><b><strong class=\"font-bold\" style=\"color: var(--primary); white-space: pre-wrap;\">Future Creatify</strong></b></p><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\" style=\"text-align: start;\"><span style=\"font-size: 60px; white-space: pre-wrap;\">Empowering Educators</span></h1><h1 class=\"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl\" dir=\"ltr\"><span style=\"font-size: 60px; white-space: pre-wrap;\">for a&nbsp;</span><span style=\"color: var(--primary); font-size: 60px; white-space: pre-wrap;\">Creative Future</span></h1><p class=\"leading-6\"><br></p><p class=\"leading-6\" dir=\"ltr\"><br></p><p class=\"leading-6\" dir=\"ltr\"><span style=\"color: var(--muted-foreground); font-size: 18px; white-space: pre-wrap;\">We train, facilitate, and design innovative programs through project-based integrated pedagogy to shape the minds and futures of students.</span></p>",
          "json": {
            "root": {
              "type": "root",
              "format": "",
              "indent": 0,
              "version": 1,
              "children": [
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Future Creatify",
                      "type": "text",
                      "style": "color: var(--primary);",
                      "detail": 0,
                      "format": 1,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--primary);",
                  "textFormat": 1
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": "start",
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "Empowering Educators",
                      "type": "text",
                      "style": "font-size: 60px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 60px;"
                },
                {
                  "tag": "h1",
                  "type": "heading",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "for a ",
                      "type": "text",
                      "style": "font-size: 60px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    },
                    {
                      "mode": "normal",
                      "text": "Creative Future",
                      "type": "text",
                      "style": "color: var(--primary);font-size: 60px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "font-size: 60px;"
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": null,
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [],
                  "direction": "ltr",
                  "textStyle": "",
                  "textFormat": 0
                },
                {
                  "type": "paragraph",
                  "format": "",
                  "indent": 0,
                  "version": 1,
                  "children": [
                    {
                      "mode": "normal",
                      "text": "We train, facilitate, and design innovative programs through project-based integrated pedagogy to shape the minds and futures of students.",
                      "type": "text",
                      "style": "color: var(--muted-foreground);font-size: 18px;",
                      "detail": 0,
                      "format": 0,
                      "version": 1
                    }
                  ],
                  "direction": "ltr",
                  "textStyle": "color: var(--muted-foreground);font-size: 18px;",
                  "textFormat": 0
                }
              ],
              "direction": "ltr",
              "textStyle": "color: var(--muted-foreground);font-size: 18px;"
            }
          }
        }
      }
    ],
    "createdAt": new Date("2025-10-10 10:32:15.679182"),
    "updatedAt": new Date("2025-10-15 15:10:28.464")
  }
]

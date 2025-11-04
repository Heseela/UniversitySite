import { Calendar, File, Footprints, Handshake, Heading, NotebookText, Settings, StretchHorizontal, Tags, Users } from "lucide-react";
import { TGroupMenuItem } from "./sidebar";

export const cmsSidebarMenuItems: TGroupMenuItem[] = [
    {
        groupLabel: "Main",
        menuItems: [
            {
                title: "Pages",
                url: "/cms/pages",
                icon: File,
            },
            {
                title: "Blogs",
                url: "/cms/blogs",
                icon: NotebookText,
            },
            {
                title: "Events",
                url: "/cms/events",
                icon: Calendar,
            },
            {
                title: "Teams",
                url: "/cms/teams",
                icon: Users,
            },
            {
                title: "Forms",
                url: "/cms/forms",
                icon: StretchHorizontal,
            },
            {
                title: "Credibility & Support",
                url: "/cms/credibility-and-support",
                icon: Handshake,
            },
        ],
    },
    {
        groupLabel: "Globals",
        menuItems: [
            {
                title: "Header",
                url: "/cms/globals/header",
                icon: Heading
            },
            {
                title: "Footer",
                url: "/cms/globals/footer",
                icon: Footprints
            }
        ]
    },
    {
        groupLabel: "Settings",
        menuItems: [
            {
                title: "Site Settings",
                url: "/cms/site-settings",
                icon: Settings
            },
            {
                title: "Categories",
                url: "/cms/categories",
                icon: Tags
            }
        ]
    }
]
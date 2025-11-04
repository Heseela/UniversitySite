import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const nextUrl = process.env.NEXT_PUBLIC_URL!;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/cms/',
        },
        sitemap: nextUrl + '/sitemap.xml',
    }
}
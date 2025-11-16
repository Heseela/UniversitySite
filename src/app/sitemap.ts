import { serverFetch } from '@/lib/data-access.ts/server-fetch'
import type { MetadataRoute } from 'next'
import { TPagesResponse } from '../../types/page.types';
import { HOME_SLUG } from './slugs';
import { TBlogsResponse_Public } from '../../types/blog.types';
import { TEventsResponse_Public } from '../../types/event.types';
import { APP_URL } from '@/CONSTANTS';
import { TCoursesResponse_Public } from '../../types/course.types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pagesResponse = await serverFetch("/pages", { next: { revalidate: 60 } });
    const pages: TPagesResponse["data"] = (pagesResponse.ok) ? await pagesResponse.json() : [];

    const blogsResponse = await serverFetch("/blogs", { next: { revalidate: 60 } });
    const blogs: TBlogsResponse_Public = (blogsResponse.ok) ? await blogsResponse.json() : [];

    const eventsResponse = await serverFetch("/events", { next: { revalidate: 60 } });
    const events: TEventsResponse_Public = (eventsResponse.ok) ? await eventsResponse.json() : [];

    const coursesResponse = await serverFetch("/courses", { next: { revalidate: 60 } });
    const courses: TCoursesResponse_Public = (coursesResponse.ok) ? await coursesResponse.json() : [];

    const pagesSitemap: MetadataRoute.Sitemap = pages.map(p => {
        return ({
            url: `${APP_URL}/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'yearly',
            priority: p.slug === HOME_SLUG ? 1 : 0.8
        })
    });

    const blogsSitemap: MetadataRoute.Sitemap = blogs.map(b => ({
        url: `${APP_URL}/blogs/${b.slug}`,
        lastModified: b.updatedAt,
        changeFrequency: 'yearly',
        priority: 0.8
    }));

    const eventsSitemap: MetadataRoute.Sitemap = events.map(e => ({
        url: `${APP_URL}/events/${e.slug}`,
        lastModified: e.updatedAt,
        changeFrequency: 'yearly',
        priority: 0.8
    }));

    const coursesSitemap: MetadataRoute.Sitemap = courses.map(c => ({
        url: `${APP_URL}/courses/${c.slug}`,
        lastModified: c.updatedAt,
        changeFrequency: 'yearly',
        priority: 0.8
    }));

    return [
        {
            url: APP_URL || `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1
        },
        ...pagesSitemap,
        ...blogsSitemap,
        ...eventsSitemap,
        ...coursesSitemap,
    ]
}
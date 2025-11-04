import BlogsList from '@/components/cms/blogs/blogs-list'
import NewBlogButton from '@/components/cms/blogs/new-blog-btn'
import ContainerLayout from '@/components/cms/container-layout'
import { Metadata } from 'next';
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: "Blogs"
};

export type BlogsPageProps = {
    searchParams: {
        q?: string;
        category?: string;
        published?: string;
        favourite?: string;
        limit?: string;
    }
}

export default async function BlogsPage(props: { searchParams: Promise<BlogsPageProps["searchParams"]> }) {
    const searchParams = await props.searchParams;

    return (
        <ContainerLayout
            title='Blogs'
            description="Manage your blogs here."
            actionTrigger={
                <NewBlogButton />
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <BlogsList searchParams={searchParams} />
            </Suspense>
        </ContainerLayout>
    )
}
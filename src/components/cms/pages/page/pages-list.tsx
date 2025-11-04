import { DataTable } from '@/components/data-table/data-table';
import { pagesColumns } from './pages.columns';
import { getPages } from '@/lib/data-access.ts/pages.data';
import { PagesPageProps } from '@/app/(cms)/cms/pages/page';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import SearchInput from '@/components/search/search-input';

export default async function PagesList(props: PagesPageProps) {
    const searchParams = await props.searchParams;

    const result = await getPages(searchParams);

    if (!result) return (
        <section>Unable to fetch pages</section>
    )

    return (
        <section className='space-y-6'>
            <section className='flex'>
                <SearchInput />
            </section>
            <DataTable columns={pagesColumns} data={result.data} />
            <DataTablePagination meta={result.meta} />
        </section>
    )
}
import { DataTable } from '@/components/data-table/data-table';
import { FormsPageProps } from '@/app/(cms)/cms/forms/page';
import SearchInput from '@/components/search/search-input';
import { getForms } from '@/lib/data-access.ts/forms.data';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { formsColumns } from './forms-columns';

export default async function FormsList(props: FormsPageProps) {
    const forms = await getForms(props.searchParams);

    if (!forms) return (
        <div>Something went wrong</div>
    )

    return (
        <>
            <div className='flex'>
                <SearchInput />
            </div>

            <DataTable columns={formsColumns} data={forms.data} />

            <DataTablePagination meta={forms.meta} />
        </>
    )
}
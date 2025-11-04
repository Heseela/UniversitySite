// "use client";

// import { useEffect, useMemo, useState, useTransition } from 'react';
// import { Button } from '../ui/button'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { useFetchData } from '@/hooks/useFetchData';
// import { LoaderCircle, Search, X } from 'lucide-react';
// import { ColumnDef, getCoreRowModel, RowSelectionState, useReactTable } from '@tanstack/react-table';
// import CloudinaryImage from '../ui/cloudinary-image';
// import { Input } from '../ui/input';
// import { cn, createQueryString, formatBytes, showServerError } from '@/lib/utils';
// import { useForm } from 'react-hook-form';
// import { mediaSchema, TMediaSchema } from '@/schemas/media.schema';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { uploadMedia } from '@/lib/actions/media.action';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Textarea } from '../ui/textarea';
// import { CldUploadWidget } from 'next-cloudinary';
// import { CLOUDINARY_SIGNATURE_ENDPOINT } from '@/CONSTANTS';
// import CustomDialog from '../ui/custom-dialog';
// import LoadingButton from './loading-button';
// import { Checkbox } from '../ui/checkbox';
// import { MediaSelectorDataTable } from '../data-table/media-select-data-table';
// import { TMedia, TMediaResponse } from '../../../types/media.types';
// import { MediaSelectDataTablePagination } from '../data-table/media-select-data-table-patination';
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// type MediaFieldProps = {
//   media: TMediaSchema;
//   onChange: (value: TMediaSchema | TMediaSchema[]) => void;
//   selected?: Record<TMediaSchema["public_id"], boolean>;
//   max?: number;
//   onClose: () => void;
//   onRemove: () => void;
// }

// export function MediaItem({ media, onRemove }: Pick<MediaFieldProps, 'media' | 'onRemove'>) {
//   return (
//     <section className="bg-card border rounded-md p-3 flex items-center justify-between gap-4">
//       <section className='flex items-center gap-4'>
//         <CloudinaryImage
//           src={media.secure_url}
//           alt={media.alt ?? ""}
//           width={40}
//           height={40}
//         />
//         <section className="text-sm space-y-1">
//           <p>{media.name}</p>
//           <p className="text-muted-foreground text-xs">
//             <span>{formatBytes(media.bytes)} | </span>
//             <span>{media.width} x {media.height} | </span>
//             <span>{media.resource_type}/{media.format}</span>
//           </p>
//         </section>
//       </section>

//       <section>
//         <Button
//           type="button"
//           variant={'ghost'}
//           size={'icon'}
//           title='Remove'
//           onClick={onRemove}
//         >
//           <X />
//         </Button>
//       </section>
//     </section>
//   )
// }

// export function MediaInput({ onChange, max = 1, selected = {} }: Pick<MediaFieldProps, 'onChange' | 'max' | 'selected'>) {
//   const [createNewOpen, setCreateNewOpen] = useState(false);

//   return (
//     <section className='border rounded-md p-4 flex items-center gap-4'>
//       <CustomDialog
//         isOpen={createNewOpen}
//         onClose={() => setCreateNewOpen(false)}
//         title='Create New Media'
//         className="full-screen-dialog"
//       >
//         <CreateNew
//           onClose={() => setCreateNewOpen(false)}
//           onChange={onChange}
//         />
//       </CustomDialog>

//       <Button
//         type="button"
//         variant={"secondary"}
//         size={"sm"}
//         className='font-normal text-xs'
//         onClick={() => setCreateNewOpen(true)}
//       >
//         Upload New
//       </Button>

//       <span className='text-muted-foreground'>or</span>

//       <MediaSelector
//         onChange={onChange}
//         max={max}
//         selected={selected}
//       />
//     </section>
//   )
// }

// function CreateNew({ onClose, onChange }: Pick<MediaFieldProps, 'onClose' | 'onChange'>) {
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<TMediaSchema>({
//     resolver: zodResolver(mediaSchema),
//     defaultValues: {
//       alt: "",
//       caption: "",
//     }
//   });

//   function onSubmit(data: TMediaSchema) {
//     startTransition(async () => {
//       try {
//         await uploadMedia(data);
//         onChange(data);
//         onClose();
//       } catch (e) {
//         showServerError(e);
//       }
//     })
//   }

//   return (
//     <Form {...form}>
//       <section className='space-y-6'>
//         <section className='space-y-2'>
//           <section className={cn(
//             'border rounded-sm overflow-hidden',
//             form.formState.errors.originalName && "border-destructive"
//           )}>
//             <FormField
//               control={form.control}
//               name="originalName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     {
//                       !!field.value && !Array.isArray(field.value) ? (
//                         <section className='flex items-center'>
//                           <CloudinaryImage
//                             src={form.getValues("secure_url")}
//                             alt='alt'
//                             width={150}
//                             height={150}
//                           />

//                           <section className='flex-1 p-6 flex items-center justify-between gap-6'>
//                             <FormField
//                               control={form.control}
//                               name="name"
//                               render={({ field }) => (
//                                 <FormItem>
//                                   <FormLabel>Name <span className='text-destructive'>*</span></FormLabel>
//                                   <FormControl>
//                                     <Input
//                                       className='py-5 min-w-[300px]'
//                                       placeholder="Eg. brandLogo"
//                                       {...field}
//                                     />
//                                   </FormControl>
//                                   <FormMessage />
//                                 </FormItem>
//                               )}
//                             />

//                             <Button
//                               type='button'
//                               size={"icon"}
//                               variant={'outline'}
//                               onClick={() => form.reset({
//                                 alt: form.getValues("alt"),
//                                 caption: form.getValues("caption")
//                               })}
//                             >
//                               <X />
//                             </Button>
//                           </section>
//                         </section>
//                       ) : (
//                         <section className='p-6'>
//                           <CldUploadWidget
//                             signatureEndpoint={CLOUDINARY_SIGNATURE_ENDPOINT}
//                             onSuccess={async (result) => {
//                               if (typeof result.info === "object" && "secure_url" in result.info) {
//                                 form.reset({
//                                   alt: form.getValues("alt"),
//                                   caption: form.getValues("caption"),
//                                   bytes: result.info.bytes,
//                                   format: result.info.format,
//                                   height: result.info.height,
//                                   name: result.info.original_filename + '.' + result.info.format,
//                                   originalName: result.info.original_filename + '.' + result.info.format,
//                                   resource_type: result.info.resource_type,
//                                   secure_url: result.info.secure_url,
//                                   width: result.info.width,
//                                   public_id: result.info.public_id,
//                                 });
//                               }
//                             }}
//                             options={{
//                               cropping: true,
//                               maxFiles: 1,
//                               maxFileSize: 5 * 1024 * 1024, // 5MB
//                             }}
//                           >
//                             {({ open }) => {
//                               function handleOnClick() {
//                                 open();
//                               }

//                               return (
//                                 <Button
//                                   type="button"
//                                   variant={"secondary"}
//                                   size={"sm"}
//                                   className='font-normal text-xs'
//                                   onClick={handleOnClick}
//                                 >
//                                   Select a file
//                                 </Button>
//                               );
//                             }}
//                           </CldUploadWidget>
//                         </section>
//                       )
//                     }
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </section>
//           {
//             form.formState.errors.originalName && (
//               <p className='text-destructive'>{form.formState.errors.originalName?.message}</p>
//             )
//           }
//         </section>

//         <FormField
//           control={form.control}
//           name="alt"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Alt</FormLabel>
//               <FormControl>
//                 <Input
//                   className='py-5'
//                   placeholder="Eg. an alternative text to describe the media"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="caption"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Caption</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Title"
//                   className="field-sizing-content overflow-y-hidden resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <section className='flex justify-end'>
//           <LoadingButton
//             isLoading={isPending}
//             loadingText='Saving...'
//             onClick={form.handleSubmit(onSubmit)}
//           >
//             Save
//           </LoadingButton>
//         </section>
//       </section>
//     </Form>
//   )
// }

// function MediaSelector({ onChange, max = 1, selected = {} }: Pick<MediaFieldProps, | 'onChange' | 'max' | 'selected'>) {
//   const [selectorOpen, setSelectorOpen] = useState(false);
//   const [search, setSearch] = useState('');
//   const [queryParams, setQueryParams] = useState<Record<string, any>>({
//     resource_type: 'image',
//   });

//   const [rowSelection, setRowSelection] = useState<RowSelectionState>(selected);

//   const queryString = useMemo(() => createQueryString(queryParams), [queryParams]);

//   const { data, isLoading } = useFetchData<TMediaResponse>({
//     endpoint: '/media',
//     queryKey: ['media', queryString],
//     queryString
//   });

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setQueryParams(prev => ({
//         ...prev,
//         q: search
//       }));
//     }, 500);

//     return () => clearTimeout(handler);
//   }, [search]);

//   const isSingle = max === 1;

//   const mediaColumns: ColumnDef<TMedia>[] = [
//     ...(isSingle ? [] : [
//       {
//         id: "select",
//         header: ({ table }) => (
//           <Checkbox
//             checked={
//               table.getIsAllPageRowsSelected() ||
//               (table.getIsSomePageRowsSelected() && "indeterminate")
//             }
//             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//             aria-label="Select all"
//           />
//         ),
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.getIsSelected()}
//             onCheckedChange={(value) => row.toggleSelected(!!value)}
//             aria-label="Select row"
//           />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//       } as ColumnDef<TMedia>,
//     ]),
//     {
//       accessorKey: 'secure_url',
//       header: "File Name",
//       cell: ({ row }) => {
//         return (
//           <section
//             role="button"
//             className='flex items-center gap-5 p-2 hover:cursor-pointer'
//             onClick={() => {
//               if (isSingle) {
//                 onChange(row.original);
//                 setSelectorOpen(false);
//               }

//               if (!isSingle) {
//                 const isSelected = row.getIsSelected();
//                 row.toggleSelected(!isSelected);
//               }
//             }}
//           >
//             <CloudinaryImage
//               src={row.original.secure_url}
//               alt={row.original.alt}
//               height={40}
//               width={40}
//               crop='auto'
//             />
//             <span className='text-sm underline underline-offset-2'>{row.original.name}</span>
//           </section>
//         )
//       }
//     },
//     {
//       accessorKey: 'alt',
//       header: "Alt",
//       cell: ({ row }) => {
//         return (
//           row.original.alt ? (
//             <span className='text-sm'>{row.original.alt}</span>
//           ) : (
//             <span className='text-sm text-muted-foreground'>&lt;No Alt&gt;</span>
//           )
//         )
//       }
//     },
//     {
//       accessorKey: 'caption',
//       header: "Caption",
//       cell: ({ row }) => {
//         return (
//           row.original.caption ? (
//             <span className='text-sm'>{row.original.caption}</span>
//           ) : (
//             <span className='text-sm text-muted-foreground'>&lt;No Caption&gt;</span>
//           )
//         )
//       }
//     },
//     {
//       accessorKey: 'updatedAt',
//       header: "Updated At",
//       cell: ({ row }) => {
//         return (
//           <span className='text-sm'>{new Date(row.original.updatedAt).toLocaleString()}</span>
//         )
//       }
//     }
//   ]

//   const table = useReactTable({
//     data: (data?.data ?? []),
//     columns: mediaColumns,
//     getCoreRowModel: getCoreRowModel(),
//     onRowSelectionChange: setRowSelection,
//     state: {
//       rowSelection,
//     },
//     getRowId: row => row.public_id,
//   })

//   if (isLoading) return (
//     <div className='flex items-center justify-center'>
//       <LoaderCircle className='animate-spin' size={18} />
//     </div>
//   )

//   return (
//     <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
//       <DialogTrigger asChild>
//         <Button
//           type="button"
//           variant={"secondary"}
//           size={"sm"}
//           className='font-normal text-xs'
//         >
//           Choose Existing
//         </Button>
//       </DialogTrigger>
//       <DialogContent className='full-screen-dialog block'>
//         <DialogHeader className='flex-row justify-between items-center'>
//           <DialogTitle>
//             <span id="dialog-title">Select Media</span>
//           </DialogTitle>
//           {
//             !isSingle && (
//               <Button
//                 type="button"
//                 size={'lg'}
//                 disabled={!table.getIsSomePageRowsSelected()}
//                 onClick={() => {
//                   console.log(rowSelection)
//                   if (!table.getIsSomePageRowsSelected()) return;
//                   const selected = table.getSelectedRowModel().rows.map(row => row.original);
//                   onChange(selected);
//                   setSelectorOpen(false);
//                 }}
//               >
//                 Done
//               </Button>
//             )
//           }
//         </DialogHeader>
//         <section className='pt-10'>
//           <div className='space-y-6'>
//             <section className="relative flex items-center w-full">
//               <Search className="absolute left-3 text-muted-foreground" size={16} />
//               <Input
//                 type="search"
//                 placeholder={"Search by File Name"}
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 className="w-full !pl-9 py-5"
//               />
//             </section>

//             <ScrollArea className='h-[69vh] w-full'>
//               <MediaSelectorDataTable
//                 columns={mediaColumns}
//                 table={table}
//               />
//               <ScrollBar orientation="horizontal" />
//             </ScrollArea>

//             {
//               data?.meta && <MediaSelectDataTablePagination
//                 meta={data.meta}
//                 setQueryParams={setQueryParams}
//               />
//             }
//           </div>
//         </section>
//       </DialogContent>
//     </Dialog>
//   )
// }


import { useState, useTransition } from 'react';
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, ChevronUp, X } from 'lucide-react';
import CloudinaryImage from '../ui/cloudinary-image';
import { Input } from '../ui/input';
import { cn, formatBytes, showServerError } from '@/lib/utils';
import { TMediaSchema } from '@/schemas/media.schema';
import { uploadMedia } from '@/lib/actions/media.action';
import { Textarea } from '../ui/textarea';
import LoadingButton from '../forms/loading-button';
import { AddFilesButton } from './add-files-btn';
import { MultiMediaFieldProps } from './media-field-multi-select';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { ResponsiveAlertDialog } from '../ui/responsive-alert-dialog';

export function UploadBulkMedia({ onClose, onChange, allowedFormats }: Pick<MultiMediaFieldProps, 'onClose' | 'onChange' | 'allowedFormats'>) {
    const [files, setFiles] = useState<TMediaSchema[]>([]);
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const [isSaving, startTransition] = useTransition();
    const [alertOpen, setAlertOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    function updateActive<K extends keyof TMediaSchema>(key: K, val: TMediaSchema[K]) {
        setFiles(prev => {
            const copy = [...prev];
            copy[activeIdx] = { ...copy[activeIdx], [key]: val };
            return copy;
        });
    }

    function removeAt(index: number) {
        setFiles(prev => {
            const copy = prev.filter((_, i) => i !== index);
            // fix active index
            if (copy.length === 0) {
                setActiveIdx(0);
            } else if (activeIdx >= copy.length) {
                setActiveIdx(copy.length - 1);
            }
            return copy;
        });
    }

    const filesCount = files.length;

    function onSave() {
        if (!filesCount) return onClose();

        startTransition(async () => {
            try {
                const inserted = await uploadMedia(files);
                onChange(inserted);
                onClose();
            } catch (e) {
                showServerError(e);
            }
        });
    }

    const activeFile = files[activeIdx];

    if (filesCount === 0) {
        return (
            <section className='h-full flex flex-col'>
                <div className="flex items-center justify-between p-8">
                    <h2 id="dialog-title">
                        Add Files
                    </h2>
                    <Button
                        type="button"
                        variant={'ghost'}
                        onClick={onClose}
                        aria-label="Close"
                        className='p-0'
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>
                <div className="grow flex flex-col items-center justify-center text-muted-foreground space-y-2">
                    <AddFilesButton
                        onFiles={(batch) => {
                            setFiles((prev) => {
                                const startIdx = prev.length;          // index of the first new item
                                const next = [...prev, ...batch];
                                setActiveIdx(startIdx);
                                return next;
                            });
                        }}
                        allowedFormats={allowedFormats}
                    />

                    <p className="text-sm">Select images to begin.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="h-full flex lg:flex-row flex-col">
            <ResponsiveAlertDialog
                isOpen={alertOpen}
                setIsOpen={setAlertOpen}
                title="Leave without saving?"
                description="Your changes have not been saved. If you leave now, you will lose your changes."
                action={onClose}
                actionLabel="Leave anyway"
                cancelLabel="Stay on this page"
            />

            {/* LEFT: sidebar list */}
            <aside className="w-[280px] border-r shrink-0 p-4 pt-8 space-y-3 lg:block hidden">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">
                        {filesCount ? `${filesCount} Files to Upload` : 'No files yet'}
                    </span>
                    <AddFilesButton
                        onFiles={(batch) => {
                            setFiles((prev) => {
                                const startIdx = prev.length;
                                const next = [...prev, ...batch];
                                setActiveIdx(startIdx);
                                return next;
                            });
                        }}
                        allowedFormats={allowedFormats}
                    />
                </div>

                <div className="space-y-1 overflow-auto h-[calc(100%-3.5rem)]">
                    <RenderFilesList files={files} activeIdx={activeIdx} setActiveIdx={setActiveIdx} removeAt={removeAt} />
                </div>
            </aside>

            {/* RIGHT: editor panel */}
            <main className="flex-1 grow">
                <div className="flex items-center justify-between p-6 pt-8">
                    <h2 id="dialog-title">
                        Media
                    </h2>
                    <Button
                        type="button"
                        variant={'ghost'}
                        onClick={() => setAlertOpen(true)}
                        aria-label="Close"
                        className='p-0! h-fit hover:bg-transparent!'
                        title="Close"
                    >
                        <X />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>
                <div className="flex items-center justify-between border-y py-3 px-6">
                    {
                        filesCount > 0 && <div className="text-sm flex items-center gap-5">
                            <p><b>{activeIdx + 1}</b> of <b>{filesCount}</b></p>
                            <div className='space-x-2'>
                                <Button
                                    type='button'
                                    size={'icon'}
                                    variant={'secondary'}
                                    className='size-6 rounded-sm'
                                    onClick={() => setActiveIdx(prev => (prev - 1 + filesCount) % filesCount)}
                                >
                                    <ChevronLeft />
                                </Button>
                                <Button
                                    type='button'
                                    size={'icon'}
                                    variant={'secondary'}
                                    className='size-6 rounded-sm'
                                    onClick={() => setActiveIdx(prev => (prev + 1) % filesCount)}
                                >
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    }
                    <LoadingButton
                        isLoading={isSaving}
                        loadingText="Saving..."
                        onClick={onSave}
                    >
                        Save
                    </LoadingButton>
                </div>

                <div className="space-y-6 p-6">
                    {/* preview + filename row */}
                    <div className="border rounded-sm overflow-hidden">
                        <div className="flex items-center flex-wrap">
                            <CloudinaryImage
                                src={activeFile?.secure_url || ''}
                                alt={activeFile?.alt || 'preview'}
                                width={250}
                                height={180}
                            />
                            <div className="flex-1 p-6 flex items-center justify-between gap-6">
                                <div className="w-full max-w-[400px] min-w-[200px] space-y-1">
                                    <div>
                                        <label className="text-sm font-medium">Name <span className="text-destructive">*</span></label>
                                        <Input
                                            className="py-5 mt-1"
                                            value={activeFile?.name || ''}
                                            onChange={(e) => updateActive('name', e.target.value)}
                                            placeholder="Eg. brandLogo"
                                        />
                                    </div>
                                    <p className="text-muted-foreground text-xs">
                                        <span>{formatBytes(activeFile?.bytes)} | </span>
                                        <span>{activeFile?.width} x {activeFile?.height} | </span>
                                        <span>{activeFile?.resource_type}/{activeFile?.format}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alt */}
                    <div>
                        <label className="text-sm font-medium">Alt</label>
                        <Input
                            className="py-5 mt-1"
                            value={activeFile?.alt || ''}
                            onChange={(e) => updateActive('alt', e.target.value)}
                            placeholder="Eg. an alternative text to describe the media"
                        />
                    </div>

                    {/* Caption */}
                    <div>
                        <label className="text-sm font-medium">Caption</label>
                        <Textarea
                            className="field-sizing-content overflow-y-hidden resize-none mt-1"
                            placeholder="Title"
                            value={activeFile?.caption || ''}
                            onChange={(e) => updateActive('caption', e.target.value)}
                        />
                    </div>
                </div>
            </main>

            {/* MOBILE: drawer panel */}
            <section className='lg:hidden block'>
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger asChild>
                        <div role='button' className="flex items-center justify-between p-6 border-y cursor-pointer">
                            <div className='space-x-4'>
                                <AddFilesButton
                                    onFiles={(batch) => {
                                        setFiles((prev) => {
                                            const startIdx = prev.length;
                                            const next = [...prev, ...batch];
                                            setActiveIdx(startIdx);
                                            return next;
                                        });
                                    }}
                                    allowedFormats={allowedFormats}
                                />
                                <span className="text-xs font-medium">
                                    {filesCount ? `${filesCount} Files to Upload` : 'No files yet'}
                                </span>
                            </div>
                            <Button
                                type='button'
                                size={'icon'}
                                variant={'ghost'}
                            >
                                <ChevronUp />
                            </Button>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className='space-y-1 p-6 pb-20'>
                            <RenderFilesList files={files} activeIdx={activeIdx} setActiveIdx={setActiveIdx} removeAt={removeAt} />
                        </div>
                    </DrawerContent>
                </Drawer>
            </section>
        </section>
    );
}

function RenderFilesList({
    files,
    activeIdx,
    removeAt,
    setActiveIdx,
}: {
    files: TMediaSchema[],
    activeIdx: number,
    setActiveIdx: React.Dispatch<React.SetStateAction<number>>,
    removeAt: (index: number) => void
}) {
    return (
        <>
            {files.map((f, i) => (
                <div
                    key={f.public_id ?? `${f.name}-${i}`}
                    role="button"
                    onClick={() => setActiveIdx(i)}
                    className={cn(
                        'flex items-center gap-2 px-2 py-1 rounded hover:bg-accent/40 cursor-pointer',
                        i === activeIdx && 'bg-accent/60'
                    )}
                >
                    <CloudinaryImage
                        src={f.secure_url}
                        alt={f.name}
                        width={30}
                        height={30}
                        sizes="30px"
                        crop='fill'
                    />
                    <div className="truncate">
                        <div className="truncate text-xs">{f.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                            {formatBytes(f.bytes || 0)}
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-6 ml-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeAt(i);
                        }}
                        aria-label="Remove"
                        title="Remove"
                    >
                        <X className="size-3.5" />
                    </Button>
                </div>
            ))}
        </>
    )
}
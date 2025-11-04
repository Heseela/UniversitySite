import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import Image from 'next/image';
import { blockLayouts } from '@/lib/layouts/block-layouts';
import { TBlock } from '@/schemas/page.schema';

type Props = {
    onSelect: (block: TBlock) => void,
    length: number,
    children: React.ReactNode
}

export default function AddBlockDialog({ onSelect, length, children }: Props) {
    const [selectorOpen, setSelectorOpen] = useState(false);

    function handleAdd(block: TBlock) {
        if (length >= 5) return;
        onSelect(block);
        setSelectorOpen(false);
    }

    return (
        <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
            <DialogTrigger asChild>
                {
                    length < 5 && children
                }
            </DialogTrigger>
            <DialogContent className='full-screen-dialog block'>
                <DialogHeader>
                    <DialogTitle>
                        <span id="dialog-title">Add Block</span>
                    </DialogTitle>
                </DialogHeader>
                <section className='pt-10 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6'>
                    {
                        blockLayouts.map((l, ind) => {
                            return (
                                <section
                                    key={ind}
                                    role='button'
                                    className='border rounded-md p-4 space-y-2 hover:ring-1 hover:ring-offset-2 transition-all cursor-pointer'
                                    onClick={() => handleAdd(l.block)}
                                >
                                    <Image
                                        src={l.image}
                                        alt={l.alt}
                                        width={200}
                                        height={200}
                                        className='w-full rounded-md'
                                    />
                                    <p className='text-sm text-center'>{l.alt}</p>
                                </section>
                            )
                        })
                    }
                </section>
            </DialogContent>
        </Dialog>
    )
}
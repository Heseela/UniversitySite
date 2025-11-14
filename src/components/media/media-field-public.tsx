"use client";

import { Button } from '../ui/button'
import { CldUploadWidget } from 'next-cloudinary';
import { CLOUDINARY_SIGNATURE_ENDPOINT } from '@/CONSTANTS';
import CloudinaryImage from '../ui/cloudinary-image';
import { formatBytes } from '@/lib/utils';
import { X } from 'lucide-react';
import { TMediaSchema } from '@/schemas/media.schema';
import { useEffect } from 'react';

type MediaInput__PublicProps = {
    onChange: (url: TMediaSchema) => void;
    allowedFormats?: ("image" | string)[];
}

// Helper function to restore body overflow
function restoreBodyOverflow() {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
}

export function MediaInput__Public({
    onChange,
    allowedFormats = []
}: MediaInput__PublicProps) {
    // Restore overflow on unmount
    useEffect(() => {
        return () => {
            restoreBodyOverflow();
        };
    }, []);

    // Watch for Cloudinary widget modal to be removed from DOM
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let wasModalOpen = false;

        const observer = new MutationObserver(() => {
            // Check if Cloudinary widget modal is present
            const cloudinaryModal = document.querySelector('[data-testid="uw-modal"]') || 
                                   document.querySelector('.uw-modal') ||
                                   document.querySelector('[id*="cloudinary"]') ||
                                   document.querySelector('iframe[src*="cloudinary"]');
            
            const isModalOpen = !!cloudinaryModal;
            
            // Only restore when modal transitions from open to closed
            if (wasModalOpen && !isModalOpen) {
                restoreBodyOverflow();
            }
            
            wasModalOpen = isModalOpen;
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
            restoreBodyOverflow();
        };
    }, []);

    return (
        <section className='border rounded-md p-4 flex items-center gap-4'>
            <CldUploadWidget
                signatureEndpoint={CLOUDINARY_SIGNATURE_ENDPOINT}
                onSuccess={async (result) => {
                    if (typeof result.info === "object" && "public_id" in result.info) {
                        onChange({
                            alt: result.info.original_filename,
                            caption: "",
                            bytes: result.info.bytes,
                            format: result.info.format,
                            height: result.info.height,
                            name: result.info.original_filename + '.' + result.info.format,
                            originalName: result.info.original_filename + '.' + result.info.format,
                            resource_type: result.info.resource_type,
                            secure_url: result.info.secure_url,
                            width: result.info.width,
                            public_id: result.info.public_id,
                        });
                        // Restore overflow after successful upload
                        setTimeout(() => {
                            restoreBodyOverflow();
                        }, 100);
                    }
                }}
                onClose={() => {
                    // Restore overflow when widget closes
                    restoreBodyOverflow();
                }}
                options={{
                    cropping: true,
                    maxFiles: 1,
                    maxFileSize: 5 * 1024 * 1024, // 5MB
                    clientAllowedFormats: allowedFormats,
                }}
            >
                {({ open }) => {
                    function handleOnClick() {
                        open();
                    }

                    return (
                        <Button
                            type="button"
                            variant={"secondary"}
                            size={"sm"}
                            className='font-normal text-xs'
                            onClick={handleOnClick}
                        >
                            Select a file
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </section>
    )
}

type MediaItem__PublicProps = {
    media: TMediaSchema;
    onRemove: () => void;
}

export function MediaItem__Public({
    media,
    onRemove
}: MediaItem__PublicProps) {
    return (
        <section className="bg-card border rounded-md p-3 flex items-center justify-between gap-4">
            <section className='flex items-center gap-4'>
                <a href={media.secure_url} target='_blank' rel='noopener noreferrer'>
                    <CloudinaryImage // able to render pdf, bcz resource_type is image, but the secure_url still is a pdf
                        src={media.secure_url}
                        alt={media.alt ?? ""}
                        width={40}
                        height={40}
                    />
                </a>

                <section className="text-sm space-y-1">
                    <a href={media.secure_url} target='_blank' rel='noopener noreferrer' className='hover:underline'>{media.name}</a>
                    <p className="text-muted-foreground text-xs">
                        <span>{formatBytes(media.bytes)} | </span>
                        <span>{media.format}</span>
                    </p>
                </section>
            </section>

            <section>
                <Button
                    type="button"
                    variant={'ghost'}
                    size={'icon'}
                    title='Remove'
                    onClick={onRemove}
                >
                    <X />
                </Button>
            </section>
        </section>
    )
}
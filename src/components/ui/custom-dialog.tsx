import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default function CustomDialog({
    isOpen,
    onClose,
    title,
    children,
    className
}: DialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Store the previously focused element
            previousActiveElement.current = document.activeElement as HTMLElement;

            // Focus the dialog
            dialogRef.current?.focus();

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Handle escape key
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleEscape);

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';

                // Restore focus to previously focused element
                if (previousActiveElement.current) {
                    previousActiveElement.current.focus();
                }
            };
        }
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking directly on the overlay (not on child elements)
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "dialog-title" : undefined}
        >
            {/* Dialog Content */}
            <div
                ref={dialogRef}
                className={cn(
                    `relative bg-background rounded-lg border border-border shadow-lg transform transition-transform duration-300 ease-out animate-in fade-in-0 zoom-in-95 w-full`,
                    className
                )}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between">
                        <h2 id="dialog-title">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                )}

                {/* Close button for titleless dialogs */}
                {!title && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                )}

                {/* Content */}
                <div className={title ? "pt-10" : ""}>
                    {children}
                </div>
            </div>
        </div>
    );
};
import { useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { CLOUDINARY_SIGNATURE_ENDPOINT } from "@/CONSTANTS";

function toMedia(info: any) {
    const name = `${info.original_filename}.${info.format}`;
    return {
        alt: "",
        caption: "",
        bytes: info.bytes,
        format: info.format,
        height: info.height,
        name,
        originalName: name,
        resource_type: info.resource_type,
        secure_url: info.secure_url,
        width: info.width,
        public_id: info.public_id,
    };
}

export function AddFilesButton({
    onFiles,
    allowedFormats = [],
}: {
    allowedFormats?: ("image" | "video" | "audio" | "document")[];
    onFiles: (files: ReturnType<typeof toMedia>[]) => void;
}) {
    const bufferRef = useRef<ReturnType<typeof toMedia>[]>([]);

    return (
        <CldUploadWidget
            signatureEndpoint={CLOUDINARY_SIGNATURE_ENDPOINT}
            options={{
                multiple: true,
                maxFiles: 50,
                maxFileSize: 5 * 1024 * 1024,
                resourceType: "image",
                clientAllowedFormats: allowedFormats,
            }}
            onSuccess={(result) => {
                if (result?.info) bufferRef.current.push(toMedia(result.info));
            }}
            onQueuesEnd={() => {
                if (bufferRef.current.length) {
                    const batch = bufferRef.current;
                    bufferRef.current = [];
                    onFiles(batch); // <-- emit all uploaded files at once
                }
            }}
        >
            {({ open }) => (
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        open()
                    }}
                >
                    Add file
                </Button>
            )}
        </CldUploadWidget>
    );
}

import { CLOUDINARY_SIGNATURE_ENDPOINT } from "@/CONSTANTS";
import { uploadMedia } from "./actions/media.action";
import { TMediaSchema } from "@/schemas/media.schema";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

/**
 * Upload a File object directly to Cloudinary using your Next.js signature route.
 *
 * @param file      — the File instance you got from an <input type="file" />
 * @param folder?   — optional: the Cloudinary folder to upload into
 * @param publicId? — optional: your desired public_id (no file extension)
 * @returns MediaObject
 */
export async function uploadToCloudinary(
    file: File,
    type = 'image',
    folder?: string,
    publicId?: string
): Promise<TMediaSchema> {
    // 1. Prepare the params you want to sign
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign: Record<string, string | number> = { timestamp };
    if (folder) paramsToSign.folder = folder;
    if (publicId) paramsToSign.public_id = publicId;

    // 2. Fetch the signature from your Next.js API route
    const sigRes = await fetch(CLOUDINARY_SIGNATURE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign }),
    });
    if (!sigRes.ok) {
        throw new Error(`Signature endpoint error: ${sigRes.statusText}`);
    }
    const { signature } = await sigRes.json() as { signature: string };

    // 3. Build the FormData payload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    if (folder) formData.append('folder', folder);
    if (publicId) formData.append('public_id', publicId);

    // 4. POST to Cloudinary REST endpoint
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;
    const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
    });

    if (!uploadRes.ok) {
        const errBody = await uploadRes.text();
        throw new Error(`Cloudinary upload failed: ${uploadRes.statusText} — ${errBody}`);
    }

    const response = await uploadRes.json();

    const mediaObj = {
        public_id: response.public_id,
        alt: "<No alt>",
        bytes: response.bytes,
        caption: "<No caption>",
        format: response.format,
        height: response.height,
        name: response.original_filename + '.' + response.format,
        originalName: response.original_filename + '.' + response.format,
        resource_type: response.resource_type,
        secure_url: response.secure_url,
        width: response.width,
    };

    await uploadMedia([mediaObj]);

    return mediaObj;
}
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import { getCldImageUrl } from "next-cloudinary";
import * as crypto from "crypto";
import { Facebook, Github, Globe, Instagram, Linkedin, LucideProps, Twitter } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function throwZodErrorMsg(error: ZodError): never {
  // if this function gets called, you won’t come back
  const msg = JSON.parse(error.message);

  if (Array.isArray(msg)) {
    throw new Error(msg[0]?.message);
  }

  throw new Error(error.message);
}

export function showServerError(e: unknown) {
  if (e instanceof ZodError) {
    const msg = JSON.parse(e.message);

    if (Array.isArray(msg)) {
      return toast.error(msg[0]?.message);
    }

    toast.error(e.message);
  } else if (e instanceof Error) {
    toast.error("Error", {
      description: e.message,
    });
  } else {
    toast.error("An unexpected error occurred");
  }
}

export function generateSlug(
  title: string,
  genUniqueId: boolean = true
): string {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  if (!genUniqueId) return slug;

  return `${slug}-${generateUniqueId(10)}`;
}

/**
 * Generates a unique ID string of given length using URL-friendly characters.
 * Does not rely on any external libraries.
 *
 * @param size - Desired length of the ID (default: 21).
 * @returns A unique identifier string.
 */
export function generateUniqueId(size: number = 21): string {
  // URL-friendly alphabet (64 characters)
  const alphabet =
    "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const mask = (2 << 5) - 1; // 0b111111 = 63
  const step = Math.ceil((size * 6) / 8);
  let id = "";
  const randomBytes = new Uint8Array(step);

  // Fill randomBytes with cryptographically secure random values
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomBytes);
  } else {
    // Node.js fallback
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    crypto.randomFillSync(randomBytes);
  }

  // Convert random bytes to characters in the alphabet
  for (let i = 0; i < size; i++) {
    id += alphabet[randomBytes[i] & mask];
  }

  return id;
}

export async function getBlurDataUrl(
  src: string | null,
  width: number = 100
): Promise<string> {
  if (!src) return "";

  const imageUrl = getCldImageUrl({
    src,
    width,
  });
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${response.type};base64,${base64}`;

  return dataUrl;
}

/**
 * Calculates estimated reading time in minutes based on number of characters.
 * @param characters - Total number of characters in the text.
 * @param charsPerMinute - Average number of characters read per minute (default 1000).
 * @returns Estimated reading time in minutes (rounded up).
 */
export function getReadingTimeInMinutes(
  characters: number,
  charsPerMinute: number = 1000
): number {
  if (characters <= 0) return 0;
  return Math.ceil(characters / charsPerMinute);
}

export function createQueryString(
  params: Record<string, string | boolean | undefined | null>
) {
  // Remove undefined values
  const filteredParams = Object.fromEntries(
    Object.entries(params)
      .filter(([key, value]) => !!value && !!key)
      .map(([key, value]) => [key, String(value)])
  );

  return new URLSearchParams(filteredParams).toString();
}

/**
 * Convert bytes into a human-readable string,
 * choosing the largest unit (B, KB, MB, GB) for which the value is ≥ 1.
 * Never goes above GB.
 *
 * @param {number} bytes
 * @returns {string} e.g. "512 B", "0.92 MB", "1.20 GB"
 */
export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let idx = 0;

  // Climb up until the next unit would be < 1, or we hit GB
  while (idx < units.length - 1 && value / 1024 >= 1) {
    value /= 1024;
    idx++;
  }

  // If this unit is < 1 (e.g. 0.55 MB), step back to previous
  if (value < 1 && idx > 0) {
    value *= 1024;
    idx--;
  }

  // Round to two decimals, drop unnecessary zeros
  const rounded = parseFloat(value.toFixed(2));

  return `${rounded} ${units[idx]}`;
}

export function getTimeFromDate(date: Date): string {
  return date.toLocaleTimeString("ne-NP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}


export function getSocialIcon(url: string): ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> {
  try {
    const { hostname } = new URL(url.toLowerCase());
    const domain = hostname.replace(/^www\./, "");

    switch (true) {
      case domain.includes("facebook.com"):
        return Facebook;
      case domain.includes("twitter.com"):
        return Twitter;
      case domain.includes("linkedin.com"):
        return Linkedin;
      case domain.includes("github.com"):
        return Github;
      case domain.includes("instagram.com"):
        return Instagram;
      default:
        return Globe;
    }
  } catch (err) {
    return Globe;
  }
}
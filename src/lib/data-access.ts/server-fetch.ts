import { APP_URL } from "@/CONSTANTS";

export async function serverFetch(path: string, init?: RequestInit) {
    return fetch(`${APP_URL + "/api"}${path}`, {
        ...init,
    });
}
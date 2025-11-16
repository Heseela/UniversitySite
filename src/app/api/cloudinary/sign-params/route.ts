import cloudinary from "@/lib/cloudinary.config";
import checkAuth from "@/lib/utilities/check-auth";

export async function POST(request: Request) {
    await checkAuth(["admin", "moderator"]);
    
    const body = await request.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET!
    );

    return Response.json({ signature });
}

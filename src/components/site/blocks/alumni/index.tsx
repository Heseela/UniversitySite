import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AlumniResponse {
  alumni: TCredibilityAndSupport["alumni"];
}

export const RenderAlumniBlock = async () => {
  const alumniResponse = await serverFetch(
    "/credibility-and-support?col=alumni"
  );

  const alumni = alumniResponse.ok
    ? ((await alumniResponse.json()) as AlumniResponse)
    : null;

  if (!alumni?.alumni?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No alumni stories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {alumni.alumni.map((alumni, index) => (
        <AlumniCard
          key={index}
          alumni={alumni}
          index={index}
        />
      ))}
    </div>
  );
};

interface AlumniCardProps {
  alumni: TCredibilityAndSupport["alumni"][0];
  index: number;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni }) => {
  const cardContent = (
    <Card className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {alumni.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <CloudinaryImage
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            src={alumni.image.secure_url}
            alt={alumni.image.alt || alumni.name}
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <CardHeader className="text-center pb-2">
        <h3 className="text-xl font-bold text-gray-800">{alumni.name}</h3>
      </CardHeader>
      
      <CardContent className="text-center">
        <div className="prose prose-sm max-w-none text-gray-600 line-clamp-3">
          <RichTextPreview html={alumni.story.html} />
        </div>
        
        {alumni.link && (
          <div className="mt-4">
            <span className="text-primary-500 hover:text-primary-600 font-medium text-sm">
              Read Full Story →
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (alumni.link) {
    return (
      <Link 
        href={alumni.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
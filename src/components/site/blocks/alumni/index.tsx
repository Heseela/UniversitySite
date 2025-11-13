import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <Card className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
      {alumni.image && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <CloudinaryImage
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            src={alumni.image.secure_url}
            alt={alumni.image.alt || alumni.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Removed top gradient and positioned name at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-6">
            <h3 className="text-lg font-semibold text-white">{alumni.name}</h3>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col p-5">
        <div className="mb-4 flex-1">
          <div className="prose prose-sm max-w-none text-gray-700">
            <RichTextPreview html={alumni.story.html} />
          </div>
        </div>

        {alumni.link && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-primary hover:text-blue-700 font-medium text-sm transition-colors">
              Read full story
            </span>
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}

        {!alumni.link && (
          <div className="pt-3 border-t border-gray-100 mt-auto">
            <span className="text-gray-500 text-sm">Alumni Profile</span>
          </div>
        )}
      </div>
    </Card>
  );

  if (alumni.link) {
    return (
      <Link
        href={alumni.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl transition-all duration-200"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
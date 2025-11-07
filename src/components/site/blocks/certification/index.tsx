import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CertificationResponse {
  certifications: TCredibilityAndSupport["certifications"];
}

export const RenderCertificationBlock = async () => {
  const certificationResponse = await serverFetch(
    "/credibility-and-support?col=certifications"
  );

  const certifications = certificationResponse.ok
    ? ((await certificationResponse.json()) as CertificationResponse)
    : null;

  if (!certifications?.certifications?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No certifications available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {certifications.certifications.map((certification, index) => (
        <CertificationCard
          key={index}
          certification={certification}
          index={index}
        />
      ))}
    </div>
  );
};

interface CertificationCardProps {
  certification: TCredibilityAndSupport["certifications"][0];
  index: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  const cardContent = (
    <Card className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 p-4">
      <CardContent className="p-0 flex flex-col items-center text-center">
        {certification.image ? (
          <div className="relative w-20 h-20 mb-4">
            <CloudinaryImage
              className="object-contain"
              src={certification.image.secure_url}
              alt={certification.image.alt || certification.name}
              fill
            />
          </div>
        ) : (
          <div className="w-20 h-20 mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🏆</span>
          </div>
        )}
        
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
          {certification.name}
        </h3>
      </CardContent>
    </Card>
  );

  if (certification.link) {
    return (
      <Link 
        href={certification.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
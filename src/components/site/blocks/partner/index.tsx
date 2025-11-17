import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import Link from "next/link";

interface PartnerResponse {
  partners: TCredibilityAndSupport["partners"];
}

export const RenderPartnerBlock = async () => {
  const partnerResponse = await serverFetch("/credibility-and-support?col=partners", {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!partnerResponse.ok) return null;

  const partners: PartnerResponse = await partnerResponse.json();

  if (!partners.partners.length) return null;

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

      <div className="flex overflow-hidden">
        <div
          className="flex items-center py-4 hover:pause-animation"
          style={{
            animation: 'infinite-scroll 30s linear infinite',
            display: 'flex',
            width: 'max-content'
          }}
        >
          {[...partners.partners, ...partners.partners].map((partner, index) => (
            <PartnerCard
              key={`${partner.name}-${index}`}
              partner={partner}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PartnerCardProps {
  partner: TCredibilityAndSupport["partners"][0];
  index: number;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const cardContent = (
    <div className="flex-shrink-0 px-8 transition-all duration-500 hover:scale-110">
      <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 w-48 h-32 flex items-center justify-center">
        {partner.image ? (
          <CloudinaryImage
            src={partner.image.secure_url}
            alt={partner.image.alt || partner.name}
            width={160}
            height={80}
            className="object-contain h-16 w-32 transition-all duration-300"
          />
        ) : (
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 text-sm">{partner.name}</h3>
            {partner.age && (
              <p className="text-xs text-gray-500 mt-1">{partner.age} years</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (partner.link) {
    return (
      <Link
        href={partner.link}
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

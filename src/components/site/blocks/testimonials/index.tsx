import CloudinaryImage from "@/components/ui/cloudinary-image";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: TCredibilityAndSupport["testimonials"][0];
  index: number;
}

interface testimonialResponse {
  testimonials: TCredibilityAndSupport["testimonials"];
}

export const RenderTestimonialBlock = async () => {
  const testimonialResponse = await serverFetch("/credibility-and-support?col=testimonials", {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!testimonialResponse.ok) return null;

  const testimonials: testimonialResponse = await testimonialResponse.json();

  if (!testimonials.testimonials.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials?.testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          testimonial={testimonial}
          index={index}
        />
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  return (
    <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <Quote className="absolute top-6 right-6 text-gray-200 text-4xl opacity-70" />
      
      <div className="flex items-center mb-6 gap-4">
        {testimonial.image && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
            <CloudinaryImage
              className="object-cover"
              src={testimonial.image.secure_url}
              alt={testimonial.image.alt || testimonial.name}
              fill
            />
          </div>
        )}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6 relative">
        <p className="text-gray-700 italic relative z-10 wrap-break-word">
          &quot;{testimonial.quote}&quot;
        </p>
        <div className="absolute -bottom-3 left-6 w-4 h-4 transform rotate-45 bg-gray-100"></div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex text-yellow-400 gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">{testimonial.rating}/5 rating</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import { Star } from "lucide-react";
import React from "react";
interface TestimonialCardProps {
  testimonial: TCredibilityAndSupport["testimonials"][0];
  index: number;
}

interface testimonialResponse {
  testimonials: TCredibilityAndSupport["testimonials"];
}


export const RenderTestimonialBlock = async () => {
  const testimonialResponse = await serverFetch(
    "/credibility-and-support?col=testimonials"
  );

  const testimonials = testimonialResponse.ok
    ? ((await testimonialResponse.json()) as testimonialResponse)
    : null;

  return (
    <div className="">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials?.testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden h-fit">
      {/* Rating Stars */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < testimonial.rating
                ? "text-warning fill-warning"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {/* Quote */}
      <p className="italic text-slate-600 mb-6 wrap-break-word">
        {testimonial.quote}
      </p>

      {/* Person Info */}
      <div className="flex items-center gap-2">
        {testimonial.image && <CloudinaryImage
            className="size-12 rounded-full object-cover"
            src={testimonial.image.secure_url}
            width={testimonial.image.width}
            height={testimonial.image.height}
            alt={testimonial.image.alt || "Image"}
          />}
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

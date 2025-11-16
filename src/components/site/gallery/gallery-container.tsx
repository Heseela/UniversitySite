"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Cloud, X, ZoomIn } from "lucide-react";
import { TGalleryResponse, TMediaSelect } from "../../../../types/gallery.types";
import CloudinaryImage from "@/components/ui/cloudinary-image";

type GalleryImage = TMediaSelect & {
  category: string;
};

export default function GalleryContainer({ galleries }: { galleries: TGalleryResponse }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = ["All", ...new Set(galleries.map(gallery => gallery.category.name))];

  const allImages: GalleryImage[] = galleries.flatMap(gallery => 
    gallery.media.map(media => ({
      ...media,
      category: gallery.category.name
    }))
  );

  const filteredImages = selectedCategory === "All" 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory);

  if (allImages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg mb-2">No images found</div>
        <p className="text-slate-500">
          We&apos;re currently updating our gallery. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative group aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer bg-gray-100"
              onClick={() => setSelectedImage(image)}
            >
              <CloudinaryImage
                src={image.secure_url}
                alt={image.alt || `Gallery image - ${image.category}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <span className="font-medium text-sm">{image.category}</span>
                  {image.alt && (
                    <p className="text-xs text-gray-200 mt-1 line-clamp-2">{image.alt}</p>
                  )}
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-transparent border-none [&>button]:hidden">
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full max-w-5xl max-h-[80vh] bg-white rounded-lg overflow-hidden">
                <CloudinaryImage
                  src={selectedImage.secure_url}
                  alt={selectedImage.alt || `Gallery image - ${selectedImage.category}`}
                  width={selectedImage.width || 1200}
                  height={selectedImage.height || 800}
                  className="object-contain w-full h-full"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-medium bg-primary px-2 py-1 rounded text-sm">
                        {selectedImage.category}
                      </span>
                      {selectedImage.alt && (
                        <p className="mt-2 text-sm">{selectedImage.alt}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button 
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Count */}
      <div className="text-center mt-8">
        <p className="text-gray-600">
          Showing {filteredImages.length} of {allImages.length} images
        </p>
      </div>
    </>
  );
}

function GallerySkeleton() {
  return (
    <div className="space-y-8">
      {/* Filter skeleton */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-10 w-20 rounded-full" />
        ))}
      </div>
      
      {/* Images skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={index} className="aspect-[4/3] rounded-xl" />
        ))}
      </div>
    </div>
  );
}
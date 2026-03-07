import { useState } from "react";
import { X } from "lucide-react";
import galleryAnnecy from "@/assets/gallery-annecy.jpg";

interface ArtworkItem {
  id: string;
  src: string;
  title: string;
  description: string;
}

const artworks: ArtworkItem[] = [
  {
    id: "1",
    src: galleryAnnecy,
    title: "Lac d'Annecy",
    description: "Vakantie tekening Lac d'Annecy, Frankrijk",
  },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<ArtworkItem | null>(null);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-4">
            Gallery
          </h1>
          <p className="font-body text-muted-foreground">
            Een verzameling tekeningen en kunstwerken
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {artworks.map((art) => (
            <div key={art.id} className="break-inside-avoid group cursor-pointer" onClick={() => setLightbox(art)}>
              <img
                src={art.src}
                alt={art.title}
                className="w-full hover:opacity-90 transition-opacity duration-200"
                loading="lazy"
              />
              <div className="mt-3">
                <p className="font-body text-sm text-foreground tracking-wide font-medium">
                  {art.title}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">
                  {art.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-background"
            onClick={() => setLightbox(null)}
            aria-label="Sluiten"
          >
            <X size={28} />
          </button>
          <div className="flex flex-col items-center gap-4 max-w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="max-w-full max-h-[75vh] object-contain"
            />
            <div className="text-center">
              <p className="font-heading text-xl text-background/90 font-light">{lightbox.title}</p>
              <p className="font-body text-sm text-background/60 mt-1 max-w-md">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
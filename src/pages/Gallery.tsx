import { useState, useRef } from "react";
import { Plus, X } from "lucide-react";

interface ArtworkItem {
  id: string;
  src: string;
  title: string;
  description: string;
}

const Gallery = () => {
  const [artworks, setArtworks] = useState<ArtworkItem[]>([]);
  const [lightbox, setLightbox] = useState<ArtworkItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setArtworks((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            src,
            title: file.name.replace(/\.[^/.]+$/, ""),
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (fileRef.current) fileRef.current.value = "";
  };

  const removeArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
    if (lightbox?.id === id) setLightbox(null);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-4">
            Gallery
          </h1>
          <p className="font-body text-muted-foreground">
            A collection of drawings and artwork
          </p>
        </div>

        {/* Upload */}
        <div className="flex justify-center mb-12">
          <label className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase border border-border text-muted-foreground px-6 py-3 cursor-pointer hover:border-foreground hover:text-foreground transition-colors duration-200">
            <Plus size={16} />
            Upload artwork
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-body text-muted-foreground text-sm">
              No artwork uploaded yet. Click the button above to add your first piece.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {artworks.map((art) => (
              <div key={art.id} className="relative group break-inside-avoid">
                <img
                  src={art.src}
                  alt={art.title}
                  className="w-full cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  onClick={() => setLightbox(art)}
                  loading="lazy"
                />
                <button
                  onClick={() => removeArtwork(art.id)}
                  className="absolute top-2 right-2 bg-foreground/80 text-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label={`Remove ${art.title}`}
                >
                  <X size={14} />
                </button>
                <p className="mt-2 font-body text-xs text-muted-foreground tracking-wide">
                  {art.title}
                </p>
              </div>
            ))}
          </div>
        )}
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
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;

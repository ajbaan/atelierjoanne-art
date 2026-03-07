import { useState, useRef } from "react";
import { Plus, X, Check } from "lucide-react";

interface ArtworkItem {
  id: string;
  src: string;
  title: string;
  description: string;
}

interface PendingUpload {
  src: string;
  fileName: string;
}

const Gallery = () => {
  const [artworks, setArtworks] = useState<ArtworkItem[]>([]);
  const [lightbox, setLightbox] = useState<ArtworkItem | null>(null);
  const [pending, setPending] = useState<PendingUpload | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setPending({ src, fileName });
      setEditTitle(fileName);
      setEditDesc("");
    };
    reader.readAsDataURL(file);

    if (fileRef.current) fileRef.current.value = "";
  };

  const confirmUpload = () => {
    if (!pending) return;
    setArtworks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        src: pending.src,
        title: editTitle.trim() || pending.fileName,
        description: editDesc.trim(),
      },
    ]);
    setPending(null);
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
            Een verzameling tekeningen en kunstwerken
          </p>
        </div>

        {/* Upload */}
        <div className="flex justify-center mb-12">
          <label className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase border border-border text-muted-foreground px-6 py-3 cursor-pointer hover:border-foreground hover:text-foreground transition-colors duration-200">
            <Plus size={16} />
            Kunstwerk uploaden
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Upload dialog */}
        {pending && (
          <div className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center p-6" onClick={() => setPending(null)}>
            <div
              className="bg-background max-w-md w-full p-8 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={pending.src} alt="Preview" className="w-full max-h-60 object-contain" />
              <input
                type="text"
                placeholder="Titel"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-transparent border-b border-border py-2 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors"
              />
              <textarea
                placeholder="Beschrijving (optioneel)"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={3}
                className="w-full bg-transparent border-b border-border py-2 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors resize-none"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setPending(null)}
                  className="flex-1 font-body text-sm tracking-widest uppercase border border-border text-muted-foreground py-2 hover:border-foreground hover:text-foreground transition-colors"
                >
                  Annuleren
                </button>
                <button
                  onClick={confirmUpload}
                  className="flex-1 inline-flex items-center justify-center gap-2 font-body text-sm tracking-widest uppercase border border-foreground text-foreground py-2 hover:bg-foreground hover:text-background transition-colors"
                >
                  <Check size={14} />
                  Toevoegen
                </button>
              </div>
            </div>
          </div>
        )}

        {artworks.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-body text-muted-foreground text-sm">
              Nog geen kunstwerken geüpload. Klik op de knop hierboven om je eerste werk toe te voegen.
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
                  aria-label={`Verwijder ${art.title}`}
                >
                  <X size={14} />
                </button>
                <div className="mt-2">
                  <p className="font-body text-xs text-foreground tracking-wide font-medium">
                    {art.title}
                  </p>
                  {art.description && (
                    <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {art.description}
                    </p>
                  )}
                </div>
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
              {lightbox.description && (
                <p className="font-body text-sm text-background/60 mt-1 max-w-md">{lightbox.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

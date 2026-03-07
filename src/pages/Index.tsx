import { Link } from "react-router-dom";
import heroArt from "@/assets/hero-art.jpg";
import portrait from "@/assets/joanne-portrait.jpg";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroArt}
          alt="Abstract watercolor artwork"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="font-heading text-5xl md:text-7xl font-light tracking-wide text-foreground mb-2 italic">
            Atelier Joanne
          </h1>
          <p className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-muted-foreground mb-6">
            Joanne Baan-Geluk
          </p>
          <p className="font-body text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10">
            Illustraties door Joanne Baan
          </p>
          <Link
            to="/gallery"
            className="inline-block font-body text-sm tracking-widest uppercase border border-foreground text-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            View work
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={portrait}
              alt="Joanne Baan in her studio"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6">
              Over Joanne
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              Joanne Baan-Geluk is moeder van twee kinderen, echtgenoot én psychosociaal hulpverlener. In haar werk als hulpverlener zet ze creatieve therapie in als krachtig middel om mensen te begeleiden en te ondersteunen.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              Naast haar werk in de hulpverlening maakt Joanne met veel passie illustraties — van persoonlijke portretten tot vrije kunstwerken. Creativiteit loopt als een rode draad door alles wat ze doet, zowel professioneel als in haar atelier.
            </p>
            <Link
              to="/contact"
              className="font-body text-sm tracking-widest uppercase text-accent hover:text-foreground transition-colors duration-200"
            >
              Neem contact op →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

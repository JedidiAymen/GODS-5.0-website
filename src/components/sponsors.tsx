import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { Marquee } from "./ui/marquee";
import { cn } from "@/lib/utils";
import alBuhairaLogo from "@/assets/sponsors/Al-Buhaira-Invest.png";
import ieeeCisLogo from "@/assets/sponsors/ieee cis tunisia chapter logo (1).png";
import pwcLogo from "@/assets/sponsors/PwC_logo_rgb_colour_rev.png";
import pristineLogo from "@/assets/sponsors/Pristine.png";
import uikLogo from "@/assets/sponsors/Uik Transparent.jpeg";

// Sponsor data - replace with actual sponsor logos and info
const sponsors = [
  { name: "PwC", logo: pwcLogo, url: "https://tunisie.pwc.fr/fr/" },
  { name: "Al Buhaira", logo: alBuhairaLogo, url: "https://www.albuhairainvest.com" },
  { name: "IEEE CIS Tunisia Chapter", logo: ieeeCisLogo, url: "https://cis.ieee.tn" },
  { name: "Pristine", logo: pristineLogo, url: "https://www.facebook.com/Pristine.Tunisie/?locale=fr_FR" },
  { name: "UIK", logo: uikLogo, url: "https://uik.ens.tn" },
];

// Sponsor card component
function SponsorCard({
  logo,
  name,
  url,
}: {
  logo: string;
  name: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "relative flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 p-4 mx-4 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 w-40 h-24 sm:w-52 sm:h-28 lg:w-60 lg:h-32"
      )}
      aria-label={`Visit ${name} website`}
    >
      <img
        src={logo}
        alt={name}
        className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </a>
  );
}

function Sponsors() {
  const mainRef = useRef<HTMLDivElement>(null);
  const godsTextRef = useRef<HTMLSpanElement>(null);
  const sponsorsTextRef = useRef<HTMLSpanElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  // Entrance animations
  useGSAP(() => {
    // GODS text appears
    gsap.fromTo(
      godsTextRef.current,
      {
        y: -50,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // "Sponsors" text appears
    gsap.fromTo(
      sponsorsTextRef.current,
      {
        x: 30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.2,
      }
    );

    // Partners carousel appears
    gsap.fromTo(
      partnersRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.3,
      }
    );
  }, { scope: mainRef });

  return (
    <section
      ref={mainRef}
      id="sponsors"
      className="relative w-full bg-background overflow-hidden py-4"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Title: "GODS Sponsors" */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <span
          ref={godsTextRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight opacity-0"
        >
          GODS
        </span>
        <span
          ref={sponsorsTextRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight opacity-0"
        >
          Sponsors
        </span>
      </div>

      {/* Partners */}
      <div ref={partnersRef} className="mb-4 opacity-0">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
          <h3 className="text-base sm:text-lg font-semibold text-primary uppercase tracking-widest">
            Partners
          </h3>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
        <Marquee pauseOnHover reverse duration={30}>
          {sponsors.map((sponsor, idx) => (
            <SponsorCard
              key={idx}
              logo={sponsor.logo}
              name={sponsor.name}
              url={sponsor.url}
            />
          ))}
        </Marquee>
      </div>

      {/* Call to action */}
      <div className="text-center mt-8 px-4">
        <p className="text-muted-foreground text-lg mb-4">
          Interested in sponsoring GODS 5.0?
        </p>
        <a
          href="mailto:ieee.comm@ensi-uma.tn"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-primary/25 text-sm"
        >
          <span>Become a Sponsor</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Sponsors;

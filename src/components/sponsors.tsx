import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { Marquee } from "./ui/marquee";
import { cn } from "@/lib/utils";

// Sponsor data - replace with actual sponsor logos and info
const sponsors = {
  platinum: [
    { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
    { name: "Microsoft", logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" },
  ],
  gold: [
    { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png" },
  ],
  silver: [
    { name: "Spotify", logo: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" },
    { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" },
    { name: "GitHub", logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  ],
};

// Sponsor card component
function SponsorCard({
  logo,
  name,
  tier,
}: {
  logo: string;
  name: string;
  tier: "platinum" | "gold" | "silver";
}) {
  const sizeClasses = {
    platinum: "w-48 h-28 sm:w-56 sm:h-32 lg:w-64 lg:h-36",
    gold: "w-36 h-20 sm:w-44 sm:h-24 lg:w-52 lg:h-28",
    silver: "w-28 h-16 sm:w-36 sm:h-20 lg:w-44 lg:h-24",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 p-4 mx-4 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        sizeClasses[tier]
      )}
    >
      <img
        src={logo}
        alt={name}
        className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );
}

function Sponsors() {
  const mainRef = useRef<HTMLDivElement>(null);
  const godsTextRef = useRef<HTMLSpanElement>(null);
  const sponsorsTextRef = useRef<HTMLSpanElement>(null);
  const platinumRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);
  const silverRef = useRef<HTMLDivElement>(null);

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

    // Platinum tier appears
    gsap.fromTo(
      platinumRef.current,
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

    // Gold tier appears
    gsap.fromTo(
      goldRef.current,
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
        delay: 0.5,
      }
    );

    // Silver tier appears
    gsap.fromTo(
      silverRef.current,
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
        delay: 0.7,
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

      {/* Platinum Sponsors */}
      <div ref={platinumRef} className="mb-4 opacity-0">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <h3 className="text-lg sm:text-xl font-semibold text-primary uppercase tracking-widest">
            ✨ Platinum Partners
          </h3>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
        <Marquee pauseOnHover duration={30}>
          {sponsors.platinum.map((sponsor, idx) => (
            <SponsorCard
              key={idx}
              logo={sponsor.logo}
              name={sponsor.name}
              tier="platinum"
            />
          ))}
        </Marquee>
      </div>

      {/* Gold Sponsors */}
      <div ref={goldRef} className="mb-4 opacity-0">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/50" />
          <h3 className="text-base sm:text-lg font-semibold text-accent uppercase tracking-widest">
            🥇 Gold Partners
          </h3>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/50" />
        </div>
        <Marquee pauseOnHover reverse duration={35}>
          {sponsors.gold.map((sponsor, idx) => (
            <SponsorCard
              key={idx}
              logo={sponsor.logo}
              name={sponsor.name}
              tier="gold"
            />
          ))}
        </Marquee>
      </div>

      {/* Silver Sponsors */}
      <div ref={silverRef} className="mb-4 opacity-0">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-muted-foreground/50" />
          <h3 className="text-sm sm:text-base font-semibold text-muted-foreground uppercase tracking-widest">
            🥈 Silver Partners
          </h3>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-muted-foreground/50" />
        </div>
        <Marquee pauseOnHover duration={25}>
          {sponsors.silver.map((sponsor, idx) => (
            <SponsorCard
              key={idx}
              logo={sponsor.logo}
              name={sponsor.name}
              tier="silver"
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
          href="mailto:sponsor@gods.tn"
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

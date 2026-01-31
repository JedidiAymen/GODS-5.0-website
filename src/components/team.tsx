import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

function Team() {
  const mainRef = useRef<HTMLDivElement>(null);
  const godsTextRef = useRef<HTMLSpanElement>(null);
  const teamTextRef = useRef<HTMLSpanElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

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

    // "Team" text appears
    gsap.fromTo(
      teamTextRef.current,
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

    // Image appears with scale effect
    gsap.fromTo(
      imageContainerRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.4,
      }
    );
  }, { scope: mainRef });

  return (
    <section
      ref={mainRef}
      id="team"
      className="relative w-full bg-background overflow-hidden py-4"
    >
      {/* Title: "GODS Team" */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <span
          ref={godsTextRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight opacity-0"
        >
          GODS
        </span>
        <span
          ref={teamTextRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight opacity-0"
        >
          Team
        </span>
      </div>

      {/* Team Image */}
      <div
        ref={imageContainerRef}
        className="flex flex-col items-center justify-center px-4 opacity-0"
      >
        <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl border-4 border-primary/20 hover:border-primary/50 transition-all duration-500 group">
          <img
            src="/src/assets/Team.jpg"
            alt="GODS Team"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Team name/caption */}
        <p className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-primary italic tracking-wide">
          The Dream Team
        </p>
        <p className="mt-1 text-muted-foreground text-base">
          Building the future of Data Science together
        </p>
      </div>
    </section>
  );
}

export default Team;

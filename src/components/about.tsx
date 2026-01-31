import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import {
  Brain,
  Trophy,
  GraduationCap,
  Gift,
  Users,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Card data
interface CardInfo {
  title: string;
  description: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  gradient: string;
  iconBg: string;
}

const godsCards: CardInfo[] = [
  {
    title: "What is GODS?",
    description: "Algeria's premier 24-hour data science hackathon where participants solve real-world challenges using AI and ML.",
    icon: Brain,
    stat: "5.0",
    statLabel: "Fifth Edition",
    gradient: "from-blue-500/20 via-transparent to-purple-500/10",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    title: "Competition",
    description: "Teams compete to build the best data-driven solutions. Showcase your skills and creativity.",
    icon: Trophy,
    stat: "24h",
    statLabel: "Non-stop",
    gradient: "from-yellow-500/20 via-transparent to-orange-500/10",
    iconBg: "bg-gradient-to-br from-yellow-500 to-amber-600",
  },
  {
    title: "Knowledge",
    description: "Learn from industry experts through workshops and mentorship sessions.",
    icon: GraduationCap,
    stat: "10+",
    statLabel: "Mentors",
    gradient: "from-green-500/20 via-transparent to-emerald-500/10",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  {
    title: "Prizes",
    description: "Amazing prizes await! Cash rewards, tech gadgets, and internship opportunities.",
    icon: Gift,
    stat: "500K+",
    statLabel: "DZD",
    gradient: "from-pink-500/20 via-transparent to-rose-500/10",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    title: "Networking",
    description: "Connect with fellow data enthusiasts and industry professionals.",
    icon: Users,
    stat: "200+",
    statLabel: "Participants",
    gradient: "from-cyan-500/20 via-transparent to-blue-500/10",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
  },
  {
    title: "Location",
    description: "Premier venue with all amenities. Food, drinks, and workspaces provided.",
    icon: MapPin,
    stat: "Feb 15-16",
    statLabel: "2026",
    gradient: "from-purple-500/20 via-transparent to-indigo-500/10",
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
  },
];

function About() {
  const mainRef = useRef<HTMLDivElement>(null);
  const godsTextRef = useRef<HTMLSpanElement>(null);
  const aboutTextRef = useRef<HTMLSpanElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Auto-rotating infinite carousel - starts automatically after 1 second delay
  useEffect(() => {
    if (!galleryWrapperRef.current || !galleryContainerRef.current) return;

    const wrapper = galleryWrapperRef.current;
    const container = galleryContainerRef.current;
    const cards = wrapper.querySelectorAll(".circular-card");
    if (cards.length === 0) return;

    const cardWidth = 300;
    const gap = 40;
    const totalWidth = cards.length * (cardWidth + gap);
    let position = 0;

    const updatePositions = () => {
      const containerWidth = container.clientWidth;
      const centerX = containerWidth / 2;

      cards.forEach((card, i) => {
        const cardElement = card as HTMLElement;

        // Calculate position with wrapping for infinite loop
        let cardX = i * (cardWidth + gap) - position;

        // Wrap around for infinite effect
        while (cardX < -cardWidth - gap) cardX += totalWidth;
        while (cardX > totalWidth) cardX -= totalWidth;

        const cardCenterX = cardX + cardWidth / 2;
        const distanceFromCenter = cardCenterX - centerX;
        const maxDistance = containerWidth * 0.5;
        const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));

        // Circular curve effect - like circular-gallery-2
        const curve = Math.cos(normalizedDistance * Math.PI * 0.5);
        const rotateY = normalizedDistance * 45;
        const translateZ = curve * 200 - 100;
        const scale = 0.7 + curve * 0.3;
        const opacity = 0.3 + curve * 0.7;

        gsap.set(cardElement, {
          x: cardX,
          rotateY: rotateY,
          z: translateZ,
          scale: scale,
          opacity: opacity,
        });
      });
    };

    const animate = () => {
      position += 0.6; // Auto-scroll speed
      if (position >= totalWidth) position = 0;
      updatePositions();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial position
    updatePositions();

    // Start auto-animation immediately (gallery already has 1s delay from GSAP)
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Entrance animation when About section comes into view
  useGSAP(() => {
    // "About" text slides in from left
    gsap.fromTo(
      aboutTextRef.current,
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // GODS text appears with scale and glow effect
    gsap.fromTo(
      godsTextRef.current,
      {
        x: 50,
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.15,
      }
    );

    // Gallery container fades in with a slight rise
    gsap.fromTo(
      galleryContainerRef.current,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        delay: 0.3,
      }
    );
  }, { scope: mainRef });

  return (
    <section
      ref={mainRef}
      id="about"
      className="relative w-full bg-background overflow-hidden py-8 sm:py-12 lg:py-16"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      {/* Title Section - "About GODS" with better spacing */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-2 mb-12 sm:mb-16 lg:mb-20 px-4">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span
            ref={aboutTextRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight opacity-0"
          >
            About
          </span>
          <span
            ref={godsTextRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary tracking-tight opacity-0"
          >
            GODS
          </span>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md opacity-70">
          Algeria's biggest data science event
        </p>
      </div>

      {/* Circular Card Gallery - auto-rotating infinite */}
      <div
        ref={galleryContainerRef}
        className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] overflow-hidden opacity-0"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={galleryWrapperRef}
          className="absolute inset-0 flex items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {godsCards.map((card, index) => (
            <div
              key={index}
              className={`circular-card absolute top-1/2 -translate-y-1/2 w-[280px] sm:w-[300px] lg:w-[320px] h-[360px] sm:h-[380px] lg:h-[400px] rounded-2xl cursor-pointer group`}
              style={{
                transformStyle: "preserve-3d",
                left: 0,
              }}
            >
              {/* Card background with glassmorphism */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 group-hover:shadow-primary/20 group-hover:border-primary/30`}>
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
              </div>
              
              {/* Card content */}
              <div className="relative z-10 h-full flex flex-col p-5 sm:p-6">
                {/* Icon with gradient background */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${card.iconBg} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed flex-1">
                  {card.description}
                </p>
                
                {/* Stats section */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                        {card.stat}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                        {card.statLabel}
                      </p>
                    </div>
                    {/* Decorative element */}
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
      
      {/* Scroll indicator */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <span className="hidden sm:inline">Auto-scrolling</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

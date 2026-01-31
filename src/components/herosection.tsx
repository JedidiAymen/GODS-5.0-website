import ShiftingCountdown from "./ui/countdown-timer";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import {
  Brain,
  Database,
  LineChart,
  Network,
  Cpu,
  Binary,
  BarChart3,
  Sigma,
  Braces,
  GitBranch,
  Layers,
  Sparkles,
  Zap,
  Star,
  Code,
  Hash,
  Terminal,
  Activity,
  TrendingUp,
  PieChart,
  type LucideIcon,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

// Icon configuration for the explosion effect - more icons for bigger burst
const explosionIcons: { Icon: LucideIcon; color: "blue" | "yellow" }[] = [
  // First wave
  { Icon: Brain, color: "yellow" },
  { Icon: Database, color: "blue" },
  { Icon: LineChart, color: "yellow" },
  { Icon: Network, color: "blue" },
  { Icon: Cpu, color: "yellow" },
  { Icon: Binary, color: "blue" },
  { Icon: BarChart3, color: "yellow" },
  { Icon: Sigma, color: "blue" },
  { Icon: Braces, color: "yellow" },
  { Icon: GitBranch, color: "blue" },
  { Icon: Layers, color: "yellow" },
  { Icon: Sparkles, color: "blue" },
  { Icon: Zap, color: "yellow" },
  { Icon: Star, color: "blue" },
  { Icon: Code, color: "yellow" },
  { Icon: Hash, color: "blue" },
  { Icon: Terminal, color: "yellow" },
  { Icon: Activity, color: "blue" },
  { Icon: TrendingUp, color: "yellow" },
  { Icon: PieChart, color: "blue" },
  // Second wave - more variety
  { Icon: Brain, color: "blue" },
  { Icon: Database, color: "yellow" },
  { Icon: Cpu, color: "blue" },
  { Icon: Network, color: "yellow" },
  { Icon: LineChart, color: "blue" },
  { Icon: Binary, color: "yellow" },
  { Icon: Sigma, color: "yellow" },
  { Icon: Braces, color: "blue" },
  { Icon: Sparkles, color: "yellow" },
  { Icon: Star, color: "yellow" },
  { Icon: Zap, color: "blue" },
  { Icon: Code, color: "blue" },
  { Icon: Hash, color: "yellow" },
  { Icon: Terminal, color: "blue" },
  { Icon: Activity, color: "yellow" },
  { Icon: TrendingUp, color: "blue" },
  { Icon: PieChart, color: "yellow" },
  { Icon: GitBranch, color: "yellow" },
  { Icon: Layers, color: "blue" },
  { Icon: BarChart3, color: "blue" },
];

function HeroSection() {
  const mainRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const leftIconsRef = useRef<HTMLDivElement>(null);
  const rightIconsRef = useRef<HTMLDivElement>(null);
  const fadeContentRef = useRef<HTMLDivElement>(null);
  const floatingDecorRef = useRef<HTMLDivElement>(null);

  // Individual refs for G, O, D, S letters and 5.0
  const letterGRef = useRef<HTMLSpanElement>(null);
  const letterORef = useRef<HTMLSpanElement>(null);
  const letterDRef = useRef<HTMLSpanElement>(null);
  const letterSRef = useRef<HTMLSpanElement>(null);
  const version50Ref = useRef<HTMLSpanElement>(null);
  
  // Refs for ATA and CIENCE
  const ataRef = useRef<HTMLSpanElement>(null);
  const cienceRef = useRef<HTMLSpanElement>(null);
  const heroDateRef = useRef<HTMLParagraphElement>(null);
  
  // Ref for icon explosion container
  const iconExplosionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Split text for intro animations
    const paraSplit = new SplitText(".hero-para", { type: "chars, words" });

    // ========== INTRO ANIMATION (on load) ==========
    const introTl = gsap.timeline();

    // Animate G, O, D, S letters and 5.0 first
    introTl.from([letterGRef.current, letterORef.current, letterDRef.current, letterSRef.current, version50Ref.current], {
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.1,
    });

    // Animate ATA and CIENCE
    introTl.from(
      [ataRef.current, cienceRef.current],
      {
        yPercent: 100,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
      },
      "-=0.5"
    );

    // Animate date
    introTl.from(
      heroDateRef.current,
      {
        yPercent: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.3"
    );

    introTl.from(
      paraSplit.chars,
      {
        opacity: 0,
        yPercent: 100,
        duration: 0.5,
        ease: "expo.out",
        stagger: 0.015,
      },
      "-=0.3"
    );

    if (countdownRef.current) {
      introTl.from(
        countdownRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      );
    }

    // ========== SCROLL ANIMATION ==========
    // Only enable complex scroll animation on larger screens
    const isLargeScreen = window.innerWidth >= 1024;
    
    // Skip scroll animation on mobile
    if (!isLargeScreen) return;

    // Set initial states for all elements that will animate
    // This ensures GSAP knows what to return to when scrolling back
    if (leftIconsRef.current) {
      gsap.set(leftIconsRef.current.children, { x: 0, opacity: 1, rotation: 0 });
    }
    if (rightIconsRef.current) {
      gsap.set(rightIconsRef.current.children, { x: 0, opacity: 1, rotation: 0 });
    }
    if (fadeContentRef.current) {
      gsap.set(fadeContentRef.current, { opacity: 1, scale: 1, filter: "blur(0px)" });
    }
    gsap.set([ataRef.current, cienceRef.current, heroDateRef.current], { 
      opacity: 1, 
      filter: "blur(0px)" 
    });
    gsap.set([letterGRef.current, letterORef.current, letterDRef.current, letterSRef.current, version50Ref.current], {
      x: 0,
      y: 0,
      scale: 1,
      textShadow: "none",
    });
    // Icon explosion starts hidden
    if (iconExplosionRef.current) {
      const icons = iconExplosionRef.current.children;
      gsap.set(icons, {
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
      });
    }
    // Floating decorations start visible
    if (floatingDecorRef.current) {
      gsap.set(floatingDecorRef.current.children, {
        opacity: 1,
        scale: 1,
      });
    }

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "+=40%",
        scrub: 0.3,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1: Icons fly out (0 - 0.2)
    if (leftIconsRef.current && rightIconsRef.current) {
      scrollTl.to(
        leftIconsRef.current.children,
        {
          x: -400,
          opacity: 0,
          rotation: -30,
          stagger: 0.02,
          duration: 0.2,
          ease: "power3.in",
        },
        0
      );

      scrollTl.to(
        rightIconsRef.current.children,
        {
          x: 400,
          opacity: 0,
          rotation: 30,
          stagger: 0.02,
          duration: 0.2,
          ease: "power3.in",
        },
        0
      );
    }

    // Phase 2: Fade out right side content (0.1 - 0.3)
    scrollTl.to(
      fadeContentRef.current,
      {
        opacity: 0,
        scale: 0.9,
        filter: "blur(15px)",
        duration: 0.2,
        ease: "power2.in",
      },
      0.1
    );

    // Fade out ATA, CIENCE, and date
    scrollTl.to(
      [ataRef.current, cienceRef.current, heroDateRef.current],
      {
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.25,
        ease: "power2.in",
      },
      0.1
    );

    // Phase 3: G, O, D, S, 5.0 move to center and form "GODS 5.0" on a single line
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const isSmallScreen = viewportWidth < 1024; // lg breakpoint

    // Get letter dimensions
    const gW = letterGRef.current!.offsetWidth;
    const oW = letterORef.current!.offsetWidth;
    const dW = letterDRef.current!.offsetWidth;
    const sW = letterSRef.current!.offsetWidth;
    const vW = version50Ref.current!.offsetWidth;

    // Layout: G O D S [space] 5.0 - centered on screen
    // Adjust spacing based on screen size
    const spaceGap = isSmallScreen ? 8 : (viewportWidth < 1280 ? 12 : 20);
    const totalWidth = gW + oW + dW + sW + spaceGap + vW;

    // Subtle yellow glow effect for assembled text (reduced intensity)
    const yellowGlow = "0 0 10px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 191, 36, 0.4)";

    // Calculate positions relative to each letter's starting position
    // We need to move each letter to form "GODS 5.0" in the center of the viewport
    const letterRefs = [
      { ref: letterGRef, offsetInWord: 0 },
      { ref: letterORef, offsetInWord: gW },
      { ref: letterDRef, offsetInWord: gW + oW },
      { ref: letterSRef, offsetInWord: gW + oW + dW },
      { ref: version50Ref, offsetInWord: gW + oW + dW + sW + spaceGap },
    ];

    // Animation for all screen sizes - using fixed positioning approach
    letterRefs.forEach(({ ref, offsetInWord }, index) => {
      const el = ref.current!;
      const rect = el.getBoundingClientRect();
      const elWidth = rect.width;
      
      // Target position: center of viewport
      // The word should be centered, so start position is (viewportWidth - totalWidth) / 2
      const wordStartX = (viewportWidth - totalWidth) / 2;
      const targetX = wordStartX + offsetInWord + elWidth / 2;
      const targetY = viewportHeight / 2 + 20; // Slightly below center
      
      // Current position (center of element)
      const currentX = rect.left + elWidth / 2;
      const currentY = rect.top + rect.height / 2;
      
      // Movement needed
      const moveX = targetX - currentX;
      const moveY = targetY - currentY;
      
      // Scale based on screen size
      const targetScale = isSmallScreen ? 1.05 : 1.15;
      const finalScale = isSmallScreen ? 1 : 1.05;
      
      scrollTl.to(
        el,
        {
          x: moveX,
          y: moveY,
          scale: targetScale,
          textShadow: yellowGlow,
          duration: 0.4,
          ease: "back.out(1.4)",
        },
        0.3 + index * 0.02
      );
      
      // Scale back down for "pop" effect
      scrollTl.to(
        el,
        {
          scale: finalScale,
          duration: 0.15,
          ease: "power2.out",
        },
        0.5 + index * 0.02
      );
    });

    // Fade out floating decorations with the content
    if (floatingDecorRef.current) {
      scrollTl.to(
        floatingDecorRef.current.children,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.in",
        },
        0.1
      );
    }

    // Icon explosion - icons appear in a ring around GODS 5.0 (donut pattern - avoiding center)
    if (iconExplosionRef.current) {
      const icons = iconExplosionRef.current.children;
      
      // Icons appear in a ring/donut pattern around GODS 5.0
      Array.from(icons).forEach((icon, i) => {
        const numIcons = icons.length;
        // Spread icons in a circle/oval around center
        const angle = (i / numIcons) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
        
        // Distance from center - minimum distance ensures they don't touch GODS 5.0
        // Inner radius keeps icons away from text, outer radius keeps them visible
        const minDistance = isSmallScreen ? 120 : 180; // Inner radius - clear zone for text
        const maxDistance = isSmallScreen ? 200 : 320; // Outer radius
        const distance = minDistance + Math.random() * (maxDistance - minDistance);
        
        // Position relative to center - wider horizontally to fit around text
        const horizontalStretch = isSmallScreen ? 1.2 : 1.4;
        const finalX = Math.cos(angle) * distance * horizontalStretch;
        const finalY_icon = Math.sin(angle) * distance * 0.7;
        
        const rotation = Math.random() * 40 - 20;
        const iconScale = isSmallScreen ? (0.4 + Math.random() * 0.3) : (0.6 + Math.random() * 0.5);
        
        scrollTl.to(
          icon,
          {
            opacity: 0.7 + Math.random() * 0.3,
            scale: iconScale,
            x: finalX,
            y: finalY_icon,
            rotation: rotation,
            duration: 0.4,
            ease: "back.out(1.2)",
          },
          0.35 + (i * 0.01)
        );
      });
    }

  }, { scope: mainRef, dependencies: [] });
  
  // Handle resize to refresh ScrollTrigger
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={mainRef} className="relative h-dvh w-full overflow-x-hidden overflow-y-hidden" id="hero">
      {/* Hero Section - Full viewport using viewport-relative units */}
      <section className="relative h-dvh w-full flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-16 px-4 sm:px-6 pb-8 overflow-hidden bg-background lg:flex-row">
        
        {/* Icon explosion container - icons burst out when GODS 5.0 assembles */}
        <div className="absolute inset-0 z-40 pointer-events-none">
          {/* Centering wrapper: absolute-center so explosion is positioned relative to center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" ref={iconExplosionRef}>
            {explosionIcons.map(({ Icon, color }, index) => (
              <div
                key={index}
                className={`${
                  color === "yellow" 
                    ? "text-yellow-400" 
                    : "text-primary"
                } absolute`}
                style={{ 
                  opacity: 0,
                  filter: color === "yellow" 
                    ? "drop-shadow(0 0 8px #fbbf24) drop-shadow(0 0 16px #f59e0b)"
                    : "drop-shadow(0 0 8px #38bdf8) drop-shadow(0 0 16px #0ea5e9)",
                }}
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12" />
              </div>
            ))}
          </div>
        </div>

        {/* Decorative floating elements - ambient particles before assembly */}
        <div
          ref={floatingDecorRef}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {/* Floating circles */}
          <div className="absolute top-[10%] left-[8%] w-3 h-3 rounded-full bg-primary/20 animate-pulse" />
          <div className="absolute top-[15%] right-[12%] w-2 h-2 rounded-full bg-yellow-400/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-[25%] left-[15%] w-4 h-4 rounded-full bg-primary/15 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[20%] right-[20%] w-2.5 h-2.5 rounded-full bg-yellow-400/25 animate-pulse" style={{ animationDelay: '0.3s' }} />
          
          {/* Floating squares/diamonds */}
          <div className="absolute top-[35%] left-[5%] w-3 h-3 bg-primary/15 rotate-45 animate-pulse" style={{ animationDelay: '0.7s' }} />
          <div className="absolute top-[40%] right-[8%] w-2.5 h-2.5 bg-yellow-400/20 rotate-45 animate-pulse" style={{ animationDelay: '1.2s' }} />
          
          {/* Bottom area decorations */}
          <div className="absolute bottom-[20%] left-[10%] w-2 h-2 rounded-full bg-primary/25 animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute bottom-[15%] right-[15%] w-3 h-3 rounded-full bg-yellow-400/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
          <div className="absolute bottom-[25%] left-[20%] w-2.5 h-2.5 bg-primary/20 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-[30%] right-[10%] w-2 h-2 rounded-full bg-yellow-400/25 animate-pulse" style={{ animationDelay: '0.9s' }} />
          
          {/* Middle area accents */}
          <div className="absolute top-[50%] left-[3%] w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="absolute top-[55%] right-[5%] w-2 h-2 rounded-full bg-yellow-400/25 animate-pulse" style={{ animationDelay: '1.1s' }} />
          
          {/* Connecting lines (subtle) */}
          <div className="absolute top-[18%] left-[12%] w-16 h-px bg-gradient-to-r from-primary/20 to-transparent rotate-[30deg]" />
          <div className="absolute top-[22%] right-[18%] w-12 h-px bg-gradient-to-l from-yellow-400/20 to-transparent -rotate-[20deg]" />
          <div className="absolute bottom-[22%] left-[8%] w-14 h-px bg-gradient-to-r from-primary/15 to-transparent rotate-[-25deg]" />
          <div className="absolute bottom-[18%] right-[12%] w-10 h-px bg-gradient-to-l from-yellow-400/15 to-transparent rotate-[15deg]" />
          
          {/* Subtle rings */}
          <div className="absolute top-[12%] left-[25%] w-8 h-8 rounded-full border border-primary/10 animate-pulse" style={{ animationDelay: '1.3s' }} />
          <div className="absolute bottom-[28%] right-[25%] w-6 h-6 rounded-full border border-yellow-400/15 animate-pulse" style={{ animationDelay: '0.2s' }} />
          
          {/* Glowing dots */}
          <div className="absolute top-[8%] left-[50%] w-1 h-1 rounded-full bg-primary shadow-[0_0_6px_2px_rgba(59,130,246,0.4)]" />
          <div className="absolute bottom-[10%] left-[40%] w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_6px_2px_rgba(251,191,36,0.4)]" />
          <div className="absolute top-[45%] left-[2%] w-1 h-1 rounded-full bg-primary shadow-[0_0_4px_1px_rgba(59,130,246,0.3)]" />
          <div className="absolute top-[60%] right-[3%] w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_4px_1px_rgba(251,191,36,0.3)]" />
        </div>
        
        {/* Floating icons - Left side - hidden on small screens */}
        <div
          ref={leftIconsRef}
          className="absolute left-4 sm:left-8 lg:left-12 top-0 bottom-0 pointer-events-none hidden lg:flex flex-col justify-around py-8"
        >
          <Brain className="w-8 h-8 lg:w-10 lg:h-10 text-primary/30 -rotate-12" />
          <Database className="w-6 h-6 lg:w-8 lg:h-8 text-primary/25 rotate-6 ml-4" />
          <LineChart className="w-7 h-7 lg:w-9 lg:h-9 text-primary/35 -rotate-6" />
          <Network className="w-8 h-8 lg:w-10 lg:h-10 text-primary/20 rotate-12 ml-2" />
          <Cpu className="w-6 h-6 lg:w-8 lg:h-8 text-primary/30 -rotate-3" />
          <Binary className="w-7 h-7 lg:w-9 lg:h-9 text-primary/25 rotate-9 ml-6" />
        </div>

        {/* Floating icons - Right side - hidden on small screens */}
        <div
          ref={rightIconsRef}
          className="absolute right-4 sm:right-8 lg:right-12 top-0 bottom-0 pointer-events-none hidden lg:flex flex-col justify-around py-8"
        >
          <BarChart3 className="w-7 h-7 lg:w-9 lg:h-9 text-primary/25 rotate-6" />
          <Sigma className="w-8 h-8 lg:w-10 lg:h-10 text-primary/30 -rotate-12 mr-4" />
          <Braces className="w-6 h-6 lg:w-8 lg:h-8 text-primary/35 rotate-3" />
          <GitBranch className="w-7 h-7 lg:w-9 lg:h-9 text-primary/20 -rotate-6 mr-2" />
          <Layers className="w-8 h-8 lg:w-10 lg:h-10 text-primary/30 rotate-12" />
          <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-primary/25 -rotate-9 mr-6" />
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-16 w-full z-10">
          {/* Left: Title with GODS spelled vertically - G, O, D, S stay visible */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-col leading-none">
              {/* GO line */}
              <p className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none">
                <span ref={letterGRef} className="text-primary inline-block">G</span>
                <span ref={letterORef} className="text-primary inline-block">O</span>
              </p>
              {/* DATA line - D stays, ATA fades */}
              <p className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none">
                <span ref={letterDRef} className="text-primary inline-block">D</span>
                <span ref={ataRef} className="inline-block">ATA</span>
              </p>
              {/* SCIENCE line - S stays, CIENCE fades */}
              <p className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none">
                <span ref={letterSRef} className="text-primary inline-block">S</span>
                <span ref={cienceRef} className="inline-block">CIENCE</span>
              </p>
              {/* 5.0 - stays and moves with GODS */}
              <p className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none mt-1">
                <span ref={version50Ref} className="text-primary inline-block">5.0</span>
              </p>
            </div>

            <p ref={heroDateRef} className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground">
              <span className="text-primary">15</span>-
              <span className="text-primary">16</span> February
            </p>
          </div>

          {/* Right: Event Info & Countdown - this fades out */}
          <div ref={fadeContentRef} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 sm:gap-4 w-full max-w-xl">
            <div className="hero-para flex flex-col items-center lg:items-start gap-0.5 sm:gap-1">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-foreground">
                24 HOUR EVENT
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="text-accent">Competition</span>,
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="text-accent">Knowledge</span> and{" "}
                <span className="text-accent">Prizes</span>
              </p>
            </div>

            <div ref={countdownRef} className="w-full">
              <ShiftingCountdown />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;

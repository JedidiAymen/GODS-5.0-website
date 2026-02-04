import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import {
  Clock,
  Coffee,
  Code,
  Presentation,
  Trophy,
  PartyPopper,
  Sunrise,
  Moon,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
  day: 1 | 2;
}

const timelineEvents: TimelineEvent[] = [
  // Day 1 - February 14
  {
    time: "08:00",
    title: "Registration",
    description: "Check-in & welcome kit",
    icon: Sunrise,
    day: 1,
  },
  {
    time: "09:00",
    title: "Opening Ceremony",
    description: "Keynote & challenge reveal",
    icon: Presentation,
    day: 1,
  },
  {
    time: "10:00",
    title: "Workshops Begin",
    description: "Start Learning!",
    icon: Code,
    day: 1,
  },
  {
    time: "12:00",
    title: "Coffee Break",
    description: "Fuel up for the journey",
    icon: Coffee,
    day: 1,
  },
  {
    time: "13:00",
    title: "More Workshops",
    description: "ML And AI Sessions",
    icon: Zap,
    day: 1,
  },
  {
    time: "19:00",
    title: "Coffee & Networking",
    description: "Networking & food",
    icon: Coffee,
    day: 1,
  },
  {
    time: "00:00",
    title: "Midnight Check-in",
    description: "Progress review",
    icon: Moon,
    day: 1,
  },
  // Day 2 - February 15
  {
    time: "02:00",
    title: "Late Night Snacks",
    description: "Energy boost",
    icon: Coffee,
    day: 2,
  },
  {
    time: "07:00",
    title: "Breakfast",
    description: "Morning fuel",
    icon: Sunrise,
    day: 2,
  },
  {
    time: "09:00",
    title: "Final Sprint",
    description: "Last push!",
    icon: Zap,
    day: 2,
  },
  {
    time: "10:00",
    title: "Submissions Close",
    description: "Code freeze",
    icon: Clock,
    day: 2,
  },
  {
    time: "11:00",
    title: "Presentations",
    description: "Demo your project",
    icon: Presentation,
    day: 2,
  },
  {
    time: "14:00",
    title: "Awards Ceremony",
    description: "Winners announced!",
    icon: Trophy,
    day: 2,
  },
  {
    time: "15:00",
    title: "Closing Party",
    description: "Celebrate together",
    icon: PartyPopper,
    day: 2,
  },
];

function Timeline() {
  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const day1Ref = useRef<HTMLDivElement>(null);
  const day2Ref = useRef<HTMLDivElement>(null);

  const day1Events = timelineEvents.filter((e) => e.day === 1);
  const day2Events = timelineEvents.filter((e) => e.day === 2);

  useGSAP(() => {
    // Title animation
    gsap.from(titleRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Day labels
    gsap.from(day1Ref.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay: 0.1,
    });

    gsap.from(day2Ref.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay: 0.2,
    });

    // Timeline events - appear one by one with staggered animation
    const events = gsap.utils.toArray(".timeline-event");
    events.forEach((event, index) => {
      gsap.from(event as Element, {
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.3 + index * 0.1, // Each event appears 0.1s after the previous
      });
    });

    // Dots appear with the events
    const dots = gsap.utils.toArray(".timeline-dot");
    dots.forEach((dot, index) => {
      gsap.from(dot as Element, {
        scale: 0,
        duration: 0.3,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: 0.5 + index * 0.1,
      });
    });

  }, { scope: mainRef });
  
  // Refresh ScrollTrigger when component mounts and on resize
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={mainRef}
      id="timeline"
      className="relative w-full bg-background overflow-hidden py-8 sm:py-12 lg:py-16"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Title */}
      <div ref={titleRef} className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="text-primary">GODS</span>{" "}
          <span className="text-foreground">Timeline</span>
        </h2>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-md mx-auto">
          48 Hours of Innovation • February 14-15, 2026
        </p>
      </div>

      {/* Timeline Track Container */}
      <div ref={trackRef} className="relative px-4 sm:px-6 lg:px-8">
        {/* Day Labels */}
        <div className="flex justify-center gap-4 sm:gap-8 lg:gap-16 mb-6 sm:mb-8">
          <div ref={day1Ref} className="text-center">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 rounded-full border border-primary/30">
              <span className="text-sm sm:text-base lg:text-lg font-bold text-primary">Day 1</span>
              <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Feb 14</span>
            </span>
          </div>
          <div ref={day2Ref} className="text-center">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 rounded-full border border-white/30">
              <span className="text-sm sm:text-base lg:text-lg font-bold text-white">Day 2</span>
              <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Feb 15</span>
            </span>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Timeline */}
        <div className="block lg:hidden">
          <div className="relative max-w-md mx-auto">
            {/* Vertical Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted">
              <div
                className="w-full h-full bg-gradient-to-b from-primary via-primary to-white/70"
              />
            </div>

            {/* Day 1 Events */}
            <div className="mb-6">
              <div className="pl-14 pb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Day 1 - Feb 14</span>
              </div>
              {day1Events.map((event, index) => (
                <div
                  key={`day1-mobile-${index}`}
                  className="timeline-event relative flex items-start mb-4"
                >
                  {/* Dot on timeline */}
                  <div className="timeline-dot absolute left-4 w-5 h-5 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30 z-10" />
                  
                  {/* Card */}
                  <div className="ml-14 group relative bg-card border border-primary/20 rounded-xl p-3 sm:p-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex-1">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <event.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Time */}
                        <p className="text-xs font-mono text-primary font-bold">
                          {event.time}
                        </p>
                        {/* Title */}
                        <p className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                          {event.title}
                        </p>
                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Day Divider */}
            <div className="relative py-4">
              <div className="absolute left-4 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-white/70 border-2 border-background shadow-lg z-10" />
              <div className="ml-14 h-px bg-gradient-to-r from-border to-transparent" />
            </div>

            {/* Day 2 Events */}
            <div className="mt-6">
              <div className="pl-14 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Day 2 - Feb 15</span>
              </div>
              {day2Events.map((event, index) => (
                <div
                  key={`day2-mobile-${index}`}
                  className="timeline-event relative flex items-start mb-4"
                >
                  {/* Dot on timeline */}
                  <div className="timeline-dot absolute left-4 w-5 h-5 rounded-full bg-white border-2 border-background shadow-lg shadow-white/30 z-10" />
                  
                  {/* Card */}
                  <div className="ml-14 group relative bg-card border border-white/20 rounded-xl p-3 sm:p-4 hover:border-white/50 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 flex-1">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                        <event.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Time */}
                        <p className="text-xs font-mono text-white font-bold">
                          {event.time}
                        </p>
                        {/* Title */}
                        <p className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                          {event.title}
                        </p>
                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Main Progress Line */}
          <div className="absolute top-[60px] left-0 right-0 h-1 bg-muted rounded-full overflow-hidden">
            <div
              ref={progressLineRef}
              className="h-full w-full bg-gradient-to-r from-primary via-primary to-white/70"
            />
          </div>

          {/* Day Divider */}
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-0.5 h-10 bg-border" />

          {/* Events Row */}
          <div className="flex justify-center pb-6 pt-2 gap-2 flex-wrap">
            {/* Day 1 Events */}
            <div className="flex gap-2">
              {day1Events.map((event, index) => (
                <div
                  key={`day1-${index}`}
                  className="timeline-event flex flex-col items-center"
                  style={{ minWidth: "120px" }}
                >
                  {/* Card */}
                  <div className="group relative bg-card border border-primary/20 rounded-xl p-3 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer w-[120px]">
                    {/* Icon */}
                    <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                      <event.icon className="w-5 h-5 text-primary" />
                    </div>
                    {/* Time */}
                    <p className="text-xs font-mono text-primary text-center font-bold">
                      {event.time}
                    </p>
                    {/* Title */}
                    <p className="text-sm font-semibold text-foreground text-center mt-1 leading-tight">
                      {event.title}
                    </p>
                    {/* Description - shows on hover */}
                    <p className="text-[10px] text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {event.description}
                    </p>
                  </div>
                  {/* Connector Line */}
                  <div className="timeline-connector w-0.5 h-4 bg-primary/50" />
                  {/* Dot on timeline */}
                  <div className="timeline-dot w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/30" />
                </div>
              ))}
            </div>

            {/* Spacer for day divider */}
            <div className="w-6 flex-shrink-0" />

            {/* Day 2 Events */}
            <div className="flex gap-2">
              {day2Events.map((event, index) => (
                <div
                  key={`day2-${index}`}
                  className="timeline-event flex flex-col items-center"
                  style={{ minWidth: "120px" }}
                >
                  {/* Card */}
                  <div className="group relative bg-card border border-white/20 rounded-xl p-3 hover:border-white/50 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 cursor-pointer w-[120px]">
                    {/* Icon */}
                    <div className="w-10 h-10 mx-auto rounded-lg bg-white/10 flex items-center justify-center mb-2 group-hover:bg-white/20 transition-colors">
                      <event.icon className="w-5 h-5 text-white" />
                    </div>
                    {/* Time */}
                    <p className="text-xs font-mono text-white text-center font-bold">
                      {event.time}
                    </p>
                    {/* Title */}
                    <p className="text-sm font-semibold text-foreground text-center mt-1 leading-tight">
                      {event.title}
                    </p>
                    {/* Description - shows on hover */}
                    <p className="text-[10px] text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {event.description}
                    </p>
                  </div>
                  {/* Connector Line */}
                  <div className="timeline-connector w-0.5 h-4 bg-white/50" />
                  {/* Dot on timeline */}
                  <div className="timeline-dot w-4 h-4 rounded-full bg-white border-2 border-background shadow-lg shadow-white/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

export default Timeline;

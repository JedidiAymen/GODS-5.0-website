"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(Draggable);

export interface CardInfo {
  title: string;
  description: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
}

interface CardGalleryProps {
  cards: CardInfo[];
  className?: string;
}

export function CardGallery({ cards, className = "" }: CardGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const cardElements = wrapper.querySelectorAll(".gallery-card");
    
    if (cardElements.length === 0) return;

    const cardWidth = 320;
    const gap = 24;
    const totalWidth = cards.length * (cardWidth + gap);
    
    // Set wrapper width
    wrapper.style.width = `${totalWidth}px`;

    // Create draggable
    const draggable = Draggable.create(wrapper, {
      type: "x",
      bounds: {
        minX: -(totalWidth - container.clientWidth + 50),
        maxX: 50,
      },
      inertia: true,
      edgeResistance: 0.65,
      onDrag: function() {
        updateCards(this.x);
      },
      onThrowUpdate: function() {
        updateCards(this.x);
      },
    })[0];

    // Apply 3D curve effect based on position
    function updateCards(wrapperX: number) {
      cardElements.forEach((card, i) => {
        const cardElement = card as HTMLElement;
        const cardCenter = i * (cardWidth + gap) + cardWidth / 2 + wrapperX;
        const containerCenter = container.clientWidth / 2;
        const distance = cardCenter - containerCenter;
        const maxDistance = container.clientWidth;
        
        // Calculate rotation and scale based on distance from center
        const rotation = (distance / maxDistance) * 15; // Max 15 degrees
        const scale = 1 - Math.abs(distance / maxDistance) * 0.2; // Scale down to 0.8
        const opacity = 1 - Math.abs(distance / maxDistance) * 0.5;
        const zIndex = Math.round((1 - Math.abs(distance / maxDistance)) * 10);
        
        gsap.set(cardElement, {
          rotationY: rotation,
          scale: Math.max(scale, 0.8),
          opacity: Math.max(opacity, 0.5),
          zIndex: zIndex,
        });
      });
    }

    // Initial update
    updateCards(0);

    // Mouse wheel horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newX = Math.max(
        -(totalWidth - container.clientWidth + 50),
        Math.min(50, draggable.x - e.deltaY * 2)
      );
      gsap.to(wrapper, {
        x: newX,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => updateCards(gsap.getProperty(wrapper, "x") as number),
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      draggable.kill();
    };
  }, [cards]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[400px] overflow-hidden perspective-[1000px] ${className}`}
    >
      <div
        ref={wrapperRef}
        className="absolute top-0 left-0 h-full flex items-center gap-6 px-8 cursor-grab active:cursor-grabbing"
        style={{ transformStyle: "preserve-3d" }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            className="gallery-card w-[300px] h-[350px] flex-shrink-0 bg-card/95 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-colors duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-[calc(100%-120px)]">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
              <div className="pt-4 border-t border-border mt-auto">
                <p className="text-3xl font-bold text-primary">{card.stat}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {card.statLabel}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardGallery;

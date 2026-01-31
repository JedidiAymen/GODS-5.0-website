import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { CircularGallery } from "./ui/circular-gallery-2";

// Ambassador images
const ambassadorItems = [
  {
    image: "/src/assets/Ambassadors/Amine Essid.jpg",
    text: "Amine Essid",
  },
  {
    image: "/src/assets/Ambassadors/Amine Fathallah.jpg",
    text: "Amine Fathallah",
  },
  {
    image: "/src/assets/Ambassadors/Meriem Wesslati.jpg",
    text: "Meriem Wesslati",
  },
  {
    image: "/src/assets/Ambassadors/Montaha Matoussi.jpg",
    text: "Montaha Matoussi",
  },
  {
    image: "/src/assets/Ambassadors/Mourad Kreim.jpg",
    text: "Mourad Kreim",
  },
  {
    image: "/src/assets/Ambassadors/Nada.jpg",
    text: "Nada",
  },
  {
    image: "/src/assets/Ambassadors/Sarra Bahlous.jpg",
    text: "Sarra Bahlous",
  },
];

function Ambassadors() {
  const mainRef = useRef<HTMLDivElement>(null);
  const godsTextRef = useRef<HTMLSpanElement>(null);
  const ambassadorsTextRef = useRef<HTMLSpanElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

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

    // "Ambassadors" text appears
    gsap.fromTo(
      ambassadorsTextRef.current,
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

    // Gallery appears
    gsap.fromTo(
      galleryContainerRef.current,
      {
        y: 50,
        opacity: 0,
      },
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
  }, { scope: mainRef });

  return (
    <section
      ref={mainRef}
      id="ambassadors"
      className="relative w-full bg-background overflow-hidden py-4"
    >
      {/* Title: "GODS Ambassadors" */}
      <div className="sticky top-16 z-20 flex items-center justify-center gap-4 mb-4">
        <span
          ref={godsTextRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight opacity-0"
        >
          GODS
        </span>
        <span
          ref={ambassadorsTextRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight opacity-0"
        >
          Ambassadors
        </span>
      </div>

      {/* Circular Gallery with Ambassador Photos */}
      <div
        ref={galleryContainerRef}
        className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] opacity-0"
      >
        <CircularGallery
          items={ambassadorItems}
          bend={3}
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          autoScroll={true}
          autoScrollSpeed={0.07}
        />
      </div>
    </section>
  );
}

export default Ambassadors;

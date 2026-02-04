import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { CircularGallery } from "./ui/circular-gallery-2";
import ahmedAmineEssid from "@/assets/Team/Ahmed Amine Essid.jpg";
import amineFathallah from "@/assets/Team/Amine Fathallah.jpg";
import assilBenKhdija from "@/assets/Team/Assil Ben Khdija.jpg";
import atefRegaya from "@/assets/Team/Atef Regaya.jpg";
import aymenJedidi from "@/assets/Team/Aymen Jedidi.jpg";
import azizaBellanes from "@/assets/Team/aziza_bellanes.jpg";
import chaimaJlassi from "@/assets/Team/Chaima Jlassi.jpg";
import chaymaBenAbdallah from "@/assets/Team/Chayma Ben Abdallah.jpg";
import mariemOuesleti from "@/assets/Team/Mariem Ouesleti.jpg";
import montahaMattoussi from "@/assets/Team/Montaha Mattoussi.jpg";
import mouradKraiem from "@/assets/Team/Mourad Kraiem.jpg";
import nadaBenAbdelhafidh from "@/assets/Team/Nada Ben Abdelhafidh.jpg";
import oussemaGhanmi from "@/assets/Team/Oussema Ghanmi.jpg";
import sarraBahlous from "@/assets/Team/Sarra Bahlous.jpg";
import yomnToumia from "@/assets/Team/Yomn Toumia.png";

const teamItems = [
  { image: ahmedAmineEssid, text: "Ahmed Amine Essid" },
  { image: amineFathallah, text: "Amine Fathallah" },
  { image: assilBenKhdija, text: "Assyl Ben Khdija" },
  { image: atefRegaya, text: "Atef Regaya" },
  { image: aymenJedidi, text: "Aymen Jedidi" },
  { image: azizaBellanes, text: "Aziza Bellanes" },
  { image: chaimaJlassi, text: "Chaima Jlassi" },
  { image: chaymaBenAbdallah, text: "Chayma Ben Abdallah" },
  { image: mariemOuesleti, text: "Mariem Ouesleti" },
  { image: montahaMattoussi, text: "Montaha Mattoussi" },
  { image: mouradKraiem, text: "Mourad Kraiem" },
  { image: nadaBenAbdelhafidh, text: "Nada Ben Abdelhafidh" },
  { image: oussemaGhanmi, text: "Oussema Ghanmi" },
  { image: sarraBahlous, text: "Sarra Bahlous" },
  { image: yomnToumia, text: "Yomn Toumia" },
];

function Team() {
  const mainRef = useRef<HTMLDivElement>(null);
  const godsTextRef = useRef<HTMLSpanElement>(null);
  const teamTextRef = useRef<HTMLSpanElement>(null);
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

    // Carousel appears with scale effect
    gsap.fromTo(
      galleryContainerRef.current,
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

      {/* Team Carousel */}
      <div
        ref={galleryContainerRef}
        className="relative w-full flex flex-col items-center justify-center px-4 opacity-0"
      >
        <div className="relative w-full max-w-5xl h-[420px] sm:h-[460px] lg:h-[520px] rounded-3xl border border-primary/30 bg-card/40 backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.15)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-white/5" />
          <div className="relative h-full">
            <CircularGallery
              items={teamItems}
              bend={4}
              borderRadius={0.08}
              scrollSpeed={2}
              scrollEase={0.06}
              autoScroll={true}
              autoScrollSpeed={0.08}
              className="text-white"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none ring-1 ring-primary/20 rounded-3xl" />
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

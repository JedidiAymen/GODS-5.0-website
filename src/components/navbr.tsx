import { Link } from "react-router";
import { MorphicNavbar } from "./morphicnavbar";
import Logo from "./ui/logo";
import { Button } from "@/components/ui/button";
import { UserPlus, Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useGSAP(() => {
    if (!navRef.current) return;

    // Set initial state - fully transparent
    gsap.set(navRef.current, {
      backgroundColor: "transparent",
      backdropFilter: "blur(0px)",
      borderColor: "transparent",
    });

    // Animate to solid on scroll
    gsap.to(navRef.current, {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(12px)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100px top",
        scrub: true,
      },
    });
  }, { scope: navRef });

  // Animate mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 z-50 flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 md:px-6 border-b transition-colors"
      >
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center">
          <MorphicNavbar />
        </div>

        {/* Register Button & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Register button - smaller on mobile */}
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="h-9 sm:h-11 rounded-lg sm:rounded-xl px-3 sm:px-6 text-sm sm:text-base font-semibold"
          >
            <Link to="/register" className="flex items-center gap-1 sm:gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Register</span>
            </Link>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-9 w-9 p-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 p-4 shadow-xl">
            <MorphicNavbar 
              isMobile={true} 
              onNavigate={() => setMobileMenuOpen(false)} 
            />
          </div>
        </div>
      )}
    </>
  );
}


import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = {
  "#hero": {
    name: "HOME",
  },
  "#about": {
    name: "ABOUT",
  },
  "#timeline": {
    name: "TIMELINE",
  },
  "#ambassadors": {
    name: "AMBASSADORS",
  },
  "#sponsors": {
    name: "SPONSORS",
  },
};

// Smooth scroll handler with offset for fixed navbar
const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    const navbarHeight = 64; // Height of the fixed navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

interface MorphicNavbarProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

export function MorphicNavbar({ isMobile = false, onNavigate }: MorphicNavbarProps) {
  const [activePath, setActivePath] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  // Store our scroll triggers so we only kill ours
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Reset active path when leaving homepage
  useEffect(() => {
    if (!isHomePage) {
      setActivePath(null);
    } else {
      // Set default to hero when on homepage
      setActivePath("#hero");
    }
  }, [isHomePage]);

  // Set up scroll triggers for each section (only on homepage)
  useEffect(() => {
    if (!isHomePage) return;

    const sections = Object.keys(navItems);
    
    sections.forEach((sectionId) => {
      const element = document.querySelector(sectionId);
      if (element) {
        const trigger = ScrollTrigger.create({
          trigger: element,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActivePath(sectionId),
          onEnterBack: () => setActivePath(sectionId),
        });
        triggersRef.current.push(trigger);
      }
    });

    return () => {
      // Only kill our own triggers, not all triggers
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, [isHomePage]);

  const isActiveLink = (path: string) => {
    return isHomePage && activePath === path;
  };

  const handleNavClick = (path: string) => {
    // Close mobile menu first if callback provided
    onNavigate?.();
    
    if (isHomePage) {
      // On homepage, just scroll to section
      setActivePath(path);
      // Small delay to let menu close first
      setTimeout(() => {
        scrollToSection(path);
        // Refresh ScrollTrigger after scrolling
        setTimeout(() => ScrollTrigger.refresh(), 500);
      }, 50);
    } else {
      // On other pages, navigate to homepage then scroll
      navigate("/");
      // Larger delay to allow navigation and DOM to settle
      setTimeout(() => {
        scrollToSection(path);
        setActivePath(path);
        // Refresh ScrollTrigger after navigation
        setTimeout(() => ScrollTrigger.refresh(), 500);
      }, 400);
    }
  };

  // Mobile layout - vertical stack
  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = isHomePage && isActiveLink(path);
          return (
            <Button
              key={path}
              variant={isActive ? "default" : "ghost"}
              onClick={() => handleNavClick(path)}
              className={clsx(
                "w-full justify-start text-left py-3 px-4 text-base",
                isActive && "font-semibold"
              )}
            >
              {name}
            </Button>
          );
        })}
      </div>
    );
  }

  // Desktop layout - horizontal
  return (
    <div className="mx-auto max-w-4xl px-2 lg:px-6 py-3">
      <div className="flex items-center justify-center">
        <div className="glass flex items-center justify-between overflow-hidden rounded-xl">
          {Object.entries(navItems).map(([path, { name }], index, array) => {
            const isActive = isHomePage && isActiveLink(path);
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevPath = index > 0 ? array[index - 1][0] : null;
            const nextPath =
              index < array.length - 1 ? array[index + 1][0] : null;

            return (
              <Button
                key={path}
                onClick={() => handleNavClick(path)}
                className={clsx(
                  "rounded-none flex items-center justify-center p-2 lg:p-2.5 px-3 lg:px-6 text-sm lg:text-base transition-all duration-300",
                  isActive
                    ? "mx-1 lg:mx-2 rounded-xl font-semibold"
                    : clsx(
                        (isActiveLink(prevPath || "") || isFirst) &&
                          "rounded-l-xl",
                        (isActiveLink(nextPath || "") || isLast) &&
                          "rounded-r-xl"
                      )
                )}
              >
                {name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MorphicNavbar;

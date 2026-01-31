import GODSLLOGO from "@/assets/logo GODS 5.0 white.png";

function Logo() {
  return (
    <img
      src={GODSLLOGO}
      alt="GODS Logo"
      className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
    />
  );
}

export default Logo;

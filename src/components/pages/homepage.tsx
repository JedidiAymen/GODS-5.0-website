import Herosection from "../herosection.tsx"
import About from "../about.tsx"
import Timeline from "../timeline.tsx"
import Ambassadors from "../ambassadors.tsx"
import Team from "../team.tsx"
import Sponsors from "../sponsors.tsx"

function Homepage() {
  return (
    <div className="homepage-container">
      <Herosection />
      <About />
      <Timeline />
      <Ambassadors />
      <Team />
      <Sponsors />
    </div>
  );
}

export default Homepage

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Trophy,
  GraduationCap,
  Gift,
  Users,
  MapPin,
} from "lucide-react";

export interface GodsInfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stat?: string;
  statLabel?: string;
}

export function GodsInfoCard({
  title,
  description,
  icon: Icon,
  stat,
  statLabel,
}: GodsInfoCardProps) {
  return (
    <Card className="w-[300px] h-[400px] bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 flex flex-col">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl font-bold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
        {stat && statLabel && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-3xl font-bold text-primary">{stat}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {statLabel}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Pre-defined GODS info data
export const godsInfoData: GodsInfoCardProps[] = [
  {
    title: "What is GODS?",
    description:
      "GO Data Science (GODS) is Algeria's premier data science hackathon. A 24-hour intensive event where participants solve real-world challenges using AI and machine learning.",
    icon: Brain,
    stat: "5.0",
    statLabel: "Fifth Edition",
  },
  {
    title: "Competition",
    description:
      "Teams compete to build the best data-driven solutions. From data preprocessing to model deployment, showcase your skills and creativity.",
    icon: Trophy,
    stat: "24h",
    statLabel: "Non-stop Coding",
  },
  {
    title: "Knowledge",
    description:
      "Learn from industry experts through workshops and mentorship sessions. Gain hands-on experience with cutting-edge tools and techniques.",
    icon: GraduationCap,
    stat: "10+",
    statLabel: "Expert Mentors",
  },
  {
    title: "Prizes",
    description:
      "Amazing prizes await the top performers. Cash rewards, tech gadgets, internship opportunities, and more for the winning teams.",
    icon: Gift,
    stat: "500K+",
    statLabel: "DZD in Prizes",
  },
  {
    title: "Networking",
    description:
      "Connect with fellow data enthusiasts, industry professionals, and potential employers. Build lasting relationships in the tech community.",
    icon: Users,
    stat: "200+",
    statLabel: "Participants",
  },
  {
    title: "Location",
    description:
      "Hosted at a premier venue with all amenities. Food, drinks, and comfortable workspaces provided throughout the event.",
    icon: MapPin,
    stat: "Feb 15-16",
    statLabel: "Save the Date",
  },
];

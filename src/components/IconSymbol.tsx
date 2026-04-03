import { Zap, Heart, Compass, Shield, Waves, Gem, Star, Anchor, Flame, FlaskConical, Sparkles } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

const iconMap: Record<string, LucideIcon> = {
  energy: Zap,
  heart: Heart,
  compass: Compass,
  shield: Shield,
  waves: Waves,
  gem: Gem,
  star: Star,
  anchor: Anchor,
  flame: Flame,
  flask: FlaskConical,
  sparkles: Sparkles,
};

interface IconSymbolProps {
  name: string;
  className?: string;
  size?: number;
}

const IconSymbol = ({ name, className = "", size = 24 }: IconSymbolProps) => {
  const Icon = iconMap[name] || Star;
  return <Icon className={className} size={size} />;
};

export default IconSymbol;

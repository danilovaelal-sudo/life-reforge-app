import { Zap, Heart, Compass, Shield, Waves, Gem, Star, Anchor, Flame, FlaskConical, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
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
  const Icon = iconMap[name];
  if (!Icon) return <Star className={className} size={size} />;
  return <Icon className={className} size={size} />;
};

export default IconSymbol;

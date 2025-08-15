import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-all duration-300 card-hover animate-slide-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-lg font-clash mb-3">{title}</h3>
      <p className="text-muted-foreground font-clash leading-relaxed">{description}</p>
    </div>
  );
};

export default BenefitCard;
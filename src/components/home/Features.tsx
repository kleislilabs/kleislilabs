import { Bot, Lightbulb, Target } from "lucide-react";
import { IconCard } from "@/components/ui/IconCard";

const featuresData = [
  {
    icon: Bot,
    title: "Custom AI Development",
    description: "Machine learning models, automation systems, and data analysis tools designed for your specific requirements.",
  },
  {
    icon: Lightbulb,
    title: "AI Strategy Consulting",
    description: "Strategic guidance on where and how to implement AI within your organization, including feasibility assessments.",
  },
  {
    icon: Target,
    title: "Integration & Support",
    description: "Seamless integration with existing systems and ongoing support to ensure your AI solutions continue delivering value.",
  },
];

export interface FeaturesProps {
  title?: string;
  description?: string;
  className?: string;
}

export function Features({
  title = "Our AI Solutions",
  description = "We specialize in building practical AI applications that integrate seamlessly with your existing business processes.",
  className,
}: FeaturesProps) {
  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {featuresData.map((feature, index) => (
          <IconCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

import { ServiceCard } from "./ServiceCard";
import { Rocket, FileCode2, Database, Wrench, FileText } from "lucide-react";

const services = [
  {
    title: "AI QuickStart",
    description: "Rapid prototyping (2-4 weeks) for MVPs using OSS models",
    icon: Rocket,
  },
  {
    title: "Prompt Foundry",
    description: "Design optimized prompt architectures + RAG systems",
    icon: FileCode2,
  },
  {
    title: "Data Engine",
    description: "Pipeline creation + synthetic data generation",
    icon: Database,
  },
  {
    title: "Model Clinic",
    description: "Fine-tuning & optimization (Llama, Mistral, etc.)",
    icon: Wrench,
  },
  {
    title: "Investor Pack",
    description: "Technical documentation for fundraising",
    icon: FileText,
  },
];

export function ServicesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          icon={service.icon}
        />
      ))}
    </div>
  );
}
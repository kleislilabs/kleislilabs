"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Target, TrendingUp, Users, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  const [hoveredBenefitIndex, setHoveredBenefitIndex] = useState<number | null>(null);
  
  const benefits = [
    {
      icon: Target,
      title: "Personalized Insights",
      description: "Get tailored recommendations based on your unique situation"
    },
    {
      icon: TrendingUp,
      title: "Benchmark Your Progress",
      description: "See how you compare to industry standards and best practices"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Receive a free consultation with our AI specialists"
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-8">
      <div className="text-center animate-in fade-in slide-in-from-bottom duration-500">
        <div className="flex justify-center mb-4">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Why Take This Assessment?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Understanding your AI readiness is the first step toward successful implementation
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Card 
            key={index} 
            className={cn(
              "text-center transition-all duration-300 cursor-pointer",
              "hover:shadow-xl hover:scale-105 hover:border-primary/50",
              "animate-in fade-in slide-in-from-bottom",
              hoveredBenefitIndex === index && "ring-2 ring-primary/20 ring-offset-2"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredBenefitIndex(index)}
            onMouseLeave={() => setHoveredBenefitIndex(null)}
          >
            <CardHeader className="pb-3">
              <div className={cn(
                "mx-auto mb-3 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                hoveredBenefitIndex === index 
                  ? "bg-primary/20 scale-110 rotate-3" 
                  : "bg-primary/10"
              )}>
                <benefit.icon className={cn(
                  "h-6 w-6 text-primary transition-transform",
                  hoveredBenefitIndex === index && "scale-110"
                )} />
              </div>
              <CardTitle className="text-lg">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {benefit.description}
              </CardDescription>
            </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Learn more about {benefit.title.toLowerCase()}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden animate-in fade-in slide-in-from-bottom duration-700">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-gradient" />
        </div>
        <CardContent className="pt-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/20 animate-pulse">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">Quick & Easy</p>
                <p className="text-sm text-muted-foreground">
                  Complete the assessment in just 3-5 minutes
                </p>
              </div>
            </div>
            <Button 
              onClick={onStart} 
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all hover:shadow-xl hover:scale-105"
            >
              <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              Get Started
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </TooltipProvider>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Database, Users, Cpu, Shield, Target, Sparkles, Timer, Home, ChevronRight } from "lucide-react";
import { AssessmentForm } from "@/components/ai-readiness/AssessmentForm";
import { AssessmentResults } from "@/components/ai-readiness/AssessmentResults";
import { AssessmentIntro } from "@/components/ai-readiness/AssessmentIntro";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AssessmentData {
  answers: Record<string, string | string[]>;
  email: string;
  completedAt: string;
  score: number;
}

export default function AIReadinessPage() {
  const [assessmentState, setAssessmentState] = useState<"intro" | "assessment" | "results">("intro");
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [isAnimatingTransition, setIsAnimatingTransition] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleStartAssessment = (category?: string) => {
    setIsAnimatingTransition(true);
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
    setTimeout(() => {
      setAssessmentState("assessment");
      setIsAnimatingTransition(false);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessmentData(data);
    setAssessmentState("results");
  };

  const handleRestartAssessment = () => {
    setAssessmentData(null);
    setAssessmentState("intro");
  };

  const assessmentCategories = [
    {
      icon: Target,
      title: "Business Strategy",
      description: "Evaluate your AI objectives and use cases",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Database,
      title: "Data Readiness",
      description: "Assess your data quality and infrastructure",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Users,
      title: "Organizational Culture",
      description: "Review team capabilities and leadership support",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Cpu,
      title: "Technology Infrastructure",
      description: "Check your technical foundation",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: Shield,
      title: "Governance & Risk",
      description: "Understand compliance and security needs",
      color: "text-red-600 dark:text-red-400"
    }
  ];

  return (
    <TooltipProvider>
      <Layout>
        {/* Breadcrumb Navigation */}
        <Section spacing="sm" container={false}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {assessmentState === "intro" ? (
                    <BreadcrumbPage>AI Readiness Assessment</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <button onClick={() => setAssessmentState("intro")}>
                        AI Readiness Assessment
                      </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {assessmentState !== "intro" && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {assessmentState === "assessment" ? "Assessment" : "Results"}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Section>

        {assessmentState === "intro" && (
        <>
          {/* Enhanced Hero Section with animations */}
          <Section spacing="lg" className="text-center relative overflow-hidden" container={false}>
            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto space-y-6">
                <Badge variant="outline" className="mb-4 animate-in fade-in slide-in-from-top duration-500">
                  <Brain className="w-3 h-3 mr-1 animate-pulse" />
                  AI Readiness Assessment
                </Badge>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom duration-700">
                  Discover Your Organization&apos;s{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                    AI Readiness
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000">
                  Take our comprehensive assessment to understand where you stand on your AI journey 
                  and get personalized recommendations for your next steps.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-in fade-in slide-in-from-bottom duration-1200">
                  <Button 
                    size="lg" 
                    className={cn(
                      "text-lg px-8 py-3 w-full sm:w-auto group transition-all hover:shadow-xl hover:scale-105",
                      "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    )}
                    onClick={() => handleStartAssessment()}
                    disabled={isAnimatingTransition}
                  >
                    <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Start Full Assessment
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4 text-primary animate-pulse" />
                    <span>Takes only 3-5 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Assessment Categories */}
          <Section spacing="lg" background="muted" container={false}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  What We&apos;ll Assess
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our assessment evaluates five key dimensions critical to successful AI implementation
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {assessmentCategories.map((category, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Card
                        role="button"
                        tabIndex={0}
                        onClick={() => handleStartAssessment(category.title)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleStartAssessment(category.title);
                          }
                        }} 
                    key={index} 
                    className={cn(
                      "border-2 transition-all duration-300 cursor-pointer",
                      "hover:shadow-xl hover:scale-105 hover:border-primary/50",
                      "animate-in fade-in slide-in-from-bottom",
                      hoveredCardIndex === index && "ring-2 ring-primary/20 ring-offset-2",
                      selectedCategory === category.title && "border-primary bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredCardIndex(index)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg transition-all duration-300",
                          hoveredCardIndex === index ? "bg-primary/20 scale-110" : "bg-primary/10"
                        )}>
                          <category.icon className={`h-5 w-5 ${category.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base font-semibold">
                            {category.title}
                          </CardTitle>
                          <CardDescription className="text-sm mt-1">
                            {category.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-medium">Start {category.title} Assessment</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click to begin with questions focused on {category.description.toLowerCase()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ChevronRight className="h-4 w-4" />
                    Click on any category above to start a focused assessment, or use the button above for a complete evaluation
                  </span>
                </p>
              </div>
            </div>
          </Section>

          {/* Benefits Section */}
          <Section spacing="lg" container={false}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <AssessmentIntro onStart={handleStartAssessment} />
            </div>
          </Section>
        </>
      )}

      {assessmentState === "assessment" && (
        <Section spacing="lg" container={false} className="animate-in fade-in duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            {selectedCategory && (
              <div className="mb-6 text-center">
                <Badge variant="outline" className="mb-2">
                  Focus Area
                </Badge>
                <h2 className="text-2xl font-semibold">
                  {selectedCategory} Assessment
                </h2>
                <p className="text-muted-foreground mt-2">
                  Starting with questions focused on {typeof selectedCategory === 'string' ? selectedCategory.toLowerCase() : selectedCategory}
                </p>
              </div>
            )}
            <AssessmentForm onComplete={handleAssessmentComplete} />
          </div>
        </Section>
      )}

      {assessmentState === "results" && (
        <Section spacing="lg" container={false} className="animate-in fade-in duration-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <AssessmentResults 
              data={assessmentData} 
              onRestart={handleRestartAssessment}
            />
          </div>
        </Section>
      )}
      </Layout>
    </TooltipProvider>
  );
}
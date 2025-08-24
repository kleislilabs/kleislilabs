"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  Download, 
  Calendar,
  Award,
  Target,
  Database,
  Users,
  Cpu,
  Shield,
  CheckCircle,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentData {
  answers: Record<string, string | string[]>;
  email: string;
  completedAt: string;
  score: number;
}

interface AssessmentResultsProps {
  data: AssessmentData | null;
  onRestart: () => void;
}

export function AssessmentResults({ data, onRestart }: AssessmentResultsProps) {
  const score = data?.score || 0;
  const [animatedScoreValue, setAnimatedScoreValue] = useState(0);
  const [hoveredRecommendationIndex, setHoveredRecommendationIndex] = useState<number | null>(null);
  const [isShowingConfetti, setIsShowingConfetti] = useState(false);

  // Animate score counting up
  useEffect(() => {
    setIsShowingConfetti(true);
    let current = 0;
    const increment = score / 20;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScoreValue(score);
        clearInterval(timer);
      } else {
        setAnimatedScoreValue(Math.floor(current));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [score]);
  
  const getScoreLevel = (score: number) => {
    if (score >= 8) return { level: "Advanced", color: "text-green-600", badge: "default" as const };
    if (score >= 6) return { level: "Intermediate", color: "text-blue-600", badge: "secondary" as const };
    if (score >= 4) return { level: "Developing", color: "text-yellow-600", badge: "outline" as const };
    return { level: "Beginning", color: "text-orange-600", badge: "outline" as const };
  };

  const scoreLevel = getScoreLevel(score);

  const categoryScores = {
    "Business Strategy": 7,
    "Data Readiness": 6,
    "Organizational Culture": 8,
    "Technology Infrastructure": 5,
    "Governance & Risk": 6
  };

  const recommendations = [
    {
      icon: Target,
      title: "Define Clear AI Objectives",
      description: "Work with stakeholders to establish specific, measurable AI goals aligned with business outcomes.",
      priority: "High"
    },
    {
      icon: Database,
      title: "Improve Data Infrastructure",
      description: "Invest in data quality, governance, and accessibility to build a strong foundation for AI.",
      priority: "High"
    },
    {
      icon: Users,
      title: "Build AI Capabilities",
      description: "Develop internal expertise through training or strategic hiring in data science and AI.",
      priority: "Medium"
    },
    {
      icon: Shield,
      title: "Establish AI Governance",
      description: "Create policies and procedures for ethical AI use, data privacy, and risk management.",
      priority: "Medium"
    }
  ];

  const nextSteps = [
    "Schedule a free consultation with our AI experts",
    "Download our AI Implementation Roadmap",
    "Join our AI Readiness Workshop",
    "Access our library of AI case studies"
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Score Summary Card with animations */}
      <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">
        {/* Confetti effect */}
        {isShowingConfetti && score >= 7 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "absolute w-4 h-4 text-yellow-500 animate-ping",
                  "opacity-0"
                )}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: "2s"
                }}
              />
            ))}
          </div>
        )}
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl sm:text-3xl animate-in slide-in-from-top duration-700">
            Your AI Readiness Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4 relative z-10">
          <div className="relative inline-flex items-center justify-center">
            {/* Score background circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse" />
            </div>
            <div className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 relative animate-in zoom-in duration-1000">
              {animatedScoreValue}/10
            </div>
          </div>
          <Badge 
            variant={scoreLevel.badge} 
            className="text-lg px-4 py-1 animate-in zoom-in duration-1200"
          >
            <Award className="w-4 h-4 mr-2 animate-bounce" />
            {scoreLevel.level} Level
          </Badge>
          <p className="text-muted-foreground max-w-md mx-auto animate-in fade-in duration-1500">
            Your organization shows {scoreLevel.level.toLowerCase()} readiness for AI implementation. 
            See below for detailed insights and recommendations.
          </p>
        </CardContent>
      </Card>

      {/* Enhanced Category Breakdown with animated progress */}
      <Card className="animate-in fade-in slide-in-from-left duration-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle>Category Breakdown</CardTitle>
          </div>
          <CardDescription>
            See how you scored across different readiness dimensions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(categoryScores).map(([category, score], index) => {
            const Icon = category === "Business Strategy" ? Target :
                       category === "Data Readiness" ? Database :
                       category === "Organizational Culture" ? Users :
                       category === "Technology Infrastructure" ? Cpu : Shield;
            
            return (
              <div 
                key={category} 
                className="space-y-2 animate-in slide-in-from-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{score}/10</span>
                    {score >= 8 && <Badge variant="default" className="text-xs">Strong</Badge>}
                    {score >= 6 && score < 8 && <Badge variant="secondary" className="text-xs">Good</Badge>}
                    {score < 6 && <Badge variant="outline" className="text-xs">Needs Work</Badge>}
                  </div>
                </div>
                <div className="relative">
                  <Progress value={0} className="h-3" />
                  <Progress 
                    value={score * 10} 
                    className="h-3 absolute top-0 transition-all duration-1000 ease-out"
                    style={{ animationDelay: `${index * 100 + 500}ms` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Enhanced Recommendations with hover effects */}
      <div className="space-y-4 animate-in fade-in slide-in-from-right duration-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">Personalized Recommendations</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {recommendations.map((recommendation, index) => (
            <Card 
              key={index} 
              className={cn(
                "transition-all duration-300 cursor-pointer",
                "hover:shadow-xl hover:scale-105 hover:border-primary/50",
                "animate-in fade-in slide-in-from-bottom",
                hoveredRecommendationIndex === index && "ring-2 ring-primary/20 ring-offset-2"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredRecommendationIndex(index)}
              onMouseLeave={() => setHoveredRecommendationIndex(null)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    hoveredRecommendationIndex === index 
                      ? "bg-primary/20 scale-110 rotate-3" 
                      : "bg-primary/10"
                  )}>
                    <recommendation.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-base">{recommendation.title}</CardTitle>
                      <Badge 
                        variant={recommendation.priority === "High" ? "default" : "secondary"}
                        className={cn(
                          "text-xs transition-all",
                          recommendation.priority === "High" && hoveredRecommendationIndex === index && "animate-pulse"
                        )}
                      >
                        {recommendation.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {recommendation.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced Next Steps with staggered animations */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 animate-in fade-in slide-in-from-bottom duration-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Your Next Steps
          </CardTitle>
          <CardDescription>
            Take action on your AI journey with these recommended next steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {nextSteps.map((step, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-all animate-in slide-in-from-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 animate-in zoom-in" />
              <span className="hover:text-primary transition-colors">{step}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Enhanced Action Buttons with hover animations */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in zoom-in duration-1000">
        <Button 
          size="lg" 
          className="w-full sm:w-auto group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all hover:shadow-xl hover:scale-105"
        >
          <Calendar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Schedule Consultation
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="w-full sm:w-auto group hover:shadow-lg hover:scale-105 transition-all hover:border-primary"
        >
          <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          Download Report
        </Button>
        <Button 
          size="lg" 
          variant="ghost" 
          className="w-full sm:w-auto group hover:bg-muted/50 transition-all"
          onClick={onRestart}
        >
          <RefreshCw className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
          Retake Assessment
        </Button>
      </div>

      {/* Enhanced Contact CTA with gradient animation */}
      <Card className="relative overflow-hidden border-primary/20 animate-in fade-in slide-in-from-bottom duration-1000">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 animate-gradient" />
        <CardContent className="pt-6 relative z-10">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold animate-in slide-in-from-bottom duration-700">
              Ready to Transform Your Business with AI?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-in slide-in-from-bottom duration-900">
              Our team of AI experts is ready to help you navigate your AI journey. 
              Get a personalized roadmap and implementation strategy tailored to your needs.
            </p>
            <Button 
              size="lg" 
              className="mt-4 group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all hover:shadow-xl hover:scale-105 animate-in zoom-in duration-1100"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
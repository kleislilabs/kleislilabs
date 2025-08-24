"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, ChevronRight, Mail, Save, Cloud } from "lucide-react";
import { assessmentQuestions } from "./assessment-questions";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AssessmentData {
  answers: Record<string, string | string[]>;
  email: string;
  completedAt: string;
  score: number;
}

interface AssessmentFormProps {
  onComplete: (data: AssessmentData) => void;
}

export function AssessmentForm({ onComplete }: AssessmentFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
  const [userEmail, setUserEmail] = useState("");
  const [isEmailCollected, setIsEmailCollected] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isShowingSuccess, setIsShowingSuccess] = useState(false);
  const [hoveredOptionId, setHoveredOptionId] = useState<string | null>(null);
  const [hasJustSelected, setHasJustSelected] = useState(false);
  const [autoAdvanceTimerId, setAutoAdvanceTimerId] = useState<NodeJS.Timeout | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showRestoredNotification, setShowRestoredNotification] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = assessmentQuestions;
  const totalQuestionsCount = questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestionsCount) * 100;

  // Auto-save functionality
  const saveToLocalStorage = useCallback(() => {
    const dataToSave = {
      currentQuestionIndex,
      userAnswers,
      userEmail,
      isEmailCollected,
      timestamp: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('ai-assessment-progress', JSON.stringify(dataToSave));
      setLastSavedTime(new Date());
      setIsSaving(true);
      
      // Show saving indicator briefly
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('Failed to save assessment progress:', error);
      return false;
    }
  }, [currentQuestionIndex, userAnswers, userEmail, isEmailCollected]);

  // Load saved progress on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ai-assessment-progress');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const savedDate = new Date(parsed.timestamp);
        const hoursSinceLastSave = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60);
        
        // Only restore if saved within last 24 hours
        if (hoursSinceLastSave < 24) {
          setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
          setUserAnswers(parsed.userAnswers || {});
          setUserEmail(parsed.userEmail || "");
          setIsEmailCollected(parsed.isEmailCollected || false);
          setLastSavedTime(savedDate);
          setShowRestoredNotification(true);
          
          // Hide notification after 5 seconds
          setTimeout(() => {
            setShowRestoredNotification(false);
          }, 5000);
        }
      } catch (error) {
        console.error('Failed to load saved progress:', error);
      }
    }
  }, []);

  // Auto-save when answers change
  useEffect(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    
    // Save after 2 seconds of inactivity
    autoSaveTimerRef.current = setTimeout(() => {
      if (Object.keys(userAnswers).length > 0 || userEmail) {
        saveToLocalStorage();
      }
    }, 2000);
    
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [userAnswers, userEmail, currentQuestionIndex, saveToLocalStorage]);

  const calculateScore = useCallback((answersData: Record<string, string | string[]>) => {
    // Simple scoring logic - can be enhanced
    let score = 0;
    let maxScore = 0;
    
    Object.entries(answersData).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      if (question?.scoring) {
        maxScore += question.scoring.max;
        if (typeof answer === "string") {
          score += question.scoring.values[answer] || 0;
        } else if (Array.isArray(answer)) {
          answer.forEach(a => {
            score += (question.scoring?.values[a] || 0) / answer.length;
          });
        }
      }
    });
    
    return Math.round((score / maxScore) * 10);
  }, [questions]);

  const handleNext = useCallback(() => {
    // Clear any auto-advance timer when manually advancing
    if (autoAdvanceTimerId) {
      clearTimeout(autoAdvanceTimerId);
      setAutoAdvanceTimerId(null);
    }
    setCountdownSeconds(null);
    setHasJustSelected(false);
    setIsShowingSuccess(false);
    
    if (currentQuestionIndex < totalQuestionsCount - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTransitioning(false);
        // Smooth scroll to top of form
        document.getElementById('assessment-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } else {
      // Complete assessment with celebration
      setIsTransitioning(true);
      const finalData = {
        answers: userAnswers,
        email: userEmail,
        completedAt: new Date().toISOString(),
        score: calculateScore(userAnswers)
      };
      // Clear saved data on completion
      localStorage.removeItem('ai-assessment-progress');
      setTimeout(() => {
        onComplete(finalData);
      }, 300);
    }
  }, [currentQuestionIndex, totalQuestionsCount, userAnswers, userEmail, onComplete, calculateScore, autoAdvanceTimerId]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsTransitioning(false);
      }, 200);
    }
  }, [currentQuestionIndex]);

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: value });
    
    // Clear any existing timer
    if (autoAdvanceTimerId) {
      clearTimeout(autoAdvanceTimerId);
      setAutoAdvanceTimerId(null);
    }
    
    // Visual feedback and auto-advance after 5 seconds
    if (currentQuestion.type === "single") {
      setIsShowingSuccess(true);
      setHasJustSelected(true);
      setCountdownSeconds(5);
      
      // Start countdownSeconds
      let timeLeft = 5;
      const countdownSecondsInterval = setInterval(() => {
        timeLeft -= 1;
        setCountdownSeconds(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(countdownSecondsInterval);
        }
      }, 1000);
      
      // Auto-advance after 5 seconds
      if (currentQuestionIndex < totalQuestionsCount - 1) {
        const timer = setTimeout(() => {
          handleNext();
          setIsShowingSuccess(false);
          setHasJustSelected(false);
          setCountdownSeconds(null);
          clearInterval(countdownSecondsInterval);
        }, 5000);
        setAutoAdvanceTimerId(timer);
      } else {
        // Clear feedback for last question
        setTimeout(() => {
          setIsShowingSuccess(false);
          setHasJustSelected(false);
          setCountdownSeconds(null);
          clearInterval(countdownSecondsInterval);
        }, 2000);
      }
    }
  };

  const handleMultiSelect = (optionValue: string, checked: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswers = userAnswers[currentQuestion.id];
    
    // Ensure currentAnswers is always an array, initialize if undefined
    const answersArray = Array.isArray(currentAnswers) ? currentAnswers : [];
    
    if (checked) {
      // Limit to max 3 selections
      if (answersArray.length < 3) {
        const newAnswers = [...answersArray, optionValue];
        setUserAnswers({ 
          ...userAnswers, 
          [currentQuestion.id]: newAnswers 
        });
      }
    } else {
      const newAnswers = answersArray.filter((v: string) => v !== optionValue);
      setUserAnswers({ 
        ...userAnswers, 
        [currentQuestion.id]: newAnswers 
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestion.id];
  
  // Determine if user can proceed based on question type and answer
  let canProceed = false;
  if (currentQuestion.type === "multi") {
    // For multi-select, check if it's an array with at least one selection
    canProceed = Array.isArray(currentAnswer) && currentAnswer.length > 0;
  } else {
    // For single and scale questions, check if a string value exists
    canProceed = typeof currentAnswer === "string" && currentAnswer !== "";
  }

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && canProceed) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestionIndex, canProceed, handleNext, handlePrevious]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerId) {
        clearTimeout(autoAdvanceTimerId);
      }
    };
  }, [autoAdvanceTimerId]);

  return (
    <TooltipProvider>
      <div id="assessment-form" className="space-y-6">
        {/* Restored progress notification */}
        {showRestoredNotification && (
          <div className="animate-in slide-in-from-top duration-500">
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Progress Restored</p>
                      <p className="text-xs text-muted-foreground">
                        We&apos;ve restored your previous assessment progress from {lastSavedTime?.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowRestoredNotification(false);
                      localStorage.removeItem('ai-assessment-progress');
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
                      setUserEmail("");
                      setIsEmailCollected(false);
                    }}
                  >
                    Start Fresh
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      {/* Enhanced Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Auto-save indicator */}
            {(lastSavedTime || isSaving) && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground animate-in fade-in duration-300">
                {isSaving ? (
                  <>
                    <Save className="w-3 h-3 animate-pulse" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-3 h-3 text-green-600" />
                    <span>Auto-saved</span>
                  </>
                )}
              </div>
            )}
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              Question {currentQuestionIndex + 1} of {totalQuestionsCount}
            </Badge>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {currentQuestion.category}
            </span>
          </div>
          <span className="text-sm font-medium text-primary">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="relative">
          <Progress value={progressPercentage} className="h-3" />
          <div 
            className="absolute top-0 h-full bg-gradient-to-r from-primary/20 to-primary/10 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {/* Question dots indicator */}
        <div className="flex justify-center gap-1.5 mt-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentQuestionIndex
                  ? "bg-primary w-8"
                  : index < currentQuestionIndex
                  ? "bg-primary/60"
                  : "bg-muted-foreground/20"
              )}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Email Collection Card */}
      {currentQuestionIndex === 3 && !isEmailCollected && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Get Your Personalized Report</CardTitle>
            </div>
            <CardDescription>
              Enter your email to receive detailed insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="your@email.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full pr-10 transition-all focus:ring-2 focus:ring-primary/20"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && userEmail && userEmail.includes('@')) {
                    setIsEmailCollected(true);
                  }
                }}
              />
              {userEmail && userEmail.includes('@') && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600 animate-in zoom-in duration-200" />
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsEmailCollected(true)}
                disabled={!userEmail || !userEmail.includes("@")}
                className="flex-1 group"
              >
                Continue Assessment
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setIsEmailCollected(true)}
                className="hover:bg-muted/50"
              >
                Skip for now
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              We respect your privacy. No spam, ever.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Question Card with animations */}
      <Card 
        className={cn(
          "shadow-lg transition-all duration-300",
          isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100",
          isShowingSuccess && "ring-2 ring-primary/50 ring-offset-2"
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <Badge variant="outline" className="mb-3 animate-in fade-in duration-500">
              {currentQuestion.category}
            </Badge>
            {isShowingSuccess && (
              <CheckCircle className="w-5 h-5 text-green-600 animate-in zoom-in duration-300" />
            )}
          </div>
          <CardTitle className="text-xl sm:text-2xl animate-in slide-in-from-left duration-500">
            {currentQuestion.question}
          </CardTitle>
          {currentQuestion.description && (
            <CardDescription className="text-base mt-2 animate-in slide-in-from-left duration-700">
              {currentQuestion.description}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Single Select (Radio) */}
          {currentQuestion.type === "single" && (
            <RadioGroup 
              value={typeof currentAnswer === "string" ? currentAnswer : ""} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option) => {
                const isSelected = currentAnswer === option.value;
                return (
                  <div 
                    key={option.value} 
                    className={cn(
                      "flex items-start space-x-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer group",
                      isSelected 
                        ? 'border-primary bg-primary/10 shadow-md hover:shadow-lg' 
                        : 'border-border hover:border-primary/50 hover:bg-accent/50 hover:shadow-md',
                      hoveredOptionId === option.value && 'scale-[1.02]'
                    )}
                    onClick={() => handleAnswer(option.value)}
                    onMouseEnter={() => setHoveredOptionId(option.value)}
                    onMouseLeave={() => setHoveredOptionId(null)}
                  >
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className="mt-1 transition-all group-hover:scale-110"
                  />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-sm text-muted-foreground mt-1 group-hover:text-muted-foreground/80">
                        {option.description}
                      </p>
                    )}
                  </Label>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-primary animate-in zoom-in duration-200" />
                  )}
                </div>
                );
              })}
            </RadioGroup>
          )}

          {/* Multi Select (Checkbox) */}
          {currentQuestion.type === "multi" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Select up to 3 options
                </p>
                {Array.isArray(currentAnswer) && currentAnswer.length > 0 && (
                  <span className="text-xs font-medium text-primary">
                    {currentAnswer.length}/3 selected
                  </span>
                )}
              </div>
              {currentQuestion.options?.map((option) => {
                const isChecked = Array.isArray(currentAnswer) && currentAnswer.includes(option.value);
                const isDisabled = Array.isArray(currentAnswer) && currentAnswer.length >= 3 && !isChecked;
                
                return (
                  <div 
                    key={option.value} 
                    className={cn(
                      "flex items-start space-x-3 p-4 rounded-xl border-2 transition-all duration-200 group",
                      isChecked 
                        ? 'border-primary bg-primary/10 shadow-md' 
                        : 'border-border hover:border-primary/50',
                      isDisabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'cursor-pointer hover:bg-accent/50 hover:shadow-md hover:scale-[1.02]'
                    )}
                    onClick={() => {
                      if (!isDisabled) {
                        handleMultiSelect(option.value, !isChecked);
                      }
                    }}
                  >
                    <Checkbox
                      id={option.value}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        if (!isDisabled) {
                          handleMultiSelect(option.value, checked as boolean);
                        }
                      }}
                      disabled={isDisabled}
                      className="mt-1 transition-all group-hover:scale-110"
                    />
                    <Label 
                      htmlFor={option.value} 
                      className={`flex-1 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent double-triggering
                      }}
                    >
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {option.label}
                      </span>
                      {option.description && (
                        <p className="text-sm text-muted-foreground mt-1 group-hover:text-muted-foreground/80">
                          {option.description}
                        </p>
                      )}
                    </Label>
                  </div>
                );
              })}
              {Array.isArray(currentAnswer) && currentAnswer.length > 0 && (
                <div className="flex gap-2 flex-wrap pt-3 animate-in slide-in-from-bottom duration-300">
                  {currentAnswer.map((value: string) => (
                    <Badge 
                      key={value} 
                      variant="secondary"
                      className="animate-in zoom-in duration-200"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {currentQuestion.options?.find(o => o.value === value)?.label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Scale */}
          {currentQuestion.type === "scale" && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{currentQuestion.scaleLabels?.min}</span>
                <span>{currentQuestion.scaleLabels?.max}</span>
              </div>
              <RadioGroup 
                value={typeof currentAnswer === "string" ? currentAnswer : ""} 
                onValueChange={handleAnswer}
                className="flex justify-between"
              >
                {[1, 2, 3, 4, 5].map((value) => {
                  const isSelected = currentAnswer === value.toString();
                  return (
                    <div 
                      key={value} 
                      className={cn(
                        "flex flex-col items-center group cursor-pointer transition-all",
                        isSelected && "scale-110"
                      )}
                      onClick={() => handleAnswer(value.toString())}
                    >
                      <RadioGroupItem 
                        value={value.toString()} 
                        id={`scale-${value}`}
                        className={cn(
                          "mb-2 transition-all",
                          "group-hover:scale-125 group-hover:border-primary",
                          isSelected && "border-primary bg-primary text-primary-foreground"
                        )}
                      />
                      <Label 
                        htmlFor={`scale-${value}`}
                        className={cn(
                          "text-sm cursor-pointer font-medium transition-colors",
                          "group-hover:text-primary",
                          isSelected && "text-primary"
                        )}
                      >
                        {value}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Navigation with keyboard hints */}
      <div className="space-y-3">
        <div className="flex gap-3 justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="min-w-[100px] group transition-all hover:shadow-md"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to previous question</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className={cn(
                  "min-w-[140px] group transition-all",
                  canProceed 
                    ? "hover:shadow-lg hover:scale-105" 
                    : "opacity-50 cursor-not-allowed",
                  hasJustSelected && canProceed && "animate-pulse bg-primary ring-2 ring-primary/50 ring-offset-2"
                )}
                type="button"
              >
                {currentQuestionIndex === totalQuestionsCount - 1 ? (
                  <>
                    <span className="hidden sm:inline">Complete Assessment</span>
                    <span className="sm:hidden">Complete</span>
                    <CheckCircle className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Next Question</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{!canProceed ? "Please select an answer" : currentQuestionIndex === totalQuestionsCount - 1 ? "Submit your assessment" : "Continue to next question"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* Navigation hints and auto-advance countdownSeconds */}
        <div className="space-y-2">
          {countdownSeconds !== null && countdownSeconds > 0 && (
            <div className="space-y-2 animate-in fade-in duration-500">
              <p className="text-sm text-center text-primary font-medium">
                Auto-advancing in {countdownSeconds} seconds... (or click Next to continue now)
              </p>
              <div className="max-w-xs mx-auto">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - countdownSeconds) / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          {hasJustSelected && canProceed && countdownSeconds === null && (
            <p className="text-sm text-center text-primary font-medium animate-in fade-in duration-500">
              Great choice! Click Next to continue →
            </p>
          )}
          <p className="text-xs text-center text-muted-foreground animate-in fade-in duration-1000">
            <kbd className="px-2 py-0.5 text-xs bg-muted rounded">Enter</kbd> to continue • 
            <kbd className="px-2 py-0.5 text-xs bg-muted rounded ml-2">←</kbd>
            <kbd className="px-2 py-0.5 text-xs bg-muted rounded ml-1">→</kbd> to navigate
          </p>
        </div>
      </div>
      </div>
    </TooltipProvider>
  );
}
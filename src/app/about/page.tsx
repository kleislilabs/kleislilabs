'use client';

import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalCta } from "@/components/CalCta";
import { CtaSection } from "@/components/ui/CtaSection";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Target, 
  Users, 
  Lightbulb, 
  CheckCircle, 
  Handshake, 
  Zap, 
  Shield,
  Brain,
  Rocket,
  Globe,
  Award,
  TrendingUp,
  Heart,
  Sparkles,
  Calendar,
  Clock,
  DollarSign,
  BarChart
} from "lucide-react";
import { TeamMember } from "@/components/about/TeamMember";
import { Timeline } from "@/components/about/Timeline";
import { ValueCard } from "@/components/about/ValueCard";
import { StatsCounter } from "@/components/about/StatsCounter";

const stats = [
  { value: 30, suffix: "+", label: "MVPs Launched" },
  { value: 12, label: "Funded Startups" },
  { value: 20, suffix: "K", label: "Monthly Value per Client" },
  { value: 85, suffix: "%", label: "Client Success Rate" }
];

const timelineItems = [
  {
    year: "2023",
    title: "The Beginning",
    description: "Started with a mission to make AI accessible. Built our first MVPs for early-stage startups, proving AI can deliver value in weeks, not months.",
    highlight: false
  },
  {
    year: "2024",
    title: "Finding Our Groove",
    description: "Refined our 4-week MVP framework. Helped 12 startups secure funding with AI-powered prototypes. Each client now saves $20K+ monthly through automation.",
    highlight: false
  },
  {
    year: "2025",
    title: "Scaling Impact",
    description: "Expanding our proven model. Building the next wave of AI-first startups while maintaining our commitment to rapid, practical implementation.",
    highlight: true
  }
];

const teamMembers = [
  {
    name: "Parvez Akhtar",
    role: "Founder & AI Strategist",
    bio: "Former tech lead at multiple AI unicorns. Built ML systems processing 100M+ daily transactions. Now democratizing enterprise AI for businesses of all sizes.",
    expertise: ["AI Strategy", "Enterprise Architecture", "Venture Building", "Product Innovation"],
    social: {
      linkedin: "https://www.linkedin.com/in/parvezakhtar/",
      twitter: "https://x.com/ipmOb"
    }
  },
  {
    name: "Sumukh Upadhya",
    role: "Co-Founder & Technical Architect",
    bio: "10+ years architecting distributed AI systems. Led engineering teams at scale-ups from Series A to IPO. Obsessed with making AI infrastructure bulletproof.",
    expertise: ["Distributed Systems", "MLOps", "Cloud Architecture", "Performance Engineering"],
    social: {
      linkedin: "https://www.linkedin.com/in/sumukhupadhya/",
      github: "#"
    }
  },
  {
    name: "Saurabh Sharma",
    role: "Head of AI Innovation",
    bio: "Published researcher in NLP and computer vision. Shipped AI products used by millions in healthcare and fintech. Turns cutting-edge research into customer value.",
    expertise: ["Deep Learning", "Computer Vision", "NLP", "Product Strategy"],
    social: {
      linkedin: "https://www.linkedin.com/in/saurshaz/",
      twitter: "#"
    }
  },
  {
    name: "Kumar Roshan",
    role: "Principal Engineer",
    bio: "Built data platforms for Fortune 500 retail and logistics giants. Expert in turning messy enterprise data into AI-ready gold mines.",
    expertise: ["Data Engineering", "Real-time Systems", "Enterprise Integration", "DevOps"],
    social: {
      linkedin: "https://www.linkedin.com/in/kumarroshan2006",
      twitter: "#"
    }
  },
];

const values = [
  {
    icon: Rocket,
    title: "Ship Fast, Learn Faster",
    description: "We believe in rapid iteration. Get to market quickly, gather real feedback, and improve continuously.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: DollarSign,
    title: "ROI-Obsessed",
    description: "Every line of code we write must drive measurable business value. If it doesn&apos;t move the needle, we don&apos;t build it.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Production-Grade Always",
    description: "No proof-of-concepts that die in PowerPoint. We build robust systems ready for real-world scale from day one.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Partner, Not Vendor",
    description: "Your success is our success. We&apos;re invested in your long-term growth, not just the next invoice.",
    gradient: "from-red-500 to-orange-500"
  }
];

const clientSuccess = [
  {
    metric: "$20K",
    description: "Average monthly value generated",
    icon: DollarSign
  },
  {
    metric: "4 weeks",
    description: "MVP to production deployment",
    icon: Clock
  },
  {
    metric: "40%",
    description: "Funding success rate for our MVPs",
    icon: TrendingUp
  },
  {
    metric: "3x",
    description: "Faster than building in-house",
    icon: Zap
  }
];

export default function AboutUsPage() {
  return (
    <Layout>
      <Container className="py-6 sm:py-8">
        {/* Hero Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageHeader
            title="We Turn AI Dreams Into Business Reality"
            description="While Others Talk About AI&apos;s Potential, We&apos;re Busy Shipping Solutions That Generate Millions in Value"
          />
        </motion.div>
        
        <div className="mt-12 space-y-20">
          {/* Opening Story - More Compelling */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-none shadow-2xl bg-gradient-to-br from-background via-background to-primary/5">
                <CardContent className="p-8 sm:p-12">
                  <div className="text-center max-w-4xl mx-auto space-y-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
                    >
                      <Rocket className="h-4 w-4" />
                      <span className="text-sm font-medium">The Truth About AI</span>
                    </motion.div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                      Most Startups Struggle with AI. We Make It Simple.
                    </h2>
                    
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      While others spend months planning, our clients ship AI-powered MVPs in 4 weeks. 
                      <span className="font-semibold text-foreground">12 of our 30 clients have already secured funding, 
                      and each saves an average of $20K monthly through intelligent automation.</span>
                    </p>
                    
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      We&apos;re builders who understand startups. We&apos;ve been in the trenches, shipped products, and know what it takes to impress investors. 
                      <span className="font-semibold text-foreground"> We don&apos;t just build AI—we build fundable, scalable products 
                      that demonstrate real traction from week one.</span>
                    </p>
                    
                    <div className="pt-4">
                      <CalCta size="lg" className="group">
                        <Calendar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        See How We Can Transform Your Business
                      </CalCta>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* Client Success Metrics - New Section */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 mb-4">
                  <BarChart className="h-4 w-4" />
                  <span className="text-sm font-medium">Proven Results</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Our Clients Don&apos;t Just Survive—They Dominate
                </h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {clientSuccess.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="text-center hover:shadow-xl transition-all hover:scale-105">
                      <CardContent className="p-6">
                        <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold text-primary mb-2">{item.metric}</div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Section>

          {/* Stats Section - Enhanced */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
                <CardContent className="p-8 sm:p-12">
                  <StatsCounter stats={stats} />
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* The Real Problem We Solve - Enhanced */}
          <Section spacing="none">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-medium">The Harsh Reality</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    What Smart Startups Are Building With AI
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      While some are still debating AI strategy, 
                      <span className="font-semibold text-foreground"> our clients are already using AI to:</span>
                    </p>
                    
                    <ul className="space-y-3">
                      {[
                        "Automate customer support (saving $20K+ monthly)",
                        "Build intelligent workflows that scale without hiring",
                        "Create MVPs that secure seed funding in weeks",
                        "Generate personalized content at 10x speed",
                        "Process data that would take humans days in minutes"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <Card className="border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 to-background">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                        <Lightbulb className="h-4 w-4" />
                        <span className="text-sm font-medium">Our Approach</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold">
                        From Zero to AI-Powered in 4 Weeks
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        Forget 18-month digital transformations. We deliver production-ready AI in sprints, not years. 
                        Our battle-tested playbook gets you:
                      </p>
                      
                      <div className="space-y-3">
                        {[
                          { week: "Week 1", task: "Deep-dive discovery & quick wins identification" },
                          { week: "Week 2", task: "Prototype development & data pipeline setup" },
                          { week: "Week 3", task: "Model training & system integration" },
                          { week: "Week 4", task: "Production deployment & team training" }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                          >
                            <Badge className="font-mono">{item.week}</Badge>
                            <span className="text-sm">{item.task}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <CalCta size="lg" className="w-full">
                        Start Your 4-Week Transformation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </CalCta>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </Section>

          {/* Our Journey Timeline - Enhanced */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-medium">Our Journey</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  From Rebels to Market Leaders
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We didn&apos;t just join the AI revolution—we&apos;re leading it
                </p>
              </div>
              
              <Card className="border-none bg-gradient-to-br from-muted/20 to-muted/10">
                <CardContent className="p-8 sm:p-12">
                  <Timeline items={timelineItems} />
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* Core Values - Enhanced */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">Our Philosophy</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  We Live By These Principles
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every decision, every line of code, every client interaction is guided by these core beliefs
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => (
                  <ValueCard
                    key={index}
                    {...value}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </Section>

          {/* What We Actually Do - Enhanced */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">Our Expertise</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  We Don&apos;t Do Everything—We Do What Matters
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Focused expertise in high-impact AI applications that drive immediate business value
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: Brain,
                    title: "Intelligent Automation",
                    description: "Replace repetitive human tasks with AI that works 24/7, never makes mistakes, and costs 90% less.",
                    features: ["Document Processing", "Customer Service AI", "Workflow Automation", "Data Entry Elimination"],
                    impact: "Save 70% on operational costs"
                  },
                  {
                    icon: TrendingUp,
                    title: "Predictive Analytics",
                    description: "See the future before your competitors do. Predict customer behavior, market trends, and business outcomes.",
                    features: ["Churn Prediction", "Demand Forecasting", "Risk Assessment", "Revenue Optimization"],
                    impact: "Increase revenue by 40%"
                  },
                  {
                    icon: Sparkles,
                    title: "Generative AI Solutions",
                    description: "Create content, code, and designs at superhuman speed. From marketing to product development.",
                    features: ["Content Generation", "Code Synthesis", "Design Automation", "Personalization Engines"],
                    impact: "10x productivity gains"
                  },
                  {
                    icon: Shield,
                    title: "AI Infrastructure",
                    description: "Build the backbone for AI at scale. We create systems that handle millions of predictions daily without breaking a sweat.",
                    features: ["MLOps Pipelines", "Real-time Inference", "Model Management", "Data Engineering"],
                    impact: "99.99% uptime guaranteed"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all hover:scale-[1.02] hover:border-primary/50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex-shrink-0">
                            <service.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {service.features.map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <div className="pt-2 border-t">
                              <span className="text-sm font-semibold text-primary">{service.impact}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Section>

          {/* Meet the Team - Enhanced */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">The A-Team</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  The Builders Behind the Magic
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Not your typical consultants. We&apos;re engineers who&apos;ve built AI at the highest levels—now we&apos;re building it for you
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((member, index) => (
                  <TeamMember
                    key={index}
                    {...member}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </Section>

          {/* Global Reach - Enhanced */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-none bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <CardContent className="p-8 sm:p-12">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                      <Globe className="h-4 w-4" />
                      <span className="text-sm font-medium">Global Impact</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold">
                      Building for a Global Market
                    </h2>
                    
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                      Our distributed team works around the clock to deliver AI solutions for startups worldwide. 
                      <span className="font-semibold text-foreground"> We understand different markets, regulations, and user needs</span> because 
                      we&apos;ve built products that serve them.
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 max-w-3xl mx-auto">
                      {[
                        { country: "USA", clients: "12 Startups" },
                        { country: "UK", clients: "4 Startups" },
                        { country: "UAE", clients: "3 Projects" },
                        { country: "Singapore", clients: "2 Fintechs" },
                        { country: "Germany", clients: "2 SaaS" },
                        { country: "Australia", clients: "2 Startups" },
                        { country: "Canada", clients: "3 Startups" },
                        { country: "India", clients: "2 SMBs" }
                      ].map((location) => (
                        <div key={location.country} className="text-center">
                          <Badge variant="outline" className="mb-1 px-3 py-1">
                            {location.country}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{location.clients}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* Why Choose Us - Enhanced */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-8 sm:p-12">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">The Bottom Line</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                      Why Smart Companies Choose KleisliLabs
                    </h2>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        title: "We Ship Real MVPs",
                        description: "30+ AI-powered MVPs launched. 40% secured funding within 6 months."
                      },
                      {
                        title: "4-Week Sprint Model",
                        description: "From idea to working MVP in 4 weeks. Perfect for pre-seed validation."
                      },
                      {
                        title: "Startup-Friendly Pricing",
                        description: "Flexible engagement models designed for early-stage budgets."
                      },
                      {
                        title: "$20K Monthly Value",
                        description: "Our automation solutions save clients an average of $20K per month."
                      },
                      {
                        title: "Investor-Ready Products",
                        description: "We build MVPs that demonstrate traction and scalability to VCs."
                      },
                      {
                        title: "Continued Support",
                        description: "We stick around post-launch to ensure your success and iterate based on user feedback."
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* CTA Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CtaSection
              variant="primary"
              size="lg"
              title="Stop Watching Your Competitors Win With AI"
              description="Every day you wait is another day they pull further ahead. Let&apos;s change that. Book a strategy call and we&apos;ll show you exactly how to leapfrog the competition in 4 weeks."
              actions={
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CalCta size="lg" className="group">
                    <Handshake className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Claim Your Competitive Advantage
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </CalCta>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/ai-readiness">
                      <Brain className="mr-2 h-5 w-5" />
                      See If You&apos;re Ready for AI
                    </Link>
                  </Button>
                </div>
              }
            />
          </motion.div>
        </div>
      </Container>
    </Layout>
  );
}
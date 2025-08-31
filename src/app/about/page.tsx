'use client';

import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Cpu,
  Brain,
  Rocket,
  Globe,
  Award,
  TrendingUp,
  Heart,
  Sparkles
} from "lucide-react";
import { TeamMember } from "@/components/about/TeamMember";
import { Timeline } from "@/components/about/Timeline";
import { ValueCard } from "@/components/about/ValueCard";
import { StatsCounter } from "@/components/about/StatsCounter";

// Metadata would normally be exported, but since we're using client components, we'll handle it differently
// export const metadata: Metadata = {
//   title: `About Us | ${blogConfig.title}`,
//   description: "Learn about KleisliLabs - AI Solutions Built for Real Business Problems. We Help Businesses Implement Practical Artificial Intelligence Solutions.",
// };

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 4, label: "Continents Served" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" }
];

const timelineItems = [
  {
    year: "2023",
    title: "Spark",
    description: "Founded amid the AI revolution to empower startups. Igniting rapid prototyping with open-source models.",
    highlight: false
  },
  {
    year: "2024",
    title: "Breakthrough",
    description: "Pioneered AI-in-4-Week complete solutions. Full-stack MVP: UI + Backend + AI + Production-ready codebase.",
    highlight: false
  },
  {
    year: "2025",
    title: "Dominance",
    description: "Partnered with 5+ elite VCs as their technical accelerator. 15+ startups launched from zero to funding in record time.",
    highlight: true
  }
];

const teamMembers = [
  {
    name: "Parvez Akhtar",
    bio: "Visionary leader with 6+ years in AI and machine learning, passionate about making AI accessible to all businesses.",
    expertise: ["Strategic Planning", "AI Ethics", "Business Development"],
    social: {
      linkedin: "https://www.linkedin.com/in/parvezakhtar/",
      twitter: "#"
    }
  },
  {
    name: "Sumukh Upadhya",
    role: "Co-Founder",
    bio: "Technical architect with deep expertise in building scalable AI systems and leading engineering teams.",
    expertise: ["System Architecture", "Generative AI", "Cloud Infrastructure"],
    social: {
      linkedin: "https://www.linkedin.com/in/sumukhupadhya/",
      twitter: "https://x.com/bufferingMC"
    }
  },
  {
    name: "Saurabh Sharma",
    bio: "AI consultant innovating in e-commerce, healthcare, fintech using deep learning and NLP. Expertise: Deep Learning, NLP, Computer Vision, AI Product Strategy, User Experience Design.",
    expertise: ["UI/UX Research", "Development", "Generative AI", "Data Warehousing"],
    social: {
      linkedin: "https://www.linkedin.com/in/saurshaz/",
      twitter: "#"
    }
  },
  {
    name: "Kumar Roshan ",
    bio: "Senior Software Architect | Retail , E-commerce, Gig Economy, Logistics",
    expertise: ["System Architecture", "Distributed Systems", "Data Engineering"],
    social: {
      linkedin: "https://www.linkedin.com/in/kumarroshan2006",
      twitter: "#"
    }
  },
];

const values = [
  {
    icon: Brain,
    title: "Innovation First",
    description: "We stay at the forefront of AI technology, constantly exploring new possibilities to deliver cutting-edge solutions.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our success. We work as partners, not vendors, ensuring every solution drives real value.",
    gradient: "from-red-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Ethical AI",
    description: "We believe in responsible AI development that respects privacy, ensures fairness, and promotes transparency.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from code quality to client communication.",
    gradient: "from-green-500 to-emerald-500"
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
            title="Transforming Business Through AI"
            description="We Bridge the Gap Between AI Potential and Real-World Implementation"
          />
        </motion.div>
        
        <div className="mt-12 space-y-20">
          {/* Opening Story */}
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
                      <span className="text-sm font-medium">Our Story</span>
                    </motion.div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                      We Started KleisliLabs Because We Saw a Problem
                    </h2>
                    
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      Brilliant AI research was happening in labs worldwide, yet most businesses couldn&apos;t access its benefits. 
                      The gap between cutting-edge AI and practical business applications was growing wider every day.
                    </p>
                    
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      So we assembled a team of engineers, data scientists, and business strategists with one mission: 
                      <span className="font-semibold text-foreground"> Make AI work for real businesses, solving real problems, delivering real results.</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* Stats Section */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-none bg-muted/30">
                <CardContent className="p-8 sm:p-12">
                  <StatsCounter stats={stats} />
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* The Challenge We Solve */}
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
                    <span className="text-sm font-medium">The Challenge</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    Why Most AI Projects Fail
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">70% of AI initiatives never make it to production.</span> Why? 
                      Because implementing AI isn&apos;t just about algorithms—it&apos;s about understanding business processes, 
                      managing change, and building systems that work in the real world.
                    </p>
                    
                    <ul className="space-y-3">
                      {[
                        "Lack of AI expertise in-house",
                        "Unclear ROI and implementation roadmap",
                        "Difficulty integrating with existing systems",
                        "Concerns about data privacy and security"
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
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
                <Card className="border-primary/20 shadow-xl">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                        <Lightbulb className="h-4 w-4" />
                        <span className="text-sm font-medium">Our Solution</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold">
                        A Different Approach
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        We don&apos;t just build AI systems—we become your AI partners. Our team works alongside yours, 
                        understanding your unique challenges and crafting solutions that integrate seamlessly with your operations.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        {[
                          { icon: Brain, label: "Custom Solutions" },
                          { icon: Globe, label: "Global Experience" },
                          { icon: Shield, label: "Secure & Compliant" },
                          { icon: TrendingUp, label: "Measurable ROI" }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-sm"
                          >
                            <item.icon className="h-4 w-4 text-primary" />
                            <span>{item.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </Section>

          {/* Our Journey Timeline */}
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
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Building the Future of AI Implementation
                </h2>
              </div>
              
              <Card className="border-none bg-muted/20">
                <CardContent className="p-8 sm:p-12">
                  <Timeline items={timelineItems} />
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* Core Values */}
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
                  <span className="text-sm font-medium">Our Values</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  What Drives Us Forward
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our core values shape every decision we make and every solution we deliver
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

          {/* What We Deliver */}
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
                  <span className="text-sm font-medium">Our Services</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  End-to-End AI Solutions
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From strategy to implementation, we handle every aspect of your AI journey
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: Cpu,
                    title: "Custom AI Development",
                    description: "Purpose-built machine learning models, automation systems, and intelligent data analysis tools designed specifically for your business requirements.",
                    features: ["Neural Networks", "Computer Vision", "NLP Solutions", "Predictive Analytics"]
                  },
                  {
                    icon: Lightbulb,
                    title: "AI Strategy & Consulting",
                    description: "Strategic guidance on AI adoption, including feasibility studies, ROI analysis, and comprehensive implementation roadmaps.",
                    features: ["Opportunity Assessment", "Technology Selection", "Risk Analysis", "Change Management"]
                  },
                  {
                    icon: Zap,
                    title: "System Integration",
                    description: "Seamless integration of AI capabilities with your existing technology stack and business processes.",
                    features: ["API Development", "Data Pipeline Design", "Cloud Migration", "Legacy System Integration"]
                  },
                  {
                    icon: Shield,
                    title: "Ongoing Support & Optimization",
                    description: "Continuous monitoring, optimization, and scaling to ensure your AI systems deliver lasting value.",
                    features: ["24/7 Monitoring", "Performance Tuning", "Model Retraining", "Scaling Support"]
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Section>

          {/* Meet the Team */}
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
                  <span className="text-sm font-medium">Our Team</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Meet the Minds Behind KleisliLabs
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A diverse team of experts passionate about making AI accessible and practical for every business
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

          {/* Global Reach */}
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
                      Serving Clients Worldwide
                    </h2>
                    
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                      From Silicon Valley startups to established enterprises in Dubai, we&apos;ve helped organizations 
                      across <span className="font-semibold text-foreground">North America, Europe, Australia, and the Middle East</span> harness 
                      the power of AI. Our global experience means we understand diverse regulatory environments, 
                      cultural nuances, and market-specific challenges.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                      {["USA", "Canada", "UK", "Germany", "France", "Australia", "UAE", "Saudi Arabia"].map((country) => (
                        <Badge key={country} variant="outline" className="px-4 py-2">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Section>

          {/* Why Choose Us */}
          <Section spacing="none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8 sm:p-12">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">Why KleisliLabs</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                      The KleisliLabs Difference
                    </h2>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        title: "Proven Track Record",
                        description: "Over 50 successful AI implementations with measurable business impact and ROI."
                      },
                      {
                        title: "Industry Expertise",
                        description: "Deep understanding of various sectors including finance, healthcare, retail, and manufacturing."
                      },
                      {
                        title: "Transparent Process",
                        description: "Clear communication, realistic timelines, and honest assessments at every stage."
                      },
                      {
                        title: "Knowledge Transfer",
                        description: "We empower your team with the skills to manage and evolve AI systems independently."
                      },
                      {
                        title: "Flexible Engagement",
                        description: "From quick proof-of-concepts to enterprise-wide transformations, we adapt to your needs."
                      },
                      {
                        title: "Continuous Innovation",
                        description: "Access to the latest AI advancements and best practices from the research community."
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
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CtaSection
              variant="primary"
              size="lg"
              title="Ready to Transform Your Business with AI?"
              description="Let&apos;s discuss how we can help you implement practical AI solutions that drive real results. Schedule a free consultation to explore the possibilities."
              actions={
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      <Handshake className="mr-2 h-5 w-5" />
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/ai-readiness">
                      <Brain className="mr-2 h-5 w-5" />
                      Take AI Readiness Assessment
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
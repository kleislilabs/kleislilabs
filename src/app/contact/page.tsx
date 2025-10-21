'use client';

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalCta } from "@/components/CalCta";
import { blogConfig } from "@/lib/config";
import { 
  Mail, 
  Calendar, 
  Clock, 
  MessageSquare,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

// Email templates for different inquiry types
const emailTemplates = {
  project: {
    subject: "AI Project Inquiry - [Your Company Name]",
    body: `Hi KleisliLabs Team,

I'm [Your Name] from [Company Name], and we're looking to implement AI to [specific goal/challenge].

Current situation:
- Industry: [Your Industry]
- Company size: [Number of employees]
- Main challenge: [What problem are you trying to solve?]
- Timeline: [When do you need this implemented?]
- Budget range: [Optional but helpful]

I'd love to discuss how you can help us achieve [specific outcome].

Best regards,
[Your Name]
[Your Title]
[Phone Number]`
  },
  partnership: {
    subject: "Partnership Opportunity with [Your Company]",
    body: `Hello KleisliLabs,

I represent [Company Name], and I believe there's a strong synergy between our organizations.

Partnership proposal:
- Type: [Strategic/Technical/Channel partnership]
- Mutual benefit: [How we can help each other]
- Target market: [Shared customer base]

Let's explore how we can collaborate to deliver greater value to our clients.

Best,
[Your Name]
[LinkedIn Profile]`
  },
  urgent: {
    subject: "URGENT: AI Implementation Needed - [Company Name]",
    body: `Hi KleisliLabs,

We have an urgent need for AI implementation at [Company Name].

Critical requirements:
- Timeline: Need solution by [Date]
- Challenge: [Specific urgent problem]
- Impact: [Business impact if not solved]

Please contact me at your earliest convenience at [Phone Number].

Thank you,
[Your Name]`
  }
};

// Response time by channel
const responseData = [
  { channel: "Discovery Call", time: "Instant booking", icon: Calendar, priority: true },
  { channel: "Email (Urgent)", time: "2-4 hours", icon: Zap, priority: false },
  { channel: "Email (General)", time: "24 hours", icon: Mail, priority: false }
];

// Trust signals
const trustSignals = [
  { icon: Shield, text: "NDA-ready", description: "Your ideas are safe with us" },
  { icon: Globe, text: "Global team", description: "Round-the-clock development" },
  { icon: CheckCircle, text: "30+ MVPs", description: "12 funded startups" },
  { icon: Clock, text: "4-week sprints", description: "From idea to launch" }
];

export default function ContactPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof emailTemplates>("project");

  const getEmailLink = () => {
    const template = emailTemplates[selectedTemplate];
    const subject = encodeURIComponent(template.subject);
    const body = encodeURIComponent(template.body);
    return `mailto:${blogConfig.social.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <Container className="py-6 sm:py-8 max-w-6xl">
        {/* Minimalist Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Let&apos;s Build Something Amazing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every great AI transformation starts with a conversation. 
            <span className="block mt-2 font-semibold text-foreground">
              We respond in hours, not days.
            </span>
          </p>
        </motion.div>

        {/* Trust Signals Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {trustSignals.map((signal, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <signal.icon className="h-5 w-5 text-primary mb-2" />
              <div className="font-semibold text-sm">{signal.text}</div>
              <div className="text-xs text-muted-foreground">{signal.description}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Primary CTA - Book a Call */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Fastest Response</h2>
                    <Badge className="mb-3" variant="default">Recommended</Badge>
                    <p className="text-muted-foreground mb-4">
                      Book a 30-min discovery call. Get answers immediately.
                    </p>
                  </div>
                  <CalCta size="lg" className="w-full">
                    Book Your Call Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </CalCta>
                  <p className="text-xs text-muted-foreground">
                    Average wait time: Same day
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Prefer Email?</h2>
                    <p className="text-muted-foreground">
                      Select your inquiry type for a pre-formatted template that gets faster responses
                    </p>
                  </div>

                  {/* Template Selector */}
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(emailTemplates).map((key) => (
                      <Button
                        key={key}
                        variant={selectedTemplate === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTemplate(key as keyof typeof emailTemplates)}
                        className="capitalize"
                      >
                        {key === "project" && <MessageSquare className="h-4 w-4 mr-2" />}
                        {key === "partnership" && <Globe className="h-4 w-4 mr-2" />}
                        {key === "urgent" && <Zap className="h-4 w-4 mr-2" />}
                        {key} Inquiry
                      </Button>
                    ))}
                  </div>

                  {/* Email Button */}
                  <div className="space-y-4">
                    <Button size="lg" className="w-full" asChild>
                      <a href={getEmailLink()}>
                        <Mail className="mr-2 h-5 w-5" />
                        Open Email with Template
                      </a>
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Or email directly:
                      </p>
                      <a 
                        href={`mailto:${blogConfig.social.email}`}
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        {blogConfig.social.email}
                      </a>
                    </div>
                  </div>

                  {/* Response Times */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3 text-sm">Response Times</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {responseData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <item.icon className={`h-4 w-4 ${item.priority ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="text-muted-foreground">{item.channel}:</span>
                          <span className={`font-medium ${item.priority ? "text-primary" : ""}`}>
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Global Presence - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="border-dashed">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Serving clients globally from hubs in San Francisco, Dubai, London, and Bangalore</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom CTA - Urgency */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">
                While You&apos;re Reading This, Your Competitors Are Building
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Every day without AI is money left on the table. Let&apos;s change that today.
              </p>
              <CalCta size="lg" className="group">
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Start Your AI Transformation Now
              </CalCta>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Layout>
  );
}
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <Layout>
      <Container>
        <PageHeader
          title="Our Services"
          description="Comprehensive AI solutions designed specifically for early-stage startups"
        />
        
        <section className="py-8">
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-center">
            From rapid prototyping to investor-ready documentation, we provide the technical firepower 
            ambitious AI founders need to accelerate from concept to Series A.
          </p>
          
          <ServicesGrid />
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Let&apos;s discuss how we can help accelerate your AI startup journey.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Your Free AI Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";
import Link from "next/link";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  expertise: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  delay?: number;
}

export function TeamMember({ 
  name, 
  role, 
  bio, 
  image, 
  expertise, 
  social,
  delay = 0 
}: TeamMemberProps) {
  // Generate initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="group h-full hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Custom Avatar Implementation */}
            <div className="relative h-24 w-24 rounded-full border-4 border-primary/10 group-hover:border-primary/30 transition-colors overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={image} 
                  alt={name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-2xl font-semibold text-foreground">
                  {initials}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{role}</p>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {bio}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {expertise.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            
            {social && (
              <div className="flex space-x-3 pt-2">
                {social.linkedin && (
                  <Link 
                    href={social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                )}
                {social.twitter && (
                  <Link 
                    href={social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                )}
                {social.github && (
                  <Link 
                    href={social.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
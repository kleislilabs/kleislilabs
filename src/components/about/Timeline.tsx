'use client';

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start"
          >
            {/* Timeline dot */}
            <div className="absolute left-8 flex items-center justify-center -translate-x-1/2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full ${
                  item.highlight 
                    ? 'bg-primary' 
                    : 'bg-background border-2 border-primary/50'
                }`}
              >
                {item.highlight && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary/50"
                  />
                )}
              </motion.div>
            </div>
            
            {/* Content */}
            <div className="ml-16 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-primary">
                  {item.year}
                </span>
                {item.highlight && (
                  <CheckCircle className="h-4 w-4 text-primary" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
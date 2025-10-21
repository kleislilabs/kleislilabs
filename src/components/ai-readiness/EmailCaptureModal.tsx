"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Download, Send } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, sendByEmail: boolean) => void;
  score: number;
  level: string;
}

export function EmailCaptureModal({ isOpen, onClose, onSubmit, score, level }: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [sendByEmail, setSendByEmail] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await onSubmit(email, sendByEmail);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Get Your Detailed AI Readiness Report
          </DialogTitle>
          <DialogDescription>
            Your score: <span className="font-bold text-primary">{score}/10</span> ({level})
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              We&apos;ll send your personalized PDF report to this email
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sendByEmail"
              checked={sendByEmail}
              onChange={(e) => setSendByEmail(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="sendByEmail" className="text-sm font-normal cursor-pointer">
              Email me the PDF report (recommended)
            </Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                "Processing..."
              ) : sendByEmail ? (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Report
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to receive follow-up communications about AI implementation strategies.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
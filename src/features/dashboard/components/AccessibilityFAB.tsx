"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Volume2, VolumeX, Eye, Ear } from "lucide-react";
import { cn } from "@/core/utils";

export default function AccessibilityFAB() {
  const [isReading, setIsReading] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis);
    }
    return () => {
      if (synth) synth.cancel();
    };
  }, []);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("contrast-more");
    } else {
      document.documentElement.classList.remove("contrast-more");
    }
  }, [highContrast]);

  const toggleScreenReader = () => {
    if (!synth) return;
    
    if (isReading) {
      synth.cancel();
      setIsReading(false);
    } else {
      // Collect all text from the main dashboard area
      const textToRead = document.querySelector('main')?.textContent || document.body.textContent || "No content found";
      // Clean up text
      const cleanText = textToRead.replace(/\s+/g, ' ').trim().slice(0, 500); // Read first 500 chars for demo
      
      const utterance = new SpeechSynthesisUtterance(`Welcome to Krishi Sarathi Dashboard. ${cleanText}`);
      utterance.rate = 0.9;
      
      utterance.onend = () => setIsReading(false);
      synth.speak(utterance);
      setIsReading(true);
    }
  };

  return (
    <div 
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-3"
      role="region"
      aria-label="Accessibility Controls"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => setHighContrast(!highContrast)}
        className={cn(
          "rounded-full shadow-lg h-12 w-12 border-2",
          highContrast ? "bg-primary text-primary-foreground border-primary" : "bg-background border-primary/20 text-primary"
        )}
        aria-label={highContrast ? "Disable High Contrast" : "Enable High Contrast"}
        aria-pressed={highContrast}
      >
        <Eye className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleScreenReader}
        className={cn(
          "rounded-full shadow-lg h-12 w-12 border-2",
          isReading ? "bg-green-500 text-white border-green-500 animate-pulse" : "bg-background border-primary/20 text-primary"
        )}
        aria-label={isReading ? "Stop Screen Reader" : "Start Screen Reader"}
        aria-pressed={isReading}
      >
        {isReading ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </Button>
    </div>
  );
}

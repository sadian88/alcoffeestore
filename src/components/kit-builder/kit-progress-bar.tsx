
"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

interface KitProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  stepNames: string[];
}

export function KitProgressBar({ currentStep, totalSteps, onStepClick, stepNames }: KitProgressBarProps) {
  return (
    <div className="mb-6 p-3 bg-card rounded-lg shadow">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;
          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <button
                onClick={() => onStepClick(step)}
                disabled={step > currentStep && !isCompleted && step !==1} // Allow going back, or to current, or to step 1
                className={cn(
                  "flex flex-col items-center cursor-pointer disabled:cursor-not-allowed group",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isActive ? "bg-primary border-primary text-primary-foreground scale-110" : 
                    isCompleted ? "bg-green-500 border-green-500 text-white" : 
                    "bg-muted border-muted-foreground/30 text-muted-foreground group-hover:border-primary group-hover:text-primary"
                  )}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <span className="text-base font-semibold">{step}</span>}
                </div>
                <span className={cn("mt-1 text-xs text-center", isActive ? "text-primary font-semibold" : "text-muted-foreground")}>
                  {stepNames[i] || `Paso ${step}`}
                </span>
              </button>
              {step < totalSteps && (
                <div className={cn(
                    "flex-1 h-1 mx-1 mt-[-1.375rem] mb-[1.375rem]", 
                    isCompleted || isActive ? "bg-primary" : "bg-muted-foreground/30"
                  )} style={{ minWidth: '1.5rem'}} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

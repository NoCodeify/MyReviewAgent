import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckIcon } from '@heroicons/react/24/outline';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface CheckoutProgressProps {
  currentStep: number;
  steps: Step[];
  className?: string;
}

export default function CheckoutProgress({ currentStep, steps, className = '' }: CheckoutProgressProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-2">
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step.number < currentStep
                  ? 'bg-green-500 text-white'
                  : step.number === currentStep
                  ? 'bg-primary text-primary-foreground ring-2 ring-primary/20'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.number < currentStep ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                step.number
              )}
            </div>

            {/* Step info */}
            <div className="hidden sm:block">
              <div className={`text-sm font-medium ${
                step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {step.description}
              </div>
            </div>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className={`hidden md:block w-8 h-px transition-all duration-300 ${
              step.number < currentStep ? 'bg-green-500' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
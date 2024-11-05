"use client";

import { useCurrentWeek } from "@/hooks/use-current-week";
import { Week } from "@prisma/client";

type StepProps = {
  stepNumber: string;
  title: string;
  description: string;
  isLast: boolean;
  currentStep: number;
};

const Step = ({ stepNumber, title, description, isLast, currentStep }: StepProps) => {
  return (
    <div className="relative flex items-start gap-4">
      <div className="relative flex flex-col items-center">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground ${currentStep >= parseInt(stepNumber) ? 'bg-primary' : 'bg-wsu-200'}`}>
          {stepNumber}
        </div>
        {!isLast && (
          <div className="absolute top-10 bottom-0 h-14 w-[1px] bg-primary/30"></div>
        )}
      </div>
      <div className="space-y-0.5">
        <div className="font-medium">{title}</div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const SemesterProgress = ({steps}: {steps: Week[]}) => {
  

  const currentWeek = useCurrentWeek();
  if (!currentWeek) return null;
  const currentStep = parseInt(currentWeek?.id);

  return (
    <div className="w-full max-w-md bg-white p-6 pl-12 rounded-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Autumn 2025</h2>
        </div>
        <div className="relative space-y-4">
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <Step
                key={index}
                stepNumber={step.id}
                title={step.title}
                description={step.description}
                isLast={index === steps.length - 1}
                currentStep={currentStep}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterProgress;

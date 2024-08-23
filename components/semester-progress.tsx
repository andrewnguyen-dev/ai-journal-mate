"use client";

type StepProps = {
  stepNumber: number;
  title: string;
  description: string;
  isLast: boolean;
};

const Step = ({ stepNumber, title, description, isLast }: StepProps) => {
  return (
    <div className="relative flex items-start gap-4">
      <div className="relative flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
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

const SemesterProgress = () => {
  const steps = [
    {
      stepNumber: 1,
      title: "Week 1",
      description: "Getting to know your team",
    },
    {
      stepNumber: 2,
      title: "Week 2",
      description: "It’s a plan not a promise",
    },
    {
      stepNumber: 3,
      title: "Week 3",
      description: "The Proposal",
    },
    {
      stepNumber: 4,
      title: "Week 4",
      description: "Agreement and Prototype",
    },
  ];

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
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterProgress;

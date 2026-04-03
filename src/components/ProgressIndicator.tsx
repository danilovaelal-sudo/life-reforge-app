import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
}

const ProgressIndicator = ({ currentStep, steps }: ProgressIndicatorProps) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b-[3px] border-foreground"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-1 overflow-x-auto">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center shrink-0">
            <div
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                i < currentStep
                  ? "bg-primary text-primary-foreground"
                  : i === currentStep
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-4 h-0.5 ${i < currentStep ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;

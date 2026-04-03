import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { diagnosticQuestions } from "@/data/questions";

interface DiagnosticQuizProps {
  onComplete: (scores: Record<string, number>) => void;
}

const DiagnosticQuiz = ({ onComplete }: DiagnosticQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = diagnosticQuestions[currentIndex];
  const total = diagnosticQuestions.length;
  const progress = ((currentIndex) / total) * 100;

  const handleSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const option = question.options[optionIndex];

    // Accumulate scores
    const newScores = { ...answers };
    for (const [key, val] of Object.entries(option.scores)) {
      newScores[key] = (newScores[key] || 0) + val;
    }

    setTimeout(() => {
      if (currentIndex < total - 1) {
        setAnswers(newScores);
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        onComplete(newScores);
      }
    }, 600);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
    }
  };

  return (
    <section className="section-padding bg-secondary text-secondary-foreground min-h-screen flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <span className="tag-brutal bg-primary text-primary-foreground mb-4 inline-block">
            Диагностика
          </span>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Вопрос {currentIndex + 1} из {total}
            </p>
            {currentIndex > 0 && (
              <button onClick={handleBack} className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                ← Назад
              </button>
            )}
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-3 border-[2px] border-foreground bg-card">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="heading-md mb-8 text-balance">{question.text}</h3>

            <div className="space-y-3">
              {question.options.map((option, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left brutal-card p-5 md:p-6 transition-all duration-200 ${
                    selectedOption === i
                      ? "bg-primary text-primary-foreground translate-x-2"
                      : "bg-card text-card-foreground hover:translate-x-2 hover:bg-accent"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-black text-lg mt-0.5 shrink-0 w-8 h-8 border-2 border-current flex items-center justify-center text-sm">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-base md:text-lg font-medium">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Encouraging note */}
        <motion.p
          className="mt-8 text-center text-sm text-muted-foreground italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Нет правильных ответов. Выбирай то, что ближе прямо сейчас.
        </motion.p>
      </div>
    </section>
  );
};

export default DiagnosticQuiz;

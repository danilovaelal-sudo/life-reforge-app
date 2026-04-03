import { useState, useRef } from "react";
import Hero from "@/components/Hero";
import Recognition from "@/components/Recognition";
import AuthorStory from "@/components/AuthorStory";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import TransformationMap from "@/components/TransformationMap";
import ArchetypeResult from "@/components/ArchetypeResult";
import PersonalPath from "@/components/PersonalPath";
import InsightsBlock from "@/components/InsightsBlock";
import ThirtyDayPlan from "@/components/ThirtyDayPlan";
import SubscriptionBlock from "@/components/SubscriptionBlock";
import PersonalWorkCTA from "@/components/PersonalWorkCTA";
import TrustBlocks from "@/components/TrustBlocks";
import ProgressIndicator from "@/components/ProgressIndicator";
import { determineArchetype } from "@/data/archetypes";
import { motion } from "framer-motion";

type AppPhase = "landing" | "quiz" | "results";

const steps = ["Вход", "Узнавание", "История", "Диагностика", "Результат", "Путь", "План", "Подписка"];

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>("landing");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    setPhase("quiz");
    setCurrentStep(3);
    setTimeout(() => quizRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleQuizComplete = (finalScores: Record<string, number>) => {
    setScores(finalScores);
    setPhase("results");
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const archetype = phase === "results" ? determineArchetype(scores) : null;

  return (
    <div className="min-h-screen">
      {(phase === "quiz" || phase === "results") && (
        <ProgressIndicator currentStep={currentStep} steps={steps} />
      )}

      {phase !== "results" && (
        <>
          <Hero onStartJourney={() => { setCurrentStep(1); }} onStartDiagnostic={scrollToQuiz} />
          <Recognition />
          <AuthorStory />
        </>
      )}

      {phase === "quiz" && (
        <div ref={quizRef}>
          <DiagnosticQuiz onComplete={handleQuizComplete} />
        </div>
      )}

      {phase === "results" && archetype && (
        <>
          <div className="pt-12" />
          <AnalyticsDashboard scores={scores} />
          <TransformationMap scores={scores} />
          <ArchetypeResult primary={archetype.primary} secondary={archetype.secondary} />
          <PersonalPath />
          <InsightsBlock scores={scores} />
          <ThirtyDayPlan onSubscribe={() => document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" })} />
          <SubscriptionBlock />
          <PersonalWorkCTA />
        </>
      )}

      <TrustBlocks />

      {/* Bottom diagnostic CTA */}
      {phase !== "results" && (
        <motion.section
          className="section-padding bg-primary text-primary-foreground text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="heading-lg text-primary-foreground mb-4">
              Готова узнать себя?
            </h2>
            <p className="body-lg text-primary-foreground/80 mb-8">
              Пройди бесплатную диагностику и получи персональную карту состояния, архетип и план действий на 30 дней.
            </p>
            <button onClick={scrollToQuiz} className="brutal-btn bg-accent text-accent-foreground text-xl">
              Пройти диагностику
            </button>
            <p className="text-sm text-primary-foreground/60 mt-4">
              12 минут · Бесплатно · Без регистрации
            </p>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4 border-t-[3px] border-foreground">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="font-black font-heading text-2xl">После 40 не поздно</p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Елена Данилова. Все права защищены.</p>
          <p className="text-xs text-muted-foreground">Трансформационный опыт для женщин в поиске нового пути</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowDown, Check } from "lucide-react";
import IconSymbol from "./IconSymbol";

interface TransformationMapProps {
  scores: Record<string, number>;
}

const stages = [
  {
    id: "crisis",
    title: "Кризис",
    subtitle: "Точка, в которой ты сейчас",
    icon: "anchor",
    color: "bg-primary",
    description: "Боль, потеря ориентиров, ощущение тупика. Это не конец — это начало трансформации.",
    markers: ["Эмоциональное истощение", "Потеря идентичности", "Страх перемен"],
  },
  {
    id: "awareness",
    title: "Осознание",
    subtitle: "Первый шаг — увидеть правду",
    icon: "compass",
    color: "bg-warm",
    description: "Ты начинаешь видеть, что происходит. Не бежишь, не прячешься — а смотришь честно.",
    markers: ["Принятие ситуации", "Контакт с эмоциями", "Поиск ответов"],
  },
  {
    id: "resources",
    title: "Сбор ресурсов",
    subtitle: "Вернуть себе опору",
    icon: "gem",
    color: "bg-sage",
    description: "Обнаружить внутри силы, которые всегда были. Перестать обесценивать себя.",
    markers: ["Признание своих сил", "Выстраивание границ", "Забота о себе"],
  },
  {
    id: "direction",
    title: "Вектор",
    subtitle: "Увидеть направление",
    icon: "star",
    color: "bg-gold",
    description: "Появляется ясность. Не идеальная карта, но внутренний компас уже работает.",
    markers: ["Ясность предназначения", "Доверие интуиции", "Первые решения"],
  },
  {
    id: "movement",
    title: "Движение",
    subtitle: "Жить из нового места",
    icon: "flame",
    color: "bg-deep",
    description: "Ты начинаешь действовать из нового состояния. Не идеально, но по-настоящему.",
    markers: ["Новые привычки", "Реальные шаги", "Внутренняя свобода"],
  },
];

const TransformationMap = ({ scores }: TransformationMapProps) => {
  const [activeStage, setActiveStage] = useState(0);

  // Calculate approximate current position based on scores
  const readiness = scores.readiness || 0;
  const clarity = scores.clarity || 0;
  const selfTrust = scores.selfTrust || 0;
  const avgProgress = ((readiness + clarity + selfTrust) / 60) * 100;
  const currentStageIndex = Math.min(Math.floor(avgProgress / 25), 4);

  return (
    <section className="section-padding bg-secondary text-secondary-foreground">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="tag-brutal bg-accent text-accent-foreground mb-4 inline-block">Карта трансформации</span>
          <h2 className="heading-lg text-secondary-foreground">
            Путь возвращения
            <br />
            <span className="text-accent">к себе</span>
          </h2>
          <p className="body-lg text-muted-foreground mt-4 max-w-2xl">
            Твой путь — это не линейная дорога. Это спираль, где каждый виток приближает тебя к себе настоящей.
          </p>
        </motion.div>

        {/* Progress line */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex items-center flex-1 last:flex-none">
                <motion.button
                  onClick={() => setActiveStage(i)}
                  className={`relative w-10 h-10 md:w-12 md:h-12 border-2 border-foreground flex items-center justify-center shrink-0 transition-all ${
                    i <= currentStageIndex
                      ? `${stage.color} text-primary-foreground`
                      : i === activeStage
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {i < currentStageIndex ? (
                    <Check size={18} strokeWidth={3} />
                  ) : (
                    <IconSymbol name={stage.icon} size={18} />
                  )}
                  {i === currentStageIndex && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-accent border border-foreground"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                </motion.button>
                {i < stages.length - 1 && (
                  <div className={`flex-1 h-1 mx-1 border-y border-foreground ${
                    i < currentStageIndex ? "bg-sage" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {stages.map((stage, i) => (
              <p
                key={stage.id}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-wider text-center ${
                  i === activeStage ? "text-accent" : "text-muted-foreground"
                }`}
                style={{ width: i === stages.length - 1 ? "auto" : `${100 / stages.length}%` }}
              >
                {stage.title}
              </p>
            ))}
          </div>
        </div>

        {/* Active stage detail */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="brutal-card-lg overflow-hidden"
        >
          <div className={`p-6 md:p-8 ${stages[activeStage].color} text-primary-foreground`}>
            <div className="flex items-center gap-3">
              <IconSymbol name={stages[activeStage].icon} size={28} />
              <div>
                <h3 className="heading-md text-primary-foreground">{stages[activeStage].title}</h3>
                <p className="text-lg opacity-80">{stages[activeStage].subtitle}</p>
              </div>
            </div>
            {activeStage === currentStageIndex && (
              <span className="inline-block mt-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider border border-foreground">
                Ты здесь
              </span>
            )}
          </div>

          <div className="p-6 md:p-8 bg-card">
            <p className="body-lg mb-6">{stages[activeStage].description}</p>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ключевые маркеры этого этапа</p>
              {stages[activeStage].markers.map((marker, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 border-2 border-foreground bg-background"
                >
                  <div className={`w-2 h-2 ${stages[activeStage].color}`} />
                  <span className="font-medium">{marker}</span>
                </motion.div>
              ))}
            </div>

            {activeStage < stages.length - 1 && (
              <button
                onClick={() => setActiveStage(activeStage + 1)}
                className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors"
              >
                Следующий этап <ArrowDown size={16} className="rotate-[-90deg]" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationMap;

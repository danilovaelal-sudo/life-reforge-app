import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { thirtyDayPlan } from "@/data/plan";

interface ThirtyDayPlanProps {
  onSubscribe: () => void;
}

const ThirtyDayPlan = ({ onSubscribe }: ThirtyDayPlanProps) => {
  const [openWeek, setOpenWeek] = useState(0);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const weekColors = [
    "bg-sage text-sage-foreground",
    "bg-warm text-warm-foreground",
    "bg-primary text-primary-foreground",
    "bg-gold text-gold-foreground",
  ];

  return (
    <section className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="tag-brutal mb-4 inline-block">30 дней</span>
          <h2 className="heading-lg">
            Твой персональный
            <br />
            <span className="text-primary">маршрут на 30 дней</span>
          </h2>
          <p className="body-lg text-muted-foreground mt-4 max-w-2xl">
            Не марафон. Не вызов. Мягкий, но собранный путь возвращения к&nbsp;себе.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {thirtyDayPlan.map((week, i) => (
            <button
              key={i}
              onClick={() => setOpenWeek(i)}
              className={`brutal-btn text-sm px-4 py-2 ${
                openWeek === i ? weekColors[i] : "bg-muted text-muted-foreground"
              }`}
            >
              Неделя {week.week}
            </button>
          ))}
        </div>

        <motion.div
          key={openWeek}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="brutal-card-lg overflow-hidden"
        >
          <div className={`p-6 md:p-8 ${weekColors[openWeek]}`}>
            <h3 className="heading-md">{thirtyDayPlan[openWeek].title}</h3>
            <p className="mt-1 text-lg opacity-80">{thirtyDayPlan[openWeek].subtitle}</p>
            <p className="mt-2 text-sm opacity-70">{thirtyDayPlan[openWeek].theme}</p>
          </div>

          <div className="p-4 md:p-6 space-y-3">
            {thirtyDayPlan[openWeek].days.map((day) => (
              <div
                key={day.day}
                className={`brutal-card p-4 transition-all cursor-pointer ${
                  completedDays.has(day.day) ? "bg-accent translate-x-1" : "bg-card hover:translate-x-1"
                }`}
                onClick={() => toggleDay(day.day)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 border-2 border-foreground flex items-center justify-center shrink-0 text-sm font-black ${
                    completedDays.has(day.day) ? "bg-primary text-primary-foreground" : ""
                  }`}>
                    {completedDays.has(day.day) ? <Check size={16} /> : day.day}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black font-heading">{day.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{day.action}</p>
                    {day.prompt && (
                      <p className="text-xs text-primary mt-2 border-l-2 border-primary pl-2">
                        Промпт для журнала: «{day.prompt}»
                      </p>
                    )}
                    {day.practice && (
                      <p className="text-xs text-sage font-medium mt-1">
                        Практика: {day.practice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 brutal-card bg-primary text-primary-foreground p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="heading-md text-primary-foreground mb-4">Получи маршрут письмами</h3>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Каждый день — одно письмо с действием, практикой и поддержкой. Мягко. Бережно. По-настоящему.
          </p>
          <button onClick={onSubscribe} className="brutal-btn bg-accent text-accent-foreground">
            Получить по почте
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ThirtyDayPlan;

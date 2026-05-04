import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PathStage {
  title: string;
  inside: string;
  obstacle: string;
  support: string;
  action: string;
  practice: string;
  focus: string;
}

const defaultPath: PathStage[] = [
  {
    title: "Остановиться и услышать себя",
    inside: "Шум затихает. Появляется пространство для тишины и правды.",
    obstacle: "Привычка бежать. Страх того, что откроется в тишине.",
    support: "Регулярные паузы. Дыхание. Природа. Тело.",
    action: "Каждый день 15 минут — только ты и тишина. Без телефона, без задач.",
    practice: "Утренние страницы — пиши всё, что приходит, без цензуры.",
    focus: "Что я чувствую прямо сейчас — по-настоящему?",
  },
  {
    title: "Вернуть себе силу",
    inside: "Ты начинаешь замечать ресурсы, которые считала утраченными.",
    obstacle: "Привычка обесценивать себя. Вина за то, что занимаешься собой.",
    support: "Ведение дневника сильных сторон. Обратная связь от близких.",
    action: "Запиши 3 свои реальные силы и каждый день проявляй хотя бы одну.",
    practice: "Практика самопризнания: каждый вечер назови 1 вещь, за которую уважаешь себя.",
    focus: "В чём я сильна — даже если не привыкла это замечать?",
  },
  {
    title: "Переопределить свою историю",
    inside: "Старый нарратив рушится. Новый ещё не сложился, но контуры видны.",
    obstacle: "Привязанность к прежней версии себя. Страх нового.",
    support: "Нарративные практики. Работа с историями. Письменная рефлексия.",
    action: "Напиши свою историю заново — не как жертвы, а как героини пути.",
    practice: "Перепиши один болезненный эпизод, увидев в нём дар.",
    focus: "Какая я — если посмотреть глазами мудрости, а не боли?",
  },
  {
    title: "Увидеть вектор предназначения",
    inside: "Появляется ощущение направления. Не чёткая карта, но компас.",
    obstacle: "Перфекционизм. Желание знать всё заранее.",
    support: "Доверие интуиции. Маленькие эксперименты. Живой отклик.",
    action: "Выбери одно дело, которое зовёт — и сделай первый маленький шаг.",
    practice: "Вопрос дня: если бы я жила из глубины — что бы я делала сегодня?",
    focus: "Куда зовёт меня моя интуиция?",
  },
  {
    title: "Начать движение в новой роли",
    inside: "Ты начинаешь жить из нового места. Не привычного, но настоящего.",
    obstacle: "Внутренний критик. Сомнения окружающих.",
    support: "Поддерживающее окружение. Наставник. Практика. Терпение.",
    action: "Объяви себе о начале нового этапа. Символически. Реально.",
    practice: "Ритуал перехода: напиши манифест нового периода жизни.",
    focus: "Я выбираю жить как та, кем я становлюсь.",
  },
];

const PersonalPath = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="tag-brutal mb-4 inline-block border-secondary-foreground border">Карта пути</span>
          <h2 className="heading-lg">
            Твой персональный
            <br />
            <span className="text-primary">маршрут перехода</span>
          </h2>
          <p className="body-lg text-muted-foreground mt-4 max-w-2xl">
            Пять этапов. Каждый — слой, через который проходит женщина на пути к&nbsp;новой себе. Нажми на этап, чтобы раскрыть его.
          </p>
        </motion.div>

        <div className="space-y-4">
          {defaultPath.map((stage, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="brutal-card-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="w-full bg-primary text-primary-foreground p-6 flex items-center gap-4 text-left hover:opacity-90 transition-opacity"
                >
                  <span className="text-3xl font-black font-heading">{i + 1}</span>
                  <h3 className="text-lg md:text-xl font-black font-heading flex-1">{stage.title}</h3>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="p-6 grid md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Что происходит внутри</p>
                        <p>{stage.inside}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Что мешает</p>
                        <p className="text-primary font-medium">{stage.obstacle}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Что поддержит</p>
                        <p className="text-sage font-medium">{stage.support}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="brutal-card bg-accent p-4">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1">Ключевое действие</p>
                        <p className="font-medium">{stage.action}</p>
                      </div>
                      <div className="brutal-card bg-muted p-4">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1">Практика</p>
                        <p>{stage.practice}</p>
                      </div>
                      <div className="brutal-card p-4 border-l-[3px]" style={{ borderLeftColor: "hsl(var(--primary))" }}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1">Фокус внимания</p>
                        <p className="font-heading text-lg">«{stage.focus}»</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PersonalPath;

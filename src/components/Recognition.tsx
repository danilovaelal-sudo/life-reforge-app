import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const painPoints = [
  { id: 1, text: "Я устала", subtext: "Устала бороться, тянуть, держать. Устала быть сильной для всех, кроме себя.", Icon: ArrowUpRight },
  { id: 2, text: "Я не знаю, кто я", subtext: "Все роли, которые я играла, больше не подходят. А новых — нет.", Icon: ArrowUpRight },
  { id: 3, text: "Я много отдала другим", subtext: "Годы заботы о других — и пустота внутри. Где я в этом уравнении?", Icon: ArrowUpRight },
  { id: 4, text: "Я потеряла связь с собой", subtext: "Я помню, как чувствовала себя живой. Но не помню, когда это было.", Icon: ArrowUpRight },
  { id: 5, text: "Я не верю, что у меня ещё есть путь", subtext: "Кажется, что лучшее позади. Что моё время прошло. Что поздно.", Icon: ArrowUpRight },
];

const Recognition = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="section-padding bg-secondary text-secondary-foreground">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="tag-brutal bg-primary text-primary-foreground mb-4 inline-block">Узнавание</span>
          <h2 className="heading-lg text-secondary-foreground mt-4">
            Если хотя бы одно
            <br />
            <span className="text-accent">откликается</span> —
            <br />
            ты в правильном месте
          </h2>
        </motion.div>

        <div className="space-y-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`brutal-card cursor-pointer transition-all duration-300 ${
                activeId === point.id
                  ? "bg-primary text-primary-foreground translate-x-2"
                  : "bg-card text-card-foreground hover:translate-x-2"
              }`}
              onClick={() => setActiveId(activeId === point.id ? null : point.id)}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <point.Icon className="w-7 h-7 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black font-heading">{point.text}</h3>
                    <motion.p
                      className="mt-2 text-lg opacity-80"
                      initial={false}
                      animate={{ height: activeId === point.id ? "auto" : 0, opacity: activeId === point.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      {point.subtext}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 brutal-card bg-accent p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl font-bold text-accent-foreground font-heading">
            «Ты не сломана. Ты в процессе пересборки.
            <br />
            И это — самая честная работа в жизни.»
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Recognition;

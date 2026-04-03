import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const testimonials = [
  { name: "Марина, 43 года", text: "Я думала, что после развода жизнь закончилась. После работы с Еленой я впервые за 5 лет почувствовала, что у меня есть направление." },
  { name: "Ольга, 47 лет", text: "Диагностика попала в самое сердце. Я увидела свои ресурсы, которые обесценивала годами. Это был момент перелома." },
  { name: "Наталья, 39 лет", text: "30-дневный план стал моим якорем. Каждый день — маленький шаг. И через месяц я не узнала себя. В лучшем смысле." },
];

const faqItems = [
  { q: "Для кого это подходит?", a: "Для женщин 35+, переживающих кризис, расставание, потерю ориентиров, ощущение «я не знаю, кто я теперь». Для тех, кто готов к честному разговору с собой." },
  { q: "Для кого это НЕ подходит?", a: "Для тех, кто ищет быстрые мотивационные фразы. Для тех, кто не готов к внутренней работе. Для тех, кому нужна клиническая психотерапия — мы рекомендуем специалиста." },
  { q: "Это эзотерика?", a: "Нет. Это современный подход, сочетающий нарративную психологию, архетипическую работу и коучинг жизненных переходов. Без магии, карт Таро и «посланий вселенной»." },
  { q: "Сколько времени занимает диагностика?", a: "10-15 минут. Но она может стать одним из самых честных разговоров с собой за последние годы." },
  { q: "Что я получу?", a: "Персональный архетип, аналитику внутреннего состояния, карту пути из 5 этапов, набор инсайтов, 30-дневный план действий и возможность продолжить путь с поддержкой." },
];

const TrustBlocks = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="section-padding bg-background">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Manifesto block */}
        <motion.div
          className="brutal-card-lg bg-secondary text-secondary-foreground p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="tag-brutal bg-primary text-primary-foreground mb-6 inline-block">Манифест</span>
          <h2 className="heading-md mb-6">
            Это не про мотивацию.
            <br />
            Это про <span className="text-accent">возвращение к&nbsp;себе</span>.
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground">
            <p>Мы не обещаем, что будет легко. Мы обещаем, что будет честно.</p>
            <p>Мы не говорим «стань лучшей версией себя». Мы говорим: «верни себе ту, которая ты есть».</p>
            <p>Мы не продаём мечту. Мы предлагаем путь.</p>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="tag-brutal mb-4 inline-block">Отклики</span>
            <h2 className="heading-lg mb-8">
              Что говорят
              <br />
              <span className="text-primary">те, кто прошёл</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="brutal-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-base mb-4">«{t.text}»</p>
                <p className="text-sm font-bold text-primary">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="tag-brutal mb-4 inline-block">Вопросы</span>
            <h2 className="heading-lg mb-8">Частые вопросы</h2>
          </motion.div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                className="brutal-card overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="p-5 flex items-center justify-between">
                  <h4 className="font-bold text-lg font-heading">{item.q}</h4>
                  <span className="shrink-0 ml-4">
                    {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === i ? "auto" : 0,
                    opacity: openFaq === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBlocks;

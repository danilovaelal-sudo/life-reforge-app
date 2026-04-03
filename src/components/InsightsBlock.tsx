import { motion } from "framer-motion";

interface InsightsBlockProps {
  scores: Record<string, number>;
}

const InsightsBlock = ({ scores }: InsightsBlockProps) => {
  const energy = scores.energy || 0;
  const selfContact = scores.selfContact || 0;
  const selfTrust = scores.selfTrust || 0;
  const purpose = scores.purpose || 0;
  const readiness = scores.readiness || 0;

  const insights = [
    {
      label: "Что ты уже переросла",
      text: energy > 8
        ? "Ты переросла привычку выживать. Твоя энергия говорит о готовности не просто терпеть, а жить по-настоящему."
        : "Ты переросла необходимость быть сильной для всех. Пришло время направить силу на себя.",
      color: "bg-sage",
    },
    {
      label: "Что ты несёшь, но не признаёшь как силу",
      text: selfContact > 8
        ? "Твоя способность чувствовать глубоко — не слабость, а редкий дар. Именно она ведёт тебя к истине."
        : "Твоя выносливость — не просто привычка, а мощный ресурс. Ты прошла через многое и выстояла.",
      color: "bg-warm",
    },
    {
      label: "Что сейчас истощает",
      text: selfTrust < 8
        ? "Неверие в себя забирает больше энергии, чем любая внешняя проблема. Ты тратишь силы на сомнения вместо движения."
        : "Попытка контролировать всё. Отпусти хотя бы часть — и почувствуешь, как возвращается дыхание.",
      color: "bg-primary",
    },
    {
      label: "Что зовёт вперёд",
      text: purpose > 10
        ? "Ты чувствуешь зов предназначения. Это не фантазия — это голос твоей глубинной правды."
        : "Тебя зовёт потребность в подлинности. Жить не «как надо», а «как чувствуешь».",
      color: "bg-gold",
    },
    {
      label: "В чём может быть твоё предназначение",
      text: readiness > 10
        ? "Ты готова стать проводником перемен — для себя и других. Твой опыт — это путь, который может осветить дорогу."
        : "Твоё предназначение сейчас — вернуться к себе. Это не эгоизм, а фундамент всего остального.",
      color: "bg-deep",
    },
    {
      label: "На чём строить следующий период",
      text: "На правде о себе. На признании своей силы. На доверии к тому, что жизнь после кризиса может быть глубже и богаче, чем до него.",
      color: "bg-secondary",
    },
  ];

  return (
    <section className="section-padding bg-secondary text-secondary-foreground">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="tag-brutal bg-accent text-accent-foreground mb-4 inline-block">Инсайты</span>
          <h2 className="heading-lg">
            Что ты уже
            <br />
            <span className="text-accent">знаешь о себе</span>
          </h2>
          <p className="body-lg text-muted-foreground mt-4 max-w-2xl">
            Эти слова — зеркало. Они отражают то, что проявилось в&nbsp;твоих ответах.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="brutal-card p-6"
            >
              <span className={`tag-brutal text-[10px] ${insight.color} text-primary-foreground`}>
                {insight.label}
              </span>
              <p className="mt-4 text-base leading-relaxed">{insight.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 brutal-card-lg bg-accent p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="heading-md text-accent-foreground">
            «Ты не сломана. Ты в точке сборки.
            <br />И это — самое сильное место, в&nbsp;котором ты когда-либо была.»
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsBlock;

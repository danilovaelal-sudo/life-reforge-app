import { motion } from "framer-motion";
import authorPhoto from "@/assets/author-photo.jpeg";
import bookCover from "@/assets/book-cover.png";

const storySteps = [
  { label: "Боль", text: "Потеря ориентиров. Разрыв с прежней жизнью. Ощущение, что почва ушла из-под ног." },
  { label: "Перелом", text: "Момент, когда стало невозможно продолжать по-старому. Когда тело и душа сказали: хватит." },
  { label: "Путь внутрь", text: "Годы глубокой внутренней работы. Не терапия ради терапии — а честный разговор с собой." },
  { label: "Новая опора", text: "Сборка нового фундамента. Не из иллюзий, а из правды о себе." },
  { label: "Новая роль", text: "Рождение проводника. Той, кто прошла свой путь и может осветить его другим." },
];

const AuthorStory = () => {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="tag-brutal mb-4 inline-block">История</span>
          <h2 className="heading-lg">
            Этот метод
            <br />
            <span className="italic text-primary">прожит</span>, а не придуман
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 mb-16">
          {/* Author photo */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="brutal-card-lg overflow-hidden">
              <img
                src={authorPhoto}
                alt="Елена Данилова — автор и проводник"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4 brutal-card p-4 bg-accent">
              <p className="font-bold text-lg text-accent-foreground">Елена Данилова</p>
              <p className="text-sm text-accent-foreground/80">Автор · Проводник · Психолог жизненных переходов</p>
            </div>
          </motion.div>

          {/* Story timeline */}
          <div className="md:col-span-3 space-y-0">
            {storySteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-4 border-l-4 border-foreground pl-6 py-6"
              >
                <div>
                  <span className="tag-brutal text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-black font-serif mt-2">{step.label}</h3>
                  <p className="mt-1 text-muted-foreground">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Book block */}
        <motion.div
          className="brutal-card-lg bg-primary text-primary-foreground p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <img src={bookCover} alt="Книга" className="w-48 md:w-56 brutal-card bg-background p-2 transform rotate-[-3deg]" loading="lazy" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <span className="tag-brutal bg-accent text-accent-foreground">Книга</span>
              <h3 className="heading-md text-primary-foreground">
                «Почему после 40 не поздно, или Есть ли жизнь после монастыря?»
              </h3>
              <p className="text-primary-foreground/80 text-lg">
                Эта книга — не мотивация и не инструкция. Это честный путь женщины через разрушение к&nbsp;новой сборке.
                Каждая глава — прожитый опыт, ставший картой для других.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 italic text-primary-foreground/90">
                «Я написала эту книгу не для того, чтобы вдохновить. А чтобы ты увидела: этот путь — возможен.»
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorStory;

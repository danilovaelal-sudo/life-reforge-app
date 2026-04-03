import { motion } from "framer-motion";
import bookCover from "@/assets/book-cover.png";

interface HeroProps {
  onStartJourney: () => void;
  onStartDiagnostic: () => void;
}

const Hero = ({ onStartJourney, onStartDiagnostic }: HeroProps) => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-primary">
      {/* Diagonal tear effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-background transform origin-top-right skew-x-[-6deg] translate-x-[10%] hidden md:block" />
      </div>

      <div className="relative z-10 section-padding min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="tag-brutal mb-6 inline-block">Трансформационный опыт</span>
            </motion.div>

            <motion.h1
              className="heading-xl text-primary-foreground md:text-foreground"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Почему
              <br />
              после{" "}
              <span className="text-accent inline-block transform rotate-[-2deg]">
                40
              </span>
              <br />
              <span className="italic">не поздно</span>
            </motion.h1>

            <motion.p
              className="body-lg text-primary-foreground/90 md:text-foreground/80 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Кризис — не конец. Это вход в&nbsp;новую сборку себя.
              <br />
              Ты не потеряна. Ты на пороге.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button onClick={onStartJourney} className="brutal-btn bg-accent text-accent-foreground">
                Начать путь
              </button>
              <button onClick={onStartDiagnostic} className="brutal-btn bg-secondary text-secondary-foreground">
                Пройти диагностику
              </button>
            </motion.div>

            <motion.p
              className="text-sm text-primary-foreground/60 md:text-muted-foreground italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Бесплатно · 12 минут · Персональный результат
            </motion.p>
          </div>

          {/* Right: Book + visual */}
          <motion.div
            className="relative hidden md:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="brutal-card-lg p-4 bg-background transform rotate-[3deg] hover:rotate-0 transition-transform duration-500">
              <img
                src={bookCover}
                alt="Книга «Почему после 40 не поздно» — Елена Данилова"
                className="w-72 h-auto"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 brutal-card p-4 bg-accent max-w-[220px] transform rotate-[-2deg]">
              <p className="text-sm font-bold text-accent-foreground">
                «Эта книга родилась из&nbsp;прожитого. Из&nbsp;боли, которая стала путём.»
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom marquee-like text */}
        <motion.div
          className="mt-16 border-t-[3px] border-primary-foreground/20 md:border-foreground/20 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/50 md:text-muted-foreground text-center">
            Твоя жизнь не закончилась — она просит новой формы
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

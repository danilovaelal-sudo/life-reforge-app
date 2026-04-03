import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Sparkles } from "lucide-react";

const emailSchema = z.string().trim().email({ message: "Введи корректный email" }).max(255);

const SubscriptionBlock = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setErrorMsg(result.error.errors[0].message);
      return;
    }
    if (!consent) {
      setErrorMsg("Пожалуйста, подтверди согласие");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <section className="section-padding bg-accent" id="subscribe">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent-foreground" />
            <h2 className="heading-md text-accent-foreground mb-4">Ты на пути</h2>
            <p className="body-lg text-accent-foreground/80">
              Проверь почту. Первое письмо уже ждёт тебя. Оно — начало нового маршрута.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-accent" id="subscribe">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="tag-brutal bg-secondary text-secondary-foreground mb-4 inline-block">Продолжение пути</span>
          <h2 className="heading-lg text-accent-foreground">
            7 писем
            <br />
            возвращения к&nbsp;себе
          </h2>
          <p className="body-lg text-accent-foreground/80 mt-4 max-w-lg mx-auto">
            Не рассылка. Не новости. Семь писем, каждое из&nbsp;которых — шаг глубже. Мягко, бережно, по-настоящему.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="brutal-card-lg bg-background p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider block mb-2">
                Твой email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@example.com"
                className="w-full p-4 border-2 border-foreground bg-card text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-5 h-5 border-2 border-foreground accent-primary"
              />
              <span className="text-sm text-muted-foreground">
                Я даю согласие на обработку персональных данных и получение писем. Ты можешь отписаться в любой момент.
              </span>
            </label>

            {errorMsg && (
              <p className="text-destructive font-bold text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="brutal-btn-primary w-full disabled:opacity-50"
            >
              {status === "loading" ? "Отправляю..." : "Продолжить путь"}
            </button>
          </div>
        </motion.form>

        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          {["Бесплатно", "Без спама", "Можно отписаться"].map((t) => (
            <div key={t} className="brutal-card bg-background p-3">
              <p className="text-xs font-bold uppercase tracking-wider">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBlock;

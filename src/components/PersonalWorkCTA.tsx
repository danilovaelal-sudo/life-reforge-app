import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Star, ArrowRight } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, "Введи имя").max(100),
  email: z.string().trim().email("Введи корректный email").max(255),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Необходимо согласие" }) }),
});

const PersonalWorkCTA = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", consent: false });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  if (status === "success") {
    return (
      <section className="section-padding bg-secondary text-secondary-foreground" id="personal-work">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Star className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h2 className="heading-md text-secondary-foreground mb-4">Заявка отправлена</h2>
            <p className="body-lg text-muted-foreground">
              Елена свяжется с тобой в&nbsp;ближайшее время. Это уже шаг. Важный и смелый.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-secondary text-secondary-foreground" id="personal-work">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="tag-brutal bg-primary text-primary-foreground mb-4 inline-block">Личная работа</span>
            <h2 className="heading-lg mb-6">
              Если чувствуешь,
              <br />
              что пришло
              <br />
              <span className="text-accent">время</span>
            </h2>

            <div className="space-y-4">
              {[
                "Если хочешь пройти этот переход не одной",
                "Если чувствуешь, что готова к глубокой личной работе",
                "Если тебе нужен проводник в новую сборку себя",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ArrowRight className="text-primary shrink-0 mt-1" size={20} />
                  <p className="text-lg">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 brutal-card bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Это не массовый курс. Это индивидуальная работа с&nbsp;Еленой — глубокая, бережная, трансформационная. Количество мест ограничено.
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="brutal-card-lg bg-card p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-md mb-6">Оставить заявку</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold uppercase tracking-wider block mb-1">Имя</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border-2 border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Как тебя зовут?"
                />
                {errors.name && <p className="text-destructive text-xs mt-1 font-bold">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-bold uppercase tracking-wider block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 border-2 border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="elena@example.com"
                />
                {errors.email && <p className="text-destructive text-xs mt-1 font-bold">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-bold uppercase tracking-wider block mb-1">Сообщение (по желанию)</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full p-3 border-2 border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Расскажи коротко о себе и своём запросе"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-1 w-5 h-5 accent-primary"
                />
                <span className="text-xs text-muted-foreground">
                  Я даю согласие на обработку персональных данных
                </span>
              </label>
              {errors.consent && <p className="text-destructive text-xs font-bold">{errors.consent}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="brutal-btn-primary w-full disabled:opacity-50"
              >
                {status === "loading" ? "Отправляю..." : "Отправить заявку"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default PersonalWorkCTA;

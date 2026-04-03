import { motion } from "framer-motion";
import type { Archetype } from "@/data/archetypes";
import IconSymbol from "./IconSymbol";

interface ArchetypeResultProps {
  primary: Archetype;
  secondary: Archetype | null;
}

const ArchetypeResult = ({ primary, secondary }: ArchetypeResultProps) => {
  return (
    <section className="section-padding bg-secondary text-secondary-foreground">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="tag-brutal bg-primary text-primary-foreground mb-4 inline-block">Архетип</span>
          <h2 className="heading-lg">
            Твой внутренний
            <br />
            <span className="text-accent">код перехода</span>
          </h2>
        </motion.div>

        {/* Primary archetype */}
        <motion.div
          className="brutal-card-lg p-8 md:p-12 mb-8"
          style={{ borderColor: primary.color }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4 mb-6">
            <IconSymbol name={primary.symbol} size={48} className="text-primary shrink-0" />
            <div>
              <span className="tag-brutal text-[10px]" style={{ backgroundColor: primary.color, color: "#fff", borderColor: primary.color }}>
                Основной архетип
              </span>
              <h3 className="heading-md mt-2 text-accent">{primary.name}</h3>
              <p className="text-muted-foreground text-lg">{primary.subtitle}</p>
            </div>
          </div>

          <p className="body-lg mb-8 text-accent">{primary.description}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Главная сила", value: primary.mainStrength, color: "bg-sage" },
              { label: "Тень", value: primary.shadow, color: "bg-sage" },
              { label: "Текущий вызов", value: primary.currentChallenge, color: "bg-primary" },
              { label: "Потенциал", value: primary.potential, color: "bg-gold" },
            ].map((item) => (
              <div key={item.label} className="brutal-card p-5">
                <span className={`tag-brutal text-[10px] ${item.color} text-primary-foreground`} style={{ borderColor: "currentColor" }}>
                  {item.label}
                </span>
                <p className="mt-3 text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 brutal-card bg-accent p-6">
            <h4 className="font-black text-lg font-heading mb-2">Направление роста</h4>
            <p className="text-accent-foreground/80">{primary.growthDirection}</p>
          </div>

          <div className="mt-6">
            <h4 className="font-black text-lg font-heading mb-4">Первые шаги</h4>
            <div className="space-y-2">
              {primary.firstSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 brutal-card p-4 bg-card">
                  <span className="font-black text-primary text-lg shrink-0">{i + 1}.</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 brutal-card p-4 bg-muted">
            <p className="text-sm">
              <strong>Твой ритм жизни:</strong> {primary.lifeRhythm}
            </p>
          </div>
        </motion.div>

        {/* Secondary archetype */}
        {secondary && (
          <motion.div
            className="brutal-card p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <IconSymbol name={secondary.symbol} size={32} className="text-primary" />
              <div>
                <span className="tag-brutal text-[10px]">Дополнительный архетип</span>
                <h4 className="text-xl font-black font-heading">{secondary.name}</h4>
              </div>
            </div>
            <p className="text-muted-foreground">{secondary.subtitle}. Этот архетип добавляет глубину и дополнительное измерение твоему пути.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ArchetypeResult;

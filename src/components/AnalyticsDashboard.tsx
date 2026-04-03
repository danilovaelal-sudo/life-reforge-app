import { motion } from "framer-motion";
import { useState } from "react";
import { scoreCategories } from "@/data/questions";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip, type TooltipProps } from "recharts";
import IconSymbol from "./IconSymbol";

interface AnalyticsDashboardProps {
  scores: Record<string, number>;
}

const maxScore = 20;

const colors = [
  "hsl(15, 70%, 48%)",
  "hsl(40, 70%, 55%)",
  "hsl(155, 25%, 42%)",
  "hsl(220, 55%, 50%)",
  "hsl(280, 40%, 45%)",
  "hsl(22, 55%, 52%)",
  "hsl(345, 35%, 38%)",
  "hsl(28, 25%, 30%)",
];

const categoryDescriptions: Record<string, string> = {
  energy: "Твой текущий уровень жизненной силы и способности действовать",
  selfContact: "Насколько глубоко ты чувствуешь и понимаешь себя",
  clarity: "Ясность понимания, куда ты движешься",
  selfTrust: "Вера в себя и свои решения",
  readiness: "Готовность начать движение к новому",
  resources: "Внутренние силы, на которые можешь опереться",
  purpose: "Ощущение смысла и направления жизни",
  stuckness: "Степень привязанности к прошлому опыту",
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="brutal-card bg-card p-4 max-w-[240px] border-2 border-foreground" style={{ boxShadow: "3px 3px 0 hsl(25 15% 15%)" }}>
      <p className="font-bold font-heading text-sm">{d.name}</p>
      <p className="text-2xl font-black font-heading mt-1" style={{ color: d.fill }}>{d.value}%</p>
      <p className="text-xs text-muted-foreground mt-1">{d.description}</p>
    </div>
  );
};

const AnalyticsDashboard = ({ scores }: AnalyticsDashboardProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const processedScores = scoreCategories.map((cat, i) => {
    const raw = scores[cat.key] || 0;
    const pct = Math.min(Math.round((raw / maxScore) * 100), 100);
    const displayPct = cat.key === "stuckness" ? 100 - pct : pct;
    const displayLabel = cat.key === "stuckness" ? "Свобода от прошлого" : cat.label;
    return { ...cat, label: displayLabel, raw, pct: displayPct, fill: colors[i], description: categoryDescriptions[cat.key] || "" };
  });

  const barData = processedScores.map((s) => ({
    name: s.label,
    value: s.pct,
    fill: s.fill,
    description: s.description,
  }));

  const sorted = [...processedScores].sort((a, b) => b.pct - a.pct);
  const strength = sorted[0];
  const growthArea = sorted[sorted.length - 1];

  const getLevel = (pct: number) => {
    if (pct >= 75) return { text: "Высокий", color: "text-sage" };
    if (pct >= 45) return { text: "Средний", color: "text-gold" };
    return { text: "Нуждается в внимании", color: "text-primary" };
  };

  return (
    <section className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="tag-brutal mb-4 inline-block">Аналитика</span>
          <h2 className="heading-lg">
            Твоя персональная
            <br />
            <span className="text-primary">карта состояния</span>
          </h2>
          <p className="body-lg text-muted-foreground mt-4 max-w-2xl">
            Это не оценка. Это зеркало. Нажми на любой показатель, чтобы узнать больше.
          </p>
        </motion.div>

        {/* Score cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {processedScores.map((score, i) => {
            const level = getLevel(score.pct);
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={score.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`brutal-card p-4 cursor-pointer transition-all duration-200 ${isActive ? "translate-x-1 translate-y-1 bg-accent" : "hover:translate-x-1 hover:translate-y-1"}`}
                style={isActive ? { boxShadow: "none" } : {}}
                onClick={() => setActiveIndex(isActive ? null : i)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <IconSymbol name={score.icon} size={20} className="text-primary" />
                  <span className={`text-xs font-bold uppercase tracking-wider ${level.color}`}>{level.text}</span>
                </div>

                {/* Progress bar */}
                <div className="h-3 border-2 border-foreground bg-muted mb-2">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: score.fill }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${score.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>

                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider">{score.label}</p>
                  <span className="text-lg font-black font-heading">{score.pct}%</span>
                </div>

                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-muted-foreground mt-2 leading-relaxed"
                  >
                    {score.description}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bar chart */}
        <motion.div
          className="brutal-card-lg p-6 md:p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="heading-md mb-6">Профиль внутренних ресурсов</h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11, fontWeight: 600 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }} />
                <Bar dataKey="value" barSize={20} radius={0}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} stroke="hsl(var(--foreground))" strokeWidth={2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            className="brutal-card bg-accent p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="tag-brutal bg-sage text-sage-foreground text-[10px]">Твоя сила</span>
            <h4 className="text-xl font-black font-heading mt-3 flex items-center gap-2">
              <IconSymbol name={strength.icon} size={22} />
              {strength.label}
            </h4>
            <p className="text-muted-foreground mt-2">
              Это твой самый мощный ресурс прямо сейчас. Опирайся на него.
            </p>
            <div className="mt-3 h-3 border-2 border-foreground">
              <div className="h-full bg-sage" style={{ width: `${strength.pct}%` }} />
            </div>
          </motion.div>

          <motion.div
            className="brutal-card bg-muted p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="tag-brutal bg-primary text-primary-foreground text-[10px]">Зона роста</span>
            <h4 className="text-xl font-black font-heading mt-3 flex items-center gap-2">
              <IconSymbol name={growthArea.icon} size={22} />
              {growthArea.label}
            </h4>
            <p className="text-muted-foreground mt-2">
              Здесь скрыт потенциал для трансформации. Не слабость, а приглашение.
            </p>
            <div className="mt-3 h-3 border-2 border-foreground">
              <div className="h-full bg-primary" style={{ width: `${growthArea.pct}%` }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;

import { motion } from "framer-motion";
import { scoreCategories } from "@/data/questions";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

interface AnalyticsDashboardProps {
  scores: Record<string, number>;
}

const maxScore = 20; // approximate max per category

const colors = [
  "hsl(12, 90%, 52%)", // primary
  "hsl(42, 90%, 55%)", // gold
  "hsl(150, 40%, 35%)", // sage
  "hsl(220, 70%, 50%)", // blue
  "hsl(280, 50%, 45%)", // purple
  "hsl(28, 80%, 45%)", // warm
  "hsl(350, 45%, 35%)", // deep
  "hsl(25, 30%, 25%)", // earth
];

const AnalyticsDashboard = ({ scores }: AnalyticsDashboardProps) => {
  const processedScores = scoreCategories.map((cat, i) => {
    const raw = scores[cat.key] || 0;
    const pct = Math.min(Math.round((raw / maxScore) * 100), 100);
    // Invert stuckness so higher = better
    const displayPct = cat.key === "stuckness" ? 100 - pct : pct;
    const displayLabel = cat.key === "stuckness" ? "Свобода от прошлого" : cat.label;
    return { ...cat, label: displayLabel, raw, pct: displayPct, fill: colors[i] };
  });

  const barData = processedScores.map((s) => ({
    name: s.label,
    value: s.pct,
    fill: s.fill,
  }));

  // Top strength and growth area
  const sorted = [...processedScores].sort((a, b) => b.pct - a.pct);
  const strength = sorted[0];
  const growthArea = sorted[sorted.length - 1];

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
            <span className="italic text-primary">карта состояния</span>
          </h2>
          <p className="body-lg text-muted-foreground mt-4 max-w-2xl">
            Это не оценка. Это зеркало. Посмотри на свою внутреннюю систему без осуждения.
          </p>
        </motion.div>

        {/* Score cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {processedScores.map((score, i) => (
            <motion.div
              key={score.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="brutal-card p-4 text-center"
            >
              <div className="text-2xl mb-1">{score.icon}</div>
              <div className="relative w-20 h-20 mx-auto my-2">
                <ResponsiveContainer>
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={[{ value: score.pct }]}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" fill={score.fill} background={{ fill: "hsl(var(--muted))" }} cornerRadius={0} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-black">
                  {score.pct}%
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider mt-1">{score.label}</p>
            </motion.div>
          ))}
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
                <Bar dataKey="value" barSize={20}>
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
            <h4 className="text-xl font-black font-serif mt-3">{strength.icon} {strength.label}</h4>
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
            <h4 className="text-xl font-black font-serif mt-3">{growthArea.icon} {growthArea.label}</h4>
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

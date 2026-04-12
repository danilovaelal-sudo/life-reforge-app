import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import type { Archetype } from "@/data/archetypes";

const emailSchema = z.object({
  email: z.string().trim().email("Введи корректный email").max(255),
});

interface SendResultsEmailProps {
  scores: Record<string, number>;
  primary: Archetype;
  secondary: Archetype | null;
}

const SendResultsEmail = ({ scores, primary, secondary }: SendResultsEmailProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");
    setStatus("loading");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ai-email-assistant", {
        body: {
          email: result.data.email,
          mode: "results",
          scores,
          archetype: {
            name: primary.name,
            subtitle: primary.subtitle,
            description: primary.description,
            mainStrength: primary.mainStrength,
            shadow: primary.shadow,
            currentChallenge: primary.currentChallenge,
            potential: primary.potential,
            growthDirection: primary.growthDirection,
            firstSteps: primary.firstSteps,
          },
          secondaryArchetype: secondary ? { name: secondary.name, subtitle: secondary.subtitle } : null,
        },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Произошла ошибка");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="brutal-card-lg p-8 bg-card text-center"
      >
        <CheckCircle className="mx-auto text-primary mb-4" size={40} />
        <h3 className="font-bold font-heading text-xl mb-2">Результаты отправлены!</h3>
        <p className="text-muted-foreground">
          AI подготовил персональный разбор твоих результатов и отправил на <strong>{email}</strong>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="section-padding bg-primary/10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-primary" size={24} />
          <Mail className="text-primary" size={24} />
        </div>
        <h3 className="heading-md mb-3">Получи полный разбор на почту</h3>
        <p className="text-muted-foreground mb-6">
          AI-помощник подготовит персональное письмо с детальным разбором твоих результатов, рекомендациями и первыми шагами
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 border-2 border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            placeholder="tvoy@email.com"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="brutal-btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Отправка...
              </>
            ) : (
              <>
                <Mail size={16} />
                Отправить
              </>
            )}
          </button>
        </form>

        {error && <p className="text-destructive text-sm mt-2 font-bold">{error}</p>}
        <p className="text-xs text-muted-foreground mt-3">
          Бесплатно · AI создаст уникальный разбор именно для тебя
        </p>
      </div>
    </motion.section>
  );
};

export default SendResultsEmail;

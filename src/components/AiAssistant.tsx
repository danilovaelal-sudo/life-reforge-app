import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().trim().email("Введи корректный email"),
  topic: z.string().trim().min(3, "Опиши тему подробнее").max(500),
});

interface AiAssistantProps {
  open: boolean;
  onClose: () => void;
}

const AiAssistant = ({ open, onClose }: AiAssistantProps) => {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse({ email, topic });
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
    setErrorMessage("");

    try {
      const { data, error } = await supabase.functions.invoke("ai-email-assistant", {
        body: { email: result.data.email, topic: result.data.topic },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Произошла ошибка. Попробуй ещё раз.");
    }
  };

  const handleReset = () => {
    setEmail("");
    setTopic("");
    setStatus("idle");
    setErrors({});
    setErrorMessage("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md brutal-card-lg bg-card p-6 sm:p-8 z-10"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 hover:bg-muted rounded-sm"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-foreground">
                <Sparkles className="text-primary-foreground" size={20} />
              </div>
              <div>
                <h3 className="font-bold font-heading text-lg">AI Помощник</h3>
                <p className="text-xs text-muted-foreground">Персональное письмо на твою почту</p>
              </div>
            </div>

            {status === "success" ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-sage mx-auto flex items-center justify-center border-2 border-foreground">
                  <Send className="text-sage-foreground" size={20} />
                </div>
                <h4 className="font-bold text-lg">Письмо отправлено!</h4>
                <p className="text-muted-foreground text-sm">
                  Проверь свою почту — AI подготовил для тебя персональное сообщение.
                </p>
                <button onClick={handleReset} className="brutal-btn-primary text-sm px-6 py-2">
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border-2 border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="tvoy@email.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1 font-bold">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-bold uppercase tracking-wider block mb-1">
                    О чём тебе написать?
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                    className="w-full p-3 border-2 border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                    placeholder="Например: мотивация для нового начала после 40, советы по самопознанию, как справиться с кризисом..."
                  />
                  {errors.topic && (
                    <p className="text-destructive text-xs mt-1 font-bold">{errors.topic}</p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-destructive text-xs font-bold">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="brutal-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      AI пишет письмо...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Получить письмо
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  AI создаст персональное вдохновляющее письмо и отправит на указанный email
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiAssistant;

export const AiAssistantFab = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
    style={{ boxShadow: "var(--brutal-shadow)" }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label="AI Помощник"
  >
    <MessageCircle size={24} />
  </motion.button>
);

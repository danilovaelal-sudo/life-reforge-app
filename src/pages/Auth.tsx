import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Loader2, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().trim().email("Введи корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/cabinet");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: result.data.email,
          password: result.data.password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({
          title: "Регистрация успешна!",
          description: "Проверь почту для подтверждения email.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: result.data.email,
          password: result.data.password,
        });
        if (error) throw error;
        navigate("/cabinet");
      }
    } catch (err: any) {
      toast({
        title: "Ошибка",
        description: err.message || "Что-то пошло не так",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} />
          На главную
        </button>

        <div className="brutal-card-lg bg-card p-8">
          <h1 className="font-heading font-bold text-2xl mb-2">
            {mode === "login" ? "Вход" : "Регистрация"}
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            {mode === "login"
              ? "Войди, чтобы увидеть сохранённые результаты"
              : "Создай аккаунт для сохранения результатов диагностики"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold uppercase tracking-wider block mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 border-2 border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="tvoy@email.com"
                />
              </div>
              {errors.email && <p className="text-destructive text-xs mt-1 font-bold">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-bold uppercase tracking-wider block mb-1">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border-2 border-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Минимум 6 символов"
                />
              </div>
              {errors.password && <p className="text-destructive text-xs mt-1 font-bold">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="brutal-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={18} /> Загрузка...</>
              ) : mode === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-muted-foreground">
            {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErrors({}); }}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              {mode === "login" ? "Зарегистрируйся" : "Войди"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

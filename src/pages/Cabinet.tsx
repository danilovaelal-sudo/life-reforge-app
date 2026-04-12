import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, ArrowLeft, Trash2, Calendar, Loader2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import { determineArchetype } from "@/data/archetypes";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import TransformationMap from "@/components/TransformationMap";
import ArchetypeResult from "@/components/ArchetypeResult";
import PersonalPath from "@/components/PersonalPath";
import InsightsBlock from "@/components/InsightsBlock";
import ThirtyDayPlan from "@/components/ThirtyDayPlan";

interface DiagnosticResult {
  id: string;
  scores: Record<string, number>;
  archetype_name: string;
  archetype_subtitle: string;
  secondary_archetype_name: string | null;
  secondary_archetype_subtitle: string | null;
  created_at: string;
}

const Cabinet = () => {
  const [user, setUser] = useState<User | null>(null);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<DiagnosticResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchResults();
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchResults = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("diagnostic_results")
      .select("*")
      .order("created_at", { ascending: false });
    setResults((data as DiagnosticResult[]) || []);
    setLoading(false);
  };

  const deleteResult = async (id: string) => {
    await supabase.from("diagnostic_results").delete().eq("id", id);
    setResults((prev) => prev.filter((r) => r.id !== id));
    if (selectedResult?.id === id) setSelectedResult(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Full results view
  if (selectedResult) {
    const archetype = determineArchetype(selectedResult.scores);
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-secondary/95 border-b-2 border-foreground px-4 py-3 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setSelectedResult(null)}
              className="flex items-center gap-2 text-secondary-foreground hover:text-primary cursor-pointer"
            >
              <ArrowLeft size={20} />
              <span className="font-heading font-bold text-lg">Назад к списку</span>
            </button>
            <span className="text-xs text-muted-foreground">{formatDate(selectedResult.created_at)}</span>
          </div>
        </header>

        <main>
          <div className="pt-6" />
          <AnalyticsDashboard scores={selectedResult.scores} />
          <TransformationMap scores={selectedResult.scores} />
          <ArchetypeResult primary={archetype.primary} secondary={archetype.secondary} />
          <PersonalPath />
          <InsightsBlock scores={selectedResult.scores} />
          <ThirtyDayPlan onSubscribe={() => {}} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary/95 border-b-2 border-foreground px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-secondary-foreground hover:text-primary cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-heading font-bold text-secondary-foreground text-lg">Личный кабинет</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-secondary-foreground hover:text-destructive cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="heading-md mb-6">Мои результаты диагностики</h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="brutal-card-lg bg-card p-8 text-center"
          >
            <p className="text-muted-foreground mb-4">У тебя пока нет сохранённых результатов</p>
            <button
              onClick={() => navigate("/")}
              className="brutal-btn-primary"
            >
              Пройти диагностику
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {results.map((result, i) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="brutal-card bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg">{result.archetype_name}</h3>
                    <p className="text-sm text-muted-foreground">{result.archetype_subtitle}</p>
                    {result.secondary_archetype_name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        + {result.secondary_archetype_name}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      <span>{formatDate(result.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedResult(result)}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 cursor-pointer brutal-btn-primary text-xs px-3 py-1"
                    >
                      <Eye size={14} />
                      Открыть
                    </button>
                    <button
                      onClick={() => deleteResult(result.id)}
                      className="text-muted-foreground hover:text-destructive p-1 cursor-pointer"
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Cabinet;

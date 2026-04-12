import { Home, FileText, BookOpen, Send, MessageCircle, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface TopNavProps {
  onNavigate: (sectionId: string) => void;
  onOpenAiAssistant: () => void;
}

const menuItems = [
  { title: "Главная", icon: Home, sectionId: "hero" },
  { title: "О книге", icon: BookOpen, sectionId: "author-story" },
  { title: "Диагностика", icon: FileText, sectionId: "diagnostic" },
  { title: "Контакт", icon: Send, sectionId: "personal-work" },
];

export function TopNav({ onNavigate, onOpenAiAssistant }: TopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur border-b-2 border-foreground">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-12 px-4">
        <span className="font-heading font-bold text-secondary-foreground text-sm tracking-wider">
          После 40 не поздно
        </span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => handleClick(item.sectionId)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/20 rounded transition-colors cursor-pointer"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </button>
          ))}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-accent hover:bg-primary/20 rounded transition-colors cursor-pointer font-bold"
          >
            <MessageCircle className="h-4 w-4" />
            <span>AI Помощник</span>
          </button>
          <button
            onClick={() => navigate(isLoggedIn ? "/cabinet" : "/auth")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/20 rounded transition-colors cursor-pointer ml-1 border border-secondary-foreground/30"
          >
            <User className="h-4 w-4" />
            <span>{isLoggedIn ? "Кабинет" : "Войти"}</span>
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-secondary-foreground p-1 cursor-pointer"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-secondary border-t border-foreground/20 px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => handleClick(item.sectionId)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-secondary-foreground hover:bg-primary/20 rounded transition-colors cursor-pointer"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </button>
          ))}
          <button
            onClick={() => { onOpenAiAssistant(); setMobileOpen(false); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-accent hover:bg-primary/20 rounded transition-colors cursor-pointer font-bold"
          >
            <MessageCircle className="h-4 w-4" />
            <span>AI Помощник</span>
          </button>
          <button
            onClick={() => { navigate(isLoggedIn ? "/cabinet" : "/auth"); setMobileOpen(false); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-secondary-foreground hover:bg-primary/20 rounded transition-colors cursor-pointer font-bold"
          >
            <User className="h-4 w-4" />
            <span>{isLoggedIn ? "Кабинет" : "Войти"}</span>
          </button>
        </nav>
      )}
    </header>
  );
}

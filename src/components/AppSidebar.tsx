import { Home, FileText, MessageCircle, BookOpen, Send, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAiAssistant: () => void;
}

const menuItems = [
  { title: "Главная", icon: Home, sectionId: "hero" },
  { title: "О книге", icon: BookOpen, sectionId: "author-story" },
  { title: "Диагностика", icon: FileText, sectionId: "diagnostic" },
  { title: "Контакт", icon: Send, sectionId: "personal-work" },
];

export function AppSidebar({ onNavigate, onOpenAiAssistant }: AppSidebarProps) {
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";

  const handleClick = (sectionId: string) => {
    onNavigate(sectionId);
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r-2 border-foreground">
      <SidebarContent className="bg-secondary text-secondary-foreground">
        <SidebarGroup>
          <SidebarGroupLabel className="text-secondary-foreground/60 uppercase tracking-widest text-xs font-bold">
            Навигация
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.sectionId}>
                  <SidebarMenuButton
                    onClick={() => handleClick(item.sectionId)}
                    className="text-secondary-foreground hover:bg-primary/20 cursor-pointer"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-secondary-foreground/60 uppercase tracking-widest text-xs font-bold">
            Инструменты
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    onOpenAiAssistant();
                    setOpenMobile(false);
                  }}
                  className="text-accent hover:bg-primary/20 cursor-pointer font-bold"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {!collapsed && <span>AI Помощник</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

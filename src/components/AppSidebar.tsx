import { LayoutDashboard, Play, Tag, Users, Layers, Eye } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Command Center", url: "/", icon: LayoutDashboard },
  { title: "Clip Explorer", url: "/clips", icon: Play },
  { title: "Brand Intelligence", url: "/brands", icon: Tag },
  { title: "Player Profiles", url: "/players", icon: Users },
  { title: "Multi-Angle Lab", url: "/multi-angle", icon: Layers },
  { title: "Buyer Lens", url: "/buyer-lens", icon: Eye },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-4 mb-2">
            {collapsed ? (
              <span className="font-display text-sm font-bold text-primary">CS</span>
            ) : (
              <span className="font-display text-base font-bold text-foreground">
                Court<span className="text-primary">Sense</span> AI
              </span>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = item.url === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {!collapsed && (
          <div className="px-3 py-3 text-[10px] font-mono-data text-muted-foreground leading-relaxed">
            <p>4,097 clips available</p>
            <p>15 analyzed · 3 prompt versions</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

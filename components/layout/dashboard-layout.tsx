"use client";

import * as React from "react";
import { Sidebar, SidebarItem } from "./sidebar";
import { DashboardHeader } from "./dashboard-header";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  pageTitle: string;
  subtitle?: string;
  appName?: string;
  user?: {
    name: string;
    role: string;
    initials?: string;
  };
  currentRole?: string;
}

export function DashboardLayout({
  children,
  sidebarItems,
  pageTitle,
  subtitle,
  appName = "Application",
  user,
  currentRole,
}: DashboardLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="h-screen bg-soft-bg overflow-hidden flex">
      <Sidebar
        items={sidebarItems}
        appName={appName}
        user={user}
        currentRole={currentRole}
        isOpen={isDesktop ? true : isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onCollapseChange={setIsSidebarCollapsed}
      />
      <div
        className={cn(
          "flex flex-col flex-1 h-screen transition-all duration-300 overflow-hidden",
          isDesktop && (isSidebarCollapsed ? "ml-16" : "ml-64")
        )}
      >
        <div className="flex-1 overflow-y-auto">
          <DashboardHeader
            pageTitle={pageTitle}
            subtitle={subtitle}
            user={user}
            onMenuClick={() => setIsMobileMenuOpen(true)}
          />
          <main>
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}


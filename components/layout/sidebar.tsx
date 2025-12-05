"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

export interface SidebarProps {
  items: SidebarItem[];
  appName?: string;
  user?: {
    name: string;
    role: string;
    initials?: string;
  };
  currentRole?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export function Sidebar({
  items,
  appName = "Application",
  user,
  currentRole,
  isOpen: controlledIsOpen,
  onClose,
  onCollapseChange,
}: SidebarProps) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const [internalIsCollapsed, setInternalIsCollapsed] = React.useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : true;
  const isCollapsed = isDesktop ? internalIsCollapsed : !isOpen;

  const handleToggle = () => {
    if (isDesktop) {
      const newCollapsed = !internalIsCollapsed;
      setInternalIsCollapsed(newCollapsed);
      onCollapseChange?.(newCollapsed);
    } else {
      onClose?.();
    }
  };

  const filteredItems = React.useMemo(() => {
    if (!currentRole) return items;
    return items.filter(
      (item) => !item.roles || item.roles.includes(currentRole)
    );
  }, [items, currentRole]);

  if (!isDesktop && !isOpen) return null;

  return (
    <>
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-white border-r border-stroke transition-all duration-300 z-50",
          isDesktop
            ? isCollapsed
              ? "w-16"
              : "w-64"
            : "w-64 transform translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 bg-dark-teal px-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-dark-teal font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-white">{appName}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="h-8 w-8 text-white hover:bg-white/10"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {filteredItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-dark-teal text-white"
                      : "text-body-text hover:bg-soft-bg hover:text-main-text",
                    isCollapsed && "justify-center"
                  )}
                  onClick={() => !isDesktop && onClose?.()}
                >
                  <span className={cn("w-5 h-5 flex-shrink-0", isCollapsed && "mx-auto")}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className={isDesktop ? "" : "sr-only"}>{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        {user && (
          <div className="border-t border-stroke p-4">
            {!isCollapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-soft-bg rounded-full flex items-center justify-center">
                  {user.initials ? (
                    <span className="text-xs font-medium text-main-text">
                      {user.initials}
                    </span>
                  ) : (
                    <User className="h-4 w-4 text-main-text" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-main-text truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-body-text truncate">{user.role}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-soft-bg rounded-full flex items-center justify-center">
                  {user.initials ? (
                    <span className="text-xs font-medium text-main-text">
                      {user.initials}
                    </span>
                  ) : (
                    <User className="h-4 w-4 text-main-text" />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}


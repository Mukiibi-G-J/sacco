"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, User, Menu, ChevronDown, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useClickOutside } from "@/hooks/use-click-outside";

export interface DashboardHeaderProps {
  pageTitle: string;
  subtitle?: string;
  user?: {
    name: string;
    role: string;
  };
  onMenuClick?: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function DashboardHeader({
  pageTitle,
  subtitle,
  user,
  onMenuClick,
  showSearch = true,
  showNotifications = true,
}: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 991px)");

  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-stroke px-6 flex items-center justify-between flex-shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {!isDesktop && onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-10 w-10"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {pageTitle && (
          <h1 className="text-xl font-bold text-main-text">{pageTitle}</h1>
        )}
        {!pageTitle && subtitle && (
          <p className="text-base text-body-text">{subtitle}</p>
        )}
      </div>

      {/* Center Section - Search (Desktop only) */}
      {isDesktop && showSearch && (
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-body-text pointer-events-none" />
            <Input
              type="search"
              placeholder="Search employees, payroll, reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {!isDesktop && showSearch && (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        {showNotifications && (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-error rounded-full" />
          </Button>
        )}

        {user && (
          <div ref={userMenuRef} className="relative">
            {isDesktop && (
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="h-10 px-2 gap-3"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-main-text">{user.name}</p>
                  <p className="text-xs text-body-text">{user.role}</p>
                </div>
                <div className="h-8 w-8 bg-soft-bg rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-main-text" />
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-body-text transition-transform",
                    isUserMenuOpen && "rotate-180"
                  )}
                />
              </Button>
            )}
            {!isDesktop && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="h-10 w-10"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="h-8 w-8 bg-soft-bg rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-main-text" />
                </div>
              </Button>
            )}

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-stroke rounded-lg shadow-large z-50">
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-main-text hover:bg-soft-bg">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-main-text hover:bg-soft-bg">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <div className="border-t border-stroke my-1" />
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}


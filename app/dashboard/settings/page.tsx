"use client";

import { useState } from "react";
import { DashboardLayout, SidebarItem } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { useToast } from "@/components/ui/toast";
import {
  Home,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  Save,
  Building2,
  DollarSign,
  Bell,
  User,
} from "lucide-react";

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: "Members",
    href: "/dashboard/members",
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: "Savings",
    href: "/dashboard/savings",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    label: "Loans",
    href: "/dashboard/loans",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: <Receipt className="h-5 w-5" />,
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/dashboard" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function SettingsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    saccoName: "SACCO Management System",
    currency: "KES",
    dateFormat: "DD/MM/YYYY",
    timeZone: "Africa/Nairobi",
  });

  const [interestRates, setInterestRates] = useState({
    loanInterestRate: "12",
    savingsInterestRate: "5",
  });

  const handleSaveGeneral = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast("Settings saved successfully!", "success");
    } catch (error) {
      showToast("Failed to save settings", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInterestRates = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast("Interest rates updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update interest rates", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Settings"
      subtitle="Manage system configuration and preferences"
      appName="SACCO Management"
      user={{
        name: "Sarah Johnson",
        role: "Manager",
        initials: "SJ",
      }}
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-main-text mb-2">Settings</h1>
        <p className="text-base text-body-text">
          Configure system settings, preferences, and parameters
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-stroke">
        {[
          { id: "general", label: "General", icon: <Building2 className="h-4 w-4" /> },
          { id: "interest", label: "Interest Rates", icon: <DollarSign className="h-4 w-4" /> },
          { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
          { id: "users", label: "Users", icon: <User className="h-4 w-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "text-dark-teal border-b-2 border-dark-teal"
                : "text-body-text hover:text-main-text"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-main-text">
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="SACCO Name"
              value={generalSettings.saccoName}
              onChange={(e) =>
                setGeneralSettings({ ...generalSettings, saccoName: e.target.value })
              }
            />
            <Select
              label="Currency"
              value={generalSettings.currency}
              onChange={(e) =>
                setGeneralSettings({ ...generalSettings, currency: e.target.value })
              }
              options={[
                { value: "KES", label: "KES - Kenyan Shilling" },
                { value: "USD", label: "USD - US Dollar" },
                { value: "EUR", label: "EUR - Euro" },
              ]}
            />
            <Select
              label="Date Format"
              value={generalSettings.dateFormat}
              onChange={(e) =>
                setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })
              }
              options={[
                { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
              ]}
            />
            <Select
              label="Time Zone"
              value={generalSettings.timeZone}
              onChange={(e) =>
                setGeneralSettings({ ...generalSettings, timeZone: e.target.value })
              }
              options={[
                { value: "Africa/Nairobi", label: "Africa/Nairobi (EAT)" },
                { value: "UTC", label: "UTC" },
              ]}
            />
            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                leftIcon={<Save className="h-4 w-4" />}
                onClick={handleSaveGeneral}
                loading={loading}
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interest Rates */}
      {activeTab === "interest" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-main-text">
              Interest Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Loan Interest Rate (%)"
              type="number"
              step="0.1"
              value={interestRates.loanInterestRate}
              onChange={(e) =>
                setInterestRates({ ...interestRates, loanInterestRate: e.target.value })
              }
            />
            <Input
              label="Savings Interest Rate (%)"
              type="number"
              step="0.1"
              value={interestRates.savingsInterestRate}
              onChange={(e) =>
                setInterestRates({ ...interestRates, savingsInterestRate: e.target.value })
              }
            />
            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                leftIcon={<Save className="h-4 w-4" />}
                onClick={handleSaveInterestRates}
                loading={loading}
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-main-text">
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-text">Notification settings coming soon...</p>
          </CardContent>
        </Card>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-main-text">
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-text">User management coming soon...</p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}


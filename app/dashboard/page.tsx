"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout, SidebarItem } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { RegisterMemberModal } from "@/components/modals/register-member-modal";
import { RecordContributionModal } from "@/components/modals/record-contribution-modal";
import { mockStore } from "@/lib/mock-data";
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  Plus,
  ArrowRight,
  Home,
  Wallet,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
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
  { label: "Dashboard", href: "/dashboard" },
];

const stats = [
  {
    title: "Total Members",
    value: "1,247",
    change: "+5.2%",
    changeType: "positive" as const,
    comparison: "vs last month",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Total Savings",
    value: "KES 12.5M",
    change: "+12.5%",
    changeType: "positive" as const,
    comparison: "vs last month",
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    title: "Active Loans",
    value: "342",
    change: "+8.1%",
    changeType: "positive" as const,
    comparison: "vs last month",
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    title: "Total Revenue",
    value: "KES 2.3M",
    change: "+15.3%",
    changeType: "positive" as const,
    comparison: "vs last month",
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

const activities = [
  {
    icon: <Users className="h-5 w-5" />,
    message: "New member registered: John Doe",
    timestamp: "2 hours ago",
  },
  {
    icon: <Wallet className="h-5 w-5" />,
    message: "Monthly contributions processed for 1,200 members",
    timestamp: "5 hours ago",
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    message: "Loan application approved: KES 50,000",
    timestamp: "1 day ago",
  },
  {
    icon: <Receipt className="h-5 w-5" />,
    message: "Loan repayment received: KES 25,000",
    timestamp: "1 day ago",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState([
    {
      title: "Total Members",
      value: "0",
      change: "+0%",
      changeType: "positive" as const,
      comparison: "vs last month",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Total Savings",
      value: "KES 0",
      change: "+0%",
      changeType: "positive" as const,
      comparison: "vs last month",
      icon: <Wallet className="h-6 w-6" />,
    },
    {
      title: "Active Loans",
      value: "0",
      change: "+0%",
      changeType: "positive" as const,
      comparison: "vs last month",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      title: "Total Revenue",
      value: "KES 0",
      change: "+0%",
      changeType: "positive" as const,
      comparison: "vs last month",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ]);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const members = mockStore.getMembers();
    const savingsAccounts = mockStore.getSavingsAccounts();
    const loans = mockStore.getLoans();
    const activeLoans = loans.filter((l) => l.status === "active");
    
    const totalSavings = savingsAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.principalAmount, 0);
    
    setStats([
      {
        title: "Total Members",
        value: members.length.toLocaleString(),
        change: "+5.2%",
        changeType: "positive" as const,
        comparison: "vs last month",
        icon: <Users className="h-6 w-6" />,
      },
      {
        title: "Total Savings",
        value: `KES ${(totalSavings / 1000000).toFixed(1)}M`,
        change: "+12.5%",
        changeType: "positive" as const,
        comparison: "vs last month",
        icon: <Wallet className="h-6 w-6" />,
      },
      {
        title: "Active Loans",
        value: activeLoans.length.toString(),
        change: "+8.1%",
        changeType: "positive" as const,
        comparison: "vs last month",
        icon: <CreditCard className="h-6 w-6" />,
      },
      {
        title: "Total Revenue",
        value: `KES ${(totalLoanAmount / 1000000).toFixed(1)}M`,
        change: "+15.3%",
        changeType: "positive" as const,
        comparison: "vs last month",
        icon: <TrendingUp className="h-6 w-6" />,
      },
    ]);
  };

  const quickActions = [
    {
      label: "Register Member",
      icon: <Users className="h-4 w-4" />,
      onClick: () => setIsRegisterModalOpen(true),
    },
    {
      label: "Record Contribution",
      icon: <Wallet className="h-4 w-4" />,
      onClick: () => setIsContributionModalOpen(true),
    },
    {
      label: "Process Loan",
      icon: <CreditCard className="h-4 w-4" />,
      onClick: () => router.push("/dashboard/loans"),
    },
  ];

  const handleRegisterSuccess = () => {
    loadDashboardData();
  };

  const handleContributionSuccess = () => {
    loadDashboardData();
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Dashboard"
      subtitle=""
      appName="SACCO Management"
      user={{
        name: "Sarah Johnson",
        role: "HR Manager",
        initials: "SJ",
      }}
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-main-text mb-2">Dashboard</h1>
        <p className="text-base text-body-text">
          Welcome back! Here's an overview of your SACCO operations.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-body-text mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-main-text">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-soft-teal-bg/50 rounded-lg flex items-center justify-center">
                  <div className="text-dark-teal">{stat.icon}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-body-text">
                  {stat.comparison}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-main-text">
                Recent Activity
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard/transactions")}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-soft-bg transition-colors"
                >
                  <div className="w-10 h-10 bg-soft-teal-bg rounded-lg flex items-center justify-center">
                    <div className="text-dark-teal">{activity.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-main-text">
                      {activity.message}
                    </p>
                    <p className="text-xs text-body-text">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-main-text">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={action.onClick}
                >
                  <span className="mr-2">{action.icon}</span>
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <RegisterMemberModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={handleRegisterSuccess}
      />

      <RecordContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        onSuccess={handleContributionSuccess}
      />
    </DashboardLayout>
  );
}


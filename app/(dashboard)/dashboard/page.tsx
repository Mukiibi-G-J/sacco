"use client";

import { DashboardLayout, SidebarItem } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import {
  Users,
  DollarSign,
  FileText,
  Clock,
  Plus,
  ArrowRight,
  Home,
  Calculator,
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
    label: "Employees",
    href: "/dashboard/employees",
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: "Payroll",
    href: "/dashboard/payroll",
    icon: <Calculator className="h-5 w-5" />,
  },
  {
    label: "Time Tracking",
    href: "/dashboard/time-tracking",
    icon: <Clock className="h-5 w-5" />,
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
    title: "Total Employees",
    value: "9",
    change: "+5.2%",
    changeType: "positive" as const,
    comparison: "vs last month",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "This Month Payroll",
    value: "$45,230",
    change: "+12.5%",
    changeType: "positive" as const,
    comparison: "vs last month",
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    title: "Pending Approvals",
    value: "1",
    change: "-2",
    changeType: "negative" as const,
    comparison: "vs last month",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: "Time Entries",
    value: "1,234",
    change: "+8.1%",
    changeType: "positive" as const,
    comparison: "vs last month",
    icon: <Clock className="h-6 w-6" />,
  },
];

const activities = [
  {
    icon: <DollarSign className="h-5 w-5" />,
    message: "Payroll processed for 127 employees",
    timestamp: "2 hours ago",
  },
];

const quickActions = [
  { label: "Add Employee", icon: <Users className="h-4 w-4" /> },
  { label: "Process Payroll", icon: <Calculator className="h-4 w-4" /> },
];

export default function DashboardPage() {
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
          Welcome back! Here's what's happening with your payroll.
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
              <Button variant="outline" size="sm">
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
                >
                  <span className="mr-2">{action.icon}</span>
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


"use client";

import { DashboardLayout, SidebarItem } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import {
  Home,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  Download,
  FileText,
  TrendingUp,
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
  { label: "Reports", href: "/dashboard/reports" },
];

const reportCategories = [
  {
    title: "Member Reports",
    description: "Member lists, registrations, and demographics",
    icon: <Users className="h-6 w-6" />,
    reports: [
      { name: "Member List", description: "Complete list of all members" },
      { name: "New Members", description: "Members registered in a period" },
      { name: "Member Status", description: "Active, inactive, and suspended members" },
    ],
  },
  {
    title: "Savings Reports",
    description: "Savings accounts, contributions, and balances",
    icon: <Wallet className="h-6 w-6" />,
    reports: [
      { name: "Savings Summary", description: "Total savings and account balances" },
      { name: "Contribution Report", description: "Monthly and annual contributions" },
      { name: "Account Statements", description: "Individual account statements" },
    ],
  },
  {
    title: "Loan Reports",
    description: "Loan applications, approvals, and repayments",
    icon: <CreditCard className="h-6 w-6" />,
    reports: [
      { name: "Loan Portfolio", description: "Active loans and outstanding amounts" },
      { name: "Loan Applications", description: "Pending and processed applications" },
      { name: "Repayment Schedule", description: "Loan repayment schedules" },
      { name: "Default Report", description: "Defaulted loans and recovery" },
    ],
  },
  {
    title: "Financial Statements",
    description: "Income statements, balance sheets, and cash flow",
    icon: <TrendingUp className="h-6 w-6" />,
    reports: [
      { name: "Income Statement", description: "Revenue and expenses summary" },
      { name: "Balance Sheet", description: "Assets, liabilities, and equity" },
      { name: "Cash Flow Statement", description: "Cash inflows and outflows" },
    ],
  },
];

export default function ReportsPage() {
  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Reports"
      subtitle="Generate and view system reports"
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
        <h1 className="text-2xl font-bold text-main-text mb-2">Reports</h1>
        <p className="text-base text-body-text">
          Generate and download reports for members, savings, loans, and financial statements
        </p>
      </div>

      {/* Report Categories */}
      <div className="space-y-6">
        {reportCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-soft-teal-bg rounded-lg flex items-center justify-center">
                  <div className="text-dark-teal">{category.icon}</div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-main-text">
                    {category.title}
                  </CardTitle>
                  <p className="text-sm text-body-text mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.reports.map((report, reportIndex) => (
                  <Card
                    key={reportIndex}
                    className="border border-stroke hover:border-dark-teal transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-main-text mb-1">
                            {report.name}
                          </h3>
                          <p className="text-xs text-body-text">
                            {report.description}
                          </p>
                        </div>
                        <FileText className="h-4 w-4 text-body-text flex-shrink-0 ml-2" />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Download className="h-3 w-3" />}
                        >
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}


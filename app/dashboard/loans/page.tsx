"use client";

import { useState } from "react";
import { DashboardLayout, SidebarItem } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  Search,
  Plus,
  Filter,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Loan, LoanApplication } from "@/lib/types/sacco";

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
  { label: "Loans", href: "/dashboard/loans" },
];

// Mock data
const mockLoans: Loan[] = [
  {
    id: "1",
    applicationId: "1",
    memberId: "1",
    loanNumber: "LN001",
    principalAmount: 50000,
    interestRate: 12,
    totalAmount: 56000,
    remainingBalance: 45000,
    repaymentPeriod: 12,
    monthlyPayment: 4666.67,
    disbursementDate: "2023-06-01",
    dueDate: "2024-06-01",
    status: "active",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "2",
    applicationId: "2",
    memberId: "2",
    loanNumber: "LN002",
    principalAmount: 100000,
    interestRate: 15,
    totalAmount: 115000,
    remainingBalance: 0,
    repaymentPeriod: 24,
    monthlyPayment: 4791.67,
    disbursementDate: "2022-01-01",
    dueDate: "2024-01-01",
    status: "completed",
    createdAt: "2022-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

const mockApplications: LoanApplication[] = [
  {
    id: "3",
    memberId: "1",
    amount: 75000,
    purpose: "Business expansion",
    repaymentPeriod: 18,
    interestRate: 12,
    status: "pending",
    appliedDate: "2024-01-10",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];

export default function LoansPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"loans" | "applications">("loans");
  const [loans] = useState<Loan[]>(mockLoans);
  const [applications] = useState<LoanApplication[]>(mockApplications);

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      searchQuery === "" ||
      loan.loanNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "" || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      searchQuery === "" ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "default";
      case "defaulted":
        return "error";
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.principalAmount, 0);
  const activeLoans = loans.filter((l) => l.status === "active").length;
  const pendingApplications = applications.filter((a) => a.status === "pending").length;

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Loans"
      subtitle="Manage loan applications and active loans"
      appName="SACCO Management"
      user={{
        name: "Sarah Johnson",
        role: "Manager",
        initials: "SJ",
      }}
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-main-text mb-2">Loans</h1>
          <p className="text-base text-body-text">
            Manage loan applications and track repayments
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
          New Application
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-body-text mb-1">
                  Total Loan Amount
                </p>
                <p className="text-2xl font-bold text-main-text">
                  {formatCurrency(totalLoanAmount)}
                </p>
              </div>
              <div className="w-12 h-12 bg-soft-teal-bg/50 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-dark-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-body-text mb-1">
                  Active Loans
                </p>
                <p className="text-2xl font-bold text-main-text">
                  {activeLoans}
                </p>
              </div>
              <div className="w-12 h-12 bg-soft-teal-bg/50 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-dark-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-body-text mb-1">
                  Pending Applications
                </p>
                <p className="text-2xl font-bold text-main-text">
                  {pendingApplications}
                </p>
              </div>
              <div className="w-12 h-12 bg-soft-teal-bg/50 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-dark-teal" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-stroke">
        <button
          onClick={() => setActiveTab("loans")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "loans"
              ? "text-dark-teal border-b-2 border-dark-teal"
              : "text-body-text hover:text-main-text"
          }`}
        >
          Active Loans ({loans.length})
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "applications"
              ? "text-dark-teal border-b-2 border-dark-teal"
              : "text-body-text hover:text-main-text"
          }`}
        >
          Applications ({applications.length})
        </button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by loan number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                placeholder="Filter by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: "", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "completed", label: "Completed" },
                  { value: "defaulted", label: "Defaulted" },
                  { value: "pending", label: "Pending" },
                ]}
              />
            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              More Filters
            </Button>
            <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      {activeTab === "loans" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-main-text">
              Active Loans ({filteredLoans.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stroke">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Loan Number
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Member
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Principal
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Remaining
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Monthly Payment
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-main-text">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-body-text">
                        No loans found
                      </td>
                    </tr>
                  ) : (
                    filteredLoans.map((loan) => (
                      <tr
                        key={loan.id}
                        className="border-b border-stroke hover:bg-soft-bg transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-main-text font-medium">
                          {loan.loanNumber}
                        </td>
                        <td className="py-3 px-4 text-sm text-body-text">
                          Member {loan.memberId}
                        </td>
                        <td className="py-3 px-4 text-sm text-main-text">
                          {formatCurrency(loan.principalAmount)}
                        </td>
                        <td className="py-3 px-4 text-sm text-main-text font-semibold">
                          {formatCurrency(loan.remainingBalance)}
                        </td>
                        <td className="py-3 px-4 text-sm text-body-text">
                          {formatCurrency(loan.monthlyPayment)}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusBadgeVariant(loan.status)}>
                            {loan.status.charAt(0).toUpperCase() +
                              loan.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Repayment
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applications Table */}
      {activeTab === "applications" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-main-text">
              Loan Applications ({filteredApplications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stroke">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Application ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Member
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Purpose
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Period (Months)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-main-text">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-body-text">
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-stroke hover:bg-soft-bg transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-main-text font-medium">
                          {app.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-body-text">
                          Member {app.memberId}
                        </td>
                        <td className="py-3 px-4 text-sm text-main-text">
                          {formatCurrency(app.amount)}
                        </td>
                        <td className="py-3 px-4 text-sm text-body-text">
                          {app.purpose}
                        </td>
                        <td className="py-3 px-4 text-sm text-body-text">
                          {app.repaymentPeriod}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusBadgeVariant(app.status)}>
                            {app.status.charAt(0).toUpperCase() +
                              app.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            {app.status === "pending" && (
                              <>
                                <Button variant="ghost" size="sm">
                                  Approve
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}


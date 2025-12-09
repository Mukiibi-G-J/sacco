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
  Filter,
  Download,
  Plus,
} from "lucide-react";
import { Transaction } from "@/lib/types/sacco";

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
  { label: "Transactions", href: "/dashboard/transactions" },
];

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    memberId: "1",
    type: "contribution",
    amount: 5000,
    currency: "KES",
    description: "Monthly contribution",
    reference: "REF001",
    status: "completed",
    transactionDate: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    memberId: "2",
    type: "loan-repayment",
    amount: 10000,
    currency: "KES",
    description: "Loan repayment",
    reference: "REF002",
    status: "completed",
    transactionDate: "2024-01-14T14:30:00Z",
    createdAt: "2024-01-14T14:30:00Z",
  },
  {
    id: "3",
    memberId: "1",
    type: "loan-disbursement",
    amount: 50000,
    currency: "KES",
    description: "Loan disbursement",
    reference: "REF003",
    status: "completed",
    transactionDate: "2024-01-13T09:15:00Z",
    createdAt: "2024-01-13T09:15:00Z",
  },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [transactions] = useState<Transaction[]>(mockTransactions);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      searchQuery === "" ||
      transaction.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "" || transaction.type === typeFilter;
    const matchesStatus = statusFilter === "" || transaction.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeLabel = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      case "cancelled":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Transactions"
      subtitle="View and manage all transactions"
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
          <h1 className="text-2xl font-bold text-main-text mb-2">
            Transactions
          </h1>
          <p className="text-base text-body-text">
            View and manage all system transactions
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
          New Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by reference or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                placeholder="Filter by type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                options={[
                  { value: "", label: "All Types" },
                  { value: "contribution", label: "Contribution" },
                  { value: "loan-repayment", label: "Loan Repayment" },
                  { value: "loan-disbursement", label: "Loan Disbursement" },
                  { value: "deposit", label: "Deposit" },
                  { value: "withdrawal", label: "Withdrawal" },
                ]}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                placeholder="Filter by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: "", label: "All Status" },
                  { value: "completed", label: "Completed" },
                  { value: "pending", label: "Pending" },
                  { value: "failed", label: "Failed" },
                  { value: "cancelled", label: "Cancelled" },
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

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-main-text">
            Transaction History ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Reference
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Amount
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
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-body-text">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-stroke hover:bg-soft-bg transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-body-text">
                        {new Date(transaction.transactionDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-main-text font-medium">
                        {transaction.reference || "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-body-text">
                        {getTypeLabel(transaction.type)}
                      </td>
                      <td className="py-3 px-4 text-sm text-body-text">
                        {transaction.description || "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-main-text font-semibold">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusBadgeVariant(transaction.status)}>
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Receipt
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
    </DashboardLayout>
  );
}


"use client";

import { useState, useEffect } from "react";
import { DashboardLayout, SidebarItem } from "@/components/layout";
import { RecordContributionModal } from "@/components/modals/record-contribution-modal";
import { mockStore } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Download,
  TrendingUp,
} from "lucide-react";
import { SavingsAccount, SavingsTransaction } from "@/lib/types/sacco";

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
  { label: "Savings", href: "/dashboard/savings" },
];

export default function SavingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accounts, setAccounts] = useState<SavingsAccount[]>([]);
  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      const allAccounts = mockStore.getSavingsAccounts();
      const allTransactions = mockStore.getSavingsTransactions();
      setAccounts(allAccounts);
      setTransactions(allTransactions);
      setLoading(false);
    }, 300);
  };

  const handleContributionSuccess = () => {
    loadData();
  };

  const filteredAccounts = accounts.filter((account) => {
    return (
      searchQuery === "" ||
      account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalSavings = accounts.reduce((sum, account) => sum + account.balance, 0);
  const activeAccounts = accounts.filter((a) => a.status === "active").length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Savings"
      subtitle="Manage member savings and contributions"
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
          <h1 className="text-2xl font-bold text-main-text mb-2">Savings</h1>
          <p className="text-base text-body-text">
            Track and manage member savings accounts
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setIsContributionModalOpen(true)}
        >
          Record Contribution
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-body-text mb-1">
                  Total Savings
                </p>
                <p className="text-2xl font-bold text-main-text">
                  {formatCurrency(totalSavings)}
                </p>
              </div>
              <div className="w-12 h-12 bg-soft-teal-bg/50 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-dark-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-body-text mb-1">
                  Active Accounts
                </p>
                <p className="text-2xl font-bold text-main-text">
                  {activeAccounts}
                </p>
              </div>
              <div className="w-12 h-12 bg-soft-teal-bg/50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-dark-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-body-text mb-1">
                  This Month Contributions
                </p>
                <p className="text-2xl font-bold text-main-text">
                  {formatCurrency(
                    transactions
                      .filter((t) => t.type === "contribution")
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-soft-teal-bg/50 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-dark-teal" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <Input
            placeholder="Search by account number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-main-text">
              Savings Accounts ({filteredAccounts.length})
            </CardTitle>
            <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Account Number
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Member
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Balance
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
                {filteredAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-body-text">
                      No accounts found
                    </td>
                  </tr>
                ) : (
                  filteredAccounts.map((account) => (
                    <tr
                      key={account.id}
                      className="border-b border-stroke hover:bg-soft-bg transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-main-text font-medium">
                        {account.accountNumber}
                      </td>
                      <td className="py-3 px-4 text-sm text-body-text">
                        {(() => {
                          const member = mockStore.getMember(account.memberId);
                          return member
                            ? `${member.memberNumber} - ${member.firstName} ${member.lastName}`
                            : `Member ${account.memberId}`;
                        })()}
                      </td>
                      <td className="py-3 px-4 text-sm text-main-text font-semibold">
                        {formatCurrency(account.balance)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            account.status === "active" ? "success" : "default"
                          }
                        >
                          {account.status.charAt(0).toUpperCase() +
                            account.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Statement
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

      <RecordContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        onSuccess={handleContributionSuccess}
      />
    </DashboardLayout>
  );
}


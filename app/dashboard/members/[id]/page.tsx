"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { DashboardLayout, SidebarItem } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { EditMemberModal } from "@/components/modals/edit-member-modal";
import { mockStore } from "@/lib/mock-data";
import { useToast } from "@/components/ui/toast";
import {
  Home,
  Users,
  Wallet,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
  ArrowLeft,
  Edit,
  FileText,
  DollarSign,
} from "lucide-react";
import { Member, SavingsAccount, Loan } from "@/lib/types/sacco";

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

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const memberId = params.id as string;

  const [member, setMember] = useState<Member | null>(null);
  const [savingsAccount, setSavingsAccount] = useState<SavingsAccount | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    loadMemberData();
  }, [memberId]);

  const loadMemberData = () => {
    setLoading(true);
    setTimeout(() => {
      const memberData = mockStore.getMember(memberId);
      if (memberData) {
        setMember(memberData);
        const account = mockStore.getSavingsAccountByMemberId(memberId);
        setSavingsAccount(account || null);
        const memberLoans = mockStore.getLoans().filter((l) => l.memberId === memberId);
        setLoans(memberLoans);
      } else {
        showToast("Member not found", "error");
        router.push("/dashboard/members");
      }
      setLoading(false);
    }, 300);
  };

  const handleEditSuccess = () => {
    loadMemberData();
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "default";
      case "suspended":
        return "error";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <DashboardLayout
        sidebarItems={sidebarItems}
        pageTitle="Member Details"
        subtitle=""
        appName="SACCO Management"
        user={{
          name: "Sarah Johnson",
          role: "Manager",
          initials: "SJ",
        }}
      >
        <div className="flex items-center justify-center py-12">
          <p className="text-body-text">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!member) {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/dashboard" },
    { label: "Members", href: "/dashboard/members" },
    { label: member.firstName + " " + member.lastName, href: `/dashboard/members/${memberId}` },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Member Details"
      subtitle={`Viewing details for ${member.firstName} ${member.lastName}`}
      appName="SACCO Management"
      user={{
        name: "Sarah Johnson",
        role: "Manager",
        initials: "SJ",
      }}
    >
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/members")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-main-text mb-2">
              {member.firstName} {member.lastName}
            </h1>
            <p className="text-base text-body-text">Member Number: {member.memberNumber}</p>
          </div>
        </div>
        <Button
          variant="primary"
          leftIcon={<Edit className="h-4 w-4" />}
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-main-text">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-body-text mb-1">First Name</p>
                  <p className="text-sm font-medium text-main-text">{member.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-body-text mb-1">Last Name</p>
                  <p className="text-sm font-medium text-main-text">{member.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-body-text mb-1">Email</p>
                  <p className="text-sm font-medium text-main-text">
                    {member.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-body-text mb-1">Phone</p>
                  <p className="text-sm font-medium text-main-text">{member.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-body-text mb-1">ID Number</p>
                  <p className="text-sm font-medium text-main-text">{member.idNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-body-text mb-1">Date of Birth</p>
                  <p className="text-sm font-medium text-main-text">
                    {member.dateOfBirth
                      ? new Date(member.dateOfBirth).toLocaleDateString()
                      : "Not provided"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-body-text mb-1">Address</p>
                  <p className="text-sm font-medium text-main-text">
                    {member.address || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-body-text mb-1">Join Date</p>
                  <p className="text-sm font-medium text-main-text">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-body-text mb-1">Status</p>
                  <Badge variant={getStatusBadgeVariant(member.status)}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Savings Account */}
          {savingsAccount && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-main-text">
                  Savings Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-body-text mb-1">Account Number</p>
                    <p className="text-sm font-medium text-main-text">
                      {savingsAccount.accountNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-body-text mb-1">Balance</p>
                    <p className="text-lg font-bold text-main-text">
                      {formatCurrency(savingsAccount.balance)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-body-text mb-1">Status</p>
                    <Badge
                      variant={savingsAccount.status === "active" ? "success" : "default"}
                    >
                      {savingsAccount.status.charAt(0).toUpperCase() +
                        savingsAccount.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/savings/${savingsAccount.id}`)}
                    >
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" leftIcon={<FileText className="h-4 w-4" />}>
                      Statement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loans */}
          {loans.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-main-text">Active Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loans.map((loan) => (
                    <div
                      key={loan.id}
                      className="p-4 border border-stroke rounded-lg hover:bg-soft-bg transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-main-text">{loan.loanNumber}</p>
                          <p className="text-xs text-body-text">
                            Principal: {formatCurrency(loan.principalAmount)}
                          </p>
                        </div>
                        <Badge variant={loan.status === "active" ? "success" : "default"}>
                          {loan.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-body-text">
                        <div>
                          <span>Remaining: </span>
                          <span className="font-medium text-main-text">
                            {formatCurrency(loan.remainingBalance)}
                          </span>
                        </div>
                        <div>
                          <span>Monthly: </span>
                          <span className="font-medium text-main-text">
                            {formatCurrency(loan.monthlyPayment)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={() => router.push(`/dashboard/loans/${loan.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-main-text">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Wallet className="h-4 w-4" />}
                onClick={() => router.push("/dashboard/savings")}
              >
                Record Contribution
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<CreditCard className="h-4 w-4" />}
                onClick={() => router.push("/dashboard/loans")}
              >
                New Loan Application
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<FileText className="h-4 w-4" />}
              >
                Generate Statement
              </Button>
            </CardContent>
          </Card>

          {savingsAccount && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-main-text">
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-body-text">Account Balance</span>
                    <span className="text-sm font-bold text-main-text">
                      {formatCurrency(savingsAccount.balance)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-body-text">Active Loans</span>
                    <span className="text-sm font-medium text-main-text">
                      {loans.filter((l) => l.status === "active").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-body-text">Total Loan Amount</span>
                    <span className="text-sm font-medium text-main-text">
                      {formatCurrency(
                        loans.reduce((sum, loan) => sum + loan.principalAmount, 0)
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {isEditModalOpen && member && (
        <EditMemberModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          member={member}
          onSuccess={handleEditSuccess}
        />
      )}
    </DashboardLayout>
  );
}


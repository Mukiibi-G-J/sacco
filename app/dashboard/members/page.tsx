"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout, SidebarItem } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { RegisterMemberModal } from "@/components/modals/register-member-modal";
import { mockStore } from "@/lib/mock-data";
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
} from "lucide-react";
import { Member } from "@/lib/types/sacco";

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
  { label: "Members", href: "/dashboard/members" },
];

export default function MembersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const allMembers = mockStore.getMembers();
      setMembers(allMembers);
      setLoading(false);
    }, 300);
  };

  const handleRegisterSuccess = () => {
    loadMembers();
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      searchQuery === "" ||
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.memberNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Members"
      subtitle="Manage SACCO members and their information"
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
          <h1 className="text-2xl font-bold text-main-text mb-2">Members</h1>
          <p className="text-base text-body-text">
            View and manage all SACCO members
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setIsRegisterModalOpen(true)}
        >
          Register Member
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, member number, or phone..."
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
                  { value: "inactive", label: "Inactive" },
                  { value: "suspended", label: "Suspended" },
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

      {/* Members Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-main-text">
              Members List ({filteredMembers.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Member Number
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-main-text">
                    Join Date
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
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-body-text">
                      No members found
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-stroke hover:bg-soft-bg transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-main-text font-medium">
                        {member.memberNumber}
                      </td>
                      <td className="py-3 px-4 text-sm text-main-text">
                        {member.firstName} {member.lastName}
                      </td>
                      <td className="py-3 px-4 text-sm text-body-text">
                        {member.phone}
                      </td>
                      <td className="py-3 px-4 text-sm text-body-text">
                        {member.email || "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-body-text">
                        {new Date(member.joinDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusBadgeVariant(member.status)}>
                          {member.status.charAt(0).toUpperCase() +
                            member.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/dashboard/members/${member.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/dashboard/members/${member.id}?edit=true`)}
                          >
                            Edit
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

      <RegisterMemberModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={handleRegisterSuccess}
      />
    </DashboardLayout>
  );
}


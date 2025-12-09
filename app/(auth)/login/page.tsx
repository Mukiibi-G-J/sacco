"use client";

import * as React from "react";
import { useState } from "react";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/error-message";
import { useToast } from "@/components/ui/toast";
import { mockStore } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

interface Role {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  iconColor: string;
}

const roles: Role[] = [
  {
    value: "admin",
    label: "Administrator",
    description: "Full system access and configuration",
    icon: <User className="h-6 w-6" />,
    color: "blue",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    value: "manager",
    label: "Manager",
    description: "Loan approvals, reports, and member management",
    icon: <User className="h-6 w-6" />,
    color: "green",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    value: "accountant",
    label: "Accountant",
    description: "Savings, loans, transactions, and financial reports",
    icon: <User className="h-6 w-6" />,
    color: "purple",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    value: "loan-officer",
    label: "Loan Officer",
    description: "Loan applications, member verification, and collections",
    icon: <User className="h-6 w-6" />,
    color: "orange",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    value: "member",
    label: "Member",
    description: "View savings, apply for loans, and view statements",
    icon: <User className="h-6 w-6" />,
    color: "teal",
    bgColor: "bg-soft-teal-bg",
    iconColor: "text-dark-teal",
  },
];

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Manager" },
  { value: "accountant", label: "Accountant" },
  { value: "loan-officer", label: "Loan Officer" },
  { value: "member", label: "Member" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    // Check if user is already logged in
    const currentUser = mockStore.getCurrentUser();
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock authentication
      const user = mockStore.authenticateUser(email, password);
      
      if (user) {
        showToast("Login successful!", "success");
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
        showToast("Invalid credentials", "error");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (roleValue: string) => {
    setSelectedRole(roleValue);
    // Auto-fill email based on role
    const roleEmails: Record<string, string> = {
      admin: "admin@sacco.com",
      manager: "manager@sacco.com",
      accountant: "accountant@sacco.com",
      "loan-officer": "loanofficer@sacco.com",
      member: "member@sacco.com",
    };
    if (roleEmails[roleValue]) {
      setEmail(roleEmails[roleValue]);
      setPassword("password123"); // Default password for demo
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-teal-bg via-white to-soft-teal-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-md">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-dark-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-main-text mb-2">
                  Welcome to SACCO Management System
                </h1>
                <p className="text-base text-body-text">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <ErrorMessage message={error} className="mb-6" />
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  leftIcon={<Mail className="h-4 w-4" />}
                />

                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  leftIcon={<Lock className="h-4 w-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="hover:text-main-text"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                />

                <Select
                  label="Role (Optional)"
                  placeholder="Select your role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  options={roleOptions}
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  loading={loading}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Footer Link */}
              <p className="text-center text-sm text-body-text mt-6">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-dark-teal hover:text-primary-accent transition-colors"
                >
                  Contact administrator
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Role Selection */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-main-text mb-2">
                Demo Roles
              </h2>
              <p className="text-base text-body-text">
                Click on a role card to quickly fill in demo credentials
              </p>
            </div>

            {/* Role Cards */}
            <div className="space-y-4 mb-6">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className={`
                    w-full p-4 rounded-lg border-2 transition-colors
                    ${role.bgColor}
                    ${selectedRole === role.value 
                      ? "border-dark-teal" 
                      : "border-transparent hover:border-soft-teal-bg"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-12 h-12 ${role.bgColor} rounded-lg flex items-center justify-center
                    `}>
                      <div className={role.iconColor}>{role.icon}</div>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-main-text">
                        {role.label}
                      </h3>
                      <p className="text-sm text-body-text">
                        {role.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-body-text" />
                  </div>
                </button>
              ))}
            </div>

            {/* Demo Credentials */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Demo Credentials
                </h3>
                <p className="text-sm text-blue-700 mb-2">
                  Use these credentials to sign in to the demo:
                </p>
                <div className="bg-blue-100 rounded px-2 py-1 mb-2 inline-block">
                  <code className="text-xs text-blue-900">
                    demo@example.com / password123
                  </code>
                </div>
                <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
                  <li>Admin: admin@sacco.com (any password)</li>
                  <li>Manager: manager@sacco.com (any password)</li>
                  <li>Accountant: accountant@sacco.com (any password)</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2 font-semibold">
                  Note: For demo, any password will work with these emails
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


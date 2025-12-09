// SACCO Management System TypeScript Types

export type UserRole = "admin" | "manager" | "accountant" | "loan-officer" | "member" | "auditor";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  idNumber: string;
  dateOfBirth?: string;
  address?: string;
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  savingsAccount?: SavingsAccount;
  createdAt: string;
  updatedAt: string;
}

export interface SavingsAccount {
  id: string;
  memberId: string;
  accountNumber: string;
  balance: number;
  currency: string;
  status: "active" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface SavingsTransaction {
  id: string;
  accountId: string;
  memberId: string;
  type: "deposit" | "withdrawal" | "contribution" | "interest";
  amount: number;
  balance: number;
  description?: string;
  reference?: string;
  transactionDate: string;
  createdBy?: string;
  createdAt: string;
}

export interface LoanApplication {
  id: string;
  memberId: string;
  member?: Member;
  amount: number;
  purpose: string;
  repaymentPeriod: number; // in months
  interestRate: number;
  status: "pending" | "approved" | "rejected" | "disbursed";
  appliedDate: string;
  approvedDate?: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  applicationId: string;
  memberId: string;
  member?: Member;
  loanNumber: string;
  principalAmount: number;
  interestRate: number;
  totalAmount: number;
  remainingBalance: number;
  repaymentPeriod: number;
  monthlyPayment: number;
  disbursementDate: string;
  dueDate: string;
  status: "active" | "completed" | "defaulted" | "written-off";
  createdAt: string;
  updatedAt: string;
}

export interface LoanRepayment {
  id: string;
  loanId: string;
  amount: number;
  principal: number;
  interest: number;
  penalty?: number;
  paymentDate: string;
  paymentMethod: "cash" | "mobile-money" | "bank-transfer" | "cheque";
  reference?: string;
  receivedBy?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  memberId?: string;
  type: "deposit" | "withdrawal" | "transfer" | "loan-disbursement" | "loan-repayment" | "contribution";
  amount: number;
  currency: string;
  description?: string;
  reference?: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  transactionDate: string;
  createdBy?: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalMembers: number;
  activeMembers: number;
  totalSavings: number;
  totalLoans: number;
  activeLoans: number;
  totalLoanAmount: number;
  totalRevenue: number;
  pendingLoanApplications: number;
  recentTransactions: Transaction[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}


"use client";

import {
  Member,
  SavingsAccount,
  Loan,
  LoanApplication,
  Transaction,
  SavingsTransaction,
  User,
} from "@/lib/types/sacco";
import {
  seedMembers,
  seedSavingsAccounts,
  seedLoans,
  seedLoanApplications,
  seedTransactions,
  seedSavingsTransactions,
  seedUsers,
} from "./seed";

const STORAGE_KEYS = {
  members: "sacco_mock_members",
  savingsAccounts: "sacco_mock_savings_accounts",
  loans: "sacco_mock_loans",
  loanApplications: "sacco_mock_loan_applications",
  transactions: "sacco_mock_transactions",
  savingsTransactions: "sacco_mock_savings_transactions",
  users: "sacco_mock_users",
  currentUser: "sacco_current_user",
};

class MockDataStore {
  // Initialize data from localStorage or seed data
  private getStoredData<T>(key: string, seedData: T[]): T[] {
    if (typeof window === "undefined") return seedData;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return seedData;
      }
    }
    return seedData;
  }

  private setStoredData<T>(key: string, data: T[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Members
  getMembers(): Member[] {
    return this.getStoredData(STORAGE_KEYS.members, seedMembers);
  }

  getMember(id: string): Member | undefined {
    return this.getMembers().find((m) => m.id === id);
  }

  addMember(member: Omit<Member, "id" | "createdAt" | "updatedAt">): Member {
    const members = this.getMembers();
    const newMember: Member = {
      ...member,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    members.push(newMember);
    this.setStoredData(STORAGE_KEYS.members, members);
    return newMember;
  }

  updateMember(id: string, updates: Partial<Member>): Member | null {
    const members = this.getMembers();
    const index = members.findIndex((m) => m.id === id);
    if (index === -1) return null;
    members[index] = {
      ...members[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.setStoredData(STORAGE_KEYS.members, members);
    return members[index];
  }

  deleteMember(id: string): boolean {
    const members = this.getMembers();
    const filtered = members.filter((m) => m.id !== id);
    if (filtered.length === members.length) return false;
    this.setStoredData(STORAGE_KEYS.members, filtered);
    return true;
  }

  // Savings Accounts
  getSavingsAccounts(): SavingsAccount[] {
    return this.getStoredData(STORAGE_KEYS.savingsAccounts, seedSavingsAccounts);
  }

  getSavingsAccountByMemberId(memberId: string): SavingsAccount | undefined {
    return this.getSavingsAccounts().find((a) => a.memberId === memberId);
  }

  addSavingsAccount(
    account: Omit<SavingsAccount, "id" | "createdAt" | "updatedAt">
  ): SavingsAccount {
    const accounts = this.getSavingsAccounts();
    const newAccount: SavingsAccount = {
      ...account,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    accounts.push(newAccount);
    this.setStoredData(STORAGE_KEYS.savingsAccounts, accounts);
    return newAccount;
  }

  updateSavingsAccountBalance(
    accountId: string,
    amount: number
  ): SavingsAccount | null {
    const accounts = this.getSavingsAccounts();
    const index = accounts.findIndex((a) => a.id === accountId);
    if (index === -1) return null;
    accounts[index].balance += amount;
    accounts[index].updatedAt = new Date().toISOString();
    this.setStoredData(STORAGE_KEYS.savingsAccounts, accounts);
    return accounts[index];
  }

  // Savings Transactions
  getSavingsTransactions(accountId?: string): SavingsTransaction[] {
    const transactions = this.getStoredData(
      STORAGE_KEYS.savingsTransactions,
      seedSavingsTransactions
    );
    if (accountId) {
      return transactions.filter((t) => t.accountId === accountId);
    }
    return transactions;
  }

  addSavingsTransaction(
    transaction: Omit<SavingsTransaction, "id" | "createdAt">
  ): SavingsTransaction {
    const transactions = this.getSavingsTransactions();
    const newTransaction: SavingsTransaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    transactions.push(newTransaction);
    this.setStoredData(STORAGE_KEYS.savingsTransactions, transactions);
    return newTransaction;
  }

  // Loans
  getLoans(): Loan[] {
    return this.getStoredData(STORAGE_KEYS.loans, seedLoans);
  }

  getLoan(id: string): Loan | undefined {
    return this.getLoans().find((l) => l.id === id);
  }

  addLoan(loan: Omit<Loan, "id" | "createdAt" | "updatedAt">): Loan {
    const loans = this.getLoans();
    const newLoan: Loan = {
      ...loan,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    loans.push(newLoan);
    this.setStoredData(STORAGE_KEYS.loans, loans);
    return newLoan;
  }

  updateLoan(id: string, updates: Partial<Loan>): Loan | null {
    const loans = this.getLoans();
    const index = loans.findIndex((l) => l.id === id);
    if (index === -1) return null;
    loans[index] = {
      ...loans[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.setStoredData(STORAGE_KEYS.loans, loans);
    return loans[index];
  }

  // Loan Applications
  getLoanApplications(): LoanApplication[] {
    return this.getStoredData(
      STORAGE_KEYS.loanApplications,
      seedLoanApplications
    );
  }

  getLoanApplication(id: string): LoanApplication | undefined {
    return this.getLoanApplications().find((a) => a.id === id);
  }

  addLoanApplication(
    application: Omit<LoanApplication, "id" | "createdAt" | "updatedAt">
  ): LoanApplication {
    const applications = this.getLoanApplications();
    const newApplication: LoanApplication = {
      ...application,
      id: Date.now().toString(),
      appliedDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    applications.push(newApplication);
    this.setStoredData(STORAGE_KEYS.loanApplications, applications);
    return newApplication;
  }

  updateLoanApplication(
    id: string,
    updates: Partial<LoanApplication>
  ): LoanApplication | null {
    const applications = this.getLoanApplications();
    const index = applications.findIndex((a) => a.id === id);
    if (index === -1) return null;
    applications[index] = {
      ...applications[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.setStoredData(STORAGE_KEYS.loanApplications, applications);
    return applications[index];
  }

  // Transactions
  getTransactions(): Transaction[] {
    return this.getStoredData(STORAGE_KEYS.transactions, seedTransactions);
  }

  addTransaction(
    transaction: Omit<Transaction, "id" | "createdAt">
  ): Transaction {
    const transactions = this.getTransactions();
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    transactions.push(newTransaction);
    this.setStoredData(STORAGE_KEYS.transactions, transactions);
    return newTransaction;
  }

  // Users & Authentication
  getUsers(): User[] {
    return this.getStoredData(STORAGE_KEYS.users, seedUsers);
  }

  authenticateUser(email: string, password: string): User | null {
    // Mock authentication - accept any password for demo
    // Make email matching case-insensitive
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.getUsers().find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );
    if (user && user.isActive) {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
      }
      return user;
    }
    return null;
  }

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  }

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
    }
  }

  // Reset all data to seed
  resetData(): void {
    if (typeof window === "undefined") return;
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}

export const mockStore = new MockDataStore();


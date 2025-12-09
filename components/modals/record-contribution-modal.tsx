"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/components/ui/toast";
import { mockStore } from "@/lib/mock-data";
import { Member, SavingsAccount } from "@/lib/types/sacco";

interface RecordContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function RecordContributionModal({
  isOpen,
  onClose,
  onSuccess,
}: RecordContributionModalProps) {
  const { showToast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [members, setMembers] = React.useState<Member[]>([]);
  const [savingsAccounts, setSavingsAccounts] = React.useState<SavingsAccount[]>([]);

  const [formData, setFormData] = React.useState({
    memberId: "",
    accountId: "",
    amount: "",
    description: "",
    reference: "",
    transactionDate: new Date().toISOString().split("T")[0],
  });

  React.useEffect(() => {
    if (isOpen) {
      const allMembers = mockStore.getMembers().filter((m) => m.status === "active");
      const allAccounts = mockStore.getSavingsAccounts();
      setMembers(allMembers);
      setSavingsAccounts(allAccounts);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (formData.memberId) {
      const account = savingsAccounts.find((a) => a.memberId === formData.memberId);
      if (account) {
        setFormData((prev) => ({ ...prev, accountId: account.id }));
      }
    }
  }, [formData.memberId, savingsAccounts]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.memberId) {
      newErrors.memberId = "Please select a member";
    }
    if (!formData.accountId) {
      newErrors.accountId = "Savings account not found for this member";
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!formData.transactionDate) {
      newErrors.transactionDate = "Please select a date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReference = () => {
    const timestamp = Date.now();
    return `CONT${timestamp.toString().slice(-8)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const amount = parseFloat(formData.amount);
      const account = savingsAccounts.find((a) => a.id === formData.accountId);
      
      if (!account) {
        throw new Error("Account not found");
      }

      // Update account balance
      const updatedAccount = mockStore.updateSavingsAccountBalance(
        formData.accountId,
        amount
      );

      if (!updatedAccount) {
        throw new Error("Failed to update account");
      }

      // Add savings transaction
      mockStore.addSavingsTransaction({
        accountId: formData.accountId,
        memberId: formData.memberId,
        type: "contribution",
        amount,
        balance: updatedAccount.balance,
        description: formData.description || "Monthly contribution",
        reference: formData.reference || generateReference(),
        transactionDate: new Date(formData.transactionDate).toISOString(),
      });

      // Add general transaction
      mockStore.addTransaction({
        memberId: formData.memberId,
        type: "contribution",
        amount,
        currency: "KES",
        description: formData.description || "Monthly contribution",
        reference: formData.reference || generateReference(),
        status: "completed",
        transactionDate: new Date(formData.transactionDate).toISOString(),
      });

      showToast("Contribution recorded successfully!", "success");
      onSuccess?.();
      handleClose();
    } catch (error) {
      showToast("Failed to record contribution", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      memberId: "",
      accountId: "",
      amount: "",
      description: "",
      reference: "",
      transactionDate: new Date().toISOString().split("T")[0],
    });
    setErrors({});
    onClose();
  };

  const memberOptions = members.map((member) => ({
    value: member.id,
    label: `${member.memberNumber} - ${member.firstName} ${member.lastName}`,
  }));

  const selectedMember = members.find((m) => m.id === formData.memberId);
  const selectedAccount = savingsAccounts.find((a) => a.id === formData.accountId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Record Contribution"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Member"
          value={formData.memberId}
          onChange={(e) => setFormData({ ...formData, memberId: e.target.value, accountId: "" })}
          options={[
            { value: "", label: "Select a member" },
            ...memberOptions,
          ]}
          required
          error={errors.memberId}
        />

        {selectedAccount && (
          <div className="p-3 bg-soft-bg rounded-lg">
            <p className="text-sm text-body-text">Account Number:</p>
            <p className="text-sm font-medium text-main-text">
              {selectedAccount.accountNumber}
            </p>
            <p className="text-sm text-body-text mt-1">Current Balance:</p>
            <p className="text-sm font-semibold text-main-text">
              KES {selectedAccount.balance.toLocaleString()}
            </p>
          </div>
        )}

        <Input
          label="Amount (KES)"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0.00"
          required
          error={errors.amount}
        />

        <DatePicker
          label="Transaction Date"
          value={formData.transactionDate}
          onChange={(value) => setFormData({ ...formData, transactionDate: value })}
          required
          error={errors.transactionDate}
          max={new Date().toISOString().split("T")[0]}
        />

        <Input
          label="Description (Optional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="e.g., Monthly contribution"
        />

        <Input
          label="Reference Number (Optional)"
          value={formData.reference}
          onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
          placeholder="Auto-generated if left empty"
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Record Contribution
          </Button>
        </div>
      </form>
    </Modal>
  );
}


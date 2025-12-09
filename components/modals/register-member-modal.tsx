"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/components/ui/toast";
import { mockStore } from "@/lib/mock-data";
import { Member } from "@/lib/types/sacco";

interface RegisterMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (member: Member) => void;
}

export function RegisterMemberModal({
  isOpen,
  onClose,
  onSuccess,
}: RegisterMemberModalProps) {
  const { showToast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    dateOfBirth: "",
    address: "",
  });

  const [files, setFiles] = React.useState<File[]>([]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Invalid phone number format";
    }
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "ID number is required";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate member number
      const members = mockStore.getMembers();
      const memberNumber = `MEM${String(members.length + 1).padStart(3, "0")}`;

      const newMember = mockStore.addMember({
        memberNumber,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email || undefined,
        phone: formData.phone,
        idNumber: formData.idNumber,
        dateOfBirth: formData.dateOfBirth || undefined,
        address: formData.address || undefined,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      });

      // Create savings account for new member
      const accountNumber = `SAV${String(members.length + 1).padStart(3, "0")}`;
      mockStore.addSavingsAccount({
        memberId: newMember.id,
        accountNumber,
        balance: 0,
        currency: "KES",
        status: "active",
      });

      showToast("Member registered successfully!", "success");
      onSuccess?.(newMember);
      handleClose();
    } catch (error) {
      showToast("Failed to register member", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      idNumber: "",
      dateOfBirth: "",
      address: "",
    });
    setFiles([]);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Register New Member"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
            error={errors.lastName}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+254712345678"
            required
            error={errors.phone}
          />
          <Input
            label="Email (Optional)"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="ID Number"
            value={formData.idNumber}
            onChange={(e) =>
              setFormData({ ...formData, idNumber: e.target.value })
            }
            required
            error={errors.idNumber}
          />
          <DatePicker
            label="Date of Birth (Optional)"
            value={formData.dateOfBirth}
            onChange={(value) =>
              setFormData({ ...formData, dateOfBirth: value })
            }
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <Input
          label="Address (Optional)"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Street address, City"
        />

        <FileUpload
          label="Documents (Optional)"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          value={files}
          onChange={setFiles}
          maxSize={5}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Register Member
          </Button>
        </div>
      </form>
    </Modal>
  );
}


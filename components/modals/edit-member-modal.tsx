"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/components/ui/toast";
import { mockStore } from "@/lib/mock-data";
import { Member } from "@/lib/types/sacco";

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
  onSuccess?: () => void;
}

export function EditMemberModal({
  isOpen,
  onClose,
  member,
  onSuccess,
}: EditMemberModalProps) {
  const { showToast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [formData, setFormData] = React.useState({
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email || "",
    phone: member.phone,
    idNumber: member.idNumber,
    dateOfBirth: member.dateOfBirth || "",
    address: member.address || "",
    status: member.status,
  });

  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email || "",
        phone: member.phone,
        idNumber: member.idNumber,
        dateOfBirth: member.dateOfBirth || "",
        address: member.address || "",
        status: member.status,
      });
      setErrors({});
    }
  }, [isOpen, member]);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updated = mockStore.updateMember(member.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email || undefined,
        phone: formData.phone,
        idNumber: formData.idNumber,
        dateOfBirth: formData.dateOfBirth || undefined,
        address: formData.address || undefined,
        status: formData.status as "active" | "inactive" | "suspended",
      });

      if (updated) {
        showToast("Member updated successfully!", "success");
        onSuccess?.();
        handleClose();
      } else {
        showToast("Failed to update member", "error");
      }
    } catch (error) {
      showToast("Failed to update member", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Member"
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

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "active" | "inactive" | "suspended",
            })
          }
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "suspended", label: "Suspended" },
          ]}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}


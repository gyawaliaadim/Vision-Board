// components/custom/RewardForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface RewardFormProps {
  rewardTitle?: string;
  rewardDescription?: string;
  rewardId?: string;
  xpReward?: number;
  creatingReward: boolean;
  onCancel: () => void;
}

export default function RewardForm({
  rewardTitle = "",
  rewardDescription = "",
  rewardId = "",
  xpReward = 0,
  creatingReward = false,
  onCancel,
}: RewardFormProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const [form, setForm] = useState({
    rewardTitle,
    rewardDescription,
    xpReward,
  });

  const [errors, setErrors] = useState<{ rewardTitle?: string; xpReward?: string }>({});

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.rewardTitle.trim()) newErrors.rewardTitle = "Title is required";
    if (form.xpReward < 0) newErrors.xpReward = "XP Reward must be ≥ 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const payload = {
        userId: session?.user?.id, // <-- important
        title: form.rewardTitle.trim(),
        description: form.rewardDescription?.trim() ?? "",
        priceXp: form.xpReward,
      };

      const res = rewardId
        ? await axios.put(`${process.env.NEXT_PUBLIC_API}/rewardDetails`, {
            id: rewardId,
            ...payload,
          })
        : await axios.post(`${process.env.NEXT_PUBLIC_API}/rewardDetails`, payload);

      if (res.data.success) {
        // Invalidate specific query for this user
        const userId= session?.user?.id;
        if (userId) {

          await queryClient.invalidateQueries({ queryKey: ["rewards", userId] });
        }
      }

      onCancel();
    } catch (error) {
      console.error("Error saving reward:", error);
    }
  };

  return (
    <div className="w-[300px] min-h-[180px] p-4 rounded-lg shadow-lg bg-white text-black dark:bg-black dark:text-white">
      {/* Title */}
      <div className="mb-4">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={form.rewardTitle} onChange={(e) => handleChange("rewardTitle", e.target.value)} />
        {errors.rewardTitle && <p className="text-red-500 text-sm">{errors.rewardTitle}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={form.rewardDescription} onChange={(e) => handleChange("rewardDescription", e.target.value)} rows={3} />
      </div>

      {/* XP Reward */}
      <div className="mb-4">
        <Label htmlFor="xpReward">XP</Label>
        <Input id="xpReward" type="number" value={form.xpReward} onChange={(e) => handleChange("xpReward", Number(e.target.value))} />
        {errors.xpReward && <p className="text-red-500 text-sm">{errors.xpReward}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="button" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSubmit}>
          {creatingReward || !rewardId ? "Add Reward" : "Save Reward"}
        </Button>
      </div>
    </div>
  );
}

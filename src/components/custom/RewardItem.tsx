"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface RewardItemProps {
  rewardTitle: string;
  rewardDescription?: string;
  xpReward: number;
  handleEdit: () => void;
  rewardId?: string;
}

export default function RewardItem({
  rewardTitle,
  rewardDescription,
  xpReward,
  handleEdit,
  rewardId,
}: RewardItemProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const handleDeleteReward = async () => {
    const userChoice = confirm("Are you sure you want to delete this reward?");
    if (!userChoice) return;

    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API}/rewardDetails`, {
        data: { id: rewardId },
      });
      if (res.data.success) queryClient.invalidateQueries();
    } catch (error) {
      console.error("Error deleting reward:", error);
    }
  };

// components/custom/RewardItem.tsx
const handleClaimReward = async () => {
  try {
    const userId = session?.user?.id;
    if (!userId) throw new Error("Not authenticated");

    const res = await axios.put(`${process.env.NEXT_PUBLIC_API}/xpUsed`, {
      rewardId,
      userId,
    });

    if (res.data.success) {
      // invalidate rewards owned by this user and user profile (xp)
      alert("Reward claimed successfully!");
      await queryClient.invalidateQueries({ queryKey:["rewards", userId]});
      await queryClient.invalidateQueries({ queryKey:["user", userId]});
      console.log (res.data.message);
    } else {
      console.log(res.data.message || "Purchase failed");
    }
  } catch (err: any) {
    console.log("Error claiming reward:", err?.response?.data || err?.message);
    alert(err?.response?.data?.message || "Failed to purchase");
  }
};

  return (
    <div
      className={clsx(
        "w-[200px] p-4 rounded-lg shadow-lg min-h-[100px] h-min",
        "bg-white text-black dark:bg-black dark:text-white",
        "flex flex-col space-y-2 border-2 dark:border-gray-700 border-gray-300"
      )}
    >
      {/* Actions */}
      <div className="flex justify-end items-center space-x-2">
        <Button size="icon-sm" variant="outline" onClick={handleEdit}>
          <PencilIcon className="w-4 h-4" />
        </Button>
        <Button size="icon-sm" variant="destructive" onClick={handleDeleteReward}>
          <TrashIcon className="w-4 h-4" />
        </Button>
        <Button
          size="icon-sm"
          onClick={handleClaimReward}
          className={clsx(
            "bg-linear-to-r from-[#374893] to-[#a94a79] text-white",
            "hover:scale-110 focus:shadow-[0_0_30px_rgba(200,110,180,0.9)] hover:shadow-[0_0_30px_rgba(200,110,180,0.9)]",
            "focus:brightness-110 hover:brightness-110",
            "transition-all duration-200 ease-out rounded cursor-pointer"
          )}
        >
          {xpReward}
        </Button>
      </div>

      {/* Reward Title */}
      <div className="font-semibold wrap-break-word">{rewardTitle}</div>

      {/* Reward Description */}
      {rewardDescription && (
        <div className="text-sm text-gray-700 dark:text-gray-300 wrap-break-word">
          {rewardDescription}
        </div>
      )}
    </div>
  );
}

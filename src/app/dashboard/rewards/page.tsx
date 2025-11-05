"use client";

import React, { useState, useEffect } from "react";
import RewardManager from "@/components/custom/RewardManager";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import RewardCreate from "@/components/custom/RewardCreate";
import { useNavigation } from "@/store/NavigationContext";
import { RewardItemType } from "@/types/models"; // make sure Reward type exists
import { useQueryClient } from "@tanstack/react-query";
export default function RewardsPage() {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const queryClient = useQueryClient();
  const { navigate } = useNavigation();
  // Fetch user XP

  const fetchRewards = async (): Promise<RewardItemType[] | null> => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/rewardDetails`, {
        params: { userId: session?.user.id },
      });
      if (res.data.success) return res.data.data;
      return null;
    } catch (error) {
      console.error("Error fetching rewards:", error);
      navigate("/dashboard");
      return null;
    }
  };
  // Trigger glow when XP changes
  const { data: rewardItems, isLoading, error, refetch } = useQuery({
    queryKey: ["rewards", session?.user.id],
    queryFn: fetchRewards,
    enabled: !!session?.user.id,
  });

  return (
    <div className="p-6 h-full w-full">
      <h1 className="text-2xl font-bold mb-2">Rewards Dashboard</h1>
      <div className="mb-6 flex items-center gap-3">

      </div>

      <p className="mb-6 text-gray-700 dark:text-gray-300">
        You can create new rewards, edit existing ones, or purchase them with your XP.
      </p>
      <div className="flex flex-wrap gap-5 items-start">
        {rewardItems &&
          rewardItems.map((reward, index) => (
            <RewardManager
              key={reward.id ?? index}
              rewardId={reward.id}
              rewardTitle={reward.title}
              rewardDescription={reward.description ?? ""}
              xpReward={reward.priceXp}
            />
          ))}
        <RewardCreate />
      </div>


    </div>
  );
}

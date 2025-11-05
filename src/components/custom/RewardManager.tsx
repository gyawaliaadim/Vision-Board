import React, { useState } from "react";
import RewardForm from "@/components/custom/RewardForm";
import RewardItem from "@/components/custom/RewardItem";

interface Reward {
  id?: string;
  title?: string;
  description?: string;
  xpReward?: number;
}

interface RewardManagerProps {
  rewardId?: string;
  rewardTitle?: string;
  rewardDescription?: string;
  xpReward?: number;
}

const RewardManager = ({
  rewardId,
  rewardTitle,
  rewardDescription,
  xpReward,
}: RewardManagerProps) => {
  const [editingReward, setEditingReward] = useState(false);

  return editingReward ? (
    <RewardForm
      creatingReward={false}
      rewardId={rewardId}
      rewardTitle={rewardTitle}
      rewardDescription={rewardDescription}
      xpReward={xpReward}
      onCancel={() => setEditingReward(false)}
    />
  ) : (
    <RewardItem
      handleEdit={() => setEditingReward(true)}
      rewardId={rewardId}
      rewardTitle={rewardTitle ?? ""}
      rewardDescription={rewardDescription ?? ""}
      xpReward={xpReward ?? 0}
    />
  );
};

export default RewardManager;

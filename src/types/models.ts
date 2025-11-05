export type User = {
  id: string;
  email: string;
  createdAt: Date;
  xp: number;
  projects: Project[];
  rewardItems: RewardItemType[];
  dailyClaimedAt?: Date | null;
  weeklyClaimedAt?: Date | null;
};

export type Project = {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  boards: Board[];
  user: User;
};

export type Board = {
  id: string;
  position: number; // Float in Prisma → number in TS
  projectId: string;
  title: string;
  todos: Todo[];
};

export type Todo = {
  id: string;
  position: number;
  boardId: string;
  title: string;
  description?: string | null;
  xpReward: number;
  completed: boolean;
};

export type RewardItemType = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  priceXp: number;
  user: User;
  createdAt: Date;
};

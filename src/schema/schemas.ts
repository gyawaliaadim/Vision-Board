import * as z from 'zod';


export const boardSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  position: z.number().int().min(0, { message: 'Position must be a positive integer' }),
  todos: z.array(
    z.object({
      title: z.string().min(1, { message: 'Todo title is required' }),
      description: z.string().optional(),
    })
  ),
});

export const todoSchema = z.object({
  boardId: z.string().min(1, "Board is required"),
  position: z.number().min(0, "Position must be ≥ 0"),
  xpReward: z.number().min(0, "XP Reward must be ≥ 0"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});


export type BoardFormData = z.infer<typeof boardSchema>;
export type TodoFormData = z.infer<typeof todoSchema>;
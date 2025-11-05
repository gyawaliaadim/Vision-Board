"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { PencilIcon, TrashIcon } from "lucide-react"; // or your preferred SVG icon
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
interface TodoItemProps {
  todoIndex: number;
  todoTitle: string;
  todoDescription: string;
  xpReward: number;
  handleEdit: () => void;
  todoId?: string;
  boardId: string;
}


export default function TodoItem({

  todoIndex,
  todoTitle,
  todoDescription,
  xpReward,
  handleEdit,
  todoId,

}: TodoItemProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const handleDeleteTodo = async () => {

      const userChoice = confirm("Are you sure you want to proceed?");
    
    if (userChoice) {
      {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API}/todoDetails`,
          { data: { id: todoId } }

        )
        if (res.data.success) {
          queryClient.invalidateQueries();
        }
      }
    }

  }

  const handleCompleteTodo = async () => {
  try {
    const userId = session?.user.id;
    if (!userId) throw new Error("User not authenticated");
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/todoCompleted`,
      { todoId, userId , xpReward }
    );

    if (response.data.success) {
      queryClient.invalidateQueries();
    }
    
  } catch  {
    console.log("Error completing todo:");
  }
}


    return (
      <>
        <div

          className={clsx(
            "w-[300px] p-4 rounded-lg shadow-lg",
            "bg-white text-black dark:bg-black dark:text-white",
            "flex flex-col space-y-2"
          )}
        >
          {/* Row 1: Position left, actions right */}
          <div className="flex justify-between items-center">
            {/* Position cube */}
            <div className="shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white flex items-center justify-center font-bold rounded">
              {todoIndex + 1}
            </div>

            {/* Actions: Edit, Delete, XP/Complete */}
            <div className="flex items-center space-x-2">
              <Button size="icon-sm" variant="outline" onClick={() => handleEdit()}>
                <PencilIcon className="w-4 h-4" />
              </Button>
              <Button size="icon-sm" variant="destructive" onClick={() => handleDeleteTodo()}>
                <TrashIcon className="w-4 h-4" />
              </Button>
              <Button
                size="icon-sm"
                onClick={() => handleCompleteTodo()}
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
          </div>

          {/* Row 2: todoTitle */}
          <div className="font-semibold wrap-break-word">{todoTitle}</div>

          {/* Row 3: todoDescription */}
          {todoDescription && (
            <div className="text-sm text-gray-700 dark:text-gray-300 wrap-break-word">
              {todoDescription}
            </div>
          )}
        </div>
      </>



    )
  }

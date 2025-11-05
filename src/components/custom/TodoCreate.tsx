"use client";

import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";
import TodoForm from "./TodoForm";
import { Board } from "@/types/models";

interface TodoCreateProps {
  boardIndex: number;
  boardsList: Board[]; // list of all todos
  boardId: string;
}

export default function TodoCreate({
  boardIndex,
  boardsList,
  boardId,
}: TodoCreateProps) {
  const [creatingTodo, setCreatingTodo] = React.useState(false);

  return !creatingTodo ? (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="min-w-[300px] max-h-[100px] m-2"
      onClick={() => setCreatingTodo(true)}
    >
      <Card
        className="
          group 
          flex flex-col items-center justify-center 
          border-2 border-dashed
          border-red-500/40 dark:border-red-500/30
          hover:border-red-500/80
          bg-white dark:bg-black 
          text-black dark:text-white
          transition-all duration-300 ease-in-out
          cursor-pointer
          rounded-2xl
          shadow-md hover:shadow-red-500/10
          p-6
        "
      >
        <CardContent className="flex flex-col items-center justify-center space-y-3 text-center">
          <div
            className="
              w-12 h-12 flex items-center justify-center
              rounded-full border border-red-500/50
              group-hover:bg-red-500/10
              transition-all duration-300
            "
          >
            <Plus className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-lg font-medium tracking-wide">Create Todo</p>
        </CardContent>
      </Card>
    </motion.div>
  ) : (
    <TodoForm
      todoIndex={0}
      boardsList={boardsList}
      boardId={boardId}
      creatingTodo={true}
      boardIndex={boardIndex}
      onCancel={() => setCreatingTodo(false)}
    />
  );
}

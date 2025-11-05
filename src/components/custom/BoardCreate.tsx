"use client";

import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";
import BoardForm from "./BoardForm";
import { Board } from "@/types/models";
import { boardStyles } from "@/app/lib/utils";

interface BoardCreateProps{
    boardIndex: number;
    boardsList: Board[]; // list of all boards
    projectId:string;
}
export default function BoardCreate({
    boardIndex,
    boardsList,
    projectId
}:BoardCreateProps) {
    const [creatingBoard, setCreatingBoard] = React.useState(false);
  return (
    
        !creatingBoard? (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="min-w-[350px] max-h-[250px] m-2"
      onClick={()=>setCreatingBoard(true)}
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
          <p className="text-lg font-medium tracking-wide">Create Board</p>
        </CardContent>
      </Card>
    </motion.div>)
    :(
        <BoardForm
        boardIndex={boardIndex}
        boardsList={boardsList}
        projectId={projectId}
        creatingBoard={true}
        boardStyles={boardStyles}
        onCancel={()=>setCreatingBoard(false)}
        

        />
    )

  );
}

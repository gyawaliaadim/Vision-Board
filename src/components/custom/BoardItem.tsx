"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
interface BoardItemProps {
  boardTitle?:string;
  TodoList:React.FC;
  handleEdit:()=>void;
  boardIndex:number;
  boardStyles:string;
  boardId?:string
}
import React from 'react'
import axios from "axios";


const BoardItem = ({
boardTitle,
TodoList,
handleEdit,
boardIndex,
boardStyles,
boardId
}: BoardItemProps)=> {
  
const queryClient = useQueryClient();
  const handleDeleteBoard = async()=>{
    const userChoice = confirm("Are you sure you want to proceed?");
    if (userChoice){
const res = await axios.delete(
  `${process.env.NEXT_PUBLIC_API}/boardDetails`,
  { data: { id: boardId } }
  
)
  if (res.data.success){
     queryClient.invalidateQueries();
  }
}

  }
  return (
    <div
      className={boardStyles}
    >
      <div>
      {/* Board Header */}
      <div className="flex justify-between items-center">
        {/* Left: Position cube */}
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 font-bold rounded">
          {boardIndex+1}
        </div>

        {/* Right: Board actions */}
        <div className="flex space-x-2">
          <Button size="icon-sm" variant="outline" onClick={()=>handleEdit()}>
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button size="icon-sm" variant="destructive" onClick={()=>handleDeleteBoard()}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Second row: Board title */}
      <h2 className="font-bold text-lg wrap-break-word">{boardTitle}</h2>

        </div>
        
      <TodoList/>
   
    </div>
  );
}

export default BoardItem
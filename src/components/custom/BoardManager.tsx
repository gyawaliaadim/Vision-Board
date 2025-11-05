import React, { useEffect, useState } from 'react';
import BoardForm from '@/components/custom/BoardForm'
import BoardItem from '@/components/custom/BoardItem'
import { Board, Todo } from '@/types/models';
import TodoManager from './TodoManager';
import clsx from 'clsx';
import { boardStyles } from '@/app/lib/utils';
import TodoCreate from './TodoCreate';
interface BoardManagerProps{
  boardIndex: number;
  boardsList: Board[]; // list of all boards
  todosList?: Todo[] // list of the todos of this particular board
  boardTitle?: string;
  boardId?:string;
  creatingBoard?:boolean;
  projectId?:string;
  OnCancelCreate?:()=>void;
}

const BoardManager = 
({
  boardId,
  boardIndex,
  boardsList,
  todosList,
  boardTitle,
  creatingBoard=false,
  projectId,
  OnCancelCreate
}:BoardManagerProps) => {
    const [showBoardForm, setShowBoardForm] = useState<boolean>(false)
    useEffect(() => {
      console.log(boardsList)
      }
    , [todosList])

    useEffect(() => {
      if(creatingBoard){
        setShowBoardForm(true);
      }
      }, [creatingBoard])

    const TodoList =()=> {
      
      return(
         <div className="flex flex-col space-y-2">
       {
        todosList && todosList.filter((todo)=>!todo.completed).map((todo:Todo,index:number)=>(
          (

            <TodoManager
            key={index}
            boardId={boardId??""}
            boardIndex={boardIndex}
            boardsList={boardsList}
            todoIndex={index}
            todosList={todosList}
            todoDescription={todo.description??""}
            todoId={todo.id}
            todoTitle={todo.title}
            xpReward={todo.xpReward}
            />
          )
          
        ))
       }
       <TodoCreate
       boardId={boardId??""}
       boardIndex={boardIndex}
       boardsList={boardsList}
       key={boardId}
       />
      </div>)
    }


  return (
    <>
    {
        showBoardForm?
        <BoardForm
        boardIndex={boardIndex}
        onCancel={()=>OnCancelCreate?OnCancelCreate():setShowBoardForm(false)}
        boardsList={boardsList}
        TodoList={TodoList}
        boardTitle={boardTitle}
        boardId={boardId}
        boardStyles={boardStyles}
        creatingBoard={creatingBoard}
        projectId={projectId}
        /> :
        <BoardItem
        boardIndex={boardIndex}
        handleEdit={()=>setShowBoardForm(true)}
        boardTitle={boardTitle}
      TodoList={TodoList}
      boardStyles={boardStyles}
      boardId={boardId}
        />
    }
    </>
  )
}

export default BoardManager
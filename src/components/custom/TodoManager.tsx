import React, { useState } from 'react'
import TodoForm from '@/components/custom/TodoForm'
import TodoItem from '@/components/custom/TodoItem'
import { Board, Todo } from '@/types/models';

interface TodoManagerProps{
   boardId:string ;
  boardIndex:number ;
  boardsList:Board[] ;
  todoIndex:number ;
  todoDescription?:string ;
  todoId?:string ;
  todoTitle?:string ;
  todosList:Todo[] ;
  xpReward?:number ;
}
const TodoManager = ({
  boardId,
  boardIndex,
  boardsList,
  todoIndex,
  todoDescription,
  todoId,
  todoTitle,
  todosList,
  xpReward,
}:TodoManagerProps) => {
    const [editingTodo, setEditingTodo] = useState<true|false>(false)
  return (
    <>
    {
        editingTodo?
        <TodoForm
        creatingTodo={false}
        boardId={boardId}
        boardIndex={boardIndex}
        boardsList={boardsList}
        onCancel={()=>setEditingTodo(false)}
        todoIndex={todoIndex}
        todoDescription={todoDescription}
        todoId={todoId}
        todoTitle={todoTitle}
        todosList={todosList}
        xpReward={xpReward}        
        />:
        <TodoItem
        handleEdit={()=>setEditingTodo(true)}
        todoTitle={todoTitle??""}
        todoDescription={todoDescription??""}
        todoIndex={todoIndex}       
        xpReward={xpReward??0}
        todoId={todoId}
        boardId={boardId}
        />
    }
    </>
  )
}

export default TodoManager
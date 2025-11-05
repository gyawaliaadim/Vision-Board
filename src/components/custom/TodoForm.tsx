"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { calculateNewPosition } from "@/app/lib/utils";
import { Board, Todo } from "@/types/models";
import { useQueryClient } from "@tanstack/react-query";

interface TodoFormProps {
  todoTitle?: string;
  todoDescription?: string;
  todoId?: string;
  xpReward?: number;
  todoIndex: number;
  todosList?: Todo[];
  boardIndex: number;
  boardId: string;
  boardsList: Board[];
  creatingTodo: boolean;
  onCancel: () => void;
}

export default function TodoForm({
  todoTitle = "",
  todoDescription = "",
  todoId = "",
  xpReward = 0,
  todoIndex,
  boardId,
  boardsList,
  todosList = [],
  creatingTodo = false,
  onCancel,
}: TodoFormProps) {
  const queryClient = useQueryClient();
  const [selectedBoard, setSelectedBoard] = useState<Board | undefined>(
    boardsList.find((b) => b.id === boardId)
  );

  const [form, setForm] = useState({
    todoTitle,
    todoDescription,
    xpReward,
    boardId: boardId ?? "",
    todoIndex: todoIndex ?? 0,
  });

  const [errors, setErrors] = useState<{
    todoTitle?: string;
    xpReward?: string;
    boardId?: string;
    todoIndex?: string;
  }>({});

  useEffect(() => {
    const boardFound = boardsList.find((b) => b.id === form.boardId);
    setSelectedBoard(boardFound);
  }, [form.boardId, boardsList]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.todoTitle.trim()) newErrors.todoTitle = "Title is required";
    if (!form.boardId) newErrors.boardId = "Board is required";
    if (form.xpReward < 0) newErrors.xpReward = "XP Reward must be ≥ 0";
    if (form.todoIndex < 0) newErrors.todoIndex = "Invalid position";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const targetBoard = boardsList.find((b) => b.id === form.boardId);
      const newPos =
        targetBoard && targetBoard.todos.length > 0
          ? calculateNewPosition(
              targetBoard.todos,
              creatingTodo ? targetBoard.todos.length - 1 : todoIndex,
              form.todoIndex
            )
          : 1000;

      const payload = {
        boardId: form.boardId,
        position: newPos,
        xpReward: form.xpReward,
        title: form.todoTitle.trim(),
        description: form.todoDescription?.trim() ?? "",
      };

      const res = todoId
        ? await axios.put(`${process.env.NEXT_PUBLIC_API}/todoDetails`, {
            id: todoId,
            ...payload,
          })
        : await axios.post(`${process.env.NEXT_PUBLIC_API}/todoDetails`, payload);

      if (res.data.success) await queryClient.invalidateQueries();

      onCancel();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div
      className={clsx(
        "w-[300px] min-h-[220px] p-4 rounded-lg shadow-lg",
        "bg-white text-black dark:bg-black dark:text-white"
      )}
    >
      {/* Title */}
      <div className="mb-4">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={form.todoTitle}
          onChange={(e) => handleChange("todoTitle", e.target.value)}
        />
        {errors.todoTitle && (
          <p className="text-red-500 text-sm">{errors.todoTitle}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.todoDescription}
          onChange={(e) => handleChange("todoDescription", e.target.value)}
          rows={3}
        />
      </div>

      {/* Row of three controls */}
      <div className="flex space-x-3 mb-4">
        {/* Board Select */}
        <div className="flex-1 w-[37.5%]">
          <Label htmlFor="boardId">Board</Label>
          <Select
            value={form.boardId}
            onValueChange={(value) => handleChange("boardId", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select board" />
            </SelectTrigger>
            <SelectContent>
              {boardsList.map((b: Board, index: number) => (
                <SelectItem key={b.id} value={b.id}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.boardId && (
            <p className="text-red-500 text-sm">{errors.boardId}</p>
          )}
        </div>

        {/* Position */}
        <div className="flex-1 w-[37.5%]">
          <Label htmlFor="todoIndex">Position</Label>
          <Select
            value={String(form.todoIndex)}
            onValueChange={(value) =>
              handleChange("todoIndex", Number(value))
            }
            disabled={!form.boardId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="eg. 1,5" />
            </SelectTrigger>
            <SelectContent>
              {selectedBoard?.todos?.map((todoItem: Todo, index: number) => (
                <SelectItem key={todoItem.id} value={String(index)}>
                  {index + 1}
                </SelectItem>
              ))}
              {creatingTodo && selectedBoard && (
                <SelectItem
                  value={String(selectedBoard.todos.length)}
                >
                  {selectedBoard.todos.length + 1}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {errors.todoIndex && (
            <p className="text-red-500 text-sm">{errors.todoIndex}</p>
          )}
        </div>

        {/* XP Reward */}
        <div className="w-[25%]">
          <Label htmlFor="xpReward">XP</Label>
          <Input
            id="xpReward"
            type="number"
            value={form.xpReward}
            onChange={(e) =>
              handleChange("xpReward", Number(e.target.value))
            }
            className="w-full bg-linear-to-r from-[#374893] to-[#a94a79] text-white 
              hover:scale-110 focus:shadow-[0_0_30px_rgba(200,110,180,0.9)] 
              hover:shadow-[0_0_30px_rgba(200,110,180,0.9)] focus:brightness-120 
              hover:brightness-120 transition-all duration-200 ease-out"
          />
          {errors.xpReward && (
            <p className="text-red-500 text-sm">{errors.xpReward}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
          onClick={handleSubmit}
        >
          {creatingTodo || !todoId ? "Add Todo" : "Save Todo"}
        </Button>
      </div>
    </div>
  );
}

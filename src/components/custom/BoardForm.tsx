"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateNewPosition } from "@/app/lib/utils";
import { Board } from "@/types/models";

interface BoardFormProps {
  boardIndex: number;
  onCancel: () => void;
  boardsList: Board[];
  TodoList?: React.FC;
  boardTitle?: string;
  boardId?: string;
  boardStyles: string;
  creatingBoard?: boolean;
  projectId?: string;
}

export default function BoardForm({
  boardIndex,
  onCancel,
  boardsList,
  TodoList = () => <></>,
  boardTitle = "",
  boardId = "",
  boardStyles,
  creatingBoard = false,
  projectId,
}: BoardFormProps) {
  const queryClient = useQueryClient();

  
  const [boardForm, setBoardForm] = useState({
    title: boardTitle,
    position: creatingBoard ? boardsList.length : boardIndex,
  });

  const [errors, setErrors] = useState<{ title?: string; position?: string }>({});

  const handleChange = (field: "title" | "position", value: string | number) => {
    setBoardForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!boardForm.title.trim()) newErrors.title = "Title is required";

    if (
      boardForm.position === null ||
      boardForm.position < 0 ||
      boardForm.position > boardsList.length
    ) {
      newErrors.position = "Invalid position";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const newPosition =
        boardsList.length === 0
          ? 1000
          : calculateNewPosition(
              boardsList,
              creatingBoard ? boardsList.length-1 : boardIndex,
              boardForm.position ?? 0
            );

      let res;
      if (creatingBoard && projectId) {
        res = await axios.post(`${process.env.NEXT_PUBLIC_API}/boardDetails`, {
          projectId,
          title: boardForm.title.trim(),
          position: newPosition,
        });
      } else {
        res = await axios.put(`${process.env.NEXT_PUBLIC_API}/boardDetails`, {
          id: boardId,
          title: boardForm.title.trim(),
          position: newPosition,
        });
      }

      if (res.data.success) await queryClient.invalidateQueries();

      onCancel();
    } catch (error) {
      console.error("Error saving board:", error);
    }
  };

  return (
    <div className={boardStyles}>
      <div className="space-y-4">
        {/* Title */}
        <div>
          <Label htmlFor="title">Board Title</Label>
          <Input
            id="title"
            value={boardForm.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Position */}
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Label htmlFor="position">Position</Label>
            {boardsList.length > 0 ? (
              <Select
                value={String(boardForm.position ?? "")}
                onValueChange={(v) => handleChange("position", Number(v))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {boardsList.map((_, idx) => (
                    <SelectItem key={idx} value={String(idx)}>
                      {idx + 1}
                    </SelectItem>
                  ))}
                  {creatingBoard && (
                    <SelectItem value={String(boardsList.length)}>
                      {boardsList.length + 1}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-muted-foreground">1 (only option)</p>
            )}
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position}</p>
            )}
          </div>

          {/* Buttons */}
          <Button type="button" variant="outline" onClick={onCancel} className="mt-6">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white"
          >
            {creatingBoard ? "Add Board" : "Save Board"}
          </Button>
        </div>
      </div>

      {/* TodoList for existing boards only */}
      {!creatingBoard && <TodoList />}
    </div>
  );
}

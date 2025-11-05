"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, CheckIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProjectHeaderProps {
  title: string;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
}

export default function ProjectHeader({
  title,
  onEdit,
  onDelete,
}: ProjectHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(newTitle);
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewTitle(title);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between py-2 px-3 border-b",
        "bg-transparent border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="flex-1">
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={(e) => {
              e.stopPropagation();
              setNewTitle(e.target.value);
            }}
            className="text-lg font-medium bg-transparent"
            autoFocus
          />
        ) : (
          <h2 className="text-lg font-medium">{title}</h2>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handleSave}
              className="border-green-400 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <CheckIcon className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="border-gray-400 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handleEdit}
              className="border-gray-300 text-gray-700 hover:border-gray-400 dark:text-gray-200 dark:border-gray-600"
            >
              <PencilIcon className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDelete}
              className="border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-500 dark:text-gray-200 dark:border-gray-600"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}


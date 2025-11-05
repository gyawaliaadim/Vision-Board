"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProjectTitleForm({
  onSubmit,
}: {
  onSubmit: (title: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(title.trim());
      setTitle("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md p-6 rounded-2xl border transition-all
        border-gray-300 bg-white dark:border-gray-700 dark:bg-black shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Create New Project
      </h2>

      {/* Input field */}
      <Input
        type="text"
        placeholder="Enter project title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={cn(
          "rounded-xl border-gray-300 focus-visible:ring-0 focus:border-red-500",
          "dark:border-gray-700 dark:bg-black dark:text-white dark:focus:border-red-500"
        )}
      />

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        variant="outline"
        className={cn(
          "w-full font-medium rounded-xl border transition-all duration-150",
          "border-gray-300 text-black hover:border-red-500 hover:text-red-600 hover:bg-red-50",
          "dark:border-gray-700 dark:text-white dark:hover:border-red-600 dark:hover:text-red-500 dark:hover:bg-black",
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
      >
        {isSubmitting ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}

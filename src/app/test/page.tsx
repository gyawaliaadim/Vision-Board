"use client";

import React from "react";
import BoardItem from "@/components/custom/BoardItem";
import TodoItem from "@/components/custom/TodoItem";
import ToggleTheme from "@/components/custom/ToggleTheme";
import ProjectListItem from "@/components/custom/ProjectListItem";

const dummyBoard20Todos = {
  id: "board-1",
  title: "Massive Todo Board",
  position: 1,
  todos: Array.from({ length: 20 }).map((_, idx) => ({
    id: `todo-${idx + 1}`,
    position: idx + 1,
    title: `Task #${idx + 1} - Complete this step`,
    description: `Detailed description for task #${idx + 1}.`,
    completed: idx % 3 === 0,
    xpReward: 5 + idx * 2,
  })),
};

const projects = [
  { id: "1", title: "Project Alpha" },
  { id: "2", title: "Project Beta" },
  { id: "3", title: "Project Gamma" },
];

const handleEdit = (id: string) => {
  console.log(`Edit project with ID: ${id}`);
};

const handleDelete = (id: string) => {
  console.log(`Delete project with ID: ${id}`);
};

export default function Page() {
  return (
    <div className="flex w-full gap-4">
      {/* Left Sidebar */}
      <div className="w-full p-4 ">
        <ToggleTheme />
        <div className="mt-4 space-y-2 w-full flex flex-col">
          {projects.map((project) => (
            <ProjectListItem
              key={project.id}
              projectId={project.id}
              title={project.title}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Main Board */}
      {/* <div className="flex-1 p-4 overflow-auto">
        <BoardItem board={dummyBoard20Todos} />
        {dummyBoard20Todos.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div> */}
    </div>
  );
}

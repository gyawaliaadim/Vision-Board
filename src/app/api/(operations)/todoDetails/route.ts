import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { createResponse, createError } from "@/app/lib/utils";

interface updatedDataType {
  boardId?: string;
  title?: string;
  description?: string;
  xpReward?: number;
  position?: number;
}

// Create a new todo
export async function POST(request: NextRequest) {
  const { boardId, title, description, xpReward, position } = await request.json();

  if (!boardId || !title || position === undefined || xpReward === undefined) {
    return createError("Board ID, title, xpReward and position are required", 400);
  }

  if (position < 0) return createError("Position must be greater than or equal to 0", 400);
  if (xpReward < 0) return createError("XP Reward must be greater than or equal to 0", 400);

  try {
    const todo = await prisma.todo.create({
      data: { boardId, title, position, xpReward, description: description || "" },
    });
    return createResponse("Todo creation successful", todo, 201);
  } catch (error) {
    console.error(error);
    return createError("Todo creation failed", 500);
  }
}

// Update a todo by ID
export async function PUT(request: NextRequest) {
  const { id, boardId, title, description, xpReward, position } = await request.json();

  if (!id || !boardId) return createError("Todo ID or Board ID is missing", 400);
  const updateData: updatedDataType = {};
  if (boardId !== undefined) updateData.boardId = boardId;
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (xpReward !== undefined) updateData.xpReward = xpReward;
  if (position !== undefined) updateData.position = position;

  if (Object.keys(updateData).length === 0) {
    return createError("At least one field must be provided for update", 400);
  }

  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: updateData,
    });
    return createResponse("Todo updated successfully", todo, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to update todo", 500);
  }
}

// Delete a todo by ID
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) return createError("Todo ID is required", 400);

  try {
    await prisma.todo.delete({ where: { id } });
    return createResponse("Todo deleted successfully", null, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to delete todo", 500);
  }
}

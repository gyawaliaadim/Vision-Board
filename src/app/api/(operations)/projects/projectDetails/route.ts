import { createResponse, createError } from '@/app/lib/utils';
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// Retrieve a project by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const userId = searchParams.get("userId");
  console.log(projectId, userId)
  if (!projectId) {
    return createError("Project ID is required", 400);
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        boards: {
          orderBy: { position: 'asc' },
          include: {
            todos: {
              orderBy: { position: 'asc' },
            },
          },
        },
      },
    });
    const accessible = project?.userId === userId;
    if (!project || !accessible) {
      return createError("Project not found", 404);
    }

    return createResponse("Project fetched successfully", project, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to fetch project", 500);
  }
}

// Update a project by ID
export async function PUT(request: NextRequest) {
  const { id, title } = await request.json();

  if (!id || !title) {
    return createError("Project ID and title are required", 400);
  }

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { title },
    });
    return createResponse("Project updated successfully", project, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to update project", 500);
  }
}

// Delete a project by ID
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  console.log("hello")
  if (!id) {
    return createError("Project ID is required", 400);
  }

  try {
    await prisma.project.delete({ where: { id } });
    return createResponse("Project deleted successfully", null, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to delete project", 500);
  }
}

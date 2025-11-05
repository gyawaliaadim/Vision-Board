import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { createResponse, createError } from "@/app/lib/utils";

// Create a new project
export async function POST(request: NextRequest) {
  const { userId, title } = await request.json();

  if (!userId || !title) {
    return createError("User ID and title are required", 400);
  }

  try {
    const project = await prisma.project.create({
      data: { userId, title },
    });
    return createResponse("Project creation successful", project, 201);
  } catch (error) {
    console.error(error);
    return createError("Project creation failed", 500);
  }
}

// Retrieve all projects for a user
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return createError("User ID is required", 400);
  }

  try {
    const projects = await prisma.project.findMany({
      where: { userId },
    });

    return createResponse("Projects fetched successfully", projects, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to fetch projects", 500);
  }
}

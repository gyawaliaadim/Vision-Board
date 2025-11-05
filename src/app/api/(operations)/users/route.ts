import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { createResponse, createError } from "@/app/lib/utils";

// GET: Retrieve a user by ID
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return createError("ID is required", 400);

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return createError("User not found", 404);

    return createResponse("User retrieved successfully", user, 200);
  } catch (error) {
    console.error("Error fetching user:", error);
    return createError("Failed to retrieve user", 500);
  }
}

// POST: Create a new user
export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) return createError("Email is required", 400);

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return createError("Failed to create user. User already exists", 409);
    }

    const user = await prisma.user.create({ data: { email } });
    return createResponse("User created successfully", user, 201);
  } catch (error) {
    console.error("Error creating user:", error);
    return createError("User creation failed", 500);
  }
}

// PUT: Update an existing user
export async function PUT(request: NextRequest) {
  const { id, ...updateData } = await request.json();

  if (!id) return createError("ID is required", 400);

  // Filter out null/undefined values
  const filteredData = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value != null)
  );

  if (Object.keys(filteredData).length === 0) {
    return createError("No valid fields to update", 400);
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: filteredData,
    });
    return createResponse("User updated successfully", user, 200);
  } catch (error) {
    console.error("Error updating user:", error);
    return createError("User update failed", 500);
  }
}

// DELETE: Remove a user
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) return createError("ID is required", 400);

  try {
    await prisma.user.delete({ where: { id } });
    return createResponse("User deleted successfully", null, 200);
  } catch (error) {
    console.error("Error deleting user:", error);
    return createError("User deletion failed", 500);
  }
}

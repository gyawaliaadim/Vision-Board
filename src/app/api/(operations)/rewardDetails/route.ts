import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { createResponse, createError } from "@/app/lib/utils";

// Create a new reward
export async function POST(request: NextRequest) {
  const { userId, title, description, priceXp } = await request.json();

  if (!userId || !title || priceXp === undefined) {
    return createError("User ID, title, and XP price are required", 400);
  }

  if (priceXp < 0) {
    return createError("XP Reward must be greater than or equal to 0", 400);
  }

  try {
    const reward = await prisma.rewardItem.create({
      data: { userId, title, description: description || "", priceXp },
    });
    return createResponse("Reward creation successful", reward, 201);
  } catch (error) {
    console.error(error);
    return createError("Reward creation failed", 500);
  }
}

// Retrieve all rewards for a user
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return createError("User ID is required", 400);
  }

  try {
    const rewards = await prisma.rewardItem.findMany({ where: { userId } });
    return createResponse("Rewards fetched successfully", rewards, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to fetch rewards", 500);
  }
}

// Update a Reward by ID
export async function PUT(request: NextRequest) {
  const { id, title, description, priceXp } = await request.json();

  if (!id) {
    return createError("Reward ID is required", 400);
  }

  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (priceXp !== undefined) updateData.priceXp = priceXp;

  if (Object.keys(updateData).length === 0) {
    return createError("At least one field must be provided for update", 400);
  }

  try {
    const reward = await prisma.rewardItem.update({
      where: { id },
      data: updateData,
    });
    return createResponse("Reward updated successfully", reward, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to update Reward", 500);
  }
}

// Delete a Reward by ID
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return createError("Reward ID is required", 400);
  }

  try {
    await prisma.rewardItem.delete({ where: { id } });
    return createResponse("Reward deleted successfully", null, 200);
  } catch (error) {
    console.error(error);
    return createError("Failed to delete Reward", 500);
  }
}

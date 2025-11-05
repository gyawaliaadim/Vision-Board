import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const { userId, rewardId } = await request.json();

    if (!userId || !rewardId) {
      return NextResponse.json(
        { success: false, message: "Missing userId or rewardId" },
        { status: 400 }
      );
    }

    // Fetch the reward item
    const rewardItem = await prisma.rewardItem.findUnique({
      where: { id: rewardId },
    });

    if (!rewardItem) {
      return NextResponse.json(
        { success: false, message: "Reward item not found" },
        { status: 404 }
      );
    }

    // Fetch the user
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if user has enough XP
    if (user.xp < rewardItem.priceXp) {
      return NextResponse.json(
        { success: false, message: "Not enough XP to purchase this reward" },
        { status: 400 }
      );
    }

    // Deduct XP and "purchase" reward
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { decrement: rewardItem.priceXp },
        rewardItems: {
          connect: { id: rewardItem.id },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Purchased "${rewardItem.title}" successfully!`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error purchasing reward:", error);
    return NextResponse.json(
      { success: false, message: "Failed to purchase reward" },
      { status: 500 }
    );
  }
}

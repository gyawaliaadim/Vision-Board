import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";


export async function PUT(request: NextRequest) {
  try {
    const { todoId, userId, xpReward } = await request.json();

    if (!todoId || !userId || xpReward == null) {
      return NextResponse.json(
        { success: false, message: "todoId, userId, and xpReward are required" },
        { status: 400 }
      );
    }

    // Delete the completed todo
    await prisma.todo.delete({
      where: { id: todoId },
    });

    // Increment user's XP
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpReward },
      },
    });

    return NextResponse.json(
      { success: true, message: "Todo completed successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing todo:", error);
    return NextResponse.json(
      { success: false, message: "Failed to complete todo" },
      { status: 500 }
    );
  }
}
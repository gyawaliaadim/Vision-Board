// app/api/boards/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { createResponse, createError } from '@/app/lib/utils';

type updatedDataType = {
  title?: string;
  position?: number;
};

export async function POST(request: NextRequest) {
  const { projectId, title, position } = await request.json();

  if (!projectId || !title || position === undefined) {
    return createError('Project ID, title, and position are required', 400);
  }

  try {
    const board = await prisma.board.create({
      data: { projectId, title, position },
    });
    return createResponse('Board creation successful', board, 201);
  } catch (error) {
    console.error(error);
    return createError('Board creation failed', 500);
  }
}

export async function PUT(request: NextRequest) {
  const { id, title, position } = await request.json();

  if (!id || (title === undefined && position === undefined)) {
    return createError('Board ID and at least one of title or position is required', 400);
  }

  if (position < 0) {
    return createError('Position must be greater than or equal to 0', 400);
  }

  try {
    const updateData:updatedDataType = {};
    if (title !== undefined) updateData.title = title;
    if (position !== undefined) updateData.position = position;

    const board = await prisma.board.update({
      where: { id },
      data: updateData,
    });

    return createResponse('Board updated successfully', board, 200);
  } catch (error) {
    console.error(error);
    return createError('Failed to update Board', 500);
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return createError('Board ID is required', 400);
  }

  try {
    await prisma.board.delete({ where: { id } });
    return createResponse('Board deleted successfully', null, 200);
  } catch (error) {
    console.error(error);
    return createError('Failed to delete Board', 500);
  }
}

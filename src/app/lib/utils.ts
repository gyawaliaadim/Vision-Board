// lib/utils/response.ts
import { NextResponse } from 'next/server';
import { Board, Todo } from '@/types/models';
export function createResponse(message: string, data: any = null, status: number) {
  return NextResponse.json(
    { success: true, message, data },
    { status }
  );
}
import clsx from 'clsx';
export function createError(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

export function calculateNewPosition(
  boards: { position: number }[],
  fromIndex: number,
  toIndex: number
): number {
  // Make sure array is sorted by position
  const sorted = [...boards].sort((a, b) => a.position - b.position);

  // If position unchanged
  if (fromIndex === toIndex) return sorted[fromIndex].position;

  // Simulate removing the moved element
  const [moved] = sorted.splice(fromIndex, 1);

  // Simulate inserting it in new index
  sorted.splice(toIndex, 0, moved);

  const prev = sorted[toIndex - 1];
  const next = sorted[toIndex + 1];

  // Move to start
  if (!prev) return next.position / 2;

  // Move to end
  if (!next) return prev.position + 1000;

  // Move between
  return (prev.position + next.position) / 2;
}



export const boardStyles =clsx(
        "min-w-[350px] h-min pb-20 p-4 rounded-xl shadow-lg  ",
        "bg-gray-50 dark:bg-gray-900 text-black dark:text-white",
        "flex flex-col space-y-3"
      )
import { notFound } from 'next/navigation';

export function requireIdNumber(id: string): number {
  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || numericId <= 0) {
    notFound();
  }

  return numericId;
}

export function parseIdNumber(id: string): number | null {
  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || numericId <= 0) {
    return null;
  }

  return numericId;
}

export function isValidId(value: string): boolean {
  const numericId = parseInt(value, 10);
  return !isNaN(numericId) && numericId > 0;
}

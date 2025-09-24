// utils/sort-helper.ts
import { expect } from '@playwright/test';

export function expectStringAsc(values: string[]) {
  const normalized = values.map(v => v.trim().toLowerCase());
  const sorted = [...normalized].sort((a, b) => a.localeCompare(b));
  expect(normalized).toEqual(sorted);
}

export function expectStringDesc(values: string[]) { 
  const normalized = values.map(v => v.trim().toLowerCase());
  const sorted = [...normalized].sort((a, b) => b.localeCompare(a));
  expect(normalized).toEqual(sorted);
}

export function expectNumbersAsc(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  expect(values).toEqual(sorted);
}

export function expectNumbersDesc(values: number[]) {
  const sorted = [...values].sort((a, b) => b - a);
  expect(values).toEqual(sorted);
}
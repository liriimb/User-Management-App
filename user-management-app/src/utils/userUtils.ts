import type { User } from "../types/user";

export function matchesSearch(u: User, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  
    return u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
}

export type SortKey = "name" | "email" | "company";

export function getSortValue(u: User, key: SortKey): string {
  if (key === "company") return (u.company?.name ?? "").toLowerCase();

  return (u[key] ?? "").toString().toLowerCase();
}

export function nextUserId(users: User[]): number {
  const maxId = users.reduce((m, u) => Math.max(m, u.id), 0);

  return maxId + 1;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

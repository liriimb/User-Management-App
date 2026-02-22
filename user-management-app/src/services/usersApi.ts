import type { User } from "../types/user";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`, { signal });
  if (!res.ok) throw new Error(`Failed to fetch users (${res.status})`);
  
  return (await res.json()) as User[];
}

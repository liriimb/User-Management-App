import { useEffect, useMemo, useState } from "react";
import type { User } from "../types/user";
import { fetchUsers } from "../services/usersApi";
import { getSortValue, matchesSearch, nextUserId, type SortKey } from "../utils/userUtils";

type SortDir = "asc" | "desc";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers(controller.signal);
        setUsers(data);
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const filteredSorted = useMemo(() => {
    const filtered = users.filter((u) => matchesSearch(u, search));
    const sorted = [...filtered].sort((a, b) => {
      const av = getSortValue(a, sortKey);
      const bv = getSortValue(b, sortKey);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;

      return 0;
    });

    return sorted;
  }, [users, search, sortKey, sortDir]);

  function toggleSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(nextKey);
      setSortDir("asc");
    }
  }

  function addUser(input: Pick<User, "name" | "email" | "company">) {
    setUsers((prev) => {
      const id = nextUserId(prev);
      const newUser: User = {
        id,
        name: input.name.trim(),
        email: input.email.trim(),
        company: input.company,
      };

      return [newUser, ...prev];
    });
  }

  function getById(id: number) {
    return users.find((u) => u.id === id);
  }

  return {
    users,
    filteredSorted,
    loading,
    error,
    search,
    setSearch,
    sortKey,
    sortDir,
    toggleSort,
    addUser,
    getById,
  };
}

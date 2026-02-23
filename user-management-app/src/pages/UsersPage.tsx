import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddUserDialog from "../components/AddUserDialog";
import EditUserDialog from "../components/EditUserDialog";
import UsersTable from "../components/UsersTable";
import { fetchUsers } from "../services/usersApi";
import type { User } from "../types/user";
import { getSortValue, matchesSearch, type SortKey } from "../utils/userUtils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addUser, deleteUser, setUsers, updateUser } from "../store/usersSlice";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s) => s.users.items);
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchUsers(controller.signal);

        setFetchedUsers(data);
        dispatch(setUsers(data));

      } catch (e) {
        if ((e as Error)?.name === "AbortError") return;
        setError((e as Error).message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [dispatch]);

  function toggleSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(nextKey);
      setSortDir("asc");
    }
  }

  const filteredSorted = useMemo(() => {
    const filtered = users.filter((u) => matchesSearch(u, search));

    return [...filtered].sort((a, b) => {
      const av = getSortValue(a, sortKey);
      const bv = getSortValue(b, sortKey);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;

      return 0;
    });
  }, [users, search, sortKey, sortDir]);

  const countLabel = useMemo(
    () => `${filteredSorted.length} user${filteredSorted.length === 1 ? "" : "s"}`,
    [filteredSorted.length]
  );

  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Users
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {countLabel}
          </Typography>
        </Box>

        <Button variant="contained" onClick={() => setAddOpen(true)}>
          Add User
        </Button>
      </Stack>

      <TextField
        label="Search by name or email"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      {loading && (
        <Stack alignItems="center" py={6}>
          <CircularProgress />
        </Stack>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Paper sx={{ overflowX: "auto" }}>
          <UsersTable
            users={filteredSorted}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={toggleSort}
            onEdit={(u) => setEditUser(u)}
            onDelete={(id) => dispatch(deleteUser(id))}
          />
        </Paper>
      )}
      <AddUserDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(payload) => dispatch(addUser(payload))}
      />
      <EditUserDialog
        open={!!editUser}
        user={editUser}
        onClose={() => setEditUser(null)}
        onSave={(payload) => dispatch(updateUser(payload))}
      />
      <Box sx={{ mt: 2, display: "none" }}>
        {fetchedUsers.length}
      </Box>
    </Container>
  );
}

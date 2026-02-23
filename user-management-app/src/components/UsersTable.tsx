import {
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";

import type { User } from "../types/user";
import type { SortKey } from "../utils/userUtils";

type Props = {
  users: User[];
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (key: SortKey) => void;

  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UsersTable({
  users,
  sortKey,
  sortDir,
  onSort,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sortKey === "name"}
              direction={sortKey === "name" ? sortDir : "asc"}
              onClick={() => onSort("name")}
            >
              Name
            </TableSortLabel>
          </TableCell>

          <TableCell>
            <TableSortLabel
              active={sortKey === "email"}
              direction={sortKey === "email" ? sortDir : "asc"}
              onClick={() => onSort("email")}
            >
              Email
            </TableSortLabel>
          </TableCell>

          <TableCell>
            <TableSortLabel
              active={sortKey === "company"}
              direction={sortKey === "company" ? sortDir : "asc"}
              onClick={() => onSort("company")}
            >
              Company
            </TableSortLabel>
          </TableCell>

          <TableCell align="right">Details</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id} hover>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.company?.name ?? "-"}</TableCell>

            <TableCell align="right">
              <Link component={RouterLink} to={`/users/${u.id}`}>
                View
              </Link>
            </TableCell>

            <TableCell align="right">
              <Tooltip title="Edit">
                <IconButton onClick={() => onEdit(u)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  onClick={() => onDelete(u.id)}
                  size="small"
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

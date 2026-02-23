import { useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function UserDetailsPage() {
  const { id } = useParams();
  const userId = useMemo(() => Number(id), [id]);
  const user = useAppSelector((s) =>
    s.users.items.find((u) => u.id === userId)
  );

  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          User not found.
        </Alert>
        <Button component={RouterLink} to="/" variant="contained">
          Back to Users
        </Button>
      </Container>
    );
  }

  const address = user.address
    ? `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`
    : "-";

  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Button component={RouterLink} to="/" variant="outlined">
          Back
        </Button>
        
      </Stack>
      <Paper sx={{ p: 3 }}>
        <Stack gap={1.25}>
          <Row label="Phone" value={user.phone ?? "-"} />
          <Row label="Website" value={user.website ?? "-"} />
          <Row label="Company" value={user.company?.name ?? "-"} />
          <Row label="Address" value={address} />
        </Stack>
      </Paper>
    </Container>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
      <Typography sx={{ width: 120 }} color="text.secondary">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}

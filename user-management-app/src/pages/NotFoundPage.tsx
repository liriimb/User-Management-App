import { Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        404
      </Typography>
      <Typography color="text.secondary" mb={2}>
        Page not found.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Go Home
      </Button>
    </Container>
  );
}

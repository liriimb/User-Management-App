import React, { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { User } from "../types/user";
import { isValidEmail } from "../utils/userUtils";

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (payload: {
    id: number;
    name: string;
    email: string;
    companyName?: string;
    phone?: string;
    website?: string;
    address?: {
      street?: string;
      suite?: string;
      city?: string;
      zipcode?: string;
    };
  }) => void;
};

export default function EditUserDialog({ open, user, onClose, onSave }: Props) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [companyName, setCompanyName] = useState(user?.company?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [website, setWebsite] = useState(user?.website ?? "");
  const [street, setStreet] = useState(user?.address?.street ?? "");
  const [suite, setSuite] = useState(user?.address?.suite ?? "");
  const [city, setCity] = useState(user?.address?.city ?? "");
  const [zipcode, setZipcode] = useState(user?.address?.zipcode ?? "");

  React.useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setCompanyName(user?.company?.name ?? "");
    setPhone(user?.phone ?? "");
    setWebsite(user?.website ?? "");
    setStreet(user?.address?.street ?? "");
    setSuite(user?.address?.suite ?? "");
    setCity(user?.address?.city ?? "");
    setZipcode(user?.address?.zipcode ?? "");
  }, [user]);

  const nameError = useMemo(() => name.trim().length === 0, [name]);
  const emailError = useMemo(
    () => email.trim().length === 0 || !isValidEmail(email),
    [email]
  );

  function handleSubmit() {
    if (!user) return;
    if (nameError || emailError) return;

    onSave({
      id: user.id,
      name,
      email,
      companyName: companyName.trim() || undefined,
      phone: phone.trim() || undefined,
      website: website.trim() || undefined,
      address: {
        street: street.trim() || undefined,
        suite: suite.trim() || undefined,
        city: city.trim() || undefined,
        zipcode: zipcode.trim() || undefined,
      },
    });

    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Stack gap={2} sx={{ mt: 1 }}>
          <TextField
            label="Name *"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? "Name is required" : " "}
            fullWidth
          />
          <TextField
            label="Email *"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Enter a valid email" : " "}
            fullWidth
          />
          <TextField
            label="Company (optional)"
            value={companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone (optional)"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            fullWidth
          />
          <TextField
            label="Website (optional)"
            value={website}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
            fullWidth
          />
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            Address (optional)
          </Typography>
          <TextField
            label="Street"
            value={street}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}
            fullWidth
          />
          <TextField
            label="Suite"
            value={suite}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuite(e.target.value)}
            fullWidth
          />
          <TextField
            label="City"
            value={city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            fullWidth
          />
          <TextField
            label="Zipcode"
            value={zipcode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZipcode(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

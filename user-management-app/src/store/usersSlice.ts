import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";
import { nextUserId } from "../utils/userUtils";

type UsersState = {
  items: User[];
};

const initialState: UsersState = {
  items: [],
};

export type AddressPayload = {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
};

export type AddUserPayload = {
  name: string;
  email: string;
  companyName?: string;
  phone?: string;
  website?: string;
  address?: AddressPayload;
};

export type UpdateUserPayload = {
  id: number;
  name: string;
  email: string;
  companyName?: string;
  phone?: string;
  website?: string;
  address?: AddressPayload;
};

function normalizeOptional(value?: string): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

function normalizeAddress(address?: AddressPayload): User["address"] | undefined {
  if (!address) return undefined;

  const street = normalizeOptional(address.street);
  const suite = normalizeOptional(address.suite);
  const city = normalizeOptional(address.city);
  const zipcode = normalizeOptional(address.zipcode);

  if (!street && !suite && !city && !zipcode) return undefined;

  return {
    street: street ?? "",
    suite: suite ?? "",
    city: city ?? "",
    zipcode: zipcode ?? "",
  };
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.items = action.payload;
    },

    addUser(state, action: PayloadAction<AddUserPayload>) {
      const id = nextUserId(state.items);
      const { name, email, companyName, phone, website, address } = action.payload;

      const newUser: User = {
        id,
        name: name.trim(),
        email: email.trim(),
        company: { name: (companyName ?? "").trim() },
        phone: normalizeOptional(phone),
        website: normalizeOptional(website),
        address: normalizeAddress(address),
      };

      state.items.unshift(newUser);
    },

    updateUser(state, action: PayloadAction<UpdateUserPayload>) {
      const { id, name, email, companyName, phone, website, address } = action.payload;
      const u = state.items.find((x) => x.id === id);
      if (!u) return;

      u.name = name.trim();
      u.email = email.trim();
      u.company = { name: (companyName ?? "").trim() };

      u.phone = normalizeOptional(phone);
      u.website = normalizeOptional(website);
      u.address = normalizeAddress(address);
    },

    deleteUser(state, action: PayloadAction<number>) {
      state.items = state.items.filter((u) => u.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;

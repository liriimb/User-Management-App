import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: ["Inter", "system-ui", "Arial"].join(","),
  },
});

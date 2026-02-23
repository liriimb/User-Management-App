import { createBrowserRouter } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import UserDetailsPage from "../pages/UserDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <UsersPage /> },
      { path: "/users/:id", element: <UserDetailsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

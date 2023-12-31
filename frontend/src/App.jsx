import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Home } from "@mui/icons-material";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage />,
    errorElement: <div>Error</div>,
  },
]);
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
          <CssBaseline />
        </RouterProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

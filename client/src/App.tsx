import Admin from "./pages/Admin";
import Missing from "./pages/Missing";
import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";
import PersistLogin from "./features/authentication/components/PersistLogin";
import RequireAuth from "./features/authentication/components/RequireAuth";
import Users from "./pages/Users";
import Home from "./pages/Home";

const ROLES = {
  USER: 2001,
  EDITOR: 1984,
  ADMIN: 5150,
};

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className = `tw-root--theme-${theme}`;
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.USER]} />}>
            <Route path="users" element={<Users />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

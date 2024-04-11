import Home from "./views/pages/Home";
import Layout from "./views/components/Layout";
import Editor from "./views/pages/Editor";
import Admin from "./views/pages/Admin";
import Missing from "./views/pages/Missing";
import Lounge from "./views/pages/Lounge";
import RequireAuth from "./views/components/RequireAuth";
import PersistLogin from "./views/components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/pages/Landing";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";

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
      <Route path="/" element={<Layout />}>
        <Route path="landing" element={<Landing />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.USER]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.EDITOR, ROLES.ADMIN]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

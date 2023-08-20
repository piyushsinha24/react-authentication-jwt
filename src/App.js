import Register from "./Register";
import Login from "./Login";
import Layout from "./component/Layout";
import LinkPage from "./component/LinkPage";
import Unauthorized from "./component/Unauthorized";
import Home from "./component/Home";
import Editor from "./component/Editor";
import Admin from "./component/Admin";
import Lounge from "./component/Lounge";
import Missing from "./component/Missing";
import RequireAuth from "./component/RequireAuth";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  USER: 2001,
  EDITOR: 1984,
  ADMIN: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* We want to protect these routes */}
        {/* All the routes within RequireAuth should be protected by RequireAuth */}
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

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

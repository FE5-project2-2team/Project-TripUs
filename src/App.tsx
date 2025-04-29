import { Link, Navigate, Route, Routes } from "react-router";
import { loginUser } from "./apis/auth";
import ProtectedRoute from "./components/commons/ProtectedRoute";
import PublicOnlyRoute from "./components/commons/PublicOnlyRoute";
import RootLayout from "./layouts/RootLayout";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Message from "./pages/Message";
import NotFound from "./pages/NotFound";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const login = useAuthStore((state) => state.login);
  return (
    <>
      <button
        onClick={async () => {
          const data = await loginUser("run3go@gmail.com", "12341234!!");
          login(data.token);
        }}
      >
        로그인
      </button>
      <Link to={"/postCreate"}>게시글 작성</Link>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Channel />} />
          </Route>
          <Route path="/post/detail/:id" element={<PostDetail />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/postCreate" element={<PostCreate />} />
            <Route path="/message" element={<Message />} />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </>
  );
}

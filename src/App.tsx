import { Route, Routes } from "react-router";
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

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          {/* 로그인 전 권한x */}
          <Route path="/" element={<Home />}>
            <Route index element={<Channel />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/detail/:id" element={<PostDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* 로그인 후 권한o */}
          <Route path="/postCreate" element={<PostCreate />} />
          <Route path="/message" element={<Message />} />
          {/* 위에 해당하는 경로가 없을때 */}
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

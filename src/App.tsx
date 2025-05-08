import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/commons/ProtectedRoute";
import PublicOnlyRoute from "./components/commons/PublicOnlyRoute";
import RootLayout from "./layouts/Rootlayout";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Message from "./pages/Message";
import NotFound from "./pages/NotFound";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

export default function App() {
	return (
		<>
			<Routes>
				<Route element={<RootLayout />}>
					<Route path="/" element={<Home />}>
						<Route index element={<Navigate to="channel/crews" replace />} />
						<Route path="channel/:channelName" index element={<Channel />} />
					</Route>
					<Route path="/post/detail/:id" element={<PostDetail />} />
					<Route path="/profile/:id" element={<Profile />} />

					<Route element={<ProtectedRoute />}>
						<Route path="/postCreate" element={<PostCreate />} />
						<Route path="/post/edit/:id" element={<PostEdit />} />
						<Route path="/message" element={<Message />} />
					</Route>
				</Route>
				<Route element={<PublicOnlyRoute />}>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Route>
				<Route path="/404" element={<NotFound />} />
				<Route path="/*" element={<Navigate to="/404" replace />} />
			</Routes>
		</>
	);
}

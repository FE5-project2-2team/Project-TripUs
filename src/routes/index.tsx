import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "../assets/images/SailLoadingSpinner.gif";
import MessageLayout from "../components/features/message/MessageLayout";
import { NotiProvider } from "../context/NotiProvider";
import RootLayout from "../layouts/rootlayout";
import Channel from "../pages/Channel";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import NotiLayout from "../pages/NotiLayout";
import PostCreate from "../pages/PostCreate";
import PostDetail from "../pages/PostDetail";
import PostEdit from "../pages/PostEdit";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import { requireAuth, requireNoAuth } from "./loaders/auth.loader";
import { fetchPost } from "./loaders/post.loader";

const router = createBrowserRouter([
	{
		Component: RootLayout,
		children: [
			{
				path: "/",
				Component: Home,
				children: [
					{
						index: true,
						element: <Navigate to="channel/전체글" replace />
					},
					{
						path: "channel/:channelName",
						index: true,
						element: <Channel />
					}
				]
			},
			{
				path: "/post/detail/:id",
				loader: fetchPost,
				hydrateFallbackElement: (
					<div className="flex h-screen justify-center items-center">
						<img src={LoadingSpinner} alt="로딩 중" />
					</div>
				),
				Component: PostDetail
			},
			{
				path: "/profile/:id",
				Component: Profile
			},
			{
				path: "/postCreate",
				loader: requireAuth,
				Component: PostCreate
			},
			{
				path: "/post/edit/:id",
				loader: requireAuth,
				Component: PostEdit
			},
			{
				path: "/message",
				loader: requireAuth,
				Component: MessageLayout
			},
			{
				path: "/message/:id",
				loader: requireAuth,
				Component: MessageLayout
			},
			{
				path: "/notification",
				loader: requireAuth,
				Component: NotiLayout
			}
		]
	},
	{
		path: "/login",
		loader: requireNoAuth,
		Component: Login
	},
	{
		path: "signup",
		loader: requireNoAuth,
		Component: Signup
	},
	{
		path: "*",
		Component: NotFound
	}
]);

export default function Router() {
	return (
		<>
			<NotiProvider>
				<RouterProvider router={router} />
				<ToastContainer
					position="top-center"
					autoClose={2500}
					hideProgressBar
					closeOnClick={false}
					pauseOnHover
					draggable
					toastClassName={() =>
						"bg-transparent shadow-none p-0 m-0 flex justify-center"
					}
				/>
			</NotiProvider>
		</>
	);
}

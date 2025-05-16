import { Outlet, useLocation } from "react-router";
import Header from "../components/commons/Header";

export default function RootLayout() {
	const location = useLocation();

	const hideHeaderPaths = [
		"/post/detail",
		"/postCreate",
		"/post/edit",
		"/message"
	];

	const hideHeader = hideHeaderPaths.some((path) =>
		location.pathname.startsWith(path)
	);

	return (
		<>
			<div className={hideHeader ? "hidden sm:block" : ""}>
				<Header />
			</div>
			<Outlet />
		</>
	);
}

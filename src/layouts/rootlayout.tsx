import { Outlet, useLocation } from "react-router";
import ScrollToTop from "../components/commons/ScrollToTop";
import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout() {
	const location = useLocation();

	const hideHeaderPaths = [
		"/post/detail",
		"/postCreate",
		"/post/edit",
		"/profile",
		"/message"
	];

	const hideHeader = hideHeaderPaths.some((path) =>
		location.pathname.startsWith(path)
	);

	return (
		<>
			<ScrollToTop />
			<div className={hideHeader ? "hidden sm:block" : ""}>
				<Header />
			</div>
			<Outlet />
			<Footer />
		</>
	);
}

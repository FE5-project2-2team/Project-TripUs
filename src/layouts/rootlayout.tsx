import { Outlet } from "react-router";
import Header from "../components/commons/Header";

export default function RootLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

import { Outlet } from "react-router";
import MainVisual from "../components/features/main/MainVisual";

export default function Home() {
	return (
		<>
			<h1>Home Component</h1>
			<MainVisual />
			<Outlet />
		</>
	);
}

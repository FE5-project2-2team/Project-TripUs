import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import Router from "./routes";
import { useThemeStore } from "./store/themeStore";

export default function App() {
	// darkmode
	useEffect(() => {
		useThemeStore.getState().initializeTheme(); // 직접 호출
	}, []);

	return (
		<>
			<Router />;
		</>
	);
}

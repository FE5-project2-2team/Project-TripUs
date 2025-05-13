import NotiMessage from "./NotiMessage";
import NotiPosts from "./NotiPosts";
import NotiRequest from "./NotiRequest";

export default function NotiWhole() {
	return (
		<>
			<NotiPosts />
			<NotiRequest />
			<NotiMessage />
		</>
	);
}

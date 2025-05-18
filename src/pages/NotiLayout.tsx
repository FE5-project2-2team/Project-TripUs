import { useState } from "react";
import NotiList from "../components/features/notification/NotiList";

export default function NotiLayout() {
	const [notiOpen, setNotiOpen] = useState(false);

	return (
		<div className="px-5 py-5">
			<NotiList notiOpen={notiOpen} setNotiOpen={setNotiOpen} />
		</div>
	);
}

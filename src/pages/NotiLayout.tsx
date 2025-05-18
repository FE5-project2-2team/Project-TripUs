import { useState } from "react";
import NotiList from "../components/features/notification/NotiList";

export default function NotiLayout() {
	const [notiOpen, setNotiOpen] = useState(false);

	return <NotiList notiOpen={notiOpen} setNotiOpen={setNotiOpen} />;
}

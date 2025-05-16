import { useNavigate, Link } from "react-router-dom";
import notFoundLogo from "../assets/images/404_ERROR.svg";
import notFoundImage from "../assets/images/notFound_image.png";
import { useThemeStore } from "../store/themeStore";
import notFoundDarkImage from "../assets/images/notFound_image_dark.png";
import notFoundDarkLogo from "../assets/images/404_ERROR_dark.svg";

export default function NotFound() {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	// darkmode
	const isDark = useThemeStore((state) => state.isDark);

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			{/* left box */}
			<div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-[80px] lg:pl-[300px] py-16 text-center">
				<div className="w-full max-w-[433px]">
					<img
						src={isDark ? notFoundDarkLogo : notFoundLogo}
						alt="404 Not Found Error Logo"
						className="mx-auto"
					/>
					<div className="mt-12 flex flex-col gap-y-7 text-[17px] sm:text-[18px] md:text-[20px] font-medium">
						<p>이 여행지는 아직 탐험되지 않았어요</p>
						<p>찾으시는 여행지는 없거나, 아직 개척되지 않았어요.</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
						<Link
							to="/"
							className="select-none w-full sm:w-[197px] h-[52px] md:h-[56px] flex items-center justify-center px-6 md:px-[45px] py-3 md:py-[16px] rounded-[10px] shadow-sm text-[17px] md:text-[18px] font-bold text-white bg-[#06B796] hover:bg-[#00D3AC] dark:hover:bg-[#13A68A]"
						>
							메인 페이지
						</Link>
						<button
							onClick={handleGoBack}
							className="select-none w-full sm:w-[197px] h-[52px] md:h-[56px] flex items-center justify-center px-6 md:px-[45px] py-3 md:py-[16px] rounded-[10px] shadow-sm text-[17px] md:text-[18px] font-bold text-[#06B796] bg-[#DFF7E5] hover:bg-[#E9FFEE] dark:bg-[#038383] dark:text-[#DFF7E5] dark:hover:bg-[#037373]"
						>
							이전 페이지
						</button>
					</div>
				</div>
			</div>

			{/* right box */}
			<div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-[80px] lg:pr-[300px] py-8">
				<img
					src={isDark ? notFoundDarkImage : notFoundImage}
					alt="Not Found Image"
					className="w-[260px] sm:w-[320px] md:w-[400px] lg:w-[500px] h-auto object-contain"
				/>
			</div>
		</div>
	);
}

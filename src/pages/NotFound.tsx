import { Link } from "react-router";
import notFoundLogo from "../assets/images/404_ERROR.svg";
import notFoundImage from "../assets/images/notFound_image.png";

export default function NotFound() {
  return (
		<div className="flex items-center justify-between px-[95px] py-[233px] ">
			
			<div className="w-[433px] h-[280px] text-center ml-[45px]">

				<img src={notFoundLogo} alt="404 Not Found Error Logo" className="" />
				<div className="mt-[47px] flex flex-col gap-y-[28px] text-[20px] font-medium text-[#333333]">
					<p>이 여행지는 아직 탐험되지 않았았어요</p>
					<p>찾으시는 여행지는 없거나, 아직 개척되지 않았어요.</p>
				</div>	


				<div className="flex items-center justify-between mt-[30px]">
					<Link
						to="/"
						className="select-none w-[197px] h-[56px] flex items-center justify-center px-[50px] py-[16px] rounded-[10px] shadow-sm text-[20px] font-bold text-white bg-[#06B796] hover:bg-[#00D3AC]"
					>
						메인 페이지
					</Link>
					<Link
						to="/dashboard"
						className="select-none w-[197px] h-[56px] flex items-center justify-center px-[50px] py-[16px] rounded-[10px] shadow-sm text-[20px] font-bold text-[#06B796] bg-[#DFF7E5] hover:bg-[#E9FFEE]"
					>
						이전 페이지
					</Link>
				</div>
			</div>
				
			<div>
				<img src={notFoundImage} alt="Not Found Image" />
			</div>
		
		
		</div>
  	);
}


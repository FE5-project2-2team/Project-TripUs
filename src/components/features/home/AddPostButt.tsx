export default function AddPostButt() {
	return (
		<div className="fixed bottom-[16px] right-[324px] flex items-center group z-50">
			<span className="mr-4 items-center text-[#06B796] text-xl opacity-0 group-hover:opacity-100">
				게시글 추가
			</span>
			<button>
				<div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-[#06B796] cursor-pointer">
					<div
						className="w-[35px] h-[35px] bg-no-repeat"
						style={{
							backgroundImage: "url('/src/assets/images/sprite-images.png')",
							backgroundSize: "245px 380px",
							backgroundPosition: "-24.3px -171.3px"
						}}
					/>
				</div>
			</button>
		</div>
	);
}

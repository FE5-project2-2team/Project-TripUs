import mainvisual1 from "../../../assets/images/mainvisual1.png";
import mainvisual2 from "../../../assets/images/mainvisual2.png";
import mainvisual3 from "../../../assets/images/mainvisual3.png";
import mainvisual4 from "../../../assets/images/mainvisual4.png";
import mainvisual5 from "../../../assets/images/mainvisual5.png";
import spriteImage from "../../../assets/images/spriteImages.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
	{
		image: mainvisual1,
		alt: "도쿄",
		description: "쇼핑, 맛집, 가깝고 즐길 게 많은 도쿄!"
	},
	{
		image: mainvisual2,
		alt: "보라카이",
		title: "보라카이로!",
		description: "휴양지 제대로 즐기고 싶다면"
	},
	{
		image: mainvisual3,
		alt: "홍콩",
		title: "홍콩 추천!",
		description: "야경도 좋고 먹거리도 풍부한 도시"
	},
	{
		image: mainvisual4,
		alt: "독일",
		title: "독일 한 번 가봐야죠",
		description: "역사 좋아하는 사람이라면"
	},
	{
		image: mainvisual5,
		alt: "이집트",
		title: "이집트가 딱",
		description: "색다른 여행 원한다면"
	}
];

export default function MainVisual() {
	const swiperRef = useRef<{ swiper: SwiperClass } | null>(null);

	// 슬라이드 자동 전환과 애니메이션 제어를 위한 ref
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const initialElapsedRef = useRef(0);
	const isResumingRef = useRef(false);

	// 리사이즈 ref
	const containerRef = useRef<HTMLDivElement>(null);

	// 상태 관리
	const [autoplaying, setAutoPlaying] = useState(true); //자동 재생 여부
	const [activeIndex, setActiveIndex] = useState(0); //현재 슬라이드 인덱스
	const [fillPercent, setFillPercent] = useState(0); // 진행률0~100
	const [startTime, setStartTime] = useState<number | null>(null); //애니메이션 시작 시간

	// 슬라이드 하나당 재생 시간 5초
	const DURATION = 5000;

	// 다음 슬라이드로 전환하는 함수
	const goToNextSlide = useCallback(() => {
		swiperRef.current?.swiper.slideNext();
	}, []);

	// 일정 시간 후 슬라이드 전환을 위한 타이머 설정
	const startSlideTimer = useCallback(
		(delay: number) => {
			timeoutRef.current = setTimeout(goToNextSlide, delay);
		},
		[goToNextSlide]
	);

	// 프로그래스바 애니메이션 처리
	const animateProgress = useCallback((start: number, elapsedStart: number) => {
		const update = (now: number) => {
			const elapsed = now - start + elapsedStart;
			const percent = Math.min(100, (elapsed / DURATION) * 100);

			setFillPercent(percent);
			if (percent < 100) {
				animationFrameRef.current = requestAnimationFrame(update);
			}
		};
		animationFrameRef.current = requestAnimationFrame(update);
	}, []);

	// 일시 정지 처리
	const stopAutoplay = useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (animationFrameRef.current)
			cancelAnimationFrame(animationFrameRef.current);

		if (startTime !== null) {
			const now = performance.now();
			let elapsed = now - startTime;

			// 경과 시간이 음수로 나오는 경우를 방지
			if (elapsed < 0) elapsed = 0;

			// 첫 번째 정지 후, 두 번째 정지 시점에서 누적된 경과 시간을 계산
			if (initialElapsedRef.current === 0) {
				initialElapsedRef.current = elapsed; // 첫 번째 정지 시점에서만 초기화
			} else {
				// 두 번째 정지 이후에는 첫 번째 정지 이후의 시간만 반영
				initialElapsedRef.current += elapsed;
			}
		}

		// startTime을 null로 설정하지 않고, 다음 재생 시점에서 사용할 시간을 그대로 유지합니다.
		setStartTime(performance.now());
	}, [startTime]);

	// 재생 재개 처리
	const resumeAutoplay = useCallback(() => {
		const now = performance.now();
		// 첫 번째 정지에서 저장된 경과 시간만큼 계산된 남은 시간
		const remaining = Math.max(0, DURATION - initialElapsedRef.current);

		setStartTime(now); // 재생 시작 시간을 새로 설정
		isResumingRef.current = true;
		animateProgress(now, initialElapsedRef.current); // 초기화 시 누적 경과 시간을 그대로 사용
		startSlideTimer(remaining); // 남은 시간만큼 타이머 설정
	}, [animateProgress, startSlideTimer]);

	// 토글 핸들러
	const toggleAutoPlay = useCallback(() => {
		if (autoplaying) {
			stopAutoplay();
		} else {
			resumeAutoplay();
		}
		setAutoPlaying((prev) => !prev);
	}, [autoplaying, stopAutoplay, resumeAutoplay]);

	// 슬라이드 변경되었을 때 초기화
	useEffect(() => {
		if (!autoplaying) return;
		if (isResumingRef.current) {
			isResumingRef.current = false;
			return;
		}
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (animationFrameRef.current)
			cancelAnimationFrame(animationFrameRef.current);

		setFillPercent(0);
		initialElapsedRef.current = 0;

		const now = performance.now();
		setStartTime(now);
		animateProgress(now, 0);

		// autoplaying이 true일 때만 실행되게 하면서
		// resumeAutoplay와 중복 호출되지 않도록 startSlideTimer 호출 제거
		if (initialElapsedRef.current === 0) {
			startSlideTimer(DURATION);
		}
	}, [activeIndex, autoplaying, animateProgress, startSlideTimer]);

	// 리사이즈
	useEffect(() => {
		if (!containerRef.current) return;

		let resizeTimeout: ReturnType<typeof setTimeout>;

		const observer = new ResizeObserver(() => {
			if (resizeTimeout) clearTimeout(resizeTimeout);

			resizeTimeout = setTimeout(() => {
				console.log("📏 리사이즈 후 Swiper update 실행");
				swiperRef.current?.swiper.update();
			}, 300);
		});

		observer.observe(containerRef.current);

		return () => {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			observer.disconnect();
		};
	}, []);

	return (
		<div className="w-[calc(100vw-308px)] min-w-[1100px] px-[20px] overflow-hidden relative">
			<div
				ref={containerRef}
				className="aspect-[2.5/1] w-full rounded-[10px] overflow-hidden transition-all duration-300"
			>
				<Swiper
					ref={swiperRef}
					modules={[Autoplay, Pagination, Navigation]}
					autoplay={false}
					loop
					onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
					className="w-full h-full rounded-[10px]"
				>
					{slides.map((slide, idx) => (
						<SwiperSlide key={idx}>
							<div className="relative w-full h-full">
								<img
									src={slide.image}
									alt={slide.alt}
									className="w-full h-full object-cover object-center"
								/>
								<div className="absolute bottom-[78px] left-[40px] text-white z-10">
									<h2 className="text-[40px] font-bold">{slide.description}</h2>
									<p className="text-[28px] font-bold">{slide.title}</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				{/* 컨트롤러 */}
				<div className="absolute bottom-[24px] left-[60px] right-[100px] flex items-center gap-2 text-white text-sm z-10">
					<button
						className="custom-prev-button w-6 h-6 cursor-pointer"
						style={{
							backgroundImage: `url(${spriteImage})`,
							backgroundPosition: "-27px -24px",
							backgroundSize: "367.5px 570px",
							backgroundRepeat: "no-repeat"
						}}
						aria-label="Previous Slide"
						onClick={() => swiperRef.current?.swiper.slidePrev()}
					>
						{/* 이전버튼 */}
					</button>
					<span className="w-[50px] text-center">
						{`0${activeIndex + 1}`}{" "}
						<span className="text-white/60"> / 0{slides.length}</span>
					</span>
					<button
						onClick={() => swiperRef.current?.swiper.slideNext()}
						className="custom-next-button w-6 h-6 cursor-pointer"
						aria-label="Next Slide"
						style={{
							backgroundImage: `url(${spriteImage})`,
							backgroundPosition: "-61px -24px",
							backgroundSize: "367.5px 570px",
							backgroundRepeat: "no-repeat"
						}}
					>
						{/* 다음버튼 */}
					</button>
					{/* 정지/재생 */}
					<button
						onClick={toggleAutoPlay}
						className="w-[32px] h-[32px] transform scale-80 cursor-pointer"
						style={{
							backgroundImage: `url(${spriteImage})`,
							backgroundSize: "367.5px 570px",
							backgroundRepeat: "no-repeat",
							backgroundPosition: autoplaying ? "-91px -20px" : "-127px -20px"
						}}
						aria-label={autoplaying ? "정지" : "재생"}
					></button>
					{/* 프로그래스바 */}
					<div className="flex-1 h-[4px] bg-white/40 ml-4 relative overflow-hidden">
						<div
							className="h-[2px] bg-white/80 transition-none absolute top-1/2 -translate-y-1/2"
							style={{ width: `${fillPercent}% ` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

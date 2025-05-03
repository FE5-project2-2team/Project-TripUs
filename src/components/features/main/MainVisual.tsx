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
    description: "쇼핑, 맛집, 가깝고 즐길 게 많은 도쿄!",
  },
  {
    image: mainvisual2,
    alt: "보라카이",
    title: "보라카이로!",
    description: "휴양지 제대로 즐기고 싶다면",
  },
  {
    image: mainvisual3,
    alt: "홍콩",
    title: "홍콩 추천!",
    description: "야경도 좋고 먹거리도 풍부한 도시",
  },
  {
    image: mainvisual4,
    alt: "독일",
    title: "독일 한 번 가봐야죠",
    description: "역사 좋아하는 사람이라면",
  },
  {
    image: mainvisual5,
    alt: "이집트",
    title: "이집트가 딱",
    description: "색다른 여행 원한다면",
  },
];

export default function MainVisual() {
  const swiperRef = useRef<{ swiper: SwiperClass } | null>(null);

  // 슬라이드 자동 전환과 애니메이션 제어를 위한 ref
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const initialElapsedRef = useRef(0);
  const isResumingRef = useRef(false);

  // 상태 관리
  const [autoplaying, setAutoPlaying] = useState(true); //자동 재생 여부
  const [activeIndex, setActiveIndex] = useState(0); //현재 슬라이드 인덱스
  const [fillPercent, setFillPercent] = useState(0); // 진행률0~100
  const [startTime, setStartTime] = useState<number | null>(null); //애니메이션 시작 시간
  // const [initialElapsed, setInitialElapsed] = useState(0); //정지되기 전까지 경과된 시간 저장

  // 슬라이드 하나당 재생 시간 5초
  const DURATION = 5000;

  // 다음 슬라이드로 전환하는 함수
  const goToNextSlide = useCallback(() => {
    swiperRef.current?.swiper.slideNext();
  }, []);

  // 일정 시간 후 슬라이드 전환을 위한 타이머 설정
  const startSlideTimer = useCallback(
    (delay: number) => {
      console.log("startSlideTimer → 남은 시간(ms):", delay);
      timeoutRef.current = setTimeout(goToNextSlide, delay);
    },
    [goToNextSlide]
  );

  // 프로그래스바 애니메이션 처리
  const animateProgress = useCallback((start: number, elapsedStart: number) => {
    const update = (now: number) => {
      const elapsed = now - start + elapsedStart;
      const percent = Math.min(100, (elapsed / DURATION) * 100);
      console.log(
        "animateProgress → 경과 시간(ms):",
        elapsed.toFixed(2),
        "→ 진행률:",
        percent.toFixed(2),
        "%"
      );
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

    // 문제
    // elapsed 값을 setInitialElapsed로 저장했지만
    // useState의 비동기 특성상,
    // resumeAutoplay 함수 실행 시 이전 값이 아닌 초기 값(0)이 사용될 가능성이 있음
    if (startTime !== null) {
      const now = performance.now();
      const elapsed = now - startTime;
      // 이 값이 즉시 반영 안되는거 같음
      // setInitialElapsed((prev) => prev + elapsed);
      initialElapsedRef.current = elapsed;
      console.log("정지 시점 → 누적 경과 시간:", initialElapsedRef.current);
    }
    setStartTime(null);
  }, [startTime]);

  // 재생 재개 처리
  const resumeAutoplay = useCallback(() => {
    const now = performance.now();
    // const remaining = Math.max(0, DURATION - initialElapsed);
    const remaining = Math.max(0, DURATION - initialElapsedRef.current);

    // 문제
    // initialElapsed 상태값이 이 시점에 아직 업데이트 되지 않았을 수 있음
    // 해결 : useRef로 elapsed 값을 관리하거나
    // stop 시 elapsed 값을 바로 저장할 수 있도록 분리 저장 필요
    console.log("재생 시작 → 남은 시간:", remaining);
    setStartTime(now);
    isResumingRef.current = true;
    animateProgress(now, initialElapsedRef.current);
    startSlideTimer(remaining);
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

    // ✅ autoplaying이 true일 때만 실행되게 하면서
    // resumeAutoplay와 중복 호출되지 않도록 startSlideTimer 호출 제거
    if (initialElapsedRef.current === 0) {
      startSlideTimer(DURATION);
    }
  }, [activeIndex, autoplaying, animateProgress, startSlideTimer]);

  return (
    <div className="w-[1000px] h-[440px] rounded-[15px] overflow-hidden relative">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={false}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
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
      <div className="absolute bottom-[24px] left-[40px] right-[40px] flex items-center gap-4 text-white text-sm z-10">
        <button
          className="custom-prev-button w-6 h-6 cursor-pointer"
          style={{
            backgroundImage: `url(${spriteImage})`,
            backgroundPosition: "-27px -24px",
            backgroundSize: "367.5px 570px",
            backgroundRepeat: "no-repeat",
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
            backgroundRepeat: "no-repeat",
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
            backgroundPosition: autoplaying ? "-92px -21px" : "-129px -20px",
          }}
          aria-label={autoplaying ? "정지" : "재생"}
        ></button>
        {/* 프로그래스바 */}
        <div className="flex-1 h-[4px] bg-white/40 ml-4 relative overflow-hidden">
          <div
            className="h-[2px] bg-white/80 transition-none absolute top-1/2 -translate-y-1/2"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

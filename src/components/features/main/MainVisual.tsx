import mainvisual1 from "../../../assets/images/mainvisual1.png";
import mainvisual2 from "../../../assets/images/mainvisual2.png";
import mainvisual3 from "../../../assets/images/mainvisual3.png";
import mainvisual4 from "../../../assets/images/mainvisual4.png";
import mainvisual5 from "../../../assets/images/mainvisual5.png";
import spriteImage from "../../../assets/images/spriteImages.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper"; // ✅ 타입 import

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";

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
  const swiperRef = useRef<{ swiper: SwiperClass } | null>(null); // ✅ 타입 지정

  const [autoplaying, setAutoPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // 진행바
  const [fillPercent, setFillPercent] = useState(0); // 현재 진행률 (%)
  const [startTime, setStartTime] = useState<number | null>(null); // 애니메이션 시작 시간
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);

  //전체 진행 시간
  const DURATION = 5000;

  // 남은 시간
  const [remainingTime, setRemainingTime] = useState<number>(DURATION);

  const prevIndexRef = useRef(activeIndex);
  // const prevIndex = prevIndexRef.current;

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToNextSlide = () => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  };

  const startSlideTimer = (delay: number) => {
    timeoutRef.current = setTimeout(() => {
      goToNextSlide();
    }, delay);
  };

  const animateProgress = (
    start: number,
    initialPercent: number,
    duration: number
  ) => {
    const update = (now: number) => {
      const elapsed = now - start;
      const newPercent = Math.min(
        100,
        initialPercent + (elapsed / duration) * (100 - initialPercent)
      );
      setFillPercent(newPercent);
      if (newPercent < 100) {
        const rafId = requestAnimationFrame(update);
        setAnimationFrame(rafId);
      } else {
        setRemainingTime(DURATION); // 다음 재생에 대비
      }
    };
    const rafId = requestAnimationFrame(update);
    setAnimationFrame(rafId);
  };

  // slide stop
  const toggleAutoPlay = () => {
    if (autoplaying) {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        setAnimationFrame(null);

        if (startTime !== null) {
          // const now = performance.now();
          // const elapsed = now - startTime;
          const timeLeft = Math.max(DURATION * (1 - fillPercent / 100), 0);
          setRemainingTime(timeLeft);
        }
      }
    } else {
      const now = performance.now();
      setStartTime(now);
      animateProgress(now, fillPercent, remainingTime);
      startSlideTimer(remainingTime);
    }

    setAutoPlaying(!autoplaying);
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (autoplaying) {
      setFillPercent(0);
      const now = performance.now();
      setStartTime(now);
      animateProgress(now, 0, DURATION);
      startSlideTimer(DURATION);
    }
  }, [activeIndex]);

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

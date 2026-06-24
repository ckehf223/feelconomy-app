import { useState, useCallback } from "react";
import "./FeelComponents.css";

// ========== 상수 정의 ==========
const EMOTIONS = [
  {
    emoji: "☀️",
    label: "햇살",
    color: "#FFE5B4",
    message: "오늘은 맑은 하루네요! 이 에너지를 잘 활용해보세요.",
    particles: ["☀️", "🌤️", "✨", "🌻", "💛"],
  },
  {
    emoji: "☁️",
    label: "구름",
    color: "#E8D5C4",
    message: "조금 흐린 기분이군요. 괜찮아요, 구름 뒤엔 항상 햇살이 있어요.",
    particles: ["☁️", "🌥️", "💨", "🕊️", "🤍"],
  },
  {
    emoji: "🌧️",
    label: "비",
    color: "#B8C5D6",
    message: "비 오는 날엔 잠시 쉬어가도 괜찮아요. 당신의 감정은 소중해요.",
    particles: ["🌧️", "💧", "🌂", "💙", "🫧"],
  },
  {
    emoji: "⚡",
    label: "번개",
    color: "#E8B4D4",
    message: "감정이 격하게 요동치는 날이네요. 깊은 숨 한번 쉬어볼까요?",
    particles: ["⚡", "🔥", "💥", "💜", "✨"],
  },
];

const PRODUCTS = [
  { name: "왁뿌볼", image: "/assets/wakppubol.jpg" },
  { name: "슬라임", image: "/assets/slime.jpg" },
  { name: "AI 상담", image: "/assets/ai-counseling.jpg" },
  { name: "키캡", image: "/assets/keycaps.jpg" },
  { name: "향초", image: "/assets/candle.jpg" },
  { name: "디퓨저", image: "/assets/diffuser.jpg" },
  { name: "힐링 콘텐츠", image: "/assets/healing-content.jpg" },
  { name: "ASMR", image: "/assets/asmr.jpg" },
];

const PHASES = [
  {
    phase: "Phase 01",
    title: "데이터 수집",
    desc: "전문 코치와 함께 다양한 감정·관계·진로 사례를 수집합니다.",
  },
  {
    phase: "Phase 02",
    title: "프로그램 검증·고도화",
    desc: "실제 코칭 세션에서 효과를 검증하고 프로그램을 정교화합니다.",
  },
  {
    phase: "Phase 03",
    title: "Wee클래스 보급",
    desc: "중·고등학교 상담 현장으로 감정 케어 프로그램을 확대합니다.",
  },
];

const DISCOVERIES = [
  "나는 언제 스트레스를 가장 많이 받는 사람인지",
  "어떤 환경에서 가장 좋은 컨디션을 유지하는지",
  "나는 어떤 방식으로 회복하는 사람인지",
];

const TESTIMONIALS = [
  {
    demographic: "20대 대학생",
    topic: "반복 갈등 패턴 이해",
    topicColor: "#A8D4E6",
    barColor: "#7BB8D0",
    quote:
      "인간관계에서 계속 반복되는 갈등이 제 패턴이었다는 걸 알게 됐어요. 이제는 상황이 닥쳐도 왜 그런지 이해하고 대처할 수 있어요.",
  },
  {
    demographic: "30대 직장인",
    topic: "스트레스 관리",
    topicColor: "#C8D4A0",
    barColor: "#A8C470",
    quote:
      "진로와 업무 스트레스가 쌓일 때마다 쓰러지던 제가, 나만의 회복 루틴을 찾고 훨씬 편해졌어요.",
  },
  {
    demographic: "20대 직장인",
    topic: "연애 반응 패턴 이해",
    topicColor: "#F0C4C8",
    barColor: "#E8A0A8",
    quote:
      "어떤 상황에 예민하게 반응하는지 알고 나니, 연애에서 감정 조절이 훨씬 수월해졌어요.",
  },
  {
    demographic: "대학원생",
    topic: "회복 루틴 설계",
    topicColor: "#A8D4A8",
    barColor: "#7BB87B",
    quote:
      "내 감정 구조를 이해하고 나니, 무기력할 때 어떻게 채워야 하는지 스스로 알게 됐어요.",
  },
  {
    demographic: "40대 프리랜서",
    topic: "번아웃 회복",
    topicColor: "#D4B8E0",
    barColor: "#B090C8",
    quote:
      "일에 치여 감정을 무시하던 습관을 알게 됐어요. 이제는 지치기 전에 쉬는 타이밍을 스스로 찾아요.",
  },
  {
    demographic: "10대 고등학생",
    topic: "시험 불안 관리",
    topicColor: "#E0D4A8",
    barColor: "#C8B878",
    quote:
      "시험 때마다 머리가 하얘지던 게 불안 패턴이었어요. 이제는 불안이 와도 대처법을 알아서 덜 무서워요.",
  },
  {
    demographic: "20대 취준생",
    topic: "자존감 회복",
    topicColor: "#A8C8E0",
    barColor: "#78A8C8",
    quote:
      "면접에서 떨어질 때마다 나를 탓했는데, 그게 감정 패턴이란 걸 알고 나니 한결 편해졌어요.",
  },
  {
    demographic: "30대 워킹맘",
    topic: "감정 분리 연습",
    topicColor: "#F0D4B8",
    barColor: "#D8B090",
    quote:
      "아이에게 화를 내고 후회하는 반복이 줄었어요. 내 감정과 아이의 감정을 분리해서 볼 수 있게 됐어요.",
  },
];

const BENEFITS = [
  { icon: "🧠", title: "나의 감정 구조 이해" },
  { icon: "❤️", title: "인간관계 패턴 분석" },
  { icon: "💼", title: "진로·취업 스트레스 관리" },
  { icon: "💘", title: "연애 반응 패턴 이해" },
  { icon: "🌱", title: "회복 루틴 설계" },
];

const TRUST_POINTS = [
  {
    title: "전문 코치와 협업",
    desc: "감정·관계·진로 분야의 전문 코치가 1:1로 동행합니다.",
  },
  {
    title: "사례 데이터 축적 중",
    desc: "실제 참여자 데이터를 기반으로 회복 모델을 정교화하고 있어요.",
  },
  {
    title: "실제 테스트 진행 중",
    desc: "현재 베타 그룹에서 1:1 세션을 운영하며 결과를 검증하고 있습니다.",
  },
  {
    title: "청소년 Wee클래스 보급 목표",
    desc: "장기적으로 학교 현장의 정서지원 모델로 확장하는 것을 목표로 합니다.",
  },
];

const ABOUT_CARDS = [
  {
    label: "SEONGSU, 2026",
    title: "성수 팝업",
    desc: "감정을 직접 만지고 경험하는 오프라인 공간",
    icon: "🏠",
    color: "#F5B8C4",
  },
  {
    label: "BRANDING STUDIO",
    title: "브랜딩 컨설팅",
    desc: "브랜드의 빈 부분을 채우는 전략 설계",
    icon: "✦",
    color: "#D6D48C",
  },
  {
    label: "EMOTION DATA",
    title: "감정 데이터",
    desc: "실제 참여자 기반의 감정 패턴 분석",
    icon: "📊",
    color: "#8CBEE0",
  },
  {
    label: "LONG-TERM GOAL",
    title: "Wee클래스 보급",
    desc: "학교 현장으로 확장하는 정서지원 모델",
    icon: "🎓",
    color: "#E8A88C",
  },
];

const LOOP_ITEMS = [
  {
    label: "불안",
    icon: "😰",
    color: "#E8A88C",
    detail: "무언가 잘못될 것 같은 막연한 두려움이 반복됩니다.",
  },
  {
    label: "회피",
    icon: "🙈",
    color: "#D6D48C",
    detail: "불편한 감정을 마주하지 않고 자꾸 뒤로 미루게 됩니다.",
  },
  {
    label: "후회",
    icon: "😔",
    color: "#8CBEE0",
    detail: "왜 그때 그렇게 했을까, 같은 생각이 머릿속을 맴돕니다.",
  },
  {
    label: "스트레스",
    icon: "🤯",
    color: "#F5B8C4",
    detail: "쌓이고 쌓여 결국 몸과 마음이 함께 무너지는 순간이 옵니다.",
  },
];

const BETA_STEPS = [
  "감정 패턴 분석",
  "관계 패턴 분석",
  "회복 전략 설계",
  "삶의 방향성 점검",
];

// ========== 유틸리티 ==========

function generateRaindrops() {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 0.6 + Math.random() * 0.6,
    opacity: 0.3 + Math.random() * 0.5,
  }));
}

function WeatherOverlay({ type, animKey }) {
  const [raindrops] = useState(() => generateRaindrops());

  if (type === "햇살") {
    return (
      <div key={animKey} className="weather-overlay weather-sun">
        <div className="sun-glow" />
        <div className="sun-rays" />
      </div>
    );
  }
  if (type === "구름") {
    return (
      <div key={animKey} className="weather-overlay weather-cloud">
        <div className="cloud-fog cloud-fog--1" />
        <div className="cloud-fog cloud-fog--2" />
        <div className="cloud-fog cloud-fog--3" />
        <div className="cloud-shape cloud-shape--1">☁️</div>
        <div className="cloud-shape cloud-shape--2">☁️</div>
        <div className="cloud-shape cloud-shape--3">🌥️</div>
        <div className="cloud-shape cloud-shape--4">☁️</div>
        <div className="cloud-shape cloud-shape--5">🌥️</div>
      </div>
    );
  }
  if (type === "비") {
    return (
      <div key={animKey} className="weather-overlay weather-rain">
        {raindrops.map((d) => (
          <div
            key={d.id}
            className="raindrop"
            style={{
              left: `${d.left}%`,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
              opacity: d.opacity,
            }}
          />
        ))}
      </div>
    );
  }
  if (type === "번개") {
    return (
      <div key={animKey} className="weather-overlay weather-lightning">
        <div className="lightning-flash" />
        <div className="lightning-bolt">⚡</div>
      </div>
    );
  }
  return null;
}

// ========== 컴포넌트 ==========

const HERO_BUBBLES = [
  { emoji: "🌸", color: "#F5B8C4", size: 92, top: 8, left: 6, delay: 0 },
  { emoji: "⭐", color: "#FFE5B4", size: 74, top: 58, left: 14, delay: 0.8 },
  { emoji: "💜", color: "#D4B8E0", size: 84, top: 14, left: 80, delay: 1.6 },
  { emoji: "☁️", color: "#8CBEE0", size: 100, top: 62, left: 86, delay: 0.4 },
  { emoji: "🫧", color: "#A8D4E6", size: 68, top: 4, left: 44, delay: 2.0 },
  { emoji: "💛", color: "#D6D48C", size: 80, top: 70, left: 48, delay: 1.2 },
];

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="navbar">
        <img
          src="/assets/fillmore-studio-logo.png"
          alt="필모어 스튜디오"
          className="logo-image"
        />
        <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`}>
          <a href="#emotion" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            기분 체크
          </a>
          <a href="#feelconomy" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            필코노미란?
          </a>
          <a href="#solution" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            솔루션
          </a>
          <a href="#beta" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            체험단
          </a>
          <a href="#apply" className="nav-cta" onClick={() => setIsMenuOpen(false)}>
            무료 체험 신청
          </a>
        </nav>
        <button
          className={`hamburger ${isMenuOpen ? "hamburger--active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="hero-eyebrow">FILLMORE STUDIO · EST. 2026</p>
        <h1 className="hero-title">
          What's <span className="hero-title-accent">Missing?</span>
        </h1>

        <div className="hero-bubbles">
          {HERO_BUBBLES.map((b, idx) => (
            <div
              key={idx}
              className="hero-bubble"
              style={{
                top: `${b.top}%`,
                left: `${b.left}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                backgroundColor: b.color,
                animationDelay: `${b.delay}s`,
                fontSize: `${b.size * 0.42}px`,
              }}
            >
              {b.emoji}
            </div>
          ))}
        </div>

        <div className="hero-copy">
          <p className="hero-subtitle">
            We help you understand yourself and fill what matters.
          </p>
          <p className="hero-ko">
            필모어 스튜디오는 당신의 빈 부분을 채워,
            <br />
            더 나다운 삶으로 가는 여정을 함께합니다.
          </p>
        </div>
      </div>

      <a href="#emotion" className="hero-scroll" aria-label="아래로 스크롤">
        <span className="hero-scroll-text">SCROLL</span>
        <span className="hero-scroll-arrow">↓</span>
      </a>
    </section>
  );
}

const MARQUEE_TEXT =
  "FEEL · FILL · ECONOMY · BRANDING · EMOTION · POPUP · ";

function MarqueeBanner() {
  const line = MARQUEE_TEXT.repeat(6);
  return (
    <div className="marquee">
      <div className="marquee-row marquee-row--left">
        <span className="marquee-text">{line}</span>
        <span className="marquee-text" aria-hidden="true">
          {line}
        </span>
      </div>
      <div className="marquee-row marquee-row--right">
        <span className="marquee-text marquee-text--outline">{line}</span>
        <span className="marquee-text marquee-text--outline" aria-hidden="true">
          {line}
        </span>
      </div>
    </div>
  );
}

function AboutStudio() {
  return (
    <section className="section section--warm">
      <div className="section-content">
        <div className="about-intro">
          <span className="step-label">About · Fillmore Studio</span>
          <h2 className="about-title">
            안녕하세요,
            <br />
            <span className="about-title-accent">필모어 스튜디오</span> 입니다.
          </h2>
          <p className="about-desc">
            저희는 브랜드와 사람의 '빈 부분'을 채우는 브랜딩 컨설팅 회사예요.
            감각을 넘어 본질을 채우는 일, 그게 저희가 하는 일입니다.
            얼마 전에는 <strong>성수에서 'Fillconomy' 팝업</strong>을 열어
            많은 분들과 직접 만나기도 했어요.
          </p>
        </div>

        <div className="about-cards">
          {ABOUT_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="about-card"
              style={{ backgroundColor: card.color }}
            >
              <div className="about-card-top">
                <span className="about-card-label">{card.label}</span>
                <span className="about-card-icon">{card.icon}</span>
              </div>
              <div className="about-card-bottom">
                <span className="about-card-title">{card.title}</span>
                <span className="about-card-desc">{card.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmotionCheck() {
  const [selected, setSelected] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const handleSelect = useCallback((emotion) => {
    setSelected(emotion.label);
    setAnimKey((k) => k + 1);
  }, []);

  const currentEmotion = EMOTIONS.find((e) => e.label === selected);

  return (
    <section
      id="emotion"
      className={`section emotion-section ${selected ? `emotion-section--${selected}` : ""}`}
    >
      {selected && <WeatherOverlay type={selected} animKey={animKey} />}

      <div className="section-content emotion-content">
        <span className="step-label">Step 01 · Emotion Check</span>
        <h2 className="section-title">
          오늘 기분, <span className="title-accent">날씨</span>로 표현하면
          <br />
          어떤 날씨인가요?
        </h2>
        <p className="section-desc">
          지금 내 감정 상태를 <strong>10초 안에</strong> 확인해보세요.
        </p>

        <div className="emotion-grid">
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion.label}
              onClick={() => handleSelect(emotion)}
              className={`emotion-card ${selected === emotion.label ? "emotion-card--active" : ""} ${selected && selected !== emotion.label ? "emotion-card--dimmed" : ""}`}
              style={{ backgroundColor: emotion.color }}
            >
              <span className="emotion-emoji">{emotion.emoji}</span>
              <span className="emotion-label">{emotion.label}</span>
            </button>
          ))}
        </div>

        <div
          className={`emotion-result ${selected ? "emotion-result--visible" : ""}`}
        >
          {currentEmotion && (
            <>
              <div className="result-emoji">{currentEmotion.emoji}</div>
              <p className="result-message">{currentEmotion.message}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Feelconomy() {
  return (
    <section id="feelconomy" className="section">
      <div className="section-content">
        <span className="step-label">Step 02 · What is Feelconomy?</span>
        <h2 className="section-title">
          우리는 기분을 위해
          <br />
          소비합니다.
        </h2>

        <div className="product-gallery">
          {PRODUCTS.map((product) => (
            <figure key={product.name} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <figcaption className="product-name">{product.name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="feelconomy-reveal">
          <span className="reveal-mark">“</span>
          <p className="reveal-lead">이 모든 건 결국,</p>
          <h3 className="formula">
            <span className="formula-feel">Feel</span>
            <span className="formula-op">+</span>
            <span className="formula-eco">Economy</span>
            <span className="formula-op">=</span>
            <span className="formula-result">Feelconomy</span>
          </h3>
          <p className="reveal-sub">"기분을 채우기 위한 소비"</p>
          <blockquote className="reveal-quote">
            하지만 대부분은 <em>즉각적 진통제</em>일 뿐,
            <br />
            근본적인 회복은 아니에요.
          </blockquote>
        </div>
      </div>
    </section>
  );
}

const PROBLEM_ITEMS = [
  {
    num: "01",
    title: "스트레스 패턴을 모르기 때문에",
    desc: "내가 어떤 상황에서 무너지는지 모르면 같은 자리에서 같은 방식으로 반복합니다.",
  },
  {
    num: "02",
    title: "회복 방식을 모르기 때문에",
    desc: "잠시 잊는 것과 회복하는 것은 다릅니다. 나에게 맞는 회복 루틴이 필요합니다.",
  },
  {
    num: "03",
    title: "감정의 원인을 모르기 때문에",
    desc: "표면 감정이 아니라 그 밑에 깔린 진짜 신호를 짚어야 흐름이 끊깁니다.",
  },
];

function Problem() {
  const [activeLoop, setActiveLoop] = useState(null);

  return (
    <section className="section section--dark">
      <div className="section-content">
        <span className="step-label step-label--light">Step 03 · The Problem</span>
        <h2 className="section-title section-title--light">
          왜 우리는 자꾸
          <br />
          <span className="title-accent">같은 감정</span>에 반복적으로 흔들릴까요?
        </h2>

        <div className="emotion-cycle">
          {LOOP_ITEMS.map((item, idx) => (
            <div key={idx} className="cycle-node">
              <button
                className={`loop-item ${activeLoop === idx ? "loop-item--active" : ""}`}
                style={{ backgroundColor: item.color }}
                onClick={() =>
                  setActiveLoop((cur) => (cur === idx ? null : idx))
                }
              >
                <span className="loop-icon">{item.icon}</span>
                <span className="loop-label">{item.label}</span>
              </button>
              <span className="cycle-arrow">→</span>
            </div>
          ))}
          <div className="cycle-loopback">
            <span className="cycle-loopback-icon">↺</span>
            <span>반복되는 감정 루프</span>
          </div>
        </div>

        <div
          className={`loop-detail ${activeLoop !== null ? "loop-detail--visible" : ""}`}
        >
          {activeLoop !== null && (
            <p>
              <strong>{LOOP_ITEMS[activeLoop].label}</strong> —{" "}
              {LOOP_ITEMS[activeLoop].detail}
            </p>
          )}
        </div>

        <div className="problem-list">
          {PROBLEM_ITEMS.map((item, idx) => (
            <div key={idx} className="problem-item">
              <span className="problem-num">{item.num}</span>
              <div className="problem-body">
                <h4 className="problem-title">{item.title}</h4>
                <p className="problem-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section id="solution" className="section section--warm">
      <div className="section-content">
        <span className="step-label">Step 04 · Our Solution</span>
        <h2 className="section-title">
          일시적인 진통제가 아닌,
          <br />
          <span className="title-accent">감정 코칭 프로그램</span>
        </h2>

        <p className="section-desc">
          스트레스와 불안을 스스로 이해하고 관리할 수 있도록,
          <br />
          전문 코치와 함께하는 구조화된 프로그램입니다.
        </p>

        <div className="phases-grid">
          {PHASES.map((phase, idx) => (
            <div key={idx} className="phase-card">
              <span className="phase-label">{phase.phase}</span>
              <h4 className="phase-title">{phase.title}</h4>
              <p className="phase-desc">{phase.desc}</p>
            </div>
          ))}
        </div>

        <div className="discovery-section">
          <h3 className="discovery-title">
            이 프로그램을 통해 <span className="title-accent">발견</span>하게
            됩니다
          </h3>
          <div className="discovery-list">
            {DISCOVERIES.map((item, idx) => (
              <div key={idx} className="discovery-item">
                <span className="discovery-number">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="discovery-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BetaProgram() {
  return (
    <section id="beta" className="section">
      <div className="section-content">
        <span className="step-label">Step 05 · Beta Program</span>
        <h2 className="section-title">
          현재 <span className="title-accent">베타 체험단</span> 모집 중
        </h2>
        <p className="section-desc">
          <strong>30만 원 상당</strong> 프로그램을 사전 체험단에게{" "}
          <strong>무료</strong>로 제공합니다.
          <br /> 연령대·직업군을 고려해 진짜 변화를 원하시는 분 중심으로
          선정해요.
        </p>

        <div className="beta-steps">
          {BETA_STEPS.map((step, idx) => (
            <div key={idx} className="beta-step">
              <span className="beta-step-num">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="beta-step-title">{step}</span>
            </div>
          ))}
        </div>

        <div className="before-after">
          <div className="ba-card ba-card--before">
            <span className="ba-tag">BEFORE</span>
            <p className="ba-quote">
              “왜 힘든지
              <br />
              모르겠음.”
            </p>
            <span className="ba-mood">😶‍🌫️</span>
          </div>
          <div className="ba-divider">
            <span className="ba-divider-arrow">→</span>
          </div>
          <div className="ba-card ba-card--after">
            <span className="ba-tag">AFTER</span>
            <p className="ba-quote">
              “내가 왜
              <br />
              반복되는지
              <br />
              알게 됨.”
            </p>
            <span className="ba-mood">🌈</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section section--warm">
      <div className="section-content">
        <span className="step-label">Step 06 · What You Get</span>
        <h2 className="section-title">
          참여하면 <span className="title-accent">이런 걸</span> 얻어요
        </h2>

        <div className="benefits-grid">
          {BENEFITS.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <p className="benefit-title">{benefit.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RealStories() {
  return (
    <section className="section">
      <div className="section-content">
        <span className="step-label">Step 07 · Real Stories</span>
        <h2 className="section-title">
          실제 참여자들의 <span className="title-accent">이야기</span>
        </h2>
        <p className="section-desc">옆으로 넘겨 더 많은 이야기를 만나보세요 →</p>
      </div>
      <div className="stories-scroll">
        {TESTIMONIALS.map((story, idx) => (
          <article key={idx} className="story-card">
            <div
              className="story-bar"
              style={{ backgroundColor: story.barColor }}
            />
            <div className="story-header">
              <span className="story-demographic">{story.demographic}</span>
              <span
                className="story-topic"
                style={{ backgroundColor: story.topicColor }}
              >
                {story.topic}
              </span>
            </div>
            <p className="story-quote">"{story.quote}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyTrust() {
  return (
    <section className="section section--warm">
      <div className="section-content">
        <span className="step-label">Step 08 · Why Trust Us</span>
        <h2 className="section-title">
          우리는 단순 <span className="title-accent">상담 서비스</span>가
          아닙니다.
        </h2>

        <div className="trust-grid">
          {TRUST_POINTS.map((point, idx) => (
            <div key={idx} className="trust-card">
              <span className="trust-index">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="trust-title">{point.title}</h4>
              <p className="trust-desc">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplyForm() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    job: "",
    phone: "",
    concern: "",
    available: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`신청 완료!\n이름: ${formData.name}\n연락처: ${formData.phone}`);
    setFormData({
      name: "",
      birthDate: "",
      job: "",
      phone: "",
      concern: "",
      available: "",
    });
  };

  return (
    <section id="apply" className="section section--dark apply-section">
      <div className="section-content">
        <span className="step-label step-label--light">Step 09 · Apply</span>
        <h2 className="section-title section-title--light">
          무료 체험단 <span className="title-accent">신청하기</span>
        </h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label className="form-label">생년월일 (나이)</label>
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="예: 1995-03-15 (30세)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">직업</label>
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="직업을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label className="form-label">연락처</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="010-0000-0000"
            />
          </div>

          <div className="form-group form-group--full">
            <label className="form-label">현재 가장 고민되는 감정</label>
            <textarea
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              required
              className="form-textarea"
              placeholder="어떤 감정으로 고민하고 있나요?"
            />
          </div>

          <div className="form-group form-group--full">
            <label className="form-label">참여 가능 여부 / 가능 시간</label>
            <input
              type="text"
              name="available"
              value={formData.available}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="예: 주말 저녁 가능"
            />
          </div>

          <button type="submit" className="submit-button">
            나의 감정 패턴 분석 신청하기 →
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-watermark">FILLMORE</div>
      <div className="section-content footer-content">
        <p className="footer-text">
          © 2026 필모어 스튜디오 · Fillconomy. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link">
            Instagram
          </a>
          <span className="footer-dot">·</span>
          <a href="#" className="footer-link">
            LinkedIn
          </a>
          <span className="footer-dot">·</span>
          <a href="#" className="footer-link">
            Behance
          </a>
        </div>
      </div>
    </footer>
  );
}

// ========== 메인 App 컴포넌트 ==========
export default function FeelComponents() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <MarqueeBanner />
      <AboutStudio />
      <EmotionCheck />
      <Feelconomy />
      <Problem />
      <Solution />
      <BetaProgram />
      <Benefits />
      <RealStories />
      <WhyTrust />
      <ApplyForm />
      <Footer />
    </div>
  );
}

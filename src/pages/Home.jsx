import { useState, useCallback, useRef } from "react";
import html2canvas from "html2canvas";

const EMOTIONS = [
  {
    iconUrl: "https://img.icons8.com/color/96/sun--v1.png",
    label: "햇살",
    color: "#FFF3D6",
    message: "오늘은 맑은 하루네요! 이 에너지를 잘 활용해보세요.",
  },
  {
    iconUrl: "https://img.icons8.com/color/96/cloud--v1.png",
    label: "구름",
    color: "#EDE5D8",
    message: "조금 흐린 기분이군요. 괜찮아요, 구름 뒤엔 항상 햇살이 있어요.",
  },
  {
    iconUrl: "https://img.icons8.com/color/96/rainy-weather--v1.png",
    label: "비",
    color: "#D4DEE8",
    message: "비 오는 날엔 잠시 쉬어가도 괜찮아요. 당신의 감정은 소중해요.",
  },
  {
    iconUrl: "https://img.icons8.com/color/96/lightning-bolt--v1.png",
    label: "번개",
    color: "#E8D4E8",
    message: "감정이 격하게 요동치는 날이네요. 깊은 숨 한번 쉬어볼까요?",
  },
];

const PRODUCTS = [
  "왁뿌볼 / 슬라임",
  "AI 상담",
  "캔들 / 디퓨저",
  "음식 / 맛집투어",
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
    demographic: "김OO",
    topic: "반복 갈등 패턴 이해",
    topicColor: "#A8D4E6",
    quote: "인간관계에서 계속 반복되는 갈등이 제 패턴이었다는 걸 알게 됐어요.",
  },
  {
    demographic: "박OO",
    topic: "스트레스 관리",
    topicColor: "#C8D4A0",
    quote: "나만의 회복 루틴을 찾고 훨씬 편해졌어요.",
  },
  {
    demographic: "이OO",
    topic: "연애 반응 패턴 이해",
    topicColor: "#F0C4C8",
    quote:
      "어떤 상황에 예민하게 반응하는지 알고 나니 감정 조절이 수월해졌어요.",
  },
  {
    demographic: "정OO",
    topic: "회복 루틴 설계",
    topicColor: "#A8D4A8",
    quote: "무기력할 때 어떻게 채워야 하는지 스스로 알게 됐어요.",
  },
  {
    demographic: "최OO",
    topic: "번아웃 회복",
    topicColor: "#D4B8E0",
    quote: "지치기 전에 쉬는 타이밍을 스스로 찾아요.",
  },
  {
    demographic: "한OO",
    topic: "시험 불안 관리",
    topicColor: "#E0D4A8",
    quote: "불안이 와도 대처법을 알아서 덜 무서워요.",
  },
  {
    demographic: "송OO",
    topic: "자존감 회복",
    topicColor: "#A8C8E0",
    quote: "그게 감정 패턴이란 걸 알고 나니 한결 편해졌어요.",
  },
  {
    demographic: "윤OO",
    topic: "감정 분리 연습",
    topicColor: "#F0D4B8",
    quote: "내 감정과 아이의 감정을 분리해서 볼 수 있게 됐어요.",
  },
];

const ABOUT_CARDS = [
  {
    label: "SEONGSU, 2026",
    title: "성수 팝업",
    desc: "감정을 직접 만지고 경험하는 오프라인 공간",
    iconUrl: "https://img.icons8.com/color/96/shop--v1.png",
    color: "#F5B8C4",
  },
  {
    label: "BRANDING STUDIO",
    title: "브랜딩 컨설팅",
    desc: "브랜드의 빈 부분을 채우는 전략 설계",
    iconUrl: "https://img.icons8.com/color/96/design--v1.png",
    color: "#D6D48C",
  },
  {
    label: "EMOTION DATA",
    title: "감정 데이터",
    desc: "실제 참여자 기반의 감정 패턴 분석",
    iconUrl: "https://img.icons8.com/color/96/combo-chart--v1.png",
    color: "#8CBEE0",
  },
  {
    label: "LONG-TERM GOAL",
    title: "Wee클래스 보급",
    desc: "학교 현장으로 확장하는 정서지원 모델",
    iconUrl: "https://img.icons8.com/color/96/graduation-cap--v1.png",
    color: "#E8A88C",
  },
];

const LOOP_ITEMS = [
  {
    label: "불안",
    iconUrl: "https://img.icons8.com/color/96/error--v1.png",
    color: "#E8A88C",
    detail: "무언가 잘못될 것 같은 막연한 두려움이 반복됩니다.",
  },
  {
    label: "회피",
    iconUrl: "https://img.icons8.com/color/96/hide--v1.png",
    color: "#D6D48C",
    detail: "불편한 감정을 마주하지 않고 자꾸 뒤로 미루게 됩니다.",
  },
  {
    label: "후회",
    iconUrl: "https://img.icons8.com/color/96/disappointed.png",
    color: "#8CBEE0",
    detail: "왜 그때 그렇게 했을까, 같은 생각이 머릿속을 맴돕니다.",
  },
  {
    label: "스트레스",
    iconUrl: "https://img.icons8.com/color/96/fire-element--v1.png",
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

const JOURNEY_STEPS = [
  {
    title: "Understand",
    desc: "나의 감정과 패턴을 깊이 이해해요.",
    icon: "/assets/char-flower.svg",
  },
  {
    title: "Connect",
    desc: "흩어진 감정과 생각을 연결해요.",
    icon: "/assets/char-cloud-green.svg",
  },
  {
    title: "Fill",
    desc: "필요한 영양을 채워 균형을 찾아요.",
    icon: "/assets/char-cloud-blue.svg",
  },
  {
    title: "Grow",
    desc: "더 단단하고 빛나는 나로 성장해요.",
    icon: "/assets/char-star.svg",
  },
  {
    title: "Become",
    desc: "완성된 나답게 살아가요.",
    icon: "/assets/char-heart.svg",
  },
];

function CharacterSvg({ color, eyes, shape, size = 40 }) {
  const eyeY =
    shape === "flower"
      ? 16
      : shape === "cloud"
        ? 17
        : shape === "star"
          ? 14
          : shape === "heart"
            ? 13
            : 18;
  const eyeContent =
    eyes === "oo" ? (
      <>
        <circle cx="14" cy={eyeY} r="3.5" fill="#fff" />
        <circle cx="26" cy={eyeY} r="3.5" fill="#fff" />
        <circle cx="15" cy={eyeY} r="2" fill="#1a1a1a" />
        <circle cx="27" cy={eyeY} r="2" fill="#1a1a1a" />
      </>
    ) : eyes === "^^" ? (
      <>
        <path
          d={`M11 ${eyeY} Q15 ${eyeY - 4} 19 ${eyeY}`}
          stroke="#1a1a1a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M21 ${eyeY} Q25 ${eyeY - 4} 29 ${eyeY}`}
          stroke="#1a1a1a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <circle cx="14" cy={eyeY} r="3" fill="#fff" />
        <circle cx="26" cy={eyeY} r="3" fill="#fff" />
        <circle cx="15" cy={eyeY + 0.5} r="1.5" fill="#1a1a1a" />
        <circle cx="27" cy={eyeY + 0.5} r="1.5" fill="#1a1a1a" />
      </>
    );

  const mouthY =
    shape === "flower"
      ? 22
      : shape === "cloud"
        ? 22
        : shape === "star"
          ? 19
          : shape === "heart"
            ? 18
            : 25;
  const mouth =
    eyes === ":)" ? (
      <path
        d={`M15 ${mouthY} Q20 ${mouthY + 5} 25 ${mouthY}`}
        stroke="#1a1a1a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    ) : eyes === "^^" ? (
      <ellipse
        cx="20"
        cy={mouthY + 1}
        rx="2.5"
        ry="1.5"
        fill="rgba(0,0,0,0.12)"
      />
    ) : (
      <circle cx="20" cy={mouthY + 1} r="2" fill="rgba(0,0,0,0.12)" />
    );

  const shapePath =
    shape === "ghost" ? (
      <path
        d="M7 28 Q7 5 20 5 Q33 5 33 28 L31 24 L28 28 L25 24 L22 28 L19 24 L16 28 L13 24 L10 28 Z"
        fill={color}
      />
    ) : shape === "flower" ? (
      <>
        <ellipse cx="20" cy="6" r="7.5" fill={color} />
        <ellipse cx="9" cy="13" r="7.5" fill={color} />
        <ellipse cx="31" cy="13" r="7.5" fill={color} />
        <ellipse cx="11" cy="25" r="7.5" fill={color} />
        <ellipse cx="29" cy="25" r="7.5" fill={color} />
        <circle cx="20" cy="17" r="10" fill={color} />
      </>
    ) : shape === "cloud" ? (
      <path
        d="M12 28 C5 28 3 22 5 18 C3 14 6 9 12 9 C14 5 19 3 24 5 C28 3 34 6 34 12 C38 14 38 22 33 25 C34 28 30 30 26 28 C23 30 17 30 12 28 Z"
        fill={color}
      />
    ) : shape === "star" ? (
      <path
        d="M20 3 C21 8 24 11 28 11 C24 13 22 17 22 22 C20 18 17 16 12 15 C16 13 19 9 20 3 Z"
        fill={color}
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    ) : shape === "heart" ? (
      <path
        d="M20 28 C12 22 4 17 4 11 C4 6 8 3 12 3 C15 3 18 5 20 8 C22 5 25 3 28 3 C32 3 36 6 36 11 C36 17 28 22 20 28 Z"
        fill={color}
      />
    ) : (
      <ellipse cx="20" cy="19" rx="16" ry="15" fill={color} />
    );

  return (
    <svg
      width={size}
      height={size}
      viewBox={shape === "heart" ? "0 0 40 32" : "0 0 40 34"}
      fill="none"
    >
      {shapePath}
      {eyeContent}
      {mouth}
    </svg>
  );
}

const FLOATING_CHARS = [
  { color: "#FFD060", eyes: "oo", shape: "flower", className: "float-char--1" },
  { color: "#5BAE7A", eyes: "^^", shape: "ghost", className: "float-char--2" },
  { color: "#F5A0B0", eyes: ":)", shape: "blob", className: "float-char--3" },
  { color: "#9B7ED8", eyes: "^^", shape: "ghost", className: "float-char--4" },
  { color: "#6BB8D0", eyes: "oo", shape: "flower", className: "float-char--5" },
  { color: "#FFD060", eyes: ":)", shape: "blob", className: "float-char--6" },
  { color: "#F5A0B0", eyes: "oo", shape: "flower", className: "float-char--7" },
  { color: "#5BAE7A", eyes: ":)", shape: "blob", className: "float-char--8" },
];

function Hero() {
  return (
    <section className="hero">
      {FLOATING_CHARS.map((ch, i) => (
        <div key={i} className={`float-char ${ch.className}`}>
          <CharacterSvg
            color={ch.color}
            eyes={ch.eyes}
            shape={ch.shape}
            size={
              ch.className.includes("1") || ch.className.includes("5")
                ? 52
                : ch.className.includes("3") || ch.className.includes("7")
                  ? 44
                  : 38
            }
          />
        </div>
      ))}

      <div className="hero-deco hero-deco--1" />
      <div className="hero-deco hero-deco--2" />
      <div className="hero-deco hero-deco--3" />

      <div className="hero-grid">
        <div className="hero-text">
          <p className="hero-eyebrow">EMOTIONS CONNECT. WE FILL.</p>
          <h1 className="hero-title">
            <span className="hero-title-line">
              W<em></em>hat's
            </span>
            <span className="hero-title-line">
              M<em></em>issing?
            </span>
          </h1>
          <p className="hero-sub">
            흩어져 있던 감정의 조각들,
            <br />
            필모어 스튜디오가 함께 채워 완성합니다.
          </p>
          <div className="hero-ctas">
            <a href="#solution" className="btn-primary">
              Our Program <span className="btn-arrow">→</span>
            </a>
            <a href="#about" className="btn-ghost">
              About Us
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/assets/puzzle-head-noback.png"
            alt="감정 퍼즐 조각들이 모여 하나의 머리를 이루는 일러스트"
            className="puzzle-head-img"
          />
        </div>
      </div>
    </section>
  );
}

function JourneyStrip() {
  return (
    <section className="journey-strip">
      <div className="journey-strip-inner">
        {JOURNEY_STEPS.map((step, idx) => (
          <div key={idx} className="strip-item">
            <div className="strip-char">
              <img
                src={step.icon}
                alt={step.title}
                className="strip-char-img"
              />
            </div>
            <div className="strip-text">
              <strong className="strip-title">{step.title}</strong>
              <span className="strip-desc">{step.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutStudio() {
  return (
    <section id="about" className="sec">
      <div className="sec-inner">
        <div className="about-head">
          <span className="tag">About · Fillmore Studio</span>
          <h2 className="sec-title">
            안녕하세요,
            <br />
            <span className="accent">필모어 스튜디오</span> 입니다.
          </h2>
          <p className="about-body">
            저희는 브랜드와 사람의 '빈 부분'을 채우는 브랜딩 컨설팅 회사예요.
            감각을 넘어 본질을 채우는 일, 그게 저희가 하는 일입니다. 얼마 전에는{" "}
            <strong>성수에서 'Fillconomy' 팝업</strong>을 열어 많은 분들과 직접
            만나기도 했어요.
          </p>
        </div>

        <div className="about-grid">
          {ABOUT_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="about-card"
              style={{ backgroundColor: card.color }}
            >
              <div className="about-card-head">
                <span className="about-card-tag">{card.label}</span>
                <span className="about-card-icon">
                  <img
                    src={card.iconUrl}
                    alt={card.title}
                    width={24}
                    height={24}
                  />
                </span>
              </div>
              <div className="about-card-foot">
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

function EmotionCheck() {
  const [selected, setSelected] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const handleSelect = useCallback((e) => {
    setSelected(e.label);
    setAnimKey((k) => k + 1);
  }, []);
  const cur = EMOTIONS.find((e) => e.label === selected);

  return (
    <section
      id="emotion"
      className={`sec sec--alt emo-sec ${selected ? `emo-sec--${selected}` : ""}`}
    >
      {selected && <WeatherOverlay type={selected} animKey={animKey} />}

      <div className="sec-inner emo-content">
        <span className="tag">Begin · Emotion Check</span>
        <h2 className="sec-title">
          오늘 기분, <span className="accent">날씨</span>로 표현하면
          <br />
          어떤 날씨인가요?
        </h2>
        <p className="sec-desc">
          지금 내 감정 상태를 <strong>10초 안에</strong> 확인해보세요.
        </p>

        <div className="emo-grid">
          {EMOTIONS.map((em) => (
            <button
              key={em.label}
              className={`emo-card ${selected === em.label ? "emo-card--on" : ""} ${selected && selected !== em.label ? "emo-card--off" : ""}`}
              style={{ backgroundColor: em.color }}
              onClick={() => handleSelect(em)}
            >
              <span className="emo-icon">
                <img src={em.iconUrl} alt={em.label} width={48} height={48} />
              </span>
              <span className="emo-name">{em.label}</span>
            </button>
          ))}
        </div>

        <div className={`emo-result ${selected ? "emo-result--show" : ""}`}>
          {cur && (
            <>
              <div className="emo-result-icon" key={animKey}>
                <img src={cur.iconUrl} alt={cur.label} width={42} height={42} />
              </div>
              <p className="emo-result-msg">{cur.message}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Feelconomy() {
  const [selected, setSelected] = useState([]);

  const toggle = (p) => {
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  };

  return (
    <section id="feelconomy" className="sec">
      <div className="sec-inner">
        <span className="tag">Step 01 · What is Feelconomy?</span>
        <h2 className="sec-title">
          우리는 <span className="accent">기분</span>을 위해
          <br />
          소비합니다.
        </h2>

        <div className="prod-poster">
          <img
            src="/assets/feelconomy-poster.jpg"
            alt="Feelconomy"
            className="prod-poster-img"
          />
        </div>
        <div className="prod-tags">
          {PRODUCTS.map((p) => (
            <button
              key={p}
              className={`prod-tag ${selected.includes(p) ? "prod-tag--on" : ""}`}
              onClick={() => toggle(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="reveal-box">
          <p className="reveal-lead">이 모든 건 결국,</p>
          <h3 className="formula">
            <span className="f-feel">Feel</span>
            <span className="f-op">+</span>
            <span className="f-eco">Economy</span>
            <span className="f-op">=</span>
            <span className="f-result">Feelconomy</span>
          </h3>
          <p className="reveal-sub">"기분을 채우기 위한 소비"</p>
          <blockquote className="reveal-quote">
            하지만 대부분은 즉각적 진통제 일 뿐,
            <br />
            근본적인 회복은 아니에요.
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function EventBanner() {
  return (
    <section className="event-banner">
      <div className="event-banner-inner">
        <span className="event-banner-badge">🎉FEELCONOMY EVENT🎉</span>
        <div className="event-banner-frame">
          <img
            src="/assets/fillconomy-event-banner.jpg"
            alt="Fillconomy Event - 당신의 빈 부분을 채우는 가장 좋은 투자"
            className="event-banner-img"
          />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const [active, setActive] = useState(null);

  return (
    <section className="sec sec--dark">
      <div className="sec-inner">
        <span className="tag tag--light">Step 02 · The Problem</span>
        <h2 className="sec-title sec-title--light">
          왜 우리는 자꾸
          <br />
          <span className="accent">같은 감정</span>에 반복적으로 흔들릴까요?
        </h2>

        <div className="loop-circle">
          <svg className="loop-arrows" viewBox="0 0 400 400">
            <path
              d="M248 68 A155 155 0 0 1 330 150"
              fill="none"
              stroke="#c4a0d8"
              strokeWidth="2"
            />
            <path
              d="M325 145 L335 158 L320 153"
              fill="none"
              stroke="#c4a0d8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M338 248 A155 155 0 0 1 248 335"
              fill="none"
              stroke="#c4a0d8"
              strokeWidth="2"
            />
            <path
              d="M253 330 L243 342 L240 327"
              fill="none"
              stroke="#c4a0d8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M152 338 A155 155 0 0 1 68 250"
              fill="none"
              stroke="#c4a0d8"
              strokeWidth="2"
            />
            <path
              d="M73 255 L63 242 L78 246"
              fill="none"
              stroke="#c4a0d8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M62 155 A155 155 0 0 1 155 65"
              fill="none"
              stroke="#c4a0d8"
              strokeWidth="2"
            />
            <path
              d="M150 70 L160 57 L163 72"
              fill="none"
              stroke="#c4a0d8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {LOOP_ITEMS.map((it, i) => (
            <button
              key={i}
              className={`loop-btn loop-pos--${i} ${active === i ? "loop-btn--on" : ""}`}
              style={{ backgroundColor: it.color }}
              onClick={() => setActive((c) => (c === i ? null : i))}
            >
              <span className="loop-icon">
                <img src={it.iconUrl} alt={it.label} width={32} height={32} />
              </span>
              <span className="loop-name">{it.label}</span>
            </button>
          ))}
        </div>
        <div className="loop-back">
          <span className="loop-spin">↺</span>
          <span>반복되는 감정 루프</span>
        </div>

        <div
          className={`loop-detail ${active !== null ? "loop-detail--show" : ""}`}
        >
          {active !== null && (
            <p>
              <strong>{LOOP_ITEMS[active].label}</strong> —{" "}
              {LOOP_ITEMS[active].detail}
            </p>
          )}
        </div>

        <div className="prob-list">
          {PROBLEM_ITEMS.map((it, i) => (
            <div key={i} className="prob-row">
              <span className="prob-num">{it.num}</span>
              <div>
                <h4 className="prob-title">{it.title}</h4>
                <p className="prob-desc">{it.desc}</p>
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
    <section id="solution" className="sec sec--alt">
      <div className="sec-inner">
        <span className="tag">Step 03 · Our Solution</span>
        <h2 className="sec-title">
          일시적인 진통제가 아닌,
          <br />
          <span className="accent">감정 코칭 프로그램</span>
        </h2>
        <p className="sec-desc">
          스트레스와 불안을 스스로 이해하고 관리할 수 있도록,
          <br />
          전문 코치와 함께하는 구조화된 프로그램입니다.
        </p>

        <div className="phase-grid">
          {PHASES.map((p, i) => (
            <div key={i} className="phase-card">
              <span className="phase-tag">{p.phase}</span>
              <h4 className="phase-title">{p.title}</h4>
              <p className="phase-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BetaProgram() {
  return (
    <section id="beta" className="sec">
      <div className="sec-inner">
        <span className="tag">Step 04 · Beta Program</span>
        <h2 className="sec-title">
          현재 <span className="accent">베타 체험단</span> 모집 중
        </h2>
        <p className="sec-desc">
          <strong>30만 원 상당</strong> 프로그램을 사전 체험단에게{" "}
          <strong>무료</strong>로 제공합니다.
          <br />
          연령대·직업군을 고려해 진짜 변화를 원하시는 분 중심으로 선정해요.
        </p>

        <div className="beta-grid">
          {BETA_STEPS.map((s, i) => (
            <div key={i} className="beta-card">
              <span className="beta-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="beta-name">{s}</span>
            </div>
          ))}
        </div>

        <div className="disc-box">
          <h3 className="disc-title">
            이 프로그램을 통해 <span className="accent">발견</span>하게 됩니다
          </h3>
          <div className="disc-list">
            {DISCOVERIES.map((d, i) => (
              <div key={i} className="disc-row">
                <span className="disc-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="disc-text">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RealStories() {
  const scrollRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const [selected, setSelected] = useState(null);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  const handleClick = (i) => {
    if (selected === i) {
      setSelected(null);
      setPaused(false);
    } else {
      setSelected(i);
      setPaused(true);
    }
  };

  return (
    <section id="stories" className="sec">
      <div className="sec-inner">
        <span className="tag">Step 05 · Real Stories</span>
        <h2 className="sec-title">
          실제 참여자들의 <span className="accent">이야기</span>
        </h2>
      </div>
      <div
        className="story-carousel"
        ref={scrollRef}
        onMouseEnter={() => {
          if (selected === null) setPaused(true);
        }}
        onMouseLeave={() => {
          if (selected === null) setPaused(false);
        }}
      >
        <div className={`story-track ${paused ? "story-track--paused" : ""}`}>
          {doubled.map((s, i) => (
            <article
              key={i}
              className={`story-card ${selected === i ? "story-card--active" : ""}`}
              onClick={() => handleClick(i)}
            >
              <div className="story-head">
                <span className="story-name">{s.demographic}</span>
                <span
                  className="story-topic"
                  style={{ backgroundColor: s.topicColor }}
                >
                  {s.topic}
                </span>
              </div>
              <p className="story-quote">"{s.quote}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplyForm() {
  const sectionRef = useRef(null);
  const [fd, setFd] = useState({
    name: "",
    birthDate: "",
    gender: "",
    job: "",
    phone: "",
    mbti: "",
    location: "",
    referral: "",
    concern: "",
    available: "",
  });
  const set = (e) => {
    const { name, value } = e.target;
    setFd((p) => ({ ...p, [name]: value }));
  };
  const [showConfirm, setShowConfirm] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const entry = {
      ...fd,
      date: new Date().toLocaleString("ko-KR"),
      timestamp: Date.now(),
    };
    const prev = JSON.parse(
      localStorage.getItem("fillmore_applications") || "[]",
    );
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const filtered = prev.filter((d) => Date.now() - d.timestamp < sevenDays);
    const updated = [entry, ...filtered].slice(0, 100);
    localStorage.setItem("fillmore_applications", JSON.stringify(updated));
    setSubmittedName(fd.name);
    setShowConfirm(true);
  };
  const capture = async () => {
    if (!sectionRef.current) return;
    const canvas = await html2canvas(sectionRef.current, {
      backgroundColor: "#FFF8F3",
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = "fillmore-apply.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section id="apply" className="apply-sec" ref={sectionRef}>
      <div className="apply-inner">
        <div className="apply-left">
          <span
            className="tag tag--capture"
            onClick={capture}
            role="button"
            tabIndex={0}
          >
            Step 06 · Apply
          </span>
          <h2 className="apply-title">
            사전체험단 신청하기
            <br />
          </h2>
          <p className="apply-desc">
            30만 원 상당의 감정 코칭 프로그램을
            <br />
            사전 체험단에게 무료로 제공합니다.
          </p>
          <div className="apply-points">
            <div className="apply-point">
              <span className="apply-point-icon">✦</span>
              <span>1:1 전문 코칭 세션</span>
            </div>
            <div className="apply-point">
              <span className="apply-point-icon">✦</span>
              <span>감정 패턴 분석 리포트</span>
            </div>
            <div className="apply-point">
              <span className="apply-point-icon">✦</span>
              <span>맞춤 회복 루틴 설계</span>
            </div>
          </div>
        </div>

        <div className="apply-right">
          <form className="apply-form" onSubmit={submit}>
            <div className="af-row af-row--3">
              <div className="af-group">
                <label className="af-label">이름</label>
                <input
                  type="text"
                  name="name"
                  value={fd.name}
                  onChange={set}
                  required
                  className="af-input"
                  placeholder="홍길동"
                />
              </div>
              <div className="af-group">
                <label className="af-label">생년월일</label>
                <input
                  type="text"
                  name="birthDate"
                  value={fd.birthDate}
                  onChange={set}
                  required
                  className="af-input"
                  placeholder="1995-03-15 (30세)"
                />
              </div>
              <div className="af-group">
                <label className="af-label">성별</label>
                <select
                  name="gender"
                  value={fd.gender}
                  onChange={set}
                  required
                  className="af-input af-select"
                >
                  <option value="" disabled>
                    선택
                  </option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </select>
              </div>
            </div>
            <div className="af-row">
              <div className="af-group">
                <label className="af-label">직업/전공</label>
                <input
                  type="text"
                  name="job"
                  value={fd.job}
                  onChange={set}
                  required
                  className="af-input"
                  placeholder="대학생(경영과),  직장인 등"
                />
              </div>
              <div className="af-group">
                <label className="af-label">연락처</label>
                <input
                  type="tel"
                  name="phone"
                  value={fd.phone}
                  onChange={set}
                  required
                  className="af-input"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>
            <div className="af-row">
              <div className="af-group">
                <label className="af-label">MBTI</label>
                <input
                  type="text"
                  name="mbti"
                  value={fd.mbti}
                  onChange={set}
                  className="af-input"
                  placeholder="예: INFP"
                />
              </div>
              <div className="af-group">
                <label className="af-label">
                  거주지 (동까지만, 또는 근처 역)
                </label>
                <input
                  type="text"
                  name="location"
                  value={fd.location}
                  onChange={set}
                  className="af-input"
                  placeholder="예: 성수동 / 건대입구역"
                />
              </div>
            </div>
            <div className="af-group">
              <label className="af-label">방문 경로</label>
              <div className="af-checkbox-group">
                {["직원 추천", "학교/회사", "SNS", "기타"].map((opt) => (
                  <label key={opt} className="af-checkbox">
                    <input
                      type="checkbox"
                      checked={fd.referral === opt}
                      onChange={() =>
                        setFd((p) => ({
                          ...p,
                          referral: p.referral === opt ? "" : opt,
                        }))
                      }
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="af-group">
              <label className="af-label">
                참여 가능 시간 (평일, 20시까지)
              </label>
              <input
                type="text"
                name="available"
                value={fd.available}
                onChange={set}
                required
                className="af-input"
                placeholder="예: 평일 오후 2시~6시"
              />
            </div>
            <div className="af-group">
              <label className="af-label">현재 가장 고민되는 감정</label>
              <textarea
                name="concern"
                value={fd.concern}
                onChange={set}
                required
                className="af-input af-textarea"
                placeholder="어떤 감정으로 고민하고 있나요?"
              />
            </div>
            <button type="submit" className="af-submit">
              신청하기 <span className="af-arrow">→</span>
            </button>
          </form>
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">✦</div>
            <h3 className="confirm-title">{submittedName}님, 감사합니다.</h3>
            <p className="confirm-body">
              <strong>Fillmore Studio </strong>
              감정 코칭 체험단
              <br />
              정상적으로 신청되었습니다.
            </p>
            <p className="confirm-body">
              담당 팀에서 신청 내용을 확인한 후,
              <br />
              <strong>0 ~ 3일 이내</strong>에 안내드릴 예정입니다.
            </p>
            <p className="confirm-note">
              더 나은 나를 향한 여정,
              <br />
              필모어 스튜디오가 함께하겠습니다.
            </p>
            <button
              className="confirm-close"
              onClick={() => setShowConfirm(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function getRecords() {
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  return JSON.parse(
    localStorage.getItem("fillmore_applications") || "[]",
  ).filter((d) => now - d.timestamp < sevenDays);
}

function ClearAndAdmin({ showList, setShowList }) {
  const [guide, setGuide] = useState(
    () => localStorage.getItem("fillmore_guide") || "",
  );
  const [savedGuide, setSavedGuide] = useState(
    () => localStorage.getItem("fillmore_guide") || "",
  );
  const records = showList ? getRecords() : [];

  const saveGuide = () => {
    localStorage.setItem("fillmore_guide", guide);
    setSavedGuide(guide);
    alert("인도자가 저장되었습니다.");
  };

  return (
    <div className="clear-section">
      <button
        className="clear-btn"
        onClick={() => {
          sessionStorage.setItem("scrollTop", "true");
          window.location.reload();
        }}
      >
        처음으로 돌아가기
      </button>
      {showList && (
        <div className="admin-list">
          <div className="admin-header">
            <h4 className="admin-title">
              최근 신청 내역 ({records.length}건){" "}
              <button
                className="admin-close-top"
                onClick={() => setShowList(false)}
              >
                닫기
              </button>
            </h4>
            <div className="admin-guide">
              <label className="admin-guide-label">인도자 :</label>
              <input
                className="admin-guide-input"
                type="text"
                value={guide}
                onChange={(e) => setGuide(e.target.value)}
                placeholder="이름 입력"
              />
              <button className="admin-guide-save" onClick={saveGuide}>
                변경
              </button>
            </div>
          </div>
          {records.length === 0 ? (
            <p className="admin-empty">저장된 신청 내역이 없습니다.</p>
          ) : (
            records.map((d, i) => (
              <div key={i} className="admin-card">
                <span className="admin-date">{d.date}</span>
                <p>
                  이름: {d.name} · 생년월일: {d.birthDate} · 성별: {d.gender}
                </p>
                <p>
                  직업: {d.job} · 연락처: {d.phone}
                </p>
                <p>
                  MBTI: {d.mbti} · 거주지: {d.location}
                </p>
                <p>고민: {d.concern}</p>
                <p>참여시간: {d.available}</p>
                <p>방문경로: {d.referral || "-"}</p>
                {(() => {
                  const summary = `${d.timestamp ? `${new Date(d.timestamp).getMonth() + 1}/${new Date(d.timestamp).getDate()}` : "-"}-신규-${d.name}-${d.phone}-${d.gender === "남성" ? "남" : d.gender === "여성" ? "여" : d.gender}-${d.birthDate}-${d.location}-필코노미-${savedGuide}-비오픈`;
                  return (
                    <div className="admin-summary-row">
                      <p className="admin-summary">{summary}</p>
                      <button
                        className="admin-copy"
                        onClick={(e) => {
                          navigator.clipboard.writeText(summary);
                          const btn = e.currentTarget;
                          btn.dataset.copied = "true";
                          setTimeout(() => (btn.dataset.copied = ""), 1500);
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      </button>
                    </div>
                  );
                })()}
              </div>
            ))
          )}
          <button className="clear-btn" onClick={() => setShowList(false)}>
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home({ showAdmin, setShowAdmin }) {
  return (
    <>
      <Hero />
      <JourneyStrip />
      <AboutStudio />
      <EmotionCheck />
      <Feelconomy />
      <Problem />
      <Solution />
      <EventBanner />
      <BetaProgram />
      <RealStories />
      <ApplyForm />
      <ClearAndAdmin showList={showAdmin} setShowList={setShowAdmin} />
    </>
  );
}

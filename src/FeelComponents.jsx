import { useState, useCallback } from "react";
import "./FeelComponents.css";

const EMOTIONS = [
  {
    emoji: "☀️",
    label: "햇살",
    color: "#FFF3D6",
    message: "오늘은 맑은 하루네요! 이 에너지를 잘 활용해보세요.",
  },
  {
    emoji: "☁️",
    label: "구름",
    color: "#EDE5D8",
    message: "조금 흐린 기분이군요. 괜찮아요, 구름 뒤엔 항상 햇살이 있어요.",
  },
  {
    emoji: "🌧️",
    label: "비",
    color: "#D4DEE8",
    message: "비 오는 날엔 잠시 쉬어가도 괜찮아요. 당신의 감정은 소중해요.",
  },
  {
    emoji: "⚡",
    label: "번개",
    color: "#E8D4E8",
    message: "감정이 격하게 요동치는 날이네요. 깊은 숨 한번 쉬어볼까요?",
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
    quote: "어떤 상황에 예민하게 반응하는지 알고 나니 감정 조절이 수월해졌어요.",
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
    character: { color: "#FFD060", eyes: "oo", shape: "flower" },
  },
  {
    title: "Connect",
    desc: "흩어진 감정과 생각을 연결해요.",
    character: { color: "#5BAE7A", eyes: "^^", shape: "ghost" },
  },
  {
    title: "Fill",
    desc: "필요한 영양을 채워 균형을 찾아요.",
    character: { color: "#F5A0B0", eyes: ":)", shape: "blob" },
  },
  {
    title: "Grow",
    desc: "더 단단하고 빛나는 나로 성장해요.",
    character: { color: "#9B7ED8", eyes: "^^", shape: "ghost" },
  },
  {
    title: "Become",
    desc: "완성된 나답게 살아가요.",
    character: { color: "#FFD060", eyes: ":)", shape: "blob" },
  },
];

function CharacterSvg({ color, eyes, shape, size = 40 }) {
  const eyeY = shape === "flower" ? 16 : 18;
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

  const mouthY = shape === "flower" ? 22 : 25;
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
        <circle cx="20" cy="7" r="8" fill={color} opacity="0.6" />
        <circle cx="11" cy="14" r="8" fill={color} opacity="0.6" />
        <circle cx="29" cy="14" r="8" fill={color} opacity="0.6" />
        <circle cx="13" cy="24" r="8" fill={color} opacity="0.6" />
        <circle cx="27" cy="24" r="8" fill={color} opacity="0.6" />
        <circle cx="20" cy="17" r="11" fill={color} />
      </>
    ) : (
      <ellipse cx="20" cy="19" rx="16" ry="15" fill={color} />
    );

  return (
    <svg width={size} height={size} viewBox="0 0 40 34" fill="none">
      {shapePath}
      {eyeContent}
      {mouth}
    </svg>
  );
}

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="navbar">
        <a href="#" className="logo">
          <img
            src="/assets/fillmore-studio-logo.png"
            alt="Fillmore Studio"
            className="logo-image"
          />
        </a>
        <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`}>
          <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#feelconomy" className="nav-link" onClick={() => setIsMenuOpen(false)}>Program</a>
          <a href="#solution" className="nav-link" onClick={() => setIsMenuOpen(false)}>Studio</a>
          <a href="#stories" className="nav-link" onClick={() => setIsMenuOpen(false)}>Journal</a>
          <a href="#apply" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-right">
          <a href="#apply" className="nav-cta">
            Start Your Journey <span className="cta-arrow">→</span>
          </a>
          <button
            className={`hamburger ${isMenuOpen ? "hamburger--active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-text">
          <p className="hero-eyebrow">EMOTIONS CONNECT. WE FILL.</p>
          <h1 className="hero-title">
            <span className="hero-title-line">PUT THE PIECES</span>
            <span className="hero-title-line">TOGETHER,</span>
            <span className="hero-title-line">BECOME YOU.</span>
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
            <a href="#about" className="btn-ghost">About Us</a>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/assets/puzzle-head.png"
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
              <CharacterSvg
                color={step.character.color}
                eyes={step.character.eyes}
                shape={step.character.shape}
                size={36}
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
            <div key={idx} className="about-card" style={{ backgroundColor: card.color }}>
              <div className="about-card-head">
                <span className="about-card-tag">{card.label}</span>
                <span className="about-card-icon">{card.icon}</span>
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

function EmotionCheck() {
  const [selected, setSelected] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const handleSelect = useCallback((e) => {
    setSelected(e.label);
    setAnimKey((k) => k + 1);
  }, []);
  const cur = EMOTIONS.find((e) => e.label === selected);

  return (
    <section id="emotion" className="sec sec--alt">
      <div className="sec-inner">
        <span className="tag">Step 01 · Emotion Check</span>
        <h2 className="sec-title">
          오늘 기분, <span className="accent">날씨</span>로 표현하면
          <br />어떤 날씨인가요?
        </h2>
        <p className="sec-desc">지금 내 감정 상태를 <strong>10초 안에</strong> 확인해보세요.</p>

        <div className="emo-grid">
          {EMOTIONS.map((em) => (
            <button
              key={em.label}
              className={`emo-card ${selected === em.label ? "emo-card--on" : ""} ${selected && selected !== em.label ? "emo-card--off" : ""}`}
              style={{ backgroundColor: em.color }}
              onClick={() => handleSelect(em)}
            >
              <span className="emo-icon">{em.emoji}</span>
              <span className="emo-name">{em.label}</span>
            </button>
          ))}
        </div>

        <div className={`emo-result ${selected ? "emo-result--show" : ""}`}>
          {cur && (
            <>
              <div className="emo-result-icon" key={animKey}>{cur.emoji}</div>
              <p className="emo-result-msg">{cur.message}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Feelconomy() {
  return (
    <section id="feelconomy" className="sec">
      <div className="sec-inner">
        <span className="tag">Step 02 · What is Feelconomy?</span>
        <h2 className="sec-title">
          우리는 기분을 위해
          <br />소비합니다.
        </h2>

        <div className="prod-grid">
          {PRODUCTS.map((p) => (
            <figure key={p.name} className="prod-card">
              <img src={p.image} alt={p.name} className="prod-img" />
              <figcaption className="prod-name">{p.name}</figcaption>
            </figure>
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
            <br />근본적인 회복은 아니에요.
          </blockquote>
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
        <span className="tag tag--light">Step 03 · The Problem</span>
        <h2 className="sec-title sec-title--light">
          왜 우리는 자꾸
          <br />
          <span className="accent">같은 감정</span>에 반복적으로 흔들릴까요?
        </h2>

        <div className="loop-row">
          {LOOP_ITEMS.map((it, i) => (
            <div key={i} className="loop-node">
              <button
                className={`loop-btn ${active === i ? "loop-btn--on" : ""}`}
                style={{ backgroundColor: it.color }}
                onClick={() => setActive((c) => (c === i ? null : i))}
              >
                <span className="loop-icon">{it.icon}</span>
                <span className="loop-name">{it.label}</span>
              </button>
              {i < LOOP_ITEMS.length - 1 && <span className="loop-arrow">→</span>}
            </div>
          ))}
          <div className="loop-back">
            <span className="loop-spin">↺</span>
            <span>반복되는 감정 루프</span>
          </div>
        </div>

        <div className={`loop-detail ${active !== null ? "loop-detail--show" : ""}`}>
          {active !== null && (
            <p><strong>{LOOP_ITEMS[active].label}</strong> — {LOOP_ITEMS[active].detail}</p>
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
        <span className="tag">Step 04 · Our Solution</span>
        <h2 className="sec-title">
          일시적인 진통제가 아닌,
          <br />
          <span className="accent">감정 코칭 프로그램</span>
        </h2>
        <p className="sec-desc">
          스트레스와 불안을 스스로 이해하고 관리할 수 있도록,
          <br />전문 코치와 함께하는 구조화된 프로그램입니다.
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

        <div className="disc-box">
          <h3 className="disc-title">
            이 프로그램을 통해 <span className="accent">발견</span>하게 됩니다
          </h3>
          <div className="disc-list">
            {DISCOVERIES.map((d, i) => (
              <div key={i} className="disc-row">
                <span className="disc-num">{String(i + 1).padStart(2, "0")}</span>
                <p className="disc-text">{d}</p>
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
    <section id="beta" className="sec">
      <div className="sec-inner">
        <span className="tag">Step 05 · Beta Program</span>
        <h2 className="sec-title">
          현재 <span className="accent">베타 체험단</span> 모집 중
        </h2>
        <p className="sec-desc">
          <strong>30만 원 상당</strong> 프로그램을 사전 체험단에게{" "}
          <strong>무료</strong>로 제공합니다.
          <br />연령대·직업군을 고려해 진짜 변화를 원하시는 분 중심으로 선정해요.
        </p>

        <div className="beta-grid">
          {BETA_STEPS.map((s, i) => (
            <div key={i} className="beta-card">
              <span className="beta-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="beta-name">{s}</span>
            </div>
          ))}
        </div>

        <div className="ba-row">
          <div className="ba ba--before">
            <span className="ba-tag">BEFORE</span>
            <p className="ba-quote">"왜 힘든지<br />모르겠음."</p>
            <span className="ba-emoji">😶‍🌫️</span>
          </div>
          <div className="ba-mid"><span className="ba-arrow">→</span></div>
          <div className="ba ba--after">
            <span className="ba-tag">AFTER</span>
            <p className="ba-quote">"내가 왜<br />반복되는지<br />알게 됨."</p>
            <span className="ba-emoji">🌈</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="sec sec--alt">
      <div className="sec-inner">
        <span className="tag">Step 06 · What You Get</span>
        <h2 className="sec-title">
          참여하면 <span className="accent">이런 걸</span> 얻어요
        </h2>
        <div className="ben-grid">
          {BENEFITS.map((b, i) => (
            <div key={i} className="ben-card">
              <div className="ben-icon">{b.icon}</div>
              <p className="ben-title">{b.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RealStories() {
  return (
    <section id="stories" className="sec">
      <div className="sec-inner">
        <span className="tag">Step 07 · Real Stories</span>
        <h2 className="sec-title">
          실제 참여자들의 <span className="accent">이야기</span>
        </h2>
        <p className="sec-desc">옆으로 넘겨 더 많은 이야기를 만나보세요 →</p>
      </div>
      <div className="story-scroll">
        {TESTIMONIALS.map((s, i) => (
          <article key={i} className="story-card">
            <div className="story-head">
              <span className="story-name">{s.demographic}</span>
              <span className="story-topic" style={{ backgroundColor: s.topicColor }}>
                {s.topic}
              </span>
            </div>
            <p className="story-quote">"{s.quote}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyTrust() {
  return (
    <section className="sec sec--alt">
      <div className="sec-inner">
        <span className="tag">Step 08 · Why Trust Us</span>
        <h2 className="sec-title">
          우리는 단순 <span className="accent">상담 서비스</span>가 아닙니다.
        </h2>
        <div className="trust-grid">
          {TRUST_POINTS.map((t, i) => (
            <div key={i} className="trust-card">
              <span className="trust-num">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="trust-title">{t.title}</h4>
              <p className="trust-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplyForm() {
  const [fd, setFd] = useState({ name: "", birthDate: "", job: "", phone: "", concern: "", available: "" });
  const set = (e) => { const { name, value } = e.target; setFd((p) => ({ ...p, [name]: value })); };
  const submit = (e) => {
    e.preventDefault();
    alert(`신청 완료!\n이름: ${fd.name}\n연락처: ${fd.phone}`);
    setFd({ name: "", birthDate: "", job: "", phone: "", concern: "", available: "" });
  };

  return (
    <section id="apply" className="sec sec--dark">
      <div className="sec-inner">
        <span className="tag tag--light">Step 09 · Apply</span>
        <h2 className="sec-title sec-title--light">
          무료 체험단 <span className="accent">신청하기</span>
        </h2>
        <form className="form" onSubmit={submit}>
          <div className="fg">
            <label className="fl">이름</label>
            <input type="text" name="name" value={fd.name} onChange={set} required className="fi" placeholder="이름을 입력하세요" />
          </div>
          <div className="fg">
            <label className="fl">생년월일 (나이)</label>
            <input type="text" name="birthDate" value={fd.birthDate} onChange={set} required className="fi" placeholder="예: 1995-03-15 (30세)" />
          </div>
          <div className="fg">
            <label className="fl">직업</label>
            <input type="text" name="job" value={fd.job} onChange={set} required className="fi" placeholder="직업을 입력하세요" />
          </div>
          <div className="fg">
            <label className="fl">연락처</label>
            <input type="tel" name="phone" value={fd.phone} onChange={set} required className="fi" placeholder="010-0000-0000" />
          </div>
          <div className="fg fg--wide">
            <label className="fl">현재 가장 고민되는 감정</label>
            <textarea name="concern" value={fd.concern} onChange={set} required className="fi fi--ta" placeholder="어떤 감정으로 고민하고 있나요?" />
          </div>
          <div className="fg fg--wide">
            <label className="fl">참여 가능 여부 / 가능 시간</label>
            <input type="text" name="available" value={fd.available} onChange={set} required className="fi" placeholder="예: 주말 저녁 가능" />
          </div>
          <button type="submit" className="form-submit">나의 감정 패턴 분석 신청하기 →</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <img src="/assets/fillmore-studio-logo.png" alt="Fillmore Studio" className="footer-logo" />
        <p className="footer-copy">© 2026 필모어 스튜디오 · Fillconomy. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://www.instagram.com/fillmore__studio?utm_source=qr" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          <span className="footer-dot">·</span>
          <a href="https://blog.naver.com/fillmore_studio" target="_blank" rel="noopener noreferrer" className="footer-link">Blog</a>
          <span className="footer-dot">·</span>
          <a href="https://moaform.com/q/Ygg1dz" target="_blank" rel="noopener noreferrer" className="footer-link">Moaform</a>
        </div>
      </div>
    </footer>
  );
}

export default function FeelComponents() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <JourneyStrip />
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

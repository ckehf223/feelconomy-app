import { useState } from "react";
import "./FeelComponents.css";

// ========== 상수 정의 ==========
const EMOTIONS = [
  { emoji: "☀️", label: "햇살", color: "#FFE5B4" },
  { emoji: "☁️", label: "구름", color: "#E8D5C4" },
  { emoji: "🌧️", label: "비", color: "#B8C5D6" },
  { emoji: "⚡", label: "번개", color: "#E8B4D4" },
];

const PRODUCTS = [
  { name: "왁뿌볼", image: "/src/assets/wakppubol.jpg" },
  { name: "슬라임", image: "/src/assets/slime.jpg" },
  { name: "AI 상담", image: "/src/assets/ai-counseling.jpg" },
  { name: "키캡", image: "/src/assets/keycaps.jpg" },
  { name: "향초", image: "/src/assets/candle.jpg" },
  { name: "디퓨저", image: "/src/assets/diffuser.jpg" },
  { name: "힐링 콘텐츠", image: "/src/assets/healing-content.jpg" },
  { name: "ASMR", image: "/src/assets/asmr.jpg" },
];

const EDITIONS = [
  { name: "Mind", color1: "#F5F1ED", color2: "#E8D5C4", label: "Ivory" },
  { name: "Balance", color1: "#FFE5E8", color2: "#F5C4D4", label: "Petal" },
  { name: "Breeze", color1: "#E8F5F5", color2: "#C4E5E8", label: "Breeze" },
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

// ========== 컴포넌트 ==========

function Navigation() {
  return (
    <header className="header">
      <div className="navbar">
        <div className="logo">필모어 스튜디오</div>
        <nav className="nav">
          <a href="#emotion" className="nav-link">
            기분 체크
          </a>
          <a href="#feelconomy" className="nav-link">
            필코노미란?
          </a>
          <a href="#solution" className="nav-link">
            솔루션
          </a>
          <a href="#beta" className="nav-link">
            체험단
          </a>
          <a href="#apply" className="nav-link">
            신청
          </a>
        </nav>
        <button className="cta">무료 체험단 신청 →</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">What's Missing?</h1>
        <p className="hero-subtitle">
          We help you understand yourself and fill what matters.
        </p>
        <p className="hero-ko">
          필모어 스튜디오는
          <br />
          당신의 빈 부분을 채워,
          <br />
          더 나다운 삶으로 가는 여정을
          <br />
          함께합니다.
        </p>
        <p className="hero-motto">Every emotion matters.</p>
      </div>
    </section>
  );
}

function EmotionCheck() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="emotion" className="section">
      <div className="section-content">
        <span className="step-label">Step 01 · Emotion Check</span>
        <h2 className="section-title">
          오늘 기분, <span className="italic">날씨</span>로 표현하면
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
              onClick={() => setSelected(emotion.label)}
              className="emotion-button"
              style={{
                backgroundColor: emotion.color,
                opacity: selected === emotion.label ? 1 : 0.7,
                transform:
                  selected === emotion.label ? "scale(1.1)" : "scale(1)",
              }}
            >
              <div className="emotion-emoji">{emotion.emoji}</div>
              <div className="emotion-label">{emotion.label}</div>
            </button>
          ))}
        </div>

        {selected && (
          <p className="selected-message">
            오늘의 기분: <strong>{selected}</strong> 💫
          </p>
        )}

        <div className="scroll-indicator">scroll ↓</div>
      </div>
    </section>
  );
}

function Feelconomy() {
  return (
    <section id="feelconomy" className="section section--warm">
      <div className="section-content">
        <span className="step-label">Step 02 · What is Feelconomy?</span>
        <h2 className="section-title">
          우리는 <span className="italic">기분</span>을 위해
          <br />
          소비합니다.
        </h2>

        <div className="product-grid">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="product-card">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <div className="product-name">{product.name}</div>
            </div>
          ))}
        </div>

        <div className="feelconomy-explain">
          <p className="explain-text">이 모든 건 결국,</p>
          <h3 className="formula">
            Feel + Economy = <strong>Feelconomy</strong>
          </h3>
          <p className="explain-subtext">"기분을 채우기 위한 소비"</p>
          <blockquote className="quote">
            "하지만 대부분은 <span className="italic-bold">즉각적 진통제</span>
            일 뿐,
            <br />
            근본적인 회복은 아니에요."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="section">
      <div className="section-content">
        <span className="step-label">Step 03 · The Problem</span>
        <h2 className="section-title">
          왜 우리는 자꾸
          <br />
          <span className="italic">같은 감정</span>에 반복적으로
          <br />
          흔들릴까요?
        </h2>

        <div className="emotion-loop">
          <div className="loop-item">01 불안</div>
          <div className="loop-item">02 회피</div>
          <div className="loop-item">03 후회</div>
          <div className="loop-item">04 스트레스</div>
          <div className="loop-arrow">↺ 반복되는 감정 루프</div>
        </div>

        <div className="problem-list">
          {[
            {
              title: "스트레스 패턴을 모르기 때문에",
              desc: "내가 어떤 상황에서 무너지는지 모르면 같은 자리에서 같은 방식으로 반복합니다.",
            },
            {
              title: "회복 방식을 모르기 때문에",
              desc: "잠시 잊는 것과 회복하는 것은 다릅니다. 나에게 맞는 회복 루틴이 필요합니다.",
            },
            {
              title: "감정의 원인을 모르기 때문에",
              desc: "표면 감정이 아니라 그 밑에 깔린 진짜 신호를 짚어야 흐름이 끊깁니다.",
            },
          ].map((item, idx) => (
            <div key={idx} className="problem-item">
              <h4 className="problem-title">{item.title}</h4>
              <p className="problem-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section id="solution" className="section section--cool">
      <div className="section-content">
        <span className="step-label">Step 04 · Our Solution</span>
        <h2 className="section-title">
          <span className="italic">Feelconomy</span>
          <br />
          Emotional Care Device
        </h2>

        <p className="solution-desc">
          내 감정을 이해하고 관리하는 나만의 감정 케어 디바이스.
        </p>

        <div className="device-highlight">
          <div className="device-badge">Hardware × App</div>
        </div>

        <div className="feature-section">
          <h3 className="feature-title">
            손 안에서 시작되는 <span className="italic">감정 케어 루틴</span>
          </h3>
          <p className="feature-desc">
            터치 한 번으로 지금의 감정을 확인하고, 상태에 맞춘 진동 케어로
            마음을 안정시켜요. 연동된 앱이 매일의 감정 패턴을 기록하고 분석해
            나에게 꼭 맞는 회복 루틴을 제안합니다.
          </p>
          <div className="device-components">
            <span>디바이스</span> · <span>스트랩</span> ·{" "}
            <span>충전 케이블</span> · <span>전용 App</span>
          </div>
        </div>

        <div className="features-grid">
          <h3 className="feature-title">5가지 핵심 기능</h3>
          <div className="features-list">
            {[
              {
                title: "감정 체크",
                desc: "터치 한 번으로 지금 내 감정을 확인",
              },
              {
                title: "감정 비주얼",
                desc: "6가지 감정을 캐릭터와 색으로 표현",
              },
              {
                title: "진동 케어",
                desc: "감정 상태에 맞춘 바이오 피드백 진동",
              },
              { title: "기록 & 분석", desc: "앱으로 감정 기록과 패턴 분석" },
              { title: "맞춤 케어", desc: "나에게 맞는 케어 루틴 제안" },
            ].map((feature, idx) => (
              <div key={idx} className="feature-item">
                <h4 className="feature-item-title">{feature.title}</h4>
                <p className="feature-item-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="editions-section">
          <h3 className="edition-title">3 Editions</h3>
          <div className="editions-grid">
            {EDITIONS.map((edition) => (
              <div key={edition.name} className="edition-card">
                <div
                  className="edition-color"
                  style={{ backgroundColor: edition.color1 }}
                ></div>
                <div className="edition-info">
                  <strong>{edition.name}</strong>
                  <span>{edition.label}</span>
                </div>
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
          현재 <span className="italic">베타 체험단</span> 모집 중
        </h2>
        <p className="section-desc">
          전문 코치와 함께, 감정 패턴부터 삶의 방향성까지 정리합니다.
        </p>

        <div className="beta-steps">
          {[
            "감정 패턴 분석",
            "관계 패턴 분석",
            "회복 전략 설계",
            "삶의 방향성 점검",
          ].map((step, idx) => (
            <div key={idx} className="beta-step">
              <div className="step-number">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div>{step}</div>
            </div>
          ))}
        </div>

        <div className="before-after">
          <div className="before-after-card">
            <h4 className="before-title">Before</h4>
            <p className="before-text">
              "왜 힘든지
              <br />
              모르겠음."
            </p>
          </div>
          <div className="arrow">→</div>
          <div className="before-after-card">
            <h4 className="after-title">After</h4>
            <p className="after-text">
              "내가 왜<br />
              반복되는지
              <br />
              알게 됨."
            </p>
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
          참여하면 <span className="italic">이런 걸</span> 얻어요
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

function WhyTrust() {
  return (
    <section className="section">
      <div className="section-content">
        <span className="step-label">Step 07 · Why Trust Us</span>
        <h2 className="section-title">
          우리는 단순 <span className="italic">상담 서비스</span>가 아닙니다.
        </h2>

        <div className="trust-grid">
          {TRUST_POINTS.map((point, idx) => (
            <div key={idx} className="trust-card">
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
    <section id="apply" className="section section--cool">
      <div className="section-content">
        <span className="step-label">Step 08 · Apply</span>
        <h2 className="section-title">
          무료 체험단 <span className="italic">신청하기</span>
        </h2>

        <form onSubmit={handleSubmit} className="form">
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

          <div className="form-group">
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

          <div className="form-group">
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
      <div className="section-content">
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
      <EmotionCheck />
      <Feelconomy />
      <Problem />
      <Solution />
      <BetaProgram />
      <Benefits />
      <WhyTrust />
      <ApplyForm />
      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";

const STORAGE_KEY = "fillmore_fit_test";

const FIT_QUESTIONS = [
  {
    question: "요즘 지치는 날, 나는 주로...",
    options: [
      { icon: "🛌", label: "그냥 눕는다, 아무것도 안 한다", type: "rest" },
      { icon: "👯", label: "친구를 불러내 시간을 보낸다", type: "connect" },
      { icon: "🔍", label: "왜 이런 기분인지 곱씹어본다", type: "understand" },
      { icon: "✍️", label: "일기나 SNS에 감정을 쏟아낸다", type: "express" },
    ],
  },
  {
    question: "스트레스 받을 때 나의 소비 패턴은?",
    options: [
      { icon: "🕯️", label: "혼자 쉴 수 있는 캔들, 침구 등", type: "rest" },
      { icon: "☕", label: "누군가와 함께하는 카페, 모임", type: "connect" },
      { icon: "📚", label: "심리테스트, 책, 상담 콘텐츠", type: "understand" },
      { icon: "🎨", label: "그림, 음악 등 창작 도구", type: "express" },
    ],
  },
  {
    question: "SNS를 볼 때 나는...",
    options: [
      { icon: "🌿", label: "힐링, 여행 콘텐츠를 찾아본다", type: "rest" },
      { icon: "💬", label: "사람들과 소통하는 글에 눈이 간다", type: "connect" },
      { icon: "🧠", label: "심리, 자기계발 콘텐츠를 본다", type: "understand" },
      { icon: "📷", label: "내 감정을 담은 글, 사진을 올린다", type: "express" },
    ],
  },
  {
    question: "무기력할 때 나에게 가장 필요한 건?",
    options: [
      { icon: "😴", label: "충분한 휴식", type: "rest" },
      { icon: "🤗", label: "누군가의 위로", type: "connect" },
      { icon: "❓", label: "내가 왜 이런지에 대한 답", type: "understand" },
      { icon: "🔥", label: "감정을 쏟아낼 창구", type: "express" },
    ],
  },
  {
    question: "이상적인 주말은?",
    options: [
      { icon: "🛋️", label: "집에서 아무 생각 없이 뒹굴기", type: "rest" },
      { icon: "🎉", label: "친한 사람들과 시간 보내기", type: "connect" },
      { icon: "📖", label: "혼자 카페에서 생각 정리하기", type: "understand" },
      { icon: "🎭", label: "새로운 취미, 창작활동 해보기", type: "express" },
    ],
  },
  {
    question: "갈등이 생겼을 때 나의 반응은?",
    options: [
      { icon: "🚪", label: "일단 자리를 피하고 혼자 정리한다", type: "rest" },
      { icon: "🗣️", label: "바로 대화로 풀어야 마음이 편하다", type: "connect" },
      { icon: "🧩", label: "갈등의 원인을 분석하려 한다", type: "understand" },
      { icon: "💥", label: "감정을 솔직하게 표현하고 쏟아낸다", type: "express" },
    ],
  },
  {
    question: "쇼핑할 때 가장 끌리는 것은?",
    options: [
      { icon: "🛏️", label: "편안함을 주는 홈웨어, 침구", type: "rest" },
      { icon: "🎁", label: "함께 쓸 수 있는 선물, 소품", type: "connect" },
      { icon: "🔮", label: "나를 더 알게 해주는 심리 굿즈", type: "understand" },
      { icon: "👗", label: "개성을 표현할 수 있는 아이템", type: "express" },
    ],
  },
  {
    question: "에너지가 채워졌다고 느낄 때는?",
    options: [
      { icon: "🌙", label: "아무 방해 없이 푹 잤을 때", type: "rest" },
      { icon: "😄", label: "좋아하는 사람들과 웃었을 때", type: "connect" },
      { icon: "💡", label: "내 마음이 이해받았다고 느낄 때", type: "understand" },
      { icon: "🌟", label: "하고 싶은 걸 마음껏 표현했을 때", type: "express" },
    ],
  },
];

const FIT_TYPES = {
  rest: {
    tag: "Fill Type · REST",
    title: "회복형, 지금은 '쉼'이 필요해요",
    color: "#F5B8C4",
    desc: "몸과 마음의 배터리가 방전된 상태예요. 지금 필요한 건 특별한 이벤트가 아니라 '아무것도 안 해도 되는 시간'이에요. 나를 위한 회복 루틴을 채워보세요.",
    recommend: ["아로마 캔들 & 디퓨저", "수면 마스크팩 루틴", "혼자만의 브런치 시간"],
  },
  connect: {
    tag: "Fill Type · CONNECT",
    title: "연결형, 지금은 '관계'가 필요해요",
    color: "#8CBEE0",
    desc: "혼자보다 함께일 때 채워지는 사람이에요. 요즘 관계에서 오는 허전함은 없었나요? 안전하게 연결될 수 있는 관계를 다시 채워볼 시간이에요.",
    recommend: ["소모임 · 스터디 참여", "친구와의 정기 티타임", "가족과의 짧은 통화"],
  },
  understand: {
    tag: "Fill Type · UNDERSTAND",
    title: "탐구형, 지금은 '이해'가 필요해요",
    color: "#D6D48C",
    desc: "원인을 알아야 편안해지는 사람이에요. 막연한 감정보다 '내가 왜 이런지'에 대한 답을 찾을 때 비로소 채워짐을 느껴요. 나의 패턴을 짚어볼 시간이에요.",
    recommend: ["심리 상담 · 코칭 세션", "감정 일기 습관", "자기이해 콘텐츠 구독"],
  },
  express: {
    tag: "Fill Type · EXPRESS",
    title: "발산형, 지금은 '표현'이 필요해요",
    color: "#C4A0D8",
    desc: "감정을 안에 담아두면 오히려 쌓이는 사람이에요. 글, 그림, 대화 등 무엇이든 밖으로 꺼내는 창구가 필요해요. 표현할수록 가벼워지는 사람이니까요.",
    recommend: ["드로잉 클래스", "감정 플레이리스트 만들기", "글쓰기 · 브이로그 기록"],
  },
};

const TOTAL_QUESTIONS = FIT_QUESTIONS.length;

function readSaved() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      !Array.isArray(parsed.answers) ||
      parsed.answers.length !== TOTAL_QUESTIONS ||
      typeof parsed.step !== "number"
    )
      return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function FillTypeTest({ onApply }) {
  const [step, setStep] = useState(() => readSaved()?.step ?? 0);
  const [answers, setAnswers] = useState(
    () => readSaved()?.answers ?? Array(TOTAL_QUESTIONS).fill(null),
  );
  const totalQuestions = TOTAL_QUESTIONS;
  const resultStep = totalQuestions + 1;

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
  }, [step, answers]);

  const selectAnswer = (index, type) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = type;
      return next;
    });
  };

  const [jumpInstantly, setJumpInstantly] = useState(false);

  const goNext = () => setStep((s) => Math.min(resultStep, s + 1));
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const restart = () => {
    setJumpInstantly(true);
    setAnswers(Array(totalQuestions).fill(null));
    setStep(0);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    if (!jumpInstantly) return;
    const id = requestAnimationFrame(() => setJumpInstantly(false));
    return () => cancelAnimationFrame(id);
  }, [jumpInstantly]);

  const result = (() => {
    if (answers.some((a) => !a)) return null;
    const counts = {};
    let best = answers[0];
    let bestCount = 0;
    answers.forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
      if (counts[t] > bestCount) {
        bestCount = counts[t];
        best = t;
      }
    });
    return FIT_TYPES[best];
  })();

  return (
    <section className="fit-page">
      <div className="fit-page-inner">
        <div className="fit-page-top">
          {step > 0 && step < resultStep && (
            <div className="fit-progress">
              <div
                className="fit-progress-bar"
                style={{ width: `${((step - 1) / totalQuestions) * 100}%` }}
              />
            </div>
          )}
        </div>

        <div className="fit-viewport">
          <div
            className="fit-track"
            style={{
              transform: `translateX(-${step * 100}%)`,
              transition: jumpInstantly ? "none" : undefined,
            }}
          >
            <div className="fit-slide">
              <span className="tag">What's Missing? 테스트</span>
              <h2 className="fit-intro-title">당신의 Fill Type</h2>
              <p className="fit-intro-desc">
                {totalQuestions}개의 질문으로 내 소비 패턴을 통해 나는 어떤
                사람이고,
                <br />
                무엇을 채워야 할지 알아보아요~!
              </p>
              <button className="fit-start-btn" onClick={() => setStep(1)}>
                시작하기 <span className="btn-arrow">→</span>
              </button>
            </div>

            {FIT_QUESTIONS.map((q, i) => (
              <div className="fit-slide" key={i}>
                <span className="fit-step-label">
                  Q{i + 1} / {totalQuestions}
                </span>
                <h3 className="fit-question">{q.question}</h3>
                <div className="fit-options">
                  {q.options.map((opt) => (
                    <button
                      key={opt.label}
                      className={`fit-option ${answers[i] === opt.type ? "fit-option--selected" : ""}`}
                      onClick={() => selectAnswer(i, opt.type)}
                    >
                      <span className="fit-option-icon">{opt.icon}</span>
                      <span className="fit-option-label">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <div className="fit-nav-row">
                  <button className="fit-nav-btn fit-nav-btn--prev" onClick={goBack}>
                    ← 이전
                  </button>
                  <button
                    className="fit-nav-btn fit-nav-btn--next"
                    onClick={goNext}
                    disabled={!answers[i]}
                  >
                    {i === totalQuestions - 1 ? "결과보기" : "다음"} →
                  </button>
                </div>
              </div>
            ))}

            <div className="fit-slide">
              {result && (
                <>
                  <span
                    className="fit-result-tag"
                    style={{ backgroundColor: result.color }}
                  >
                    {result.tag}
                  </span>
                  <h2 className="fit-result-title">{result.title}</h2>
                  <p className="fit-result-desc">{result.desc}</p>
                  <div className="fit-result-recommend">
                    {result.recommend.map((r, i) => (
                      <span key={i} className="fit-recommend-chip">
                        {r}
                      </span>
                    ))}
                  </div>
                  <div className="fit-result-ctas">
                    <button className="fit-cta-primary" onClick={onApply}>
                      체험단 신청폼 작성하기{" "}
                      <span className="btn-arrow">→</span>
                    </button>
                    <button className="fit-cta-ghost" onClick={restart}>
                      다시하기
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

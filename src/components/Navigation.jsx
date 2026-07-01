import { useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "feelconomy", label: "Program" },
  { id: "solution", label: "Studio" },
  { id: "stories", label: "Journal" },
];

export default function Navigation({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  const go = (target) => {
    closeMenu();
    onNavigate(target);
  };

  return (
    <>
      <header className="header">
        <div className="navbar">
          <button type="button" className="logo logo--btn" onClick={() => go("home")}>
            <div className="nav-logo-image"></div>
          </button>
          <nav className="nav nav--desktop">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="nav-link nav-link--btn"
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="nav-link nav-link--btn"
              onClick={() => onNavigate("test")}
            >
              Fill Type
            </button>
            <button
              type="button"
              className="nav-link nav-link--btn"
              onClick={() => onNavigate("contact")}
            >
              Contact
            </button>
          </nav>
          <div className="header-right">
            <button
              type="button"
              className="nav-cta nav-cta--btn"
              onClick={() => onNavigate("apply")}
            >
              Start Your Journey <span className="cta-arrow">→</span>
            </button>
            <button
              className={`hamburger ${isMenuOpen ? "hamburger--active" : ""}`}
              onClick={toggleMenu}
              aria-label="메뉴"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="mobile-menu">
          <button
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="닫기"
          >
            ✕
          </button>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="mobile-menu-link mobile-menu-link--btn"
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className="mobile-menu-link mobile-menu-link--btn"
            onClick={() => go("test")}
          >
            Fill Type
          </button>
          <button
            type="button"
            className="mobile-menu-link mobile-menu-link--btn"
            onClick={() => go("contact")}
          >
            Contact
          </button>
          <button
            type="button"
            className="mobile-menu-cta mobile-menu-cta--btn"
            onClick={() => go("apply")}
          >
            Start Your Journey
          </button>
        </div>
      )}
    </>
  );
}

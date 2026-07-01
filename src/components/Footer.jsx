export default function Footer({ onAdminTap }) {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <p className="footer-copy footer-copy--tap" onClick={onAdminTap}>
          © 2026 필모어 스튜디오 · Fillconomy. All rights reserved.
        </p>
        <div className="footer-links">
          <a
            href="https://www.instagram.com/fillmore__studio?utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <svg
              className="footer-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagram
          </a>
          <a
            href="https://blog.naver.com/fillmore_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <svg
              className="footer-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="12" />
              <text
                x="12"
                y="16.5"
                textAnchor="middle"
                fill="#fff"
                fontSize="11"
                fontWeight="700"
                fontFamily="Arial, sans-serif"
              >
                N
              </text>
            </svg>
            Blog
          </a>
          <a
            href="https://moaform.com/q/Ygg1dz"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <svg
              className="footer-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="2" y="3" width="20" height="18" rx="3" ry="3" />
              <path
                d="M7 8h10M7 12h7M7 16h4"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            moaForm
          </a>
          <button
            className="footer-link footer-mail-btn"
            onClick={(e) => {
              navigator.clipboard.writeText("fillmore_studio@naver.com");
              const el = e.currentTarget;
              el.dataset.copied = "true";
              setTimeout(() => (el.dataset.copied = ""), 1500);
            }}
          >
            <svg
              className="footer-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="2" y="4" width="20" height="16" rx="3" ry="3" />
              <path
                d="M2 7l10 7 10-7"
                stroke="#fff"
                strokeWidth="1.8"
                fill="none"
                strokeLinejoin="round"
              />
            </svg>
            Mail
          </button>
        </div>
      </div>
    </footer>
  );
}

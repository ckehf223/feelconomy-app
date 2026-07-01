import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FillTypeTest from "./pages/FillTypeTest";
import "./FeelComponents.css";

const SECTION_IDS = ["about", "feelconomy", "solution", "stories", "contact", "apply"];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tapCount, setTapCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("scrollTop")) {
      sessionStorage.removeItem("scrollTop");
      window.scrollTo(0, 0);
    }
  }, []);

  const handleNavigate = useCallback(
    (target) => {
      const isHome = location.pathname === "/";
      if (target === "test") {
        navigate("/test");
        window.scrollTo(0, 0);
        return;
      }
      if (target === "home") {
        if (!isHome) {
          navigate("/");
          window.scrollTo(0, 0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      if (SECTION_IDS.includes(target)) {
        if (!isHome) {
          navigate("/");
          setTimeout(
            () =>
              document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }),
            60,
          );
        } else {
          document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [location.pathname, navigate],
  );

  const handleAdminTap = () => {
    const next = tapCount + 1;
    if (next >= 3) {
      setTapCount(0);
      setShowAdmin((v) => !v);
    } else {
      setTapCount(next);
      setTimeout(() => setTapCount(0), 2000);
    }
  };

  return (
    <div className="app">
      <Navigation onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<Home showAdmin={showAdmin} setShowAdmin={setShowAdmin} />} />
        <Route
          path="/test"
          element={
            <FillTypeTest
              onApply={() => handleNavigate("apply")}
              onBack={() => handleNavigate("home")}
            />
          }
        />
      </Routes>
      <Footer onAdminTap={handleAdminTap} />
    </div>
  );
}

export default App;

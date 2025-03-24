import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from './LanguageContext';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

const Home = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <div className={`home ${role}`} role={role} style={{ height: '100vh', overflow: 'hidden' }}>
      <Header />
      
      <div className="container" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="card">
          <h2>{t.welcome}</h2>

          {/* Member Role Buttons */}
          {role === "member" && (
            <div>
              <button onClick={() => navigate("/apply-loan")} className="primary-button">
                {t.applyLoan}
              </button>
              <button onClick={() => navigate("/profile")} className="primary-button">
                {t.viewProfile}
              </button>
              <button onClick={() => navigate("/financial-report")} className="primary-button">
                {t.financialReport}
              </button>
              <button onClick={() => navigate("/savings")} className="primary-button">
                {t.logSavings}
              </button>
            </div>
          )}

          {/* NGO (Donor) Role Buttons */}
          {role === "ngo" && (
            <div>
              <button onClick={() => navigate("/member-list")} className="primary-button">
                {t.viewMemberList}
              </button>
              <button onClick={() => navigate("/financial-report")} className="primary-button">
                {t.financialReport}
              </button>
              <button onClick={() => navigate("/meeting")} className="primary-button">
                {t.meetingSchedule}
              </button>
            </div>
          )}

          {/* Head Role Buttons */}
          {role === "head" && (
            <div>
              <button onClick={() => navigate("/member-list")} className="primary-button">
                {t.viewMemberList}
              </button>
              <button onClick={() => navigate("/add-record")} className="primary-button">
                {t.addRecord}
              </button>
              <button onClick={() => navigate("/financial-report")} className="primary-button">
                {t.financialReport}
              </button>
              <button onClick={() => navigate("/meeting")} className="primary-button">
                {t.scheduleMeeting}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Only display footer image for member role, with fixed size */}
      {role === "member" && (
        <div className="floating-policy">
          <img
            src={require("../images/footer.png")}
            alt="Footer"
            className="footer-image"
          />
        </div>
      )}
    </div>
  );
};

export default Home;

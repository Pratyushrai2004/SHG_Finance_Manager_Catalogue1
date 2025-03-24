import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from './LanguageContext';

const Login = () => {
  const [role, setRole] = useState("member");
  const navigate = useNavigate();
  const { language, setLanguage, translations } = useLanguage();
  const t = translations[language];

  const handleLogin = () => {
    if (role) {
      localStorage.setItem("role", role);
      navigate("/home");
    } else {
      alert("Please select a role to log in.");
    }
  };

  return (
    <div className="login-page">
      <div className="card">
        <div className="logo-container">
          <img
            src={require("../images/SHG-Women.png")}
            alt="SHG Logo"
            className="logo"
          />
        </div>
        <h2>{t.welcome}</h2>
        <div className="input-group">
          <label htmlFor="role">{t.selectRole}</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">{t.member}</option>
            <option value="ngo">{t.ngo}</option>
            <option value="head">{t.head}</option>
          </select>
        </div>
        <button onClick={handleLogin} className="primary-button">
          {t.login}
        </button>
        <div className="language-container">
          <button 
            onClick={() => setLanguage("en")} 
            className={`language-button ${language === "en" ? "active" : ""}`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage("hi")} 
            className={`language-button ${language === "hi" ? "active" : ""}`}
          >
            हिंदी
          </button>
          <button 
            onClick={() => setLanguage("tm")} 
            className={`language-button ${language === "tm" ? "active" : ""}`}
          >
            தமிழ்
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

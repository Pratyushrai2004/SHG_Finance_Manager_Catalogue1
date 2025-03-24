import React from "react";
import { useLanguage } from '../pages/LanguageContext';

const LanguageSwitch = () => {
  const { language, setLanguage, translations } = useLanguage();

  const handleChangeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="language-switch">
      <button 
        onClick={() => handleChangeLanguage("en")} 
        className={`language-button ${language === "en" ? "active" : ""}`}
      >
        English
      </button>
      <button 
        onClick={() => handleChangeLanguage("hi")} 
        className={`language-button ${language === "hi" ? "active" : ""}`}
      >
        हिंदी
      </button>
      <button 
        onClick={() => handleChangeLanguage("tm")} 
        className={`language-button ${language === "tm" ? "active" : ""}`}
      >
        தமிழ்
      </button>
    </div>
  );
};

export default LanguageSwitch;
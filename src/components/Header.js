import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../pages/LanguageContext';
import LanguageSwitch from '../pages/LanguageSwitch';

const Header = () => {
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language];

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="app-header">
      <div className="header-title" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        SHG Finance Manager
      </div>
      <div className="header-controls">
        <LanguageSwitch />
        <button onClick={handleLogout} className="logout-button">
          {t.logout}
        </button>
      </div>
    </div>
  );
};

export default Header;
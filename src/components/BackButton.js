import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../pages/LanguageContext';

const BackButton = () => {
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language] || {};
  
  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      ← {t.back || 'Back'}
    </button>
  );
};

export default BackButton;
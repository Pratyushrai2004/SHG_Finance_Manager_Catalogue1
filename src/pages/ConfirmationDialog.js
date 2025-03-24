import React from 'react';
import { useLanguage } from '../pages/LanguageContext';

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  const { language, translations } = useLanguage();
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog">
        <p>{message || t.confirmReset}</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm} className="primary-button">
            {t.yes}
          </button>
          <button onClick={onCancel} className="secondary-button">
            {t.no}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
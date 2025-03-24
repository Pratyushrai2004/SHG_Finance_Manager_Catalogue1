import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { useLanguage } from '../pages/LanguageContext';
import ConfirmationDialog from '../pages/ConfirmationDialog';
import { toast } from "react-hot-toast";
import BackButton from '../components/BackButton';

const FinancialReport = () => {
  const [records, setRecords] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { language, translations } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(storedRecords);

    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
  }, []);

  const handleResetFinancialRecords = () => {
    setShowConfirmation(true);
  };

  const confirmReset = () => {
    localStorage.removeItem("records");
    localStorage.removeItem("balance");
    setRecords([]);
    setBalance(0);
    setShowConfirmation(false);
    toast.success("Financial records have been reset");
  };

  return (
    <div className="container">
      <BackButton />
      <Header />
      <div className="financial-report card1">
        <h2>{t.financialReport}</h2>
        <img
          src={require('../images/Finance.png')}
          alt="Finance"
          className="meeting-image"
        />
        <h3>{t.totalBalance}: ₹{balance.toFixed(2)}</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>{t.date}</th>
              <th>{t.type}</th>
              <th>{t.amount}</th>
              <th>{t.reason}</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.type}</td>
                  <td>₹{record.amount}</td>
                  <td>{record.reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">{t.noRecords}</td>
              </tr>
            )}
          </tbody>
        </table>
        
        {records.length > 0 && (
          <button onClick={handleResetFinancialRecords} className="secondary-button">
            {t.resetFinancialRecords}
          </button>
        )}
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onConfirm={confirmReset}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  );
};

export default FinancialReport;

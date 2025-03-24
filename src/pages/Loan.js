import React, { useState, useEffect } from "react";
import Header from '../Header';
import { useLanguage } from '../pages/LanguageContext';

const Loan = () => {
  const [loans, setLoans] = useState([]);
  const { language, translations } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // Fetch loan records from localStorage
    const storedLoans = JSON.parse(localStorage.getItem("loanApplications")) || [];
    setLoans(storedLoans);
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="loan card">
        <h2>{t.loanApplications}</h2>
        {loans.length > 0 ? (
          <div className="loan-list">
            {loans.map((loan, index) => (
              <div key={index} className="loan-item">
                <p><strong>{t.amount}:</strong> ₹{loan.amount}</p>
                <p><strong>{t.reason}:</strong> {loan.reason}</p>
                <p><strong>{t.status}:</strong> {loan.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>{t.noLoanApplications}</p>
        )}
      </div>
    </div>
  );
};

export default Loan;
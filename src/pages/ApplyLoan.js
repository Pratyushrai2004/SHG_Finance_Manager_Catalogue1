import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { useLanguage } from '../pages/LanguageContext';
import ConfirmationDialog from '../pages/ConfirmationDialog';

const ApplyLoan = () => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language];

  const handleSubmit = () => {
    if (!amount || !reason || !interestRate) {
      toast.error("Please fill in all fields!");
      return;
    }

    const loanApplication = {
      amount: parseFloat(amount),
      reason,
      interestRate: parseFloat(interestRate),
      status: "pending",
      date: new Date().toLocaleString(),
    };

    let loanApplications = JSON.parse(localStorage.getItem("loanApplications")) || [];
    loanApplications.push(loanApplication);
    localStorage.setItem("loanApplications", JSON.stringify(loanApplications));

    toast.success("Loan application submitted successfully!");
    navigate("/");  // Redirect back to Home page
  };

  const handleResetLoanData = () => {
    setShowConfirmation(true);
  };

  const confirmReset = () => {
    localStorage.removeItem("loanApplications");
    setShowConfirmation(false);
    toast.success("Loan data has been reset");
  };

  return (
    <div className="container">
      <Header />
      <div className="apply-loan card">
        <h2>{t.applyLoanButton}</h2>
        <div className="image-container">
          <img
            src={require("../images/Loan.jpg")}
            alt="Loan"
            className="meeting-image"
          />
        </div>
        <div className="input-group">
          <label>{t.loanAmount}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t.loanAmount}
          />
        </div>
        <div className="input-group">
          <label>{t.loanReason}</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t.loanReason}
          />
        </div>
        <div className="input-group">
          <label>{t.interestRate}</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder={t.interestRate}
          />
        </div>
        <button onClick={handleSubmit} className="primary-button">
          {t.applyLoanButton}
        </button>
        <button onClick={handleResetLoanData} className="secondary-button">
          {t.resetLoanData}
        </button>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onConfirm={confirmReset}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  );
};

export default ApplyLoan;
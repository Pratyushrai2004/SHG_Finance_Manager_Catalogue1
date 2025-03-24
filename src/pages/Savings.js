import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../pages/LanguageContext';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ConfirmationDialog from '../pages/ConfirmationDialog';

const Savings = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [savings, setSavings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const storedSavings = JSON.parse(localStorage.getItem("savings")) || [];
    setSavings(storedSavings);
  }, []);

  const handleSave = () => {
    if (!amount || !date) {
      toast.error("Please fill in all fields!");
      return;
    }

    const savingsEntry = { date, amount: parseFloat(amount), status: "saved" };
    let savedData = JSON.parse(localStorage.getItem("savings")) || [];
    savedData.push(savingsEntry);
    localStorage.setItem("savings", JSON.stringify(savedData));

    toast.success("Savings recorded successfully!");
    setSavings(savedData);
    setAmount("");
    setDate("");
  };

  const handleResetSavings = () => {
    setShowConfirmation(true);
  };

  const confirmReset = () => {
    localStorage.removeItem("savings");
    setSavings([]);
    setShowConfirmation(false);
    toast.success("Savings data has been reset");
  };

  return (
    <div className="container">
      <BackButton />
      <Header />
      <div className="savings card">
        <h2>{t.logSavings}</h2>
        <div className="input-group">
          <label>{t.savingsDate}</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="input-group">
          <label>{t.savingsAmount}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t.savingsAmount}
          />
        </div>
        <button onClick={handleSave} className="primary-button">
          {t.saveSavings}
        </button>

        <div className="savings-list">
          <h3>{t.yourSavings}</h3>
          {savings.length > 0 ? (
            <ul>
              {savings.map((entry, index) => (
                <li key={index}>
                  {entry.date} - ₹{entry.amount}
                </li>
              ))}
            </ul>
          ) : (
            <p>{t.noSavings}</p>
          )}
        </div>
        
        {savings.length > 0 && (
          <button onClick={handleResetSavings} className="secondary-button">
            {t.reset}
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

export default Savings;

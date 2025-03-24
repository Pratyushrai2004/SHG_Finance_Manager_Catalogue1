import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import { useLanguage } from '../pages/LanguageContext';

const AddRecord = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [reason, setReason] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const navigate = useNavigate();
  const { language, translations } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
      setCurrentBalance(parseFloat(storedBalance));
    }
  }, []);

  const handleSubmit = () => {
    if (amount === "" || reason === "") {
      toast.error("Please fill in all fields!");
      return;
    }

    const parsedAmount = parseFloat(amount);
    const newBalance =
      type === "income" ? currentBalance + parsedAmount : currentBalance - parsedAmount;

    localStorage.setItem("balance", newBalance.toFixed(2));
    setCurrentBalance(newBalance);

    const record = {
      type,
      amount: parsedAmount,
      reason,
      date: new Date().toLocaleString(),
    };

    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));

    toast.success("Record added successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <Header />
      <div className="add-record card">
        <h2>{t.addFinancialRecord}</h2>
        <div className="input-group">
          <label>{t.amount}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t.amount}
          />
        </div>
        <div className="input-group">
          <label>{t.type}</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">{t.income}</option>
            <option value="expense">{t.expense}</option>
          </select>
        </div>
        <div className="input-group">
          <label>{t.reason}</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t.reason}
          />
        </div>
        <div className="balance-display">
          <strong>{t.currentBalance}: ₹{currentBalance.toFixed(2)}</strong>
        </div>
        <button onClick={handleSubmit} className="primary-button">
          {t.submitRecord}
        </button>
      </div>
    </div>
  );
};

export default AddRecord;
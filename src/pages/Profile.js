import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { useLanguage } from './LanguageContext';
import BackButton from '../components/BackButton';

const Profile = () => {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const [savings, setSavings] = useState(0);
  const [loanBalance, setLoanBalance] = useState(2000); // Mock data
  
  useEffect(() => {
    // Calculate total savings from stored savings data
    const storedSavings = JSON.parse(localStorage.getItem("savings")) || [];
    const totalSavings = storedSavings.reduce((total, entry) => total + entry.amount, 0);
    setSavings(totalSavings);
    
    // Fetch loan data from localStorage if available
    const loanData = JSON.parse(localStorage.getItem("loans")) || [];
    const activeLoan = loanData.find(loan => loan.status === "approved" && !loan.paid);
    if (activeLoan) {
      setLoanBalance(activeLoan.amount);
    }
  }, []);

  return (
    <div className="container">
      <BackButton />
      <Header />
      <div className="profile card">
        <img
          src={require('../images/User.jpg')} 
          alt="User"
          className="profile-image"
        />
        <h2>{t.memberProfile}</h2>
        
        <div className="balance-display">
          <strong>{t.savings}: ₹{savings.toLocaleString()}</strong>
        </div>
        
        <div className="profile-details">
          <p><strong>{t.name}:</strong> Anita Sharma</p>
          <p><strong>{t.loanAmount}:</strong> ₹{loanBalance.toLocaleString()}</p>
          <p><strong>{t.businessStarted}:</strong> Organic Farming</p>
          <p><strong>{t.joinedSince}:</strong> 2 Years</p>
          <p><strong>{t.village}:</strong> Rampur</p>
          <p><strong>{t.phoneNumber}:</strong> +91 98765 43210</p>
        </div>
        
        <div className="loan-history">
          <h3>{t.loanHistory}</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>{t.date}</th>
                <th>{t.amount}</th>
                <th>{t.status}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jan 15, 2025</td>
                <td>₹2,000</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Oct 10, 2024</td>
                <td>₹1,500</td>
                <td>Repaid</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;

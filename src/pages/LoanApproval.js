import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import { useLanguage } from '../pages/LanguageContext';
import { toast } from "react-hot-toast";

const LoanApproval = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const { language, translations } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // Get loan applications from localStorage
    const storedRequests = JSON.parse(localStorage.getItem("loanApplications")) || [];
    setLoanRequests(storedRequests);
  }, []);

  const handleApproval = (index, status) => {
    let updatedRequests = [...loanRequests];
    updatedRequests[index].status = status;
    localStorage.setItem("loanApplications", JSON.stringify(updatedRequests));
    setLoanRequests(updatedRequests);
    
    toast.success(`Loan ${status === "approved" ? t.approve : t.reject} successfully!`);
  };

  return (
    <div className="container">
      <Header />
      <div className="loan-approval card">
        <h2>{t.loanApplications}</h2>
        {loanRequests.length > 0 ? (
          <div className="loan-requests">
            {loanRequests.map((request, index) => (
              <div key={index} className="loan-request-item">
                <p><strong>{t.amount}:</strong> ₹{request.amount}</p>
                <p><strong>{t.reason}:</strong> {request.reason}</p>
                <p><strong>{t.status}:</strong> {request.status}</p>
                <div className="approval-buttons">
                  <button 
                    onClick={() => handleApproval(index, "approved")} 
                    className="primary-button"
                    disabled={request.status !== "pending"}
                  >
                    {t.approve}
                  </button>
                  <button 
                    onClick={() => handleApproval(index, "rejected")} 
                    className="secondary-button"
                    disabled={request.status !== "pending"}
                  >
                    {t.reject}
                  </button>
                </div>
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

export default LoanApproval;
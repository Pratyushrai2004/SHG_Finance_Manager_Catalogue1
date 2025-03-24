import React from "react";
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { useLanguage } from '../pages/LanguageContext';

const MemberList = () => {
  const { language, translations } = useLanguage();
  const t = translations[language];
  
  const members = [
    { name: "Member 1", savings: "₹5000", loan: "₹2000", membership: "2 Years" },
    { name: "Member 2", savings: "₹3000", loan: "₹1500", membership: "3 Years" }
  ];

  return (
    <div className="container">
      <BackButton />
      <Header />
      <div className="member-list card1">
        <h2>{t.memberList}</h2>
        {members.length > 0 ? (
          <table className="report-table">
            <thead>
              <tr>
                <th>{t.name}</th>
                <th>{t.savings}</th>
                <th>{t.loanAmount}</th>
                <th>{t.membership}</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.savings}</td>
                  <td>{member.loan}</td>
                  <td>{member.membership}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{t.noMembers}</p>
        )}
      </div>
    </div>
  );
};

export default MemberList;

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { useLanguage } from '../pages/LanguageContext';
import { toast } from "react-hot-toast";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [agenda, setAgenda] = useState("");
  const { language, translations } = useLanguage();
  const t = translations[language];
  const role = localStorage.getItem("role");

  useEffect(() => {
    // Fetch meeting records from localStorage
    const storedMeetings = JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(storedMeetings);
  }, []);

  const handleScheduleMeeting = () => {
    if (!date || !time || !agenda) {
      toast.error("Please fill in all fields!");
      return;
    }

    const meeting = { date, time, agenda };
    let updatedMeetings = [...meetings, meeting];
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
    setMeetings(updatedMeetings);
    
    // Reset form
    setDate("");
    setTime("");
    setAgenda("");
    
    toast.success("Meeting scheduled successfully!");
  };

  return (
    <div className="container">
      <BackButton />
      <Header />
      <div className="meeting card">
        <h2>{t.scheduledMeetings}</h2>
        
        {/* Show meeting scheduling form only for Head role */}
        {role === "head" && (
          <div className="meeting-form">
            <div className="input-group">
              <label>{t.meetingDate}</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>{t.meetingTime}</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>{t.meetingAgenda}</label>
              <input 
                type="text" 
                value={agenda} 
                onChange={(e) => setAgenda(e.target.value)} 
                placeholder={t.meetingAgenda}
              />
            </div>
            <button onClick={handleScheduleMeeting} className="primary-button">
              {t.scheduleMeeting}
            </button>
          </div>
        )}
        
        <div className="meetings-list">
          {meetings.length > 0 ? (
            <table className="report-table">
              <thead>
                <tr>
                  <th>{t.meetingDate}</th>
                  <th>{t.meetingTime}</th>
                  <th>{t.meetingAgenda}</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting, index) => (
                  <tr key={index}>
                    <td>{meeting.date}</td>
                    <td>{meeting.time}</td>
                    <td>{meeting.agenda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{t.noMeetings}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meeting;

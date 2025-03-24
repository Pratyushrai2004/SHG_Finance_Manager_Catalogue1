import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Home from './pages/Home'; // Ensure this is imported
import AddRecord from './pages/AddRecord';
import FinancialReport from './pages/FinancialReport';
import ApplyLoan from './pages/ApplyLoan';
import LoanApproval from './pages/LoanApproval';
import Meeting from './pages/Meeting';
import Profile from './pages/Profile';
import Savings from './pages/Savings';
import MemberList from './pages/MemberList';
import { LanguageProvider } from './pages/LanguageContext';
import './styles.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} /> {/* Make sure Home component is routed here */}
          <Route path="/home" element={<Home />} /> {/* Ensure "/home" route is mapped correctly */}
          <Route path="/add-record" element={<AddRecord />} />
          <Route path="/financial-report" element={<FinancialReport />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/loan-approval" element={<LoanApproval />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/member-list" element={<MemberList />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

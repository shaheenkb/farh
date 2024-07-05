import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/searchdonor" className="nav-link">Search Donors</Link>
      <Link to="/createdonor" className="nav-link">Add Donor</Link>
      <Link to="/donorstable" className="nav-link">Donors Report</Link>
      <Link to="/donationtable" className="nav-link">Donation Report</Link>
      <Link to="/receiptstable" className="nav-link">Receipt Report</Link>
      <Link to="/donordonation" className="nav-link">Donor Donation Report</Link>
      <Link to="/testpilot" className="nav-link">Test Pilot</Link>
    </div>
  );
}

export default Navbar;
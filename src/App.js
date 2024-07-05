import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import VouchersApp from './VouchersApp';
import DonationFormView from './DonationFormView';
import DonarDetails from './DonarDetails';

import Navbar from './Navbar'; // Import the Navbar component
import DonorSuccess from './DonorSuccess';
import DonorSearch from './DonorSearch';
import Receipt from './Receipt';
import DonationFinalScreen from './DonationFinalScreen';
import DonorsTable from './DonorsTable';
import DonationTable from './DonationTable';
import ReceiptsTable from './ReceiptsTable';
import DonorDonationView from './DonorDonationView';
import TestForm from './TestForm';
import DonationForm from './DonationForm';
import SaveToPDF from './SaveToPDF';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Render the Navbar */}
        <SaveToPDF/>
        <div className="main-container">
          <Routes>
            <Route exact path="/" element={<TestForm/>} />
           
            <Route path="/vouchers" element={<VouchersApp/>} />
            <Route path="/createdonor" element={<DonarDetails/>} />
            <Route path="/newdonation/:donorId" element={<DonationFormView />} /> {/* Route for donation app with donorId as parameter */}
          
            <Route path="/editdonation/:donationId" element={<DonationFormView/>} />
            <Route path="/donorsuccess/:donorId" element={<DonorSuccess/>} />
            <Route path="/searchdonor" element={<DonorSearch/>} />
            <Route path="/donationreceipt/:receiptNumber" element={<Receipt/>} />
            <Route path="/donationfinalscreen/:receiptNumber/:donorId" element={<DonationFinalScreen/>} />
            <Route path="/donorstable" element={<DonorsTable/>} />
            <Route path="/donationtable" element={<DonationTable/>} />
            <Route path="/receiptstable" element={<ReceiptsTable/>} />
            <Route path="/donordonation" element={<DonorDonationView/>} />
            <Route path="/testpilot" element={<DonationForm/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// DonationsReport.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function DonorDonationView() {
  const [donordonations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('/donordonationview'); // Assuming your backend is running on the same host
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(donordonations);
    XLSX.utils.book_append_sheet(wb, ws, "donordonations");
    XLSX.writeFile(wb, "donordonations.xlsx");
  };
  return (
    <div>
    <h2>All Donations</h2>
    <button onClick={exportToExcel}>Export to Excel</button>
    <div className="container">


      <table className="bordered-table">
        <thead>
        <tr className='table-header'>
          <th>Donor ID</th>
          <th>Donor Name</th>
          <th>UIN ID</th>
          <th>UIN Number</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Receipt Number</th>
          <th>Custom Receipt Number</th>
          <th>Department Type</th>
          <th>Donation Type</th>
          <th>Mode of Payment</th>
          <th>Transaction ID</th>
          <th>Amount in Words</th>
          <th>Amount in Numbers</th>
          <th>Received By</th>
          <th>Remarks</th>
          <th>Bank Name</th>
          <th>Receipt Date</th>
        </tr>
        </thead>
        <tbody>
          {donordonations.map(donordonations => (
            <tr key={donordonations.ReceiptNumber}>
              <td>{donordonations.DonorId}</td>
            <td>{donordonations.DonorName}</td>
            <td>{donordonations.UIN_ID}</td>
            <td>{donordonations.UIN_NUMBER}</td>
            <td>{donordonations.Address}</td>
            <td>{donordonations.PhoneNo}</td>
            <td>{donordonations.ReceiptNumber}</td>
            <td>{donordonations.ReceiptNumberCustom}</td>
            <td>{donordonations.DepartmentType}</td>
            <td>{donordonations.DonationType}</td>
            <td>{donordonations.ModeOfPayment}</td>
            <td>{donordonations.TransID}</td>
            <td>{donordonations.AmountInWords}</td>
            <td>{donordonations.AmountInNumbers}</td>
            <td>{donordonations.ReceivedBy}</td>
            <td>{donordonations.Remarks}</td>
            <td>{donordonations.BankName}</td>
            <td>{donordonations.ReceiptDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default DonorDonationView;

// DonationsReport.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function DonationTable() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('/donationtable'); // Assuming your backend is running on the same host
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(donations);
    XLSX.utils.book_append_sheet(wb, ws, "Donations");
    XLSX.writeFile(wb, "donations.xlsx");
  };
  return (
    <div>
    <h2>All Donations</h2>
    <button onClick={exportToExcel}>Export to Excel</button>
    <div className="container">


      <table className="bordered-table">
        <thead>
        <tr className='table-header'>
            <th>Receipt Number</th>
            <th>Donor ID</th>
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
          {donations.map(donation => (
            <tr key={donation.ReceiptNumber}>
              <td>{donation.ReceiptNumber}</td>
              <td>{donation.DonorId}</td>
              <td>{donation.ReceiptNumberCustom}</td>
              <td>{donation.DepartmentType}</td>
              <td>{donation.DonationType}</td>
              <td>{donation.ModeOfPayment}</td>
              <td>{donation.TransID}</td>
              <td>{donation.AmountInWords}</td>
              <td>{donation.AmountInNumbers}</td>
              <td>{donation.ReceivedBy}</td>
              <td>{donation.Remarks}</td>
              <td>{donation.BankName}</td>
              <td>{donation.ReceiptDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default DonationTable;

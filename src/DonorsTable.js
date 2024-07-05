// DonorsReport.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function DonorsTable() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await axios.get('/donorstable'); // Assuming your backend is running on the same host
      setDonors(response.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(donors);
    XLSX.utils.book_append_sheet(wb, ws, "donors");
    XLSX.writeFile(wb, "donors.xlsx");
  };

  return (
    <div>
    <h2>All Donors</h2>
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
            <th>Department Type</th>
            <th>Donation Type</th>
            <th>Mode of Payment</th>
          </tr>
        </thead>
        <tbody>
          {donors.map(donor => (
            <tr key={donor.DonorId}>
              <td>{donor.DonorId}</td>
              <td>{donor.DonorName}</td>
              <td>{donor.UIN_ID}</td>
              <td>{donor.UIN_NUMBER}</td>
              <td>{donor.Address}</td>
              <td>{donor.PhoneNo}</td>
              <td>{donor.DepartmentType}</td>
              <td>{donor.DonationType}</td>
              <td>{donor.ModeOfPayment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default DonorsTable;

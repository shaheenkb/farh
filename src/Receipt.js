import React, { useState, useEffect } from 'react';
import './receipt.css';
import axios from 'axios';



function Receipt({ receiptNumber, onClose }) {
  const [donationDetails, setDonationDetails] = useState(null);


  useEffect(() => {
    fetchDonationDetails();
  }, []);

  const fetchDonationDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/donationreceipt/${receiptNumber}`);
      setDonationDetails(response.data);
    } catch (error) {
      console.error('Error fetching donation details:', error);
    }
  };

  return (

    <div className="receipt-modal">
      <div className="receipt-header">
        <img src="/recofmadarsa.png" alt="Image description" />
        <h2>Receipt</h2>
        {donationDetails && (

          <div className="receipt-content">

            <div className="receipt-date">
              <span className="receipt-label">Date:</span>
              <span className="receipt-value"> {donationDetails.ReceiptDate}</span>
            </div>
            <div class="receipt-item">
              <span class="receipt-label">Receipt No:</span>
              <span class="receipt-value">{donationDetails.ReceiptNumber}</span>
            </div>
            <div class="receipt-item">
              <span class="receipt-label">Received with thanks from Mr./Mrs: </span>
              <span class="receipt-value">{donationDetails.DonorName}</span>
            </div>
            <div class="receipt-item">
              <span class="receipt-label">The sum of rupees in words: </span>
              <span class="receipt-value">{donationDetails.AmountInWords}</span>
            </div>
            <div class="receipt-item">
              <span class="receipt-label">By Cash/Online/Cheque/UPI : </span>
              <span class="receipt-value">{donationDetails.ModeOfPayment}</span>
            </div>
            <div class="receipt-item">
              <span class="receipt-label">Address:</span>
              <span class="receipt-value">{donationDetails.Address}</span>
            </div>
            <div class="receipt-item">
              <span class="receipt-label">Mobile No:</span>
              <span class="receipt-value">{donationDetails.PhoneNo}</span>
            </div>
            <div class="receipt-item">
              <span class="receipt-label">Donation Type: </span>
              <span class="receipt-value">{donationDetails.DonationType}</span>
            </div>
            <div class="receipt-item">
              <span class="receipt-label">UIN of donor:</span>
              <span class="receipt-value">{donationDetails.UIN_NUMBER}</span>
            </div>

     
          </div>
        )}
        <button onClick={() => window.print()}>Print Receipt</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Receipt;

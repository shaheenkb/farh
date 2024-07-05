// ReceiptsReport.js

import React, { useState, useEffect,useRef } from 'react';

import axios from 'axios';
import * as XLSX from 'xlsx';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;




function ReceiptsTable() {
  const [receipts, setReceipts] = useState([]);


  useEffect(() => {
    fetchReceipts();
  }, []);

  const contentRef = useRef();

  const handleSavePDF = () => {
    const content = contentRef.current.innerHTML;
    const pdfContent = htmlToPdfmake(content);
    const documentDefinition = { content: pdfContent };

    pdfMake.createPdf(documentDefinition).download('document.pdf');
  };

  const fetchReceipts = async () => {
    try {
      const response = await axios.get('/allreceipts'); // Assuming your backend is running on the same host
      setReceipts(response.data);
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  };
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(receipts);
    XLSX.utils.book_append_sheet(wb, ws, "receipts");
    XLSX.writeFile(wb, "receipts.xlsx");
  };

  return (
    <div >
    <h2>All Donors</h2>
    <button onClick={exportToExcel}>Export to Excel</button>
    <button onClick={handleSavePDF}>Save to PDF</button>
    <div className="container"  ref={contentRef}>
      <table className="bordered-table">
        <thead>
        <tr className='table-header'>
            <th>Receipt Number</th>
            <th>Receipt Date</th>
            <th>Donor Name</th>
            <th>Amount in Words</th>
            <th>Mode of Payment</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Donation Type</th>
            <th>UIN Number</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map(receipt => (
            <tr key={receipt.ReceiptNumber}>
              <td>{receipt.ReceiptNumber}</td>
              <td>{receipt.ReceiptDate}</td>
              <td>{receipt.DonorName}</td>
              <td>{receipt.AmountInWords}</td>
              <td>{receipt.ModeOfPayment}</td>
              <td>{receipt.Address}</td>
              <td>{receipt.PhoneNo}</td>
              <td>{receipt.DonationType}</td>
              <td>{receipt.UIN_NUMBER}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ReceiptsTable;

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import DonationList from './DonationList';
import * as XLSX from 'xlsx';
import Receipt from './Receipt';

function DonationApp() {
    const [donations, setDonations] = useState([]);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [newDonation, setNewDonation] = useState({ amount: '', name: '', pan: '', purpose: '' });
    const [editingIndex, setEditingIndex] = useState(-1);
    const [receiptId, setReceiptId] = useState(null);

    const [isVisible, setIsVisible] = useState(false);

    //to get donor details
    const [selphoneNumber, setPhoneNumber] = useState(''); // State to store phone number input
    const [donorDetails, setDonorDetails] = useState(null); // State to store donor details


// Function to fetch donor details from the server

const fetchDonorDetails = async () => {
    try {
       
        const response = await axios.get(`http://localhost:3000/donors/details/${selphoneNumber}`);
        setDonorDetails(response.data);
        
    } catch (error) {
        console.error('Error fetching donor details :', error);
    }
};



    useEffect(() => {
        fetchDonations();
        fetchPhonenumbers();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/donations');
            setDonations(response.data);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };
    const fetchPhonenumbers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/donors/phoneNumbers');
            setPhoneNumbers(response.data);
        } catch (error) {
            console.error('Error fetching phone numbers:', error);
        }
    };
// Function to handle phone number input change
const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDonation({ ...newDonation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingIndex === -1) {
                const response = await axios.post('http://localhost:3000/donations', newDonation);
                const { message, receiptId } = response.data; // Extract message and receiptId from the response
                setReceiptId(receiptId);
               // alert(`${message} Receipt ID: ${receiptId}`);
            } else {
                await axios.put(`http://localhost:3000/donations/${donations[editingIndex].id}`, newDonation);
                setEditingIndex(-1);
            }
            setNewDonation({ amount: '', name: '', pan: '', purpose: '' });
            fetchDonations();
        } catch (error) {
            console.error('Error submitting donation:', error);
        }
    };

    const handleReportClick = () => {
        // Example data to update div visibity 
        setIsVisible(!isVisible);

    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(donations);
        XLSX.utils.book_append_sheet(wb, ws, "Donations");
        XLSX.writeFile(wb, "donations.xlsx");
    };


    const renderDivForReport = () => {
        return (
            <div>
                <h2>All Donations</h2>
                <button onClick={exportToExcel}>Export to Excel</button>
                <DonationList donations={donations} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        );
    };

    const handleEdit = (index) => {
        setNewDonation(donations[index]);
        setEditingIndex(index);
    };

    const handleDelete = async (index) => {
        try {
            await axios.delete(`http://localhost:3000/donations/${donations[index].id}`);
            fetchDonations();
        } catch (error) {
            console.error('Error deleting donation:', error);
        }
    };

    return (
        <div >

<div>
            <h1>Donor Details</h1>
            <label htmlFor="phoneNumberInput">Enter Phone Number:</label>
            <input
                type="text"
                id="phoneNumberInput"
                value={selphoneNumber}
                onChange={handlePhoneNumberChange}
            />
            <button onClick={fetchDonorDetails}>Fetch Details</button>
            {donorDetails && (
                <div>
                    <h2>Donor ID: {donorDetails.donarId}</h2>
                    <p>Donor Name: {donorDetails.donarname}</p>
                    <p>UIN ID: {donorDetails.UIN_ID}</p>
                    <p>UIN Number: {donorDetails.UIN_NUMBER}</p>
                    <p>Address: {donorDetails.Address}</p>
                    <p>Phone Number: {donorDetails.PhoneNo}</p>
                </div>
            )}
        </div>




         
            <form onSubmit={handleSubmit}>

            <div>
      <h1>Donor Phone Numbers</h1>
      <select>
        <option value="">Select Phone Number</option>
        {phoneNumbers.map((phoneNumber, index) => (
          <option key={index} value={phoneNumber}>{phoneNumber}</option>
        ))}
      </select>
    </div>
                <div> <label htmlFor="amount">Amount:</label>
                    <input type="number" name="amount" placeholder="Amount" value={newDonation.amount} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name" value={newDonation.name} onChange={handleInputChange} required />
                </div>
                <input type="text" name="pan" placeholder="PAN" value={newDonation.pan} onChange={handleInputChange}  />
                <input type="text" name="purpose" placeholder="Purpose" value={newDonation.purpose} onChange={handleInputChange} required  />
                <button type="submit">{editingIndex === -1 ? 'Add Donation' : 'Update Donation'}</button>
                
            </form>

            {receiptId && <Receipt receiptId={receiptId} onClose={() => setReceiptId(null)} />}

            <nav>
                <ul>
                    <li>
                        <button onClick={handleReportClick}>Report All Donations</button>
                    </li>

                </ul>
            </nav>

            {isVisible && renderDivForReport()}
        </div>
    );
}

export default DonationApp;

import React, { useState } from 'react';
import './AddDonorForm.css';

const TestForm = () => {
    const [newDonor, setNewDonor] = useState({
        DonorName: '',
        UIN_ID: '',
        UIN_NUMBER: '',
        Address: '',
        PhoneNo: '',
        DepartmentType: '',
        DonationType: '',
        ModeOfPayment: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDonor({ ...newDonor, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    const departmentOptions = [
        { value: 'Department1', label: 'Department 1' },
        { value: 'Department2', label: 'Department 2' },
        // Add more options as needed
    ];



    const donationOptions = [
        { value: 'Corpus', label: 'Corpus' },
        { value: 'Specific Grants', label: 'Specific Grants' },
        { value: 'General', label: 'General' },
        { value: 'Others', label: 'Others' },
        // Add more options as needed
    ];

    const paymentOptions = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Bank', label: 'Bank' },
        { value: 'Bank Cheque', label: 'Bank Cheque' },
        { value: 'Bank Draft', label: 'Bank Draft' },
        { value: 'UPI pay', label: 'UPI pay' },
        { value: 'In Kind', label: 'In Kind' },
        // Add more options as needed
    ];

    return (
        <div className='addDonor-container'>
            <h2>Donor Details</h2>
            <form onSubmit={handleSubmit} className='addDonorForm'>
                <div>
                    <label htmlFor="DonorName">Donor Name:</label>
                    <input type="text" id="DonorName" name="DonorName" value={newDonor.DonorName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="UIN_ID">UIN ID:</label>
                    <select id="UIN_ID" name="UIN_ID" value={newDonor.UIN_ID} onChange={handleInputChange} required>
                        <option value="">Select ID Type</option>
                        <option value="Aadhaar Number">Aadhaar Number</option>
                        <option value="Tax Identification Number">Tax Identification Number</option>
                        <option value="Passport number">Passport number</option>
                        <option value="Elector's photo identity number">Elector's photo identity number</option>
                        <option value="Ration card number">Ration card number</option>
                        <option value="Permanent Account Number">Permanent Account Number</option>
                        <option value="Driving License number">Driving License number</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="UIN_NUMBER">UIN Number:</label>
                    <input type="text" id="UIN_NUMBER" name="UIN_NUMBER" value={newDonor.UIN_NUMBER} onChange={handleInputChange} pattern="[0-9]{10}" required />
                </div>
                <div>
                    <label htmlFor="Address">Address:</label>
                    <input type="text" id="Address" name="Address" value={newDonor.Address} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="PhoneNo">Phone Number:</label>
                    <input type="text" id="PhoneNo" name="PhoneNo" value={newDonor.PhoneNo} onChange={handleInputChange} pattern="[0-9]{10}" required />
                </div>
                <div>
                    <label htmlFor="DepartmentType">Department Type:</label>
                    <select id="DepartmentType" name="DepartmentType" value={newDonor.DepartmentType} onChange={handleInputChange} required>
                        {departmentOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="DonationType">Donation Type:</label>
                    <select id="DonationType" name="DonationType" value={newDonor.DonationType} onChange={handleInputChange} required>
                        <option value="">Select Donation Type</option>
                        {donationOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="ModeOfPayment">Mode of Payment:</label>
                    <select id="ModeOfPayment" name="ModeOfPayment" value={newDonor.ModeOfPayment} onChange={handleInputChange} required>
                        <option value="">Select Mode Of Payment</option>
                        {paymentOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Donor</button>
            </form>
        </div>
    );
};

export default TestForm;

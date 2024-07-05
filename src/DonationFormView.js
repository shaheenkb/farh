import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import { ToWords } from 'to-words';
import './GenForm.css';

function DonationFormView() {



    const { donorId } = useParams();
    const navigate = useNavigate();
    const [errorMesssage, setErrorMessage] = useState(null);

    const [editingIndex, setEditingIndex] = useState(-1);



    const departmentOptions = [
        { value: '', label: 'Select Department Type' },
        { value: 'Fees', label: 'Fees' },
        { value: 'Donation', label: 'Donation' },
        { value: 'Sadqa', label: 'Sadqa' },
        { value: 'Qurbani', label: 'Qurbani' },
        { value: 'Atiya', label: 'Atiya' },
        { value: 'Food', label: 'Food' },
        { value: 'Snacks', label: 'Snacks' },
        { value: 'Medical', label: 'Medical' },
        { value: 'Kirana', label: 'Kirana' },
        { value: 'Zakat', label: 'Zakat' },
        { value: 'Marriage', label: 'Marriage' }
    ];
    const formatDateForInput = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear().toString();
        return `${year}-${month}-${day}`; // Format as "yyyy-mm-dd" for input[type=date]
    };



    const [newDonation, setNewDonation] = useState({
        DonorId: '',
        ReceiptNumberCustom: '',
        ReceiptDate: formatDateForInput(new Date()),
        DepartmentType: '',
        DonationType: '',
        ModeOfPayment: '',
        TransID: '',
        AmountInNumbers: '0',
        AmountReceivedInWord: '',

        ReceivedBy: '',
        Remarks: '',
        BankName: ''
    });



    const handleInputChange = (e) => {


        const { name, value } = e.target;

        setNewDonation({ ...newDonation, [name]: value });

    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update newDonation state with DonarID
        //  setNewDonation({ ...newDonation, DonorId: donorId });
        try {

            // Make the POST request with the updated newDonation state

            const response = await axios.post(`http://localhost:3000/donations/${donorId}`, newDonation);

            const { message, receiptNumber } = response.data; // Extract message and receiptId from the response
            // setReceiptId(receiptId);
            alert(`${message} Receipt ID: ${receiptNumber}`);

            console.log(response.data);
            navigate(`/donationfinalscreen/${receiptNumber}/${donorId}`);


            //reset new donation form data
            setNewDonation({
                DonorId: donorId,
                ReceiptNumberCustom: '',
                ReceiptDate: formatDateForInput(new Date()),
                DepartmentType: '',
                DonationType: '',
                ModeOfPayment: '',
                TransID: '',
                AmountInNumbers: '0',
                AmountInWords: '',
                ReceivedBy: '',
                Remarks: '',
                BankName: ''
            });

            // Handle the response as needed
        } catch (error) {
            console.error('Error submitting donation:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className='gen-container'>
            <h2>New Donation Form</h2>

            <form onSubmit={handleSubmit} className='genForm'>
                <div >
                    <label htmlFor="DonorId">Donor ID:</label>
                    <label htmlFor="DonorId">{donorId} </label>



                </div>
                <div >
                    <label htmlFor="ReceiptNumberCustom">Custom Receipt Number:</label>
                    <input type="text" id="ReceiptNumberCustom" name="ReceiptNumberCustom" value={newDonation.ReceiptNumberCustom} onChange={handleInputChange} required />
                </div>
                <div >
                    <label htmlFor="ReceiptDate">Receipt Date:</label>
                    <input type="date" id="ReceiptDate" name="ReceiptDate" value={newDonation.ReceiptDate} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="DepartmentType">Department Type:</label>
                    <select
                        id="DepartmentType"
                        name="DepartmentType"
                        value={newDonation.DepartmentType}
                        onChange={handleInputChange}
                    >
                        {departmentOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>

                </div>
                <div >
                    <label htmlFor="DonationType">Donation Type:</label>
                    <select
                        id="DonationType"
                        name="DonationType"
                        value={newDonation.DonationType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Donation Type</option>
                        <option value="Corpus">Corpus</option>
                        <option value="Specific Grants">Specific Grants</option>
                        <option value="General">General</option>
                        <option value="Others">Others</option>
                    </select>

                </div>
                <div >
                    <label htmlFor="ModeOfPayment">Mode of Payment:</label>

                    <select
                        id="ModeOfPayment"
                        name="ModeOfPayment"
                        value={newDonation.ModeOfPayment}
                        onChange={handleInputChange}
                    >
                        <option value="">Select ModeOfPayment</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank</option>
                        <option value="Bank Cheque">Bank Cheque</option>
                        <option value="Bank Draft">Bank Draft</option>
                        <option value="UPI pay">UPI pay</option>
                        <option value="In Kind">In Kind</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div >
                    <label htmlFor="TransID">Transaction ID:</label>
                    <input type="text" id="TransID" name="TransID" value={newDonation.TransID} onChange={handleInputChange} />
                </div>
                <div >
                    <label htmlFor="AmountInWords">Amount Received (in words):</label>
                    <input type="text" id="AmountInWords" name="AmountInWords" value={newDonation.AmountInWords}  readOnly/>
                </div>
                <div >
                    <label htmlFor="AmountInNumbers">Amount Received (in numbers):</label>
                    <input type="number" placeholder="Enter a number" id="AmountInNumbers" name="AmountInNumbers" value={newDonation.AmountInNumbers} onChange={handleInputChange} required />
                </div>
                <div >
                    <label htmlFor="ReceivedBy">Received By:</label>
                    <input type="text" id="ReceivedBy" name="ReceivedBy" value={newDonation.ReceivedBy} onChange={handleInputChange} />
                </div>
                <div >
                    <label htmlFor="Remarks">Remarks:</label>
                    <input type="text" id="Remarks" name="Remarks" value={newDonation.Remarks} onChange={handleInputChange} />
                </div>
                <div >
                    <label htmlFor="BankName">Bank Name:</label>
                    <input type="text" id="BankName" name="BankName" value={newDonation.BankName} onChange={handleInputChange} />
                </div>
                <button type="submit">{editingIndex === -1 ? 'Add Donation' : 'Update Donation'}</button>
            </form>
            {errorMesssage &&
                <p>{errorMesssage}</p>}

        </div>
    );
};

export default DonationFormView;
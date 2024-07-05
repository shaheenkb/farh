import React, { useState } from 'react';




const DonationForm = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amountInWords, setAmountInWords] = useState('');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
   
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAmountBlur = () => {
        // Convert amount to words
      //  const amountInWords = convertAmountToWords(amount);
        setAmountInWords(amountInWords);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Donation submitted:', { amount, name, email });
        // Reset form fields
        setAmount('');
        setName('');
        setEmail('');
        setAmountInWords('');
    };


    const [donationType, setDonationType] = useState('');

    const handleDonationTypeChange = (e) => {
        setDonationType(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Donation Amount:
                <input type="number" value={amount} onChange={handleAmountChange} onBlur={handleAmountBlur} />
            </label>
            <br />
            <label>
                Amount in Words:
                <input type="text" value={amountInWords} readOnly />
            </label>
            <br />
            <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <br />
            <label>
                Donation Type:
                <select value={donationType} onChange={handleDonationTypeChange}>
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="bank">Bank</option>
                </select>
            </label>
            <br />
            <button type="submit">Donate</button>
        </form>
    );
};

export default DonationForm;
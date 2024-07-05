import React, { useState, useEffect } from 'react';
import DonorSummary from "./DonorSummary";

import axios from 'axios';
import './GenForm.css';


function DonorSearch({ }) {

    const [searchIndex, setSearchIndex] = useState(false);
    const [selphoneNumber, setPhoneNumber] = useState(''); // State to store phone number input
    const [donorDetails, setDonorDetails] = useState(null); // State to store donor details
    

    // Function to handle phone number input change
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
        setSearchIndex(false);
    };

  
        const handleSubmit = async (e) => {
            e.preventDefault();
        if (!selphoneNumber) {
            alert("Please fill in the phone number field.");
            return;}
        try {

            const response = await axios.get(`http://localhost:3000/donars/${selphoneNumber}`);
            setDonorDetails(response.data);
            setSearchIndex(true);

        } catch (error) {
            console.error('Error fetching donor details :', error);
        }
    };




    return (

        <div className='gen-container'>
            <form className='genForm' onSubmit={handleSubmit}>
                <div>
            <label htmlFor="phoneNumberInput" >Find Donor by Phone Number:</label>
            <input
                type="text"
                id="phoneNumberInput" placeholder="Search by phone number"
                value={selphoneNumber}
                onChange={handlePhoneNumberChange} required
            />
            </div>
            <button  type="submit" >Search Donor</button>
            </form>
            {donorDetails ? (
                <DonorSummary donorDetails= {donorDetails} />
            ) :
            
            (
                <p>{(searchIndex && selphoneNumber.trim() !== '') ? 'Donor not found' : ' '}</p>
            )}

       {searchIndex}
      
        </div>
    )

}
export default DonorSearch;

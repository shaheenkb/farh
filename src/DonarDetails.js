import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

import { useNavigate } from 'react-router-dom';
import './AddDonorForm.css';


function DonarDetails() {
    const navigate = useNavigate();

    const [donars, setDonars] = useState([]);
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

    const [newDonar, setNewDonar] = useState({
        DonorName: '',
        UIN_ID: '',
        UIN_NUMBER: '',
        Address: '',
        PhoneNo: '',
        DepartmentType: '',
        DonationType: '',
        ModeOfPayment: ''
    });
    const [editingIndex, setEditingIndex] = useState(-1);

    useEffect(() => {
        // Fetch donars data from API or any other data source
        // For now, let's assume donars data is fetched from an API endpoint
      //  fetchDonars();
    }, []);

    const fetchDonars = async () => {
        try {

            const response = await axios.get('http://localhost:3000/donars');

            setDonars(response.data);
        } catch (error) {
            console.error('Error fetching donars data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDonar({ ...newDonar, [name]: value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingIndex === -1) {
                const response = await axios.post('http://localhost:3000/donars', newDonar);
                const { message, donorId } = response.data; 
               // alert(`${message} donorId ID: ${response}`);
                console.log( response.data);
                navigate(`/donorsuccess/${donorId}`);
              
            } else {
                await axios.put(`http://localhost:3000/donations/${donars[editingIndex].id}`, newDonar);
                setEditingIndex(-1);
            }
            setNewDonar({
                DonorName: '',
                UIN_ID: '',
                UIN_NUMBER: '',
                Address: '',
                PhoneNo: '',
                DepartmentType: '',
                DonationType: '',
                ModeOfPayment: ''
            });
          //  alert('name');
            fetchDonars();
        } catch (error) {
            console.error('Error submitting donarss:', error);
        }
    };

    const handleEdit = (donar) => {
        setEditingIndex(donar);
        setNewDonar(donar);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/donars/${id}`);
            fetchDonars();
        } catch (error) {
            console.error('Error deleting donar:', error);
        }
    };

    return (
        <div className='addDonor-container'>
            <h2>Donor Details</h2>



            <form onSubmit={handleSubmit} className='addDonorForm'>
                <div>
                    <label htmlFor="DonorName">Donar Name:</label>
                    <input type="text" id="Name" name="DonorName" value={newDonar.DonorName} onChange={handleInputChange} required/>
                </div>
                <div>
                    <label htmlFor="UIN_ID">UIN ID:</label>
                 
                    <select
                        id="UIN_ID"
                        name="UIN_ID"
                        value={newDonar.UIN_ID}
                        onChange={handleInputChange}
                    >
                        <option value="">Select ID Type</option>
                        <option value="Aadhaar Number">Aadhaar Number</option>
                        <option value="Tax Identification Number">Tax Identification Number</option>
                        <option value="Passport number">Passport number</option>
                        <option value="Elector's photo identity number">Elector's photo identity number</option>
                        <option value="Ration card number">Ration card number</option>
                        <option value="Permanent Account Numberr">Permanent Account Number</option>
                        <option value="Driving License number">Driving License number</option> Permanent Account Number
                    </select>
                </div>
                <div>
                    <label htmlFor="UIN_NUMBER">UIN Number:</label>
                    <input type="text" id="UIN_NUMBER" name="UIN_NUMBER" value={newDonar.UIN_NUMBER} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="Address">Address:</label>
                    <input type="text" id="Address" name="Address" value={newDonar.Address} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="PhoneNo">Phone Number:</label>
                    <input type="text" id="PhoneNo" name="PhoneNo" value={newDonar.PhoneNo} onChange={handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="Departmenttype">Department Type:</label>
                    <select
                        id="DepartmentType"
                        name="DepartmentType"
                        value={newDonar.DepartmentType}
                        onChange={handleInputChange}
                    >
                        {departmentOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="Donationtype">Donation Type:</label>
                    <select
                        id="DonationType"
                        name="DonationType"
                        value={newDonar.DonationType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Donation Type</option>
                        <option value="Corpus">Corpus</option>
                        <option value="Specific Grants">Specific Grants</option>
                        <option value="General">General</option>
                        <option value="Others">Others</option>
                    </select>

                </div>
                <div>
                    <label htmlFor="ModeOfPayment">Mode of Payment:</label>
                    <select
                        id="ModeOfPayment"
                        name="ModeOfPayment"
                        value={newDonar.ModeOfPayment}
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
                <button type="submit">{editingIndex === -1 ? 'Add Donar' : 'Update Donar'}</button>
            </form>
          
        </div>
    );
}

export default DonarDetails;

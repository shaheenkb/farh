import React from 'react';
import { Link } from 'react-router-dom';

function DonorSummary({ donorDetails}) {

   
   

    return (
        <div className='donor-details'>
            <h2>Donor Details</h2>
            {/* <div className='detail-container'>
                <span className='detail-label'>Donor ID:</span>
                <span className='detail-value'>{donorDetails.DonorId}</span>
            </div>
            <div className='detail-container'>
                <span className='detail-label'>Donor Name:</span>
                <span className='detail-value'>{donorDetails.DonorName}</span>
            </div>
            <div className='detail-container'>
                <span className='detail-label'>UIN ID:</span>
                <span className='detail-value'>{donorDetails.UIN_ID}</span>
            </div>
            <div className='detail-container'>
                <span className='detail-label'>UIN Number:</span>
                <span className='detail-value'>{donorDetails.UIN_NUMBER}</span>
            </div>
            <div className='detail-container'>
                <span className='detail-label'>Address:</span>
                <span className='detail-value'>{donorDetails.Address}</span>
            </div>
            <div className='detail-container'>
                <span className='detail-label'>Phone Number:</span>
                <span className='detail-value'>{donorDetails.PhoneNo}</span>
            </div> */}
            <table>
                <thead>
                    {/* <tr> */}
                        <tr>
                            <td >Donor ID</td>
                            <td>{donorDetails.DonorId}</td>
                        </tr>
                        <tr>
                            <td>Donor Name</td>
                            <td>{donorDetails.DonorName}</td>
                        </tr>
                        <tr>
                            <td>UIN ID</td>
                            <td>{donorDetails.UIN_ID}</td>
                        </tr>
                        <tr>
                            <td>UIN NUMBER</td>
                            <td>{donorDetails.UIN_NUMBER}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{donorDetails.Address}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{donorDetails.PhoneNo}</td>
                        </tr>
                        
                    {/* </tr> */}
                </thead>
            </table>
            <div>
            <Link to={`/newdonation/${donorDetails.DonorId}`}>
        <button>create donation for this Donor Details</button>
      </Link>
            {/* <Link to="/createdonor">
                <button>Create Donor</button>
            </Link> */}
            </div>
        </div>
    );
}

export default DonorSummary;
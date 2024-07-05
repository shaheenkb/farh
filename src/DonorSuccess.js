import React from 'react';
import { Link } from 'react-router-dom';


import { useParams } from 'react-router-dom';

function DonorSuccess ()  {

  const { donorId } = useParams();

  return (
    <div>
      <h2>Donor Created Successfully!</h2>
      <p>would you like to add a donation for this donor ?</p>
     
      <Link to={`/newdonation/${donorId}`}>
        <button>create donation for this Donor Details</button>
      </Link>
    </div>
  );
};

export default DonorSuccess;

import React from 'react';
import { Link } from 'react-router-dom';


import { useParams } from 'react-router-dom';
import Receipt from './Receipt';
import { useState } from 'react';

function DonationFinalScreen ()  {

  const { receiptNumber } = useParams();
  const { donorId } = useParams();
  const  [isVisible, setIsVisible] = useState(true);//initially receipt to be shown by default.

  return (
    <div>
      <h2>Donation added Successfully!</h2>
      <p>would you like to add another donation for this Donor ?</p>
     
      <Link to={`/newdonation/${donorId}`}>
        <button>Add donation for this Donor </button>
      </Link>

      {receiptNumber && isVisible && <Receipt receiptNumber={receiptNumber} onClose={() => setIsVisible(false)} />}

    </div>
  );
};

export default DonationFinalScreen;

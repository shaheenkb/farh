// VouchersApp.js
import React, {  useEffect } from 'react';


function VouchersApp() {
 // const [vouchers, setVouchers] = useState([]);
  // State variables and functions for CRUD operations on vouchers

  useEffect(() => {
    //fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
     // const response = await axios.get('http://localhost:3000/vouchers');
     // setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

  // Implement CRUD operations for vouchers

  return (
    <div>
     <p>testing vouvhers here</p>
    </div>
  );
}

export default VouchersApp;

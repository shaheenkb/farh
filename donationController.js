const mysql = require('mysql2/promise');
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'donationsdb'
};
const pool = mysql.createPool(dbConfig);

// Function to handle GET request for donations
exports.getDonations = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM donation');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'An error occurred while fetching donations' });
  }
};  

// Function to handle GET request for receipts in donationreceipt view
exports.getAllReceipts = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM DonationReceipt_view');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching receipts:', error);
    res.status(500).json({ error: 'An error occurred while fetching receipts' });
  }
};

// Function to handle GET request for receipts in getDonorDonationView view
exports.getDonorDonationView = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM DonorDonationView');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching donor donation vew:', error);
    res.status(500).json({ error: 'An error occurred while fetching view' });
  }
};



// Route to handle POST request for donations
exports.createDonation = async (req, res) => {
    try {
      const {ReceiptNumberCustom, ReceiptDate, DepartmentType, DonationType, ModeOfPayment, TransID, AmountInWords, AmountInNumbers, ReceivedBy, Remarks, BankName } = req.body;
      const { donorId } = req.params;
      const connection = await pool.getConnection();
      const [result1] = await connection.query('INSERT INTO donation ( DonorId, ReceiptNumberCustom, ReceiptDate, DepartmentType, DonationType, ModeOfPayment, TransID, AmountInWords, AmountInNumbers, ReceivedBy, Remarks, BankName) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ donorId, ReceiptNumberCustom, ReceiptDate, DepartmentType, DonationType, ModeOfPayment, TransID, AmountInWords, AmountInNumbers, ReceivedBy, Remarks, BankName]);
  
      connection.release();
      console.log('Inserted row ID:', result1.insertId);
      const receiptNumber = result1.insertId;
   //   const ReceiptNumberCustom1 = CONCAT('DMS', MONTH(ReceiptDate), receiptid);

      
      res.status(201).json({ message: 'Donation added successfully', receiptNumber });
    } catch (error) {
      console.error('Error adding donation:', error);
      res.status(500).json({ error: 'An error occurred while adding the donation' });
    }
  };

// Route to handle POST request for donations

  exports.updateDonation = async (req, res) => {
    try {
      const { DonorId, ReceiptNumberCustom, ReceiptDate, DepartmentType, DonationType, ModeOfPayment, TransID, AmountInWords, AmountInNumbers, ReceivedBy, Remarks, BankName } = req.body;
      const { id } = req.params;
      const connection = await pool.getConnection();
      await connection.query('UPDATE donation SET DonorId=?, ReceiptNumberCustom=?, ReceiptDate=?, DepartmentType=?, DonationType=?, ModeOfPayment=?, TransID=?, AmountInWords=?, AmountInNumbers=?, ReceivedBy=?, Remarks=?, BankName=? WHERE ReceiptNumber=?', [ DonorId, ReceiptNumberCustom, ReceiptDate, DepartmentType, DonationType, ModeOfPayment, TransID, AmountInWords, AmountInNumbers, ReceivedBy, Remarks, BankName, id]);
      connection.release();
      res.json({ message: 'Donation updated successfully' });
    } catch (error) {
      console.error('Error updating donation:', error);
      res.status(500).json({ error: 'An error occurred while updating the donation' });
    }
  };

  // Route to handle get request for donations with id from donations table
 
exports.getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query('SELECT * FROM donation WHERE ReceiptNumber = ?', [id]);
    connection.release();
    if (result.length === 0) {
      res.status(404).json({ error: 'Donation not found' });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ error: 'An error occurred while fetching the donation' });
  }
};






exports.getDonationReceiptById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [result] = await connection.query('SELECT * FROM DonationReceipt_view WHERE ReceiptNumber = ?', [id]);
    connection.release();
    if (result.length === 0) {
      res.status(404).json({ error: 'Donation receipt not found' });
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    console.error('Error fetching donation receipt:', error);
    res.status(500).json({ error: 'An error occurred while fetching the donation' });
  }
};
  
 // Function to handle DELETE request for donations
exports.deleteDonation = async (req, res) => {
    try {
      const { id } = req.params;
      const connection = await pool.getConnection();
      await connection.query('DELETE FROM donation WHERE ReceiptNumber=?', [id]);
      connection.release();
      res.json({ message: 'Donation deleted successfully' });
      console.log('Donation deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting donation:', error);
      res.status(500).json({ error: 'An error occurred while deleting the donation' });
    }
  };
  
 
  





  
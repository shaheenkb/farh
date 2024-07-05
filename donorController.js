const mysql = require('mysql2/promise');
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'donationsdb'
};
const pool = mysql.createPool(dbConfig);


// Function to handle GET request for donars
exports.getDonars = async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM donors');
      connection.release();
      res.json(rows);
    } catch (error) {
      console.error('Error fetching donors:', error);
      res.status(500).json({ error: 'An error occurred while fetching donors' });
    }
  };
  
  // Route to handle POST request for donations
  exports.createDonar= async (req, res) => {
      try {
        const {DonorName, UIN_ID, UIN_NUMBER, Address,PhoneNo, DepartmentType, DonationType, ModeOfPayment } = req.body;
        console.log(req);
        const connection = await pool.getConnection();
        const [result1]=await connection.query('INSERT INTO donors (DonorName, UIN_ID, UIN_NUMBER, Address,PhoneNo, DepartmentType, DonationType, ModeOfPayment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [DonorName, UIN_ID, UIN_NUMBER, Address,PhoneNo, DepartmentType, DonationType, ModeOfPayment]);
        connection.release();
        console.log('Inserted row ID:', result1.insertId);
        const donorId = result1.insertId;
        
        res.status(201).json({ message: 'Donor added successfully', donorId });
      } catch (error) {
        console.error('Error adding donor:', error);
        res.status(500).json({ error: 'An error occurred while adding the donor' });
      }
    };
  
    // Route to fetch donor details by phone number
    exports.getDonarByPhoneNumber= async (req, res) => {
      const phoneNumber = req.params.phoneNumber;
    
      try {
          // Get a connection from the pool
          const connection = await pool.getConnection();
    
          // Query to select donor details by phone number
          const [rows] = await connection.query(
              'SELECT * FROM Donors WHERE PhoneNo = ?',
              [phoneNumber]
          );
    
          // Release the connection back to the pool
          connection.release();
    
          // Send the donor details as JSON response
          res.json(rows[0]); // Assuming there is only one donor per phone number
      } catch (error) {
          console.log('Error fetching donor details:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
    };
  
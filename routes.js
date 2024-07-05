const express = require('express');
const router = express.Router();
const donationController = require('./donationController');
const donorController = require('./donorController');

// Route to handle GET request for donations
router.get('/donations', donationController.getDonations);

// Route to handle GET request for donations
router.get('/donationtable', donationController.getDonations);

// Route to handle GET request for receipts
router.get('/allreceipts', donationController.getAllReceipts);


// Route to handle POST request for donations
router.post('/donations/:donorId', donationController.createDonation);

// Route to handle PUT request for donations
router.put('/donations/:id', donationController.updateDonation);
// Route to handle GET request for donations with ID
router.get('/donations/:id', donationController.getDonationById);

// Route to handle GET request for donation receipt view with Receipt id
router.get('/donationreceipt/:id', donationController.getDonationReceiptById);

// Route to handle DELETE request for donations
router.delete('/donations/:id', donationController.deleteDonation);

// Route to handle GET request for donars
router.get('/donars', donorController.getDonars);

// Route to handle GET request to get entire donar table
router.get('/donorstable', donorController.getDonars);

// Route to handle POST request for donations
router.post('/donars', donorController.createDonar);
// Route to handle GET request for donar deatils for a given phone number

router.get('/donars/:phoneNumber', donorController.getDonarByPhoneNumber);

// Route to handle GET request for receipts
router.get('/donordonationview', donationController.getDonorDonationView);



module.exports = router;

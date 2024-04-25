const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticate = require('../middleware/authenticate');
const validateBooking = require('../middleware/validate');

router.get('/', authenticate, bookingController.getAllBookings);
router.get('/:id', authenticate, bookingController.getBookingById);
router.post('/', authenticate, validateBooking, bookingController.createBooking);
router.put('/:id', authenticate, validateBooking, bookingController.updateBooking);
router.delete('/:id', authenticate, bookingController.deleteBooking);

module.exports = router;

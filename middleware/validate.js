const { validationResult, check } = require('express-validator');

const validateBooking = [
  check('booking_date').isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateBooking;

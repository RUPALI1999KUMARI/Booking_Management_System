const Booking = require('../models/booking');

const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const bookings = await Booking.findAndCountAll({
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [['booking_date', 'ASC']],
    });
    console.log({ bookings });
    res.json({ total: bookings.count, bookings: bookings.rows });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching booking' });
  }
};

const createBooking = async (req, res) => {
  try {
    req.body.user_id = req.user.dataValues.id;
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    req.body.user_id = req.user.dataValues.id;
    await booking.update(req.body);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error updating booking' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    await booking.destroy();
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting booking' });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};

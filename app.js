const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

sequelize.sync(); // Ensures the tables are created if they don't exist

app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

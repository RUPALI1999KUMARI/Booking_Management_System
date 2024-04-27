const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.sendfile('client.html');
});


app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    next();
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
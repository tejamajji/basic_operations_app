const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/basic-operations-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// EJS Setup
app.set('view engine', 'ejs');


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));


// Session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/basic-operations-app' }),
}));

// Routes
app.use('/', userRoutes);
app.use('/books', bookRoutes);

// 404 Not Found Middleware (Should be after all routes)
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// 500 Server Error Middleware (Should be after 404 middleware)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  try {
    const open = (await import('open')).default;
    open(`http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error opening the browser:', error);
  }
});

const Book = require('../models/Book');

// Render the page to create a new book
const renderCreateBook = async (req, res) => {
  const books = await Book.find({ user_id: req.session.userId });
  const searchTerm = '';  // Initialize searchTerm as an empty string
  res.render('books', { books, searchTerm });
};


// Handle the creation of a new book
const createBook = async (req, res) => {
  const { title, description, publishYear, author, coverPagePath } = req.body;
  const book = new Book({
    user_id: req.session.userId,
    title,
    description,
    publishYear,
    author,
    coverPagePath
  });
  await book.save();
  res.redirect('/books');
};

// Render the page to edit a book
const renderEditBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.user_id.toString() === req.session.userId) {
    res.render('edit-book', { book });
  } else {
    res.redirect('/books');
  }
};

// Handle updating a book
const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.user_id.toString() === req.session.userId) {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/books');
  } else {
    res.redirect('/books');
  }
};

// Handle deleting a book
const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.user_id.toString() === req.session.userId) {
    await Book.findByIdAndDelete(req.params.id);
  }
  res.redirect('/books');
};

// Render a single book view
const renderViewBook = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('user_id');
  res.render('view-book', { book });
};

// Render all books
const renderAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.render('all-books', { books });
};

// Search for books by title
const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.query.search || '';
    const books = await Book.find({
      user_id: req.session.userId,
      title: { $regex: searchTerm, $options: 'i' }
    });
    res.render('books', { books, searchTerm });
  } catch (err) {
    console.error('Error while searching books:', err);
    res.status(500).send('Server Error');
  }
};




// Exporting the controller functions to be used in routes
module.exports = {
  renderCreateBook,
  createBook,
  renderEditBook,
  updateBook,
  deleteBook,
  renderViewBook,
  renderAllBooks,
  searchBooks, // Newly added search function
};

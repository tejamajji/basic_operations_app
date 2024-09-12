const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.renderCreateBook);
router.post('/', bookController.createBook);
router.get('/edit/:id', bookController.renderEditBook);
router.post('/edit/:id', bookController.updateBook);
router.get('/delete/:id', bookController.deleteBook);
router.get('/view/:id', bookController.renderViewBook);
router.get('/all', bookController.renderAllBooks);
router.get('/search', bookController.searchBooks);

module.exports = router;

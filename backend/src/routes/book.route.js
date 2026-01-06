const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  updateBookCover,
} = require("../controller/bookController.js");
const protect = require("../middleware/authMiddleware.js");
const upload = require("../utils/multer.js");


// Apply protect middleware to all the routes in this file.
router.use(protect);

router.route("/").post(createBook).get(getBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/cover/:id").put(upload, updateBookCover);

module.exports = router;

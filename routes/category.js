const express = require('express');
const controller = require('../controllers/category');
const router  = express.Router();
const passport = require('passport');
const upload = require('../middleware/upload');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getByID);
router.get('/:id/product', passport.authenticate('jwt', {session: false}), controller.getAllProducts);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteCategory);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.editCategory);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createCategory);

module.exports = router;
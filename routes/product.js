const express = require('express');
const controller = require('../controllers/product');
const passport = require("passport");
const router  = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getByID);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delByID);
router.put('/:id', passport.authenticate('jwt', {session: false}), controller.editByID);
router.post('/', passport.authenticate('jwt', {session: false}), controller.createProduct);

module.exports = router;
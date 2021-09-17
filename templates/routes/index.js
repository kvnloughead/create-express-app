/* eslint-disable */
const router = require('express').Router();

// these lines will need an iterative approach
const fooRouter = require('./foos');
router.use('/foos', fooRouter);

module.exports = router;
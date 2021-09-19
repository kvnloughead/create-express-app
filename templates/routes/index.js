/* eslint-disable */
const router = require('express').Router();

// these lines will need an iterative approach
const modelNameRouter = require('./modelNames');
router.use('/modelNames', modelNameRouter);

module.exports = router;
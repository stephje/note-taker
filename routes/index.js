const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes.js');
const apiRoutes = require('./apiRoutes.js');

//set up middleware for routes and api routes
router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

module.exports = router;
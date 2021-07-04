const router = require('express').Router();
const routes = require('./htmlRoutes.js');
const apiRoutes = require('./apiRoutes.js');

router.use('/', routes);
router.use('/api', apiRoutes);

module.exports = router;
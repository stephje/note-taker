const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.json({ name: 'test' });
});

module.exports = router;

const router = require('express').Router();
const fs = require('fs');
const { nanoid } = require('nanoid');

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let response = JSON.parse(data);
        res.json(response);
    });
});

module.exports = router;

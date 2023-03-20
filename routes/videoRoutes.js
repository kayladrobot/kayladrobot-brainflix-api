const express = require("express");
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    console.log('Request received');
    fs.readFileSync('./data/videos.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
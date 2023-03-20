const express = require("express");
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  fs.readFile('./data/videos.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log("Success")
      console.log("Data:", data);
      const videos = JSON.parse(data).map(video => {
        const {id, title, channel, image} = video
        return {id, title, channel, image}
      })
      res.send(videos);
    }
  });
});

module.exports = router;
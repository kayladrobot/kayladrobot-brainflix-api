const express = require("express");
const router = express.Router();
const fs = require('fs');
const { title } = require("process");
const uniqid = require('uniqid');

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

router.get('/:id', (req, res) => {
  const videoId = req.params.id;
  fs.readFile('./data/videos.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      const videos = JSON.parse(data);
      const video = videos.find(v => v.id === videoId);
      if (video) {
        res.send(video);
      } else {
        res.status(404).send('Video not found');
      }
    }
  });
});

router.post('/', (req, res) => {
  fs.readFile('./data/videos.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      const videos = JSON.parse(data);
      const newVideo = {
        id: uniqid(),
        title: req.body.title,
        channel: req.body.channel,
        image: 'path/to/image'
      };
      videos.push(newVideo);
      fs.writeFile('./data/videos.json', JSON.stringify(videos), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(201).send(newVideo);
        }
      });
    }
  });
});


module.exports = router;
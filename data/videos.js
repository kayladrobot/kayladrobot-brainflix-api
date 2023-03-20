const axios = require('axios');
const fs = require('fs');
const URL = 'https://project-2-api.herokuapp.com/';
const API_KEY = '?api_key=10a570e9-36c6-4f88-be29-49e72cd043b6';

//fetch all video data from /videos/:id
async function fetchVideos() {
    const response = await axios.get(`${URL}videos${API_KEY}`);
    const videoList = response.data;

    //empty object to store video data
    let allVideos = {};

    //fetch data for each video
    for (let i = 0; i < videoList.length; i++) {
        const videoId = videoList[i].id;
        const videoResponse = await axios.get(`${URL}videos/${videoId}${API_KEY}`);
        const videoData = videoResponse.data;
        allVideos[videoId] = videoData;
    }

    fs.writeFileSync('videos.json', JSON.stringify(allVideos));
    console.log('YAY! Data saved successfully!');
}

fetchVideos();

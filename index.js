const express = require("express");
const app = express();
const cors = require('cors');
const PORT = 8080;
const videoRoutes = require("./routes/videoRoutes")

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`${req.method} Request Received`);
    next();
  });

app.use("/videos", (req, res, next) => {
    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Server require application/json');
    } else {
        next();
    }
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use("/videos", videoRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
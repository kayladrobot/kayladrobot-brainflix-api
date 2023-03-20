const express = require("express");
const app = express();
const PORT = 8080;
const videoRoutes = require("./routes/videoRoutes")

app.use("/videos", videoRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
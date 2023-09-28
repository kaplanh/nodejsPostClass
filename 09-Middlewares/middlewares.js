const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use(require("./middlewares/"));
app.get("/*", (req, res) => {
    res.send({
        message: "Welcome to Home",
    });
});

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

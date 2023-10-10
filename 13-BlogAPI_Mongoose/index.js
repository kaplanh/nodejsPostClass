const express = require("express");
const app = express();

/*-------------------------------------------------------------*/

require("dotenv").config();

const PORT = process.env.PORT || 8000;
/*-------------------------------------------------------------*/
// express e json veri gönderecegimi ve bunu kabul edip object e döndürmesi istedigimi belirtiyorum
app.use(express.json());
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
app.all("/", (req, res) => {
    res.send("WELCOME TO BLOG API");
});

/*-------------------------------------------------------------*/
// errorHandler
app.use(require("./src/errorHandler"));

/*-------------------------------------------------------------*/
app.listen(PORT, () => console.log("Running on http://127.0.0.1:" + PORT));

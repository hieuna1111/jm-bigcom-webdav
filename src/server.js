const cors = require('cors')
const express = require("express");
const initWebRoutes = require("./route/web");
require("dotenv").config();
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }, { extended: true }));
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});
initWebRoutes(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

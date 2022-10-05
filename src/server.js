const express = require("express");
const initWebRoutes = require("./route/web");
require("dotenv").config();

let app = express();
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

initWebRoutes(app);

const express = require("express");
const webdavController = require("../controller/webdav-controller");

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/graphics", webdavController.getImagesData);

    return app.use("/", router);
}

module.exports = initWebRoutes;
const webdav = require("../config/webdav-connector");

let getImagesData = (req, res) => {

  //check whether the path is passed in param
  let searchPath = req.query.path;
  if (!searchPath) {
    return res.status(400).json({
      statusCode: 400,
      errMessage: "Missing path in param"
    })
  }

  //access to webdav
  webdav.connect().then(async (client) => {

    //check path exist in webdav
    let allPath = await client.getDirectoryContents("/");
    let path = allPath.find(path => path.filename === searchPath);
    if (!path) {
      return res.status(400).json({
        statusCode: 400,
        errMessage: "Path not exist in webdav"
      })
    }

    //get data from path
    let contents = await client.getDirectoryContents(searchPath, {glob: "*.{png,jpg,gif}"});
    if (!contents) {
      return res.status(404).json({
        statusCode: 404,
        errMessage: "Not image content found",
        result: []
      })
    }
    return res.status(200).json({
      statusCode: 200,
      errMessage: "Ok",
      result: contents
    });
  });
}

module.exports = {getImagesData: getImagesData};
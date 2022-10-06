const webdav = require("../config/webdav.connector");
const webdavService = require("../service/webdav.service");

let getImagesData = (req, res) => {

  const fullSearchPath = "/content/shop-by-graphics";
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  if (limit > 10) limit = 10;

  //access to webdav
  webdav.connect().then(async (client) => {
    //get data from path
    let contents = await client.getDirectoryContents(fullSearchPath, {glob: "*.{png,jpg,gif}"});
    let contentsPagination = await webdavService.paginateGraphics(contents, limit, page);
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
      result: contentsPagination,
      meta: {
        total: contentsPagination.length,
        pagination: {
          current: page,
          prev: page > 1 ? page - 1 : null,
          next: page < Math.ceil(contents.length / limit) ? Math.ceil(contents.length / limit) - page : null
        }
      }
    });
  });
}

module.exports = {getImagesData: getImagesData};
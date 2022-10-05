const {AuthType, createClient} = require("webdav");

let webdavConnector = async () => {
  return createClient(
      process.env.WEBDAV_SERVER_NAME,
      {
        authType: AuthType.Digest,
        username: process.env.WEBDAV_USERNAME,
        password: process.env.WEBDAV_PASSWORD
      }
  );
}

module.exports = {connect: webdavConnector}
let paginateGraphics = (contents, limit, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      contents.map(image => {
        let basename = image.basename;
        if (basename.includes("jpg")) {
          image.basename = parseInt(basename.replace(".jpg", ""));
        }
        if (basename.includes("png")) {
          image.basename = parseInt(basename.replace(".png", ""));
        }
        if (basename.includes("gif")) {
          image.basename = parseInt(basename.replace(".gif", ""));
        }
      });
      let data = contents
          .sort((a, b) => {
            return a.basename - b.basename;
          })
          .slice((page - 1) * limit, page * limit);
      resolve(data)
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {paginateGraphics}
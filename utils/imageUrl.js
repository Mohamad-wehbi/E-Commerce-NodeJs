exports.addImageUrl = (doc, prop, folder) => {
  if (doc[prop]) doc[prop] = `${process.env.BASE_URL}/${folder}/${doc[prop]}`;
};

exports.addImagesUrl = (doc, arr, folder) => {
  if (doc[arr].length) {
    const arrUrl = doc[arr].map((img) => `${process.env.BASE_URL}/${folder}/${img}`);
    doc[arr] = arrUrl;
  }
};

const imageModel = require('../models/imageModel');
const fs = require('fs');
const uuid = require('uuid');

const upload = async (req,res) => {
  console.log(req.headers);
  const buffer = req.file.buffer;
  const filePath = `public/imagesStore/${uuid.v1()}.png`;
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).send('Error writing file');
    } else {
      console.log('File saved successfully');
      res.status(200).send('File uploaded and saved');
    }
  });
}

module.exports = {upload};



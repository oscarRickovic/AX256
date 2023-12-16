const imageModel = require('../models/imageModel');
const fs = require('fs');


const upload = async (req,res) => {
  const buffer = req.file.buffer;
  const filePath = `public/imagesStore/aaaa.png`;
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



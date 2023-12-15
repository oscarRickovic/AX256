const imageModel = require('../models/imageModel');
const fs = require('fs');

const storeImage = async (req, res) => {
    const name = "Bill gates";
    const path = `C:/Users/hp/Desktop/download.jpg`;
    const imageBuffer = fs.readFileSync(path);
    const informations = {
        owner : "abdelhadi@gmail.com",
        name : name,
        image : imageBuffer
    }
    try {
        await imageModel.create(informations);
        res.status(200).json(informations);
    } catch (e) {
        res.status(500).json({msg : "error is " + e.message()});
    }
} 

const getImage = async (req, res) => {
    const imageName = "Bill gates";
    try {
        const image = await imageModel.findOne({ name: imageName });
        if (!image) {
          res.status(404).json({msg : "image not found"})
          return;
        }
        fs.writeFileSync(`BackEnd/imagesStore/Bill.jpg`, image.image);
        console.log(image.image);
        res.status(200).json(image);
      } catch (error) {
        res.status(500).json("error while restoring image");
      }
}


module.exports = {storeImage, getImage};



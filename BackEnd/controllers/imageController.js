const imageModel = require('../models/imageModel');
const userModel = require('../models/userModel');
const fs = require('fs');
const uuid = require('uuid');

const uploadProfile = async (req,res) => {
  const buffer = req.file.buffer;
  const newName = uuid.v1()+'.png';
  const filePath = `public/imagesStore/${newName}`;
  fs.writeFile(filePath, buffer, async (err) => {
    if (err) {
      res.status(500).send('Error writing file');
    } else {
      console.log('user : ');
      console.log(req.customData.user._id)
      const user = req.customData.user;
      try {
        await imageModel.create({
          owner : user.email,
          name : newName
        })
      } catch(e) {
        res.status(501).send('Error while saving image in db')
      }
      try {
        user.profilePicture = newName;
        await userModel.findOneAndUpdate({email : user.email},{
          ...user
        })
      } catch(e) {
        res.status(502).send('Error while updating user profile db')
      }
      res.status(200).send('File uploaded and saved');
    }
  });
}

const uploadPicture = async (req, res) => {
  const buffer = req.file.buffer;
  const newName = uuid.v1()+'.png';
  const filePath = `public/imagesStore/${newName}`;
  fs.writeFile(filePath, buffer, async (err) => {
    if (err) {
      res.status(500).send('Error writing file');
    } else {
      console.log('user : ');
      console.log(req.customData.user._id)
      const user = req.customData.user;
      try {
        await imageModel.create({
          owner : user.email,
          name : newName
        })
      } catch(e) {
        res.status(501).send('Error while saving image in db')
      }
      res.status(200).send('File uploaded and saved');
    }
  });
}

const myPictures = async (req, res) => {
  const user = req.customData.user;
  
  try {
    let pictures = await imageModel.find({owner : user.email}).sort({createdAt: -1});
    if(!pictures) return res.status(404).json({msg : "no user with this ID is found"});
    return res.status(200).json(pictures);
  } catch(e) {
    return res.status(500).json({msg : "error while searching pictures"})
  }
}
module.exports = {uploadProfile, uploadPicture, myPictures};



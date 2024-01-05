const imageModel = require('../models/imageModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
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
      const user = req.customData.user;
      try {
        await imageModel.create({
          owner : user._id,
          name : newName
        })
      } catch(e) {
        res.status(501).send('Error while saving image in db')
      }
      try {
        user.profilePicture = newName;
        await userModel.findOneAndUpdate({_id : user._id},{
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
      const user = req.customData.user;
      try {
        await imageModel.create({
          owner : user._id,
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
    let pictures = await imageModel.find({owner : user._id}).sort({createdAt: -1});
    if(!pictures) return res.status(404).json({msg : "no user with this ID is found"});
    return res.status(200).json(pictures);
  } catch(e) {
    return res.status(500).json({msg : "error while searching pictures"})
  }
}

const friendPictures = async(req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(405).json({error: 'No valid id'})
  }
  const user = await userModel.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  try {
    const images = await imageModel.find({owner: id}).sort({createdAt: -1});
    return res.status(200).json(images)
  }catch(e){
    return res.status(500).json({msg: "error while loading pictures"})
  }
}
module.exports = {uploadProfile, uploadPicture, myPictures, friendPictures};



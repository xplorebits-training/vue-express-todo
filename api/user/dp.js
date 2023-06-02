const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const DpModel = require('../../model/dp');
const UserModel = require('../../model/user');
const e = require('express');

const dpHandler = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { filename, size, mimetype, path: filePath, originalname } = req.file;
  const userId = req.user.userId;

  try {
    const existingUser = await UserModel.findById(userId);

    const dpData = new DpModel({
      name: filename,
      size: size,
      mimeType: mimetype,
      filePath: filePath,
      userId: userId
    });

    existingUser.photoURL = filePath;

    const savedDpData = await dpData.save();
    const savedUserData = await existingUser.save();
    const destinationPath = path.join(process.env.HOME, 'user-dp', originalname);

    await fs.rename(filePath, destinationPath);

    return res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to save file' });
  }
};

module.exports = dpHandler;

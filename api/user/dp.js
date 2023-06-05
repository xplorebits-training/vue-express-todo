const fs = require('fs').promises;
const path = require('path');
const DpModel = require('../../model/dp');
const UserModel = require('../../model/user');

const dpHandler = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const { originalname, size, mimetype } = req.file;
  const { userId } = req.user;

  const extension = path.extname(originalname);
  const filename = `${req.file.filename}${extension}`;

  const filePath = path.join(process.env.HOME, 'user-dp', filename);
  try {
    await fs.rename(req.file.path, filePath);

    const dpData = new DpModel({
      name: filename,
      size,
      mimeType: mimetype,
      filePath,
      userId
    });
    await dpData.save();

    // Update user profile with new photoURL
    const existingUser = await UserModel.findById(userId);
    existingUser.photoURL = filePath;
    existingUser.save();

    res.status(200).json({ success: 'User dp uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = dpHandler;

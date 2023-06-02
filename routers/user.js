const express = require('express');
const multer = require('multer');
const path = require('path');
const getProfileHandler = require('../api/user/get-profile');
const setProfileHandler = require('../api/user/set-profile');
const passwordHandler = require('../api/user/update-password');
const dpHandler = require('../api/user/dp');

const router = express.Router();

// Multer configuration
const upload = multer({
  dest: path.join(process.env.HOME, 'user-dp'), // Destination folder for uploads
  limits: {
    fileSize: 2 * 1024 * 1024 // Maximum file size in bytes (2MB)
  },
  fileFilter: (req, file, cb) => {
    // Check if the uploaded file meets the file size limit
    if (file.size > 2 * 1024 * 1024) {
      cb(new Error('File size exceeds the limit of 2MB'));
    } else {
      cb(null, true);
    }
  }
});

// Error handling middleware for multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};

router.get('/get-profile', getProfileHandler);
router.put('/set-profile', setProfileHandler);
router.post('/update-password', passwordHandler);
router.post('/dp', upload.single('userDp'), dpHandler);

// Register multer error handling middleware
router.use(multerErrorHandler);

module.exports = router;

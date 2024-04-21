const Image = require('../models/Image');

exports.saveImage = async (req, res) => {
  try {
    const { meetId, userId, imageUrl } = req.body;
    const newImage = new Image({
      meetId,
      userId,
      imageUrl
    });
    
    await newImage.save();

    res.status(201).json({ message: 'Image saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
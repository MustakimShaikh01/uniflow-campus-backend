const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// GET unread count for a user
router.get('/unread-count/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const unreadCount = await Message.countDocuments({
      receiverId: userId,
      isRead: false
    });

    return res.json({
      success: true,
      unreadCount: unreadCount
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

module.exports = router;

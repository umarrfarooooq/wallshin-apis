const express = require('express');
const messageController = require('../Controllers/messageController')
const router = express.Router();
const verifyToken = require('../Middlewares/verifyToken')

router.post('/add', messageController.addMessage);

router.get('/all', verifyToken, messageController.getAllMessages);

router.get('/message/:id', verifyToken, messageController.getMessageById);

router.patch('/message/:id/done', verifyToken, messageController.markMessageAsDone);

router.delete('/message/:id', verifyToken, messageController.deleteMessageById);

module.exports = router;
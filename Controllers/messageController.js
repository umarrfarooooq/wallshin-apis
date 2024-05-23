const Message = require('../Models/Message')


exports.addMessage = async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
  
      if (
        !name || !name.trim() ||
        !email || !email.trim() ||
        !phone || !phone.trim() ||
        !message || !message.trim()
      ) {
        return res.status(400).json({ error: 'All fields are required and cannot be empty.' });
      }
  
      const newMessage = new Message({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });
  
      const savedMessage = await newMessage.save();
  
      res.status(201).json({ message: savedMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
      const messages = await Message.find();
      res.status(200).json({ messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
};


exports.getMessageById = async (req, res) => {
    try {
      const { id } = req.params;
      const message = await Message.findById(id);
  
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      res.status(200).json({ message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
};

exports.markMessageAsDone = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedMessage = await Message.findByIdAndUpdate(
        id,
        { isDone: true },
        { new: true }
      );
  
      if (!updatedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      res.status(200).json({ message: updatedMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
};


exports.deleteMessageById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMessage = await Message.findByIdAndDelete(id);
  
      if (!deletedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
};
const express = require('express');
const upload = require('../Middlewares/upload');
const jobController = require('../Controllers/jobController');
const verifyToken = require('../Middlewares/verifyToken')
const router = express.Router();

router.post('/apply', upload.single('cv'), jobController.applyForJob);
router.get('/all', verifyToken, jobController.getAllApplications);
router.get('/application/:id',verifyToken, jobController.getApplicationById);
router.delete('/delete/:id',verifyToken, jobController.deleteApplicationById);

module.exports = router;

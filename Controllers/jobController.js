const Job = require('../Models/Jobs');

exports.applyForJob = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const cv = req.file;

    if (!name || !name.trim() || !email || !email.trim() || !phone || !phone.trim() || !cv) {
      return res.status(400).json({ error: 'All fields are required and a CV must be uploaded.' });
    }

    const newJobApplication = new Job({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      cv: cv.path,
    });

    const savedJobApplication = await newJobApplication.save();

    res.status(201).json({ message: 'Job application submitted successfully!', jobApplication: savedJobApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};

exports.getAllApplications = async (req, res) => {
    try {
      const applications = await Job.find();
      res.status(200).json({ applications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  };
  
  exports.getApplicationById = async (req, res) => {
    try {
      const { id } = req.params;
      const application = await Job.findById(id);
  
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
  
      res.status(200).json({ application });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  };
  
  exports.deleteApplicationById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedApplication = await Job.findByIdAndDelete(id);
  
      if (!deletedApplication) {
        return res.status(404).json({ error: 'Application not found' });
      }
  
      res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  };
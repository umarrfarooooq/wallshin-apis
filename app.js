require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

let mongoUri = process.env.MONGO_URL;
mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
const messageRoutes = require('./Routes/messageRoute')
const applicationRoutes = require('./Routes/jobRoute')
const adminAuthRoutes = require('./Routes/adminAuth')



// Apis
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/adminAuth', adminAuthRoutes);


const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log("Server is runiing on port " + PORT );
})

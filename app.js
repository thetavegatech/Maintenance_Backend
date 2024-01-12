
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieparser = require("cookie-parser")
const app = express();
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())


const router = require('./Routes/Router');
const Breakdownrouter = require('./Routes/BreakdownRouter');
const UserNo = require('./NumberModel');
const Asset = require('./Model');
const BreakDown = require('./BreakdownModel');
const AssetMaster = require('./models/AssetModel');
const AssetRouter = require('./Routes/AssetRoute')
const UserInfo = require('./models/userInfoModel');
const routerNo = require('./controller/userInfoController');

// const mongourl = "mongodb://192.168.29.93:27017/MMS_DB?directConnection=true"
const mongourl = "mongodb+srv://vaibhavdevkar101:Vaibhav123@cluster0.518nyqj.mongodb.net/MMS_DB?retryWrites=true&w=majority"


mongoose.connect(mongourl, {
})
  .then(() => { console.log("connected to database"); })
  .catch(e => console.log(e));

  
//userauth
const userRoute = require("./Routes/userRoutes")
const {notFound , errorHandler} = require("./middleware/errorMiddleware")
const AssetRoutes = require('./Routes/AssetRoute');


app.use("/api/users", userRoute)

//this routes for breakdown
app.use(router);
app.use(Breakdownrouter);
// app.use(UserNo);
app.use(routerNo);
app.use(AssetRouter);
app.use('/api', AssetRoutes);

app.get('/getBreakdownData', async (req, res) => {
    try {
      const fields = req.query.fields ? req.query.fields.replace(/,/g, ' ') : '';
      const data = await DataModel.find().select(fields).exec();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  });


  // Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads'); // Destination folder
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Define the file upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!' });
});


app.listen(5000, () => {
  console.log("Server is running on port 5000")
});

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieparser = require("cookie-parser")
const app = express();
const fs = require('fs');
const path = require('path');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())
// Increase payload size limit to 50MB (adjust as needed)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const router = require('./Routes/Router');
const Breakdownrouter = require('./Routes/BreakdownRouter');
const UserNo = require('./NumberModel');
const routerNo = require('./controller/userNoContoller');
const Asset = require('./Model');
const BreakDown = require('./BreakdownModel');
const AssetMaster = require('./models/AssetModel');
const AssetRouter = require('./Routes/AssetRoute')


// const mongourl = "mongodb://192.168.29.93:27017/MMS_DB?directConnection=true"
const mongourl = "mongodb+srv://vaibhavdevkar101:Vaibhav123@cluster0.518nyqj.mongodb.net/MMS_DB?retryWrites=true&w=majority"


mongoose.connect(mongourl, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => { console.log("connected to database"); })
  .catch(e => console.log(e));

//userauth
const userRoute = require("./Routes/userRoutes")
const {notFound , errorHandler} = require("./middleware/errorMiddleware")
const AssetRoutes = require('./Routes/AssetRoute');


app.use("/api/users", userRoute)
// app.use(notFound)
// app.use(errorHandler)

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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'attachments/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });


app.listen(5000, () => {
  console.log("Server is running on port 5000")
});
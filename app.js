
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieparser = require("cookie-parser")
const app = express();
const fs = require('fs');
const path = require('path');

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Express 3.0
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Express 3.0
//app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb' }));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())
// Increase payload size limit to 50MB (adjust as needed)


const router = require('./Routes/Router');
const Breakdownrouter = require('./Routes/BreakdownRouter');
// const UserNo = require('./NumberModel');
// const routerNo = require('./controller/userNoContoller');
const Asset = require('./Model');
const BreakDown = require('./BreakdownModel');
const AssetMaster = require('./models/AssetModel');
const AssetRouter = require('./Routes/AssetRoute')
const UserInfo = require('./models/userInfoModel');
const routerNo = require('./controller/userInfoController');

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
            var dirName =path.join(process.cwd(), './files/')
            console.log(dirName)
            if (!fs.existsSync(dirName)){
                    fs.mkdirSync(dirName);
            }
                cb(null,dirName)
        },
  // },
  filename: (req, file, cb)  => {
        cb(null, Date.now()+'-'+file.originalname)
  }


  })
const upload = multer({ storage: storage });
router.post("/putData",upload.single('files'), (req, res) => {
  console.log(reqs.file.destination) // image url
  console.log(JSON.parse(req.body)) // other things
})

app.listen(5000, () => {
  console.log("Server is running on port 5000")
});
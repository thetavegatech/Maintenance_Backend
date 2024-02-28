
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieparser = require("cookie-parser")
const app = express();
const fs = require('fs');
const path = require('path');
const Grid = require('gridfs-stream');

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

// const mongourl = "mongodb://localhost:27017/MMS_DB?directConnection=true" 
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


  // Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});


// const storage = multer.memoryStorage();
// const upload = multer({ storage });

  

// app.post('/upload', upload.single('image'), (req, res) => {
//   // Access the uploaded file using req.file.buffer
//   const { originalname, buffer } = req.file;

//   // Create a write stream to store the file in MongoDB GridFS
//   const writestream = gfs.createWriteStream({
//     filename: originalname,
//   });
//   // Pipe the file buffer to GridFS
//   writestream.write(buffer);
//   writestream.end();

//   writestream.on('close', () => {
//     res.send('File uploaded successfully');
//   });
// });



// app.post('/upload', upload.single('file'), (req, res) => {
//   try {
//     // Assuming 'file' is the name attribute of the file input in your HTML form
//     const uploadedFile = req.file;

//     if (!uploadedFile) {
//       throw new Error('No file provided');
//     }

//     // Get the destination path (Multer has already configured the destination in your case)
//     const destinationPath = uploadedFile.destination;

//     // You can perform additional processing here if needed

//     // Move the file to a desired location (e.g., the 'backend/uploads' folder)
//     const newFilePath = path.join(destinationPath, uploadedFile.filename);
//     fs.renameSync(uploadedFile.path, newFilePath);

//     // Send a success response
//     res.json({ message: 'File uploaded successfully!' });
//   } catch (error) {
//     console.error(error);

//     // Send an error response
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'D:\Work\Bootstrap\images'); // Set the path to your source folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for file upload
app.post('/upload', upload.single('image'), (req, res) => {
  // File uploaded successfully
  res.send('File uploaded');
});

app.listen(5000, () => {
  console.log("Server is running on port 5000")
});
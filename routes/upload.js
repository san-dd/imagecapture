const { Router } = require ('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const router = Router();
const {MONGO_URI,MONGO_DB_NAME} =require('../config/appConfig')

const auth=require('../middleware/auth')



const db = `${MONGO_URI}/${MONGO_DB_NAME}`;
// Init gfs
let gfs;

// Connect to Mongo
mongoose.createConnection(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((conn) => {
    //console.log(conn.db)
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('for file upload MongoDB Connected......')})
  .catch(err => console.log(err));

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          metadata:{userid:req.user.id},
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

//upload file

router.post('/upload',auth, upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

module.exports=router
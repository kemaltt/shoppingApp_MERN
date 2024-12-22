import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { connect } from './src/config/MongoDb.js';
import productRoute from './src/routers/product-route.js';
import authRoute from './src/routers/auth-route.js';
import cartRoute from './src/routers/cart-route.js';
import favRoute from './src/routers/favorite-route.js';


dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/storage', express.static('storage'));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'storage/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {

//   const fileType = file.fieldname;
//   const ext = path.extname(file.originalname).toLowerCase();
//   const mimetype = "." + file.mimetype.split('/')[1];

//   // Dosya kontrolü
//   if (fileType === 'product_images' || fileType === "ticket_images" || fileType === "company_logo") {
//     const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
//     if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
//       const error = new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WEBP files are allowed.');
//       return cb(error, false);
//     };
//   } else {
//     const error = new Error('Invalid file type.');
//     return cb(error, false);
//   }
// }

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

// app.post('/api/upload', upload.fields(
//   [
//     { name: 'product_images', maxCount: 10 },
//     { name: 'profile_image', maxCount: 1 },
//     { name: 'company_logo', maxCount: 1 },
//   ]
// ), (req, res) => {
//   res.send(req.files);
// });





app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', authRoute)
app.use('/api', productRoute)
app.use('/api', cartRoute)
app.use('/api', favRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connect();
});
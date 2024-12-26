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
import path from 'path';
import fs from 'fs';


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
//   if (fileType === 'productImages' || fileType === "ticket_images" || fileType === "company_logo") {
//     const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
//     if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
//       const error = new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WEBP files are allowed.');
//       return cb(error, false);
//     };
//   } else {
//     const error = new Error('Invalid file type.');
//     return cb(error, false);
//   }

//   // istekten gelen max img count kontrolü

//   let maxFile = 0;
//   if (fileType === "productImages") {
//     maxFile = 10;
//   } else if (fileType === "ticket_images") {
//     maxFile = 4;
//   } else if (fileType === "product_guides") {
//     maxFile = 2;
//   } else if (fileType === "profile_image") {
//     maxFile = 1;
//   }

//   const fileCount = Array.isArray(req.files) ? req.files.length : 1;
//   if (fileCount > maxFile) {
//     const error = new Error(`Maximum ${maxFile} img can be loaded.`);
//     return cb(error, false);
//   };
//   cb(null, true);
// }

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const fileType = file.fieldname;
    let pathUrl = `storage/${req?.headers?.id ?? 123456}`
    const id = req.originalUrl.split('/').pop()?.split('?')[0];

    if (fileType === "productImages") {
      pathUrl = pathUrl + `/product/${id}`;
    } else if (fileType === "profile_image") {
      // Ticket editlerde endpoint yapısı support/ticketId/sessionId şeklinde yani diğerlerinden farklı
      // O yüzden ticketId yi farklı aldırmak durumundayız.
      const userId = req.originalUrl.split('/').pop()?.split('?')[0];
      pathUrl = pathUrl + `/profile/${userId}`;
    } else {
      const error = new Error('Invalid file type.');
      return cb(error, "error");
    }

    fs.mkdirSync(pathUrl, { recursive: true });

    cb(null, pathUrl);
  },

  filename: function (req, file, cb) {
    const timestamp = Date.now() + Math.floor(Math.random() * 1000);
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const filename = `${timestamp}${extension}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {

  const fileType = file.fieldname;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = "." + file.mimetype.split('/')[1];

  // Dosya kontrolü
  if (fileType === 'productImages' || fileType === "profile_image" || fileType === "company_logo") {
    const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
      const error = new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WEBP files are allowed.');
      return cb(error, false);
    };
  } else if (fileType === 'product_guides') {
    const allowedFileTypes = ['.pdf'];
    if (ext !== mimetype && !allowedFileTypes.includes(ext)) {
      const error = new Error('Invalid file type. Only PDF files are allowed.');
      return cb(error, false);
    };
  } else {
    const error = new Error('Invalid file type.');
    return cb(error, false);
  }

  // istekten gelen max img count kontrolü
  let maxFile = 0;
  if (fileType === "productImages") {
    maxFile = 10;
  } else if (fileType === "ticket_images") {
    maxFile = 4;
  } else if (fileType === "product_guides") {
    maxFile = 2;
  } else if (fileType === "profile_image") {
    maxFile = 1;
  }

  const fileCount = Array.isArray(req.files) ? req.files.length : 1;
  if (fileCount > maxFile) {
    const error = new Error(`Maximum ${maxFile} img can be loaded.`);
    return cb(error, false);
  };
  cb(null, true);
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});


app.post('/upload-images/:id', upload.array('productImages', 10), (req, res) => {
  const files = req.files?.map((file) => {
    return {
      url: file.path,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    };
  });
  if (files === undefined) {
    res.status(400).send({ message: "No file uploaded" });
  }
  res.status(200).json(files);
}
);





app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(authRoute)
app.use(productRoute)
app.use(cartRoute)
app.use(favRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connect();
});
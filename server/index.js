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
import uploadRoute from './src/routers/file-upload-route.js';



dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/storage', express.static('storage'));


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(authRoute)
app.use(productRoute)
app.use(cartRoute)
app.use(favRoute)
app.use(uploadRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connect();
});
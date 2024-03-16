import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from './src/config/MongoDb.js';
import authRoute from './src/routers/authRoute.js';
import productRoute from './src/routers/productRoute.js';
import cartRoute from './src/routers/cartRoute.js';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', authRoute)
app.use('/api', productRoute)
app.use('/api', cartRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connect();
});
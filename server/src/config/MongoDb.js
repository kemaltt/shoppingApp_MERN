import mongoose from "mongoose";


export const connect = () => mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('Database connected');
  }
  ).catch((err) => {
    console.log('Error connecting to database', err);
  }
  );
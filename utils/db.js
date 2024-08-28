import mongoose from 'mongoose';
import { DATABASE_URL as url } from '../config/index.js';

const connectToDB = async () => {
  try {
    await mongoose.connect(url, {
      // These options are now the default in recent versions of Mongoose,
      // so they are commented out. You can uncomment them if necessary.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(`Error while connecting to MongoDB: `, error.message);
  }
};

export default connectToDB;

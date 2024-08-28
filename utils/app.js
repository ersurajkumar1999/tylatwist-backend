import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import i18n from '../config/i18n-setup.js';
import setLocale from '../middlewares/setLocale.js';

// Uncomment and import routes as needed
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import postRoute from "../routes/postRoutes.js"
// import sessionRoutes from '../routes/sessionRoutes.js';
// import userRoutes from '../routes/userRoutes.js';
// import commonRoutes from '../routes/commonRoutes.js';
// import screenshotRoutes from '../routes/screenshotRoutes.js';
// import countryRoutes from './routes/countryRoutes.js';
// import stateRoutes from '../routes/stateRoutes.js';
// import imageRoutes from '../routes/imageRoutes.js';
// import attendanceRoutes from '../routes/attendanceRoutes.js';
// import breakRoutes from '../routes/breakRoutes.js';
// import categoryRoutes from '../routes/categoryRoutes.js';
// import subCategoryRoutes from '../routes/subCategoryRoutes.js';
// import chatRoutes from '../routes/chatRoutes.js';
// import messageRoutes from '../routes/messageRoutes.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use(i18n.init);
app.use(setLocale);

// Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// Uncomment and use routes as needed
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoute);
// app.use('/api/v1', sessionRoutes);
// app.use('/api/v1', imageRoutes);
// app.use('/api/v1', attendanceRoutes);
// app.use('/api/v1/break', breakRoutes);

// app.use('/api/v1', commonRoutes);
// app.use('/api/v1/screenshot/', screenshotRoutes);

// app.use('/api/v1/category', categoryRoutes);
// app.use('/api/v1/sub-category', subCategoryRoutes);

export default app;

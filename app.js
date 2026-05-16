import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/authRoute.js';
import profileRouter from './routes/profileRoutes.js';
import upload from './routes/uploadRouter.js';
import passport from 'passport';
import './config/passport.js';
import session from 'express-session';

import uploadRouter from './routes/uploadRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
	session({
		secret: 'cat',
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', authRouter);
app.use('/', uploadRouter)
app.use('/sign-up', authRouter);
app.use('/login', authRouter);
app.use('/upload', uploadRouter);

app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}
	console.log(`hello, im on port ${PORT}`);
});

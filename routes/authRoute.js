import express from 'express';
const authRouter = express.Router();
import * as authController from '../controller/authController.js';
import passport from 'passport';
import links from'../data/links.js'



authRouter.get('/', (req, res) => res.render('index', {user: req.user, links: links}))
authRouter.get('/sign-up', (req, res) => res.render('sign-up'))
authRouter.post('/sign-up', authController.user)


authRouter.get('/login', (req, res) => res.render('login'))
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);



export default  authRouter
 
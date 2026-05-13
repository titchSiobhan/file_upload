import express from 'express';
const profileRouter = express.Router();
import * as profileController from '../controller/profileController.js';
import passport from 'passport';
import links from'../data/links.js'




profileRouter.get('/profile',  profileController.ensureAuthentication, (req, res) => {
    res.render('profile', {user: req.user, links: links})
})

export default profileRouter
import express from 'express';
const profileRouter = express.Router();
import * as profileController from '../controller/profileController.js';
import passport from 'passport';
import links from'../data/links.js'
import * as uploadController from '../controller/uploadController.js'





profileRouter.get('/profile',  profileController.ensureAuthentication, uploadController.getFolders, uploadController.getFiles, (req, res) => {
    res.render('profile', {user: req.user, links: links, folders: req.folders, file: req.file})
})

export default profileRouter
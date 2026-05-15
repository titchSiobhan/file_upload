import express from 'express';
const uploadRouter = express.Router();
import * as uploadController from '../controller/uploadController.js';
import passport from 'passport';
import links from'../data/links.js';
import multer from 'multer';



import { ensureAuthentication } from '../controller/profileController.js';



const upload = multer({ dest: 'uploads/'});

uploadRouter.get('/upload', ensureAuthentication, uploadController.getFolders, (req, res) => {
    res.render('upload', {links: links, folders: req.folders})
})

uploadRouter.post('/upload', ensureAuthentication, upload.single('file'), uploadController.uploadFile, 
async (req, res) => {
    console.log(req.file)
    res.redirect('/profile')
})

uploadRouter.post('/newFolder', uploadController.addNewFolder,
    async (req, res) => {
        res.redirect('/profile')
    }
)



uploadRouter.get('upload/:id', ensureAuthentication, uploadController.folder, uploadController.getFileInFolder, (req, res) => {
    res.render('inFolder', {links: links, folder: req.folder, user: req.user, file: req.file})
})




export default uploadRouter
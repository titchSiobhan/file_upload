import express from 'express';
const uploadRouter = express.Router();
import uploadFile from '../controller/uploadController.js';
import passport from 'passport';
import links from'../data/links.js';
import multer from 'multer';


import { ensureAuthentication } from '../controller/profileController.js';



const upload = multer({ dest: 'uploads/'});

uploadRouter.get('/upload', (req, res) => {
    res.render('upload', {links: links})
})

uploadRouter.post('/upload', ensureAuthentication, upload.single('file'), uploadFile, 
async (req, res) => {
    console.log(req.file)
    res.redirect('/profile')
})



export default uploadRouter
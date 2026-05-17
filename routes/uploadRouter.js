import express from 'express';
const uploadRouter = express.Router();
import * as uploadController from '../controller/uploadController.js';
import passport from 'passport';
import links from '../data/links.js';
import multer from 'multer';
import { validateFile } from '../middleware/validateFile.js';

import { ensureAuthentication } from '../controller/profileController.js';

const storage = multer.memoryStorage();
export const upload = multer({ storage });


uploadRouter.get(
	'/upload',
	ensureAuthentication,
	uploadController.getFolders,
	(req, res) => {
		const message = req.session.messages?.[0] || null;
	req.session.messages = [];
	console.log(message);
		res.render('upload', { links: links, folders: req.folders, message });
	},
);

uploadRouter.post(
	'/upload',
	ensureAuthentication,
	uploadController.getFolders,
	
	upload.single('file'),
	validateFile,
	uploadController.uploadFile,
	async (req, res) => {
		console.log(req.file);
		res.redirect('/');
	},
);

uploadRouter.post(
	'/newFolder',
	uploadController.addNewFolder,
	async (req, res) => {
		res.redirect('/');
	},
);

export default uploadRouter;
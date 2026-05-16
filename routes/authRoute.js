import express from 'express';
const authRouter = express.Router();
import * as authController from '../controller/authController.js';
import * as profileController from '../controller/profileController.js';
import * as uploadController from '../controller/uploadController.js';
import * as deleteController from '../controller/deleteController.js';
import passport from 'passport';
import links from '../data/links.js';

authRouter.get(
	'/',
	profileController.ensureAuthentication,
	uploadController.getFolders,
	uploadController.getFiles,
	(req, res) => {
		const message = req.session.message || null;
	req.session.message = null;
	console.log(message);
		res.render('index', {
			user: req.user,
			links: links,
			folders: req.folders,
			file: req.file,
			message
		});
	},
);

authRouter.get('/sign-up', (req, res) => {
	const message = req.session.messages?.[0] || null;
	req.session.messages = [];
	console.log(message);
	res.render('sign-up', { user: req.user, links: links, message });
});
authRouter.post('/sign-up', authController.user);

authRouter.get('/login', (req, res) => {
	const message = req.session.messages?.[0] || null;
	req.session.messages = [];
	console.log(message);
	res.render('login', { user: req.user, links: links, message });
});
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);

authRouter.get(
	'/download/:id',
	profileController.ensureAuthentication,
	uploadController.download,
);

authRouter.get(
	'/folder/:id',
	profileController.ensureAuthentication,
	uploadController.folder,
	uploadController.getFileInFolder,
	(req, res) => {
		res.render('inFolder', {
			links: links,
			folder: req.folder,
			user: req.user,
			file: req.file,
		});
	},
);

authRouter.get('/deleteFile/:id', deleteController.deleteFile);

authRouter.get('/deleteFolder/:id', deleteController.deleteFolder);

export default authRouter;

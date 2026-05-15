import express from 'express';
const authRouter = express.Router();
import * as authController from '../controller/authController.js';
import * as profileController from '../controller/profileController.js'
import * as uploadController from '../controller/uploadController.js'
import passport from 'passport';
import links from'../data/links.js'


authRouter.get('/',  profileController.ensureAuthentication, uploadController.getFolders, uploadController.getFiles, (req, res) => {
    res.render('index', {user: req.user, links: links, folders: req.folders, file: req.file})
})
// authRouter.get('/', (req, res) => res.render('index', {user: req.user, links: links, folders: req.folders, file: req.file}))
authRouter.get('/sign-up', (req, res) => res.render('sign-up', {user: req.user, links: links}))
authRouter.post('/sign-up', authController.user)


authRouter.get('/login', (req, res) => res.render('login', {user: req.user, links: links, message}))
authRouter.post('/login', authController.login, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)
        
            if (!user) {
                return res.render('login', {
                    user: null,
                    links,
                    message: info.message
                })
            }
            req.login(user, err => {
                if (err) return next(err)
                    return res.redirect('/')
            })
    })
});
authRouter.get('/logout', authController.logout);




authRouter.get('/download/:id', profileController.ensureAuthentication, uploadController.download, (req, res) => ('index')
)

authRouter.get('/:id', profileController.ensureAuthentication, uploadController.folder, uploadController.getFileInFolder, (req, res) => {
    res.render('inFolder', {links: links, folder: req.folder, user: req.user, file: req.file})
})


export default  authRouter
 
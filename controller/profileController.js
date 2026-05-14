
import links from '../data/links.js'


function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}




export {ensureAuthentication}
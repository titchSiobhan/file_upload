import links from '../data/links.js'
  

export function validateFile(req, res, next) {
const file = req.file;
if (!file) {
    return res.render('upload', {
        user: req.user,
        message: 'No file selected',
        links: links,
        folders: req.folders
        
    })
}

if (file.size > 3 * 1024 * 1024) {
    return res.render('upload', {
        user: req.user,
        message: 'File too big!',
        links: links
    })
}
const allowed = ['image/jpeg', 'image/png', 'image/jpg']

if (!allowed.includes(file.mimetype)) {
    return res.render('upload', {
        user: req.user,
        message: 'Only Jpeg, Jpg or Png please!',
        links: links
    })
}
next()
}
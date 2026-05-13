import prisma from "../lib/prisma.js";
import links from "../data/links.js";
import path from 'path'


async function uploadFile(req, res, next) {
     try {
    const upload = await prisma.upload.create({
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        extension: path.extname(req.file.originalname),
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        userId: req.user.id,
      }
    })

    req.uploadRecord = upload
    next()

  } catch (err) {
    next(err)
  }

}


export default uploadFile

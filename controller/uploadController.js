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
        folderId: Number(req.body.folderId)

      }
    })

    req.uploadRecord = upload
    next()

  } catch (err) {
    next(err)
  }

}

async function addNewFolder(req, res, next) {
    try {
        const newFolder = await prisma.folder.create({
            data: {
                folderName: req.body.folderName,
                userId: req.user.id,
            }
        })
        req.folderRecord = newFolder;
        next()
    } catch (err) {
        next(err)
    }
}

async function getFolders(req, res, next) {
    try {
        const folders = await prisma.folder.findMany()
        req.folders = folders
        next()
    } catch (err) {
        next(err)
    }
}

async function getFiles(req, res, next) {
    try {
        const file = await prisma.upload.findMany({
            where: {
                folderId: null
            }
        });
        req.file = file;
        next()
        
    } catch(err) {
        next(err)
    }
}


async function folder(req, res, next) {
    try {
        const folder = await prisma.folder.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        req. folder = folder
        next()
    } catch (err) {
        next(err)
    }
}
async function getFileInFolder(req, res, next) {
    try {
        const file = await prisma.upload.findMany({
            where: {
                folderId: req.folder.id
            }
        })
        req.file = file
        next()
    } catch(err) {
        next(err)
    }
}


export {uploadFile, addNewFolder, getFolders, getFiles, getFileInFolder, folder}

import prisma from '../lib/prisma.js';
import links from '../data/links.js';
import path from 'path';


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
				folderId: Number(req.body.folderId),
                newfilename: req.body.newfilename,
			},
		});

		req.uploadRecord = upload;
		next();
	} catch (err) {
		next(err);
	}
}

async function addNewFolder(req, res, next) {
	try {
		const newFolder = await prisma.folder.create({
			data: {
				folderName: req.body.folderName,
				userId: req.user.id,
			},
		});
		req.folderRecord = newFolder;
		next();
	} catch (err) {
		next(err);
	}
}

async function getFolders(req, res, next) {
	try {
		const folders = await prisma.folder.findMany({
            where: { userId: req.user.id}
        });
		req.folders = folders;
		next();
	} catch (err) {
		next(err);
	}
}

async function getFiles(req, res, next) {
	try {
		const file = await prisma.upload.findMany({
			where: {
                 userId: req.user.id,
				folderId: null,
			},
		});
		req.file = file;
		next();
	} catch (err) {
		next(err);
	}
}

async function folder(req, res, next) {
	try {
		const folderId = Number(req.params.id)

		if (!req.params.id || isNaN(folderId)) {
			return res.status(400).send("Invalid folder ID");

		}

		const folder = await prisma.folder.findFirst({
			where: {
				id: Number(req.params.id),
                userId: req.user.id,
				
			},
		});
		if (!folder) {
			return res.redirect("/");
		}

		req.folder = folder;
		next();
	} catch (err) {
		next(err);
	}
}
async function getFileInFolder(req, res, next) {
	try {
		const file = await prisma.upload.findMany({
			where: {
                userId: req.user.id,
				folderId: req.folder.id,
			},
		});
		req.file = file;
		next();
	} catch (err) {
		next(err);
	}
}

async function download(req, res, next) {
	  try {
    const file = await prisma.upload.findUnique({
      where: {
         id: Number(req.params.id),
         userId: req.user.id }
    })

    if (!file) {
      return res.status(404).send("File not found")
    }

    res.download(file.path, file.originalName)
  } catch (err) {
    next(err)
  }
}



export {
	uploadFile,
	addNewFolder,
	getFolders,
	getFiles,
	getFileInFolder,
	folder,
    download
};

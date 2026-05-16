import prisma from '../lib/prisma.js';
import links from '../data/links.js';

async function deleteFile(req, res, next) {
	try {
		const id = Number(req.params.id);

		const file = await prisma.upload.delete({
			where: {
				id,
			},
		});

		if (!file) {
			return res.status(404).send('File not found');
		}

		res.redirect('/');
	} catch (err) {
		next(err);
	}
}

async function deleteFolder(req, res, next) {
	try {
		const folderId = Number(req.params.id);

		if (isNaN(folderId)) {
			return res.status(400).send('Invalid folder ID');
		}

		const folder = await prisma.folder.findUnique({
			where: { id: folderId },
		});

		if (!folder || folder.userId !== req.user.id) {
			return res.status(404).send('Folder not found');
		}

		await prisma.folder.delete({
			where: { id: folderId },
		});

		return res.redirect('/');
	} catch (err) {
		const isRestrictError =
			err.code === 'P2003' ||
			err?.meta?.field_name?.includes('folderId') ||
			err?.cause?.message?.includes('P2003') ||
			err.message.includes('violates RESTRICT') ||
			err.message.includes('upload_folderId_fkey');

		if (isRestrictError) {
			req.session.message =
				"You can't delete this folder because it still has files in it!";
			return res.redirect('/');
		}

		next(err);
	}
}

export { deleteFile, deleteFolder };

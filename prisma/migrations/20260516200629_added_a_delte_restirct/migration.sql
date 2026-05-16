-- DropForeignKey
ALTER TABLE "upload" DROP CONSTRAINT "upload_folderId_fkey";

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

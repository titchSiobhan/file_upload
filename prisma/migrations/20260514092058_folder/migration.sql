-- AlterTable
ALTER TABLE "upload" ADD COLUMN     "folderId" INTEGER;

-- CreateTable
CREATE TABLE "folder" (
    "id" SERIAL NOT NULL,
    "folderName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

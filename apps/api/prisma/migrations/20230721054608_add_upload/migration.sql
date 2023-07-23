-- CreateTable
CREATE TABLE "FileLibrary" (
    "id" TEXT NOT NULL,
    "total_size_in_byte" BIGINT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "FileLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upload" (
    "id" TEXT NOT NULL,
    "file_uid" TEXT NOT NULL,
    "public_url" TEXT NOT NULL,
    "size_in_byte" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploaded_at" TIMESTAMP(3),
    "original_name" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_library_id" TEXT,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileLibrary_user_id_key" ON "FileLibrary"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Upload_file_uid_key" ON "Upload"("file_uid");

-- AddForeignKey
ALTER TABLE "FileLibrary" ADD CONSTRAINT "FileLibrary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_file_library_id_fkey" FOREIGN KEY ("file_library_id") REFERENCES "FileLibrary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "blogPost" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_email_key" ON "Blogs"("email");

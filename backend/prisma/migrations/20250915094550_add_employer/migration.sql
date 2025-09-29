-- CreateTable
CREATE TABLE "public"."Employer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "gender" "public"."Gender" NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "position" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employer_userId_key" ON "public"."Employer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_employeeId_key" ON "public"."Employer"("employeeId");

-- AddForeignKey
ALTER TABLE "public"."Employer" ADD CONSTRAINT "Employer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

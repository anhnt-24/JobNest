-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "employerId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "public"."Employer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

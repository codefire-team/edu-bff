-- CreateTable
CREATE TABLE "Essays" (
    "id" TEXT NOT NULL,
    "raw_content" TEXT,
    "url" TEXT NOT NULL,
    "feedback" JSONB,
    "final_feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Essays_pkey" PRIMARY KEY ("id")
);

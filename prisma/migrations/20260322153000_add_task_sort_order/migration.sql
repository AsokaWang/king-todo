-- AlterTable
ALTER TABLE `Task` ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `Task_spaceId_listId_sortOrder_idx` ON `Task`(`spaceId`, `listId`, `sortOrder`);

ALTER TABLE `List`
  ADD COLUMN `parentId` VARCHAR(191) NULL;

CREATE INDEX `List_spaceId_parentId_idx` ON `List`(`spaceId`, `parentId`);

ALTER TABLE `List`
  ADD CONSTRAINT `List_parentId_fkey`
  FOREIGN KEY (`parentId`) REFERENCES `List`(`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

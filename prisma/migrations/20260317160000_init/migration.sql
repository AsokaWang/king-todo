-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `image` VARCHAR(191) NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `timezone` VARCHAR(191) NOT NULL DEFAULT 'Asia/Shanghai',
    `locale` VARCHAR(191) NOT NULL DEFAULT 'zh-CN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalSpace` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `themePreference` VARCHAR(191) NOT NULL DEFAULT 'system',
    `weekStartsOn` INTEGER NOT NULL DEFAULT 1,
    `defaultView` VARCHAR(191) NOT NULL DEFAULT 'today',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PersonalSpace_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `session_token_key`(`token`),
    INDEX `session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `accessToken` TEXT NULL,
    `refreshToken` TEXT NULL,
    `idToken` TEXT NULL,
    `accessTokenExpiresAt` DATETIME(3) NULL,
    `refreshTokenExpiresAt` DATETIME(3) NULL,
    `scope` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `account_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `verification_identifier_idx`(`identifier`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List` (
    `id` VARCHAR(191) NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `List_spaceId_name_key`(`spaceId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tag_spaceId_name_key`(`spaceId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,
    `listId` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('todo', 'in_progress', 'done', 'archived') NOT NULL DEFAULT 'todo',
    `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    `source` ENUM('manual', 'quick_add', 'ai', 'import') NOT NULL DEFAULT 'manual',
    `startAt` DATETIME(3) NULL,
    `dueAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `estimatedMinutes` INTEGER NULL,
    `actualMinutes` INTEGER NOT NULL DEFAULT 0,
    `timeEntryCount` INTEGER NOT NULL DEFAULT 0,
    `lastTimerStartedAt` DATETIME(3) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Task_spaceId_status_idx`(`spaceId`, `status`),
    INDEX `Task_spaceId_dueAt_idx`(`spaceId`, `dueAt`),
    INDEX `Task_spaceId_startAt_idx`(`spaceId`, `startAt`),
    INDEX `Task_spaceId_listId_updatedAt_idx`(`spaceId`, `listId`, `updatedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskTag` (
    `taskId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`taskId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reminder` (
    `id` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NOT NULL,
    `triggerAt` DATETIME(3) NOT NULL,
    `channel` ENUM('in_app', 'email') NOT NULL DEFAULT 'in_app',
    `status` ENUM('pending', 'sent', 'failed', 'cancelled') NOT NULL DEFAULT 'pending',
    `lastTriggeredAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecurrenceRule` (
    `id` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NOT NULL,
    `rrule` TEXT NOT NULL,
    `timezone` VARCHAR(191) NOT NULL,
    `nextOccurrenceAt` DATETIME(3) NULL,
    `skipCurrent` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RecurrenceRule_taskId_key`(`taskId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimeEntry` (
    `id` VARCHAR(191) NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL,
    `endedAt` DATETIME(3) NOT NULL,
    `durationSec` INTEGER NOT NULL,
    `entryType` ENUM('task', 'manual', 'break', 'other') NOT NULL DEFAULT 'task',
    `source` ENUM('timer', 'manual', 'system', 'import') NOT NULL DEFAULT 'timer',
    `isAutoGenerated` BOOLEAN NOT NULL DEFAULT true,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TimeEntry_spaceId_startedAt_idx`(`spaceId`, `startedAt`),
    INDEX `TimeEntry_taskId_startedAt_idx`(`taskId`, `startedAt`),
    INDEX `TimeEntry_spaceId_entryType_startedAt_idx`(`spaceId`, `entryType`, `startedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimerSession` (
    `id` VARCHAR(191) NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,
    `taskId` VARCHAR(191) NULL,
    `status` ENUM('idle', 'running', 'paused', 'completed', 'cancelled', 'error') NOT NULL DEFAULT 'idle',
    `mode` ENUM('task', 'focus', 'short_break', 'long_break') NOT NULL DEFAULT 'task',
    `startedAt` DATETIME(3) NULL,
    `pausedAt` DATETIME(3) NULL,
    `endedAt` DATETIME(3) NULL,
    `accumulatedSec` INTEGER NOT NULL DEFAULT 0,
    `clientSessionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TimerSession_clientSessionId_key`(`clientSessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AiReport` (
    `id` VARCHAR(191) NOT NULL,
    `spaceId` VARCHAR(191) NOT NULL,
    `reportType` ENUM('task_parse', 'weekly_recap', 'monthly_recap') NOT NULL,
    `status` ENUM('queued', 'running', 'completed', 'failed') NOT NULL DEFAULT 'queued',
    `rangeStart` DATETIME(3) NOT NULL,
    `rangeEnd` DATETIME(3) NOT NULL,
    `inputSnapshot` JSON NULL,
    `generatedContent` JSON NULL,
    `editedContent` JSON NULL,
    `model` VARCHAR(191) NULL,
    `requestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `AiReport_spaceId_reportType_status_idx`(`spaceId`, `reportType`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PersonalSpace` ADD CONSTRAINT `PersonalSpace_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `List` ADD CONSTRAINT `List_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `PersonalSpace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `PersonalSpace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Task` ADD CONSTRAINT `Task_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `PersonalSpace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Task` ADD CONSTRAINT `Task_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `TaskTag` ADD CONSTRAINT `TaskTag_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `TaskTag` ADD CONSTRAINT `TaskTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Reminder` ADD CONSTRAINT `Reminder_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `RecurrenceRule` ADD CONSTRAINT `RecurrenceRule_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `TimeEntry` ADD CONSTRAINT `TimeEntry_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `PersonalSpace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `TimeEntry` ADD CONSTRAINT `TimeEntry_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `TimerSession` ADD CONSTRAINT `TimerSession_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `PersonalSpace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `TimerSession` ADD CONSTRAINT `TimerSession_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `AiReport` ADD CONSTRAINT `AiReport_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `PersonalSpace`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

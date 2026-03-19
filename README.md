# King Todo

`King Todo` 是一个面向个人用户的 `任务管理 + 日历规划 + 时间记录 + AI 助手` 一体化工作台。

当前仓库已进入 `P2 技术架构与工程搭建` 阶段，当前已落地：

- `Next.js 16` + `React 19` + `TypeScript`
- `Tailwind CSS`
- `Prisma` + `MySQL`
- `Better Auth` 基础鉴权
- `App Router` 三栏工作台布局
- 任务、时间记录、主题、AI 助手基础能力

## 当前目录

- `app/`：路由、布局、页面入口
- `src/components/`：基础组件与业务组件
- `src/features/`：按业务域拆分的前端/应用层
- `src/server/`：数据库、服务、校验、错误与可观测性
- `prisma/`：数据库 schema、migrations、seed
- `doc/`：产品、设计、研发、测试与发布文档

## 本地启动

### 1. 安装依赖

```bash
corepack pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，并至少补齐：

- `APP_URL`
- `DATABASE_URL`
- `DIRECT_DATABASE_URL`

### 3. 生成 Prisma Client

```bash
corepack pnpm exec prisma generate
```

### 4. 执行迁移

```bash
corepack pnpm exec prisma migrate deploy
```

### 5. 启动开发环境

```bash
corepack pnpm dev
```

## 常用命令

```bash
corepack pnpm dev
corepack pnpm build
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm db:generate
corepack pnpm db:migrate
corepack pnpm db:seed
```

## 当前已落地内容

- 鉴权主链：登录、注册、退出、路由保护、会话接口
- 任务主链：任务列表、任务详情、任务搜索、任务草案写入、清单树、多级清单基础
- 时间主链：开始/暂停/继续/结束计时、时间记录沉淀、当前计时条
- 主题系统：亮色 `12` 组 + 暗色 `12` 组主题预设
- AI 助手：读取模型配置，支持普通对话与“生成任务草案”

## 今晚更新

- 清单侧边栏重做：靠近滴答清单的清单层级、行态、悬浮操作与展开交互
- 清单创建体验升级：名称、图标、颜色、上级清单选择统一收敛到创建弹窗内
- 自研 `emoji` 选择器：移除第三方 `picker` 依赖，改为项目内置数据源 `src/data/emojis.ts`
- 清单颜色体系扩展：固定色扩展到 `19` 个，补充“多彩”入口、推荐色系与自定义颜色
- 上级清单选择重做：改为自定义下拉，只展示一级清单，交互与样式统一到当前弹层体系
- 清单数据链路修正：补强 `emoji / parentId / color` 归一化与父子层级校验，修复创建/编辑异常
- 数据与脚本补充：新增清单相关接口、迁移、种子脚本与本地 emoji 数据文件

## 下一步

- 完善 AI 助手到真实任务拆解工作流
- 继续增强多级清单、四象限与日历视图
- 补测试基线与更多生产化配置

## 说明

- 当前使用 `pnpm`
- 当前默认数据库配置为 `MySQL`
- `doc/` 目录已加入 `.gitignore`

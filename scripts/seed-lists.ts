import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 获取第一个用户的空间
  const user = await prisma.user.findFirst({
    include: { personalSpace: true }
  })

  if (!user?.personalSpace) {
    console.log('No user or personal space found')
    return
  }

  const spaceId = user.personalSpace.id

  // 创建清单
  const lists = [
    { name: '工作', color: '#e06d5d', parentId: null },
    { name: '生活', color: '#5fa38c', parentId: null },
    { name: '你好', color: '#e06d5d', parentId: null },
  ]

  for (const listData of lists) {
    const existing = await prisma.list.findFirst({
      where: {
        spaceId,
        name: listData.name,
      }
    })

    if (!existing) {
      await prisma.list.create({
        data: {
          ...listData,
          spaceId,
          sortOrder: 0
        }
      })
    }
  }

  // 获取创建的清单
  const createdLists = await prisma.list.findMany({
    where: { spaceId }
  })

  console.log('Created lists:', createdLists)

  // 创建一些任务
  const workList = createdLists.find(l => l.name === '工作')
  const lifeList = createdLists.find(l => l.name === '生活')
  const helloList = createdLists.find(l => l.name === '你好')

  if (workList) {
    await prisma.task.createMany({
      data: [
        { spaceId, listId: workList.id, title: 'NPP 上游', priority: 'high', status: 'todo' },
        { spaceId, listId: workList.id, title: 'NPP MSAT 离线数采', priority: 'medium', status: 'in_progress' },
        { spaceId, listId: workList.id, title: 'CDP 16 自动化取...', priority: 'low', status: 'todo' },
        { spaceId, listId: workList.id, title: 'CDP 18 AKTA自动化', priority: 'medium', status: 'done' },
      ]
    })
  }

  if (helloList) {
    await prisma.task.create({
      data: { spaceId, listId: helloList.id, title: 'C1 榆林创新院', priority: 'high', status: 'todo' }
    })
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

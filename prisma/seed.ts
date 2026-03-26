import { auth } from "../src/lib/auth"
import { prisma } from "../src/server/db/client"
import { ensureUserSpace } from "../src/server/db/bootstrap"

const demoPassword = process.env.DEMO_ACCOUNT_PASSWORD || "Password123!"

const testAccounts = [
  {
    name: "Demo Admin",
    email: "demo-admin@kingtodo.local",
    password: demoPassword,
  },
  {
    name: "Demo User",
    email: "demo-user@kingtodo.local",
    password: demoPassword,
  },
  {
    name: "Demo Planner",
    email: "demo-planner@kingtodo.local",
    password: demoPassword,
  },
]

async function seedAccounts() {
  for (const account of testAccounts) {
    const existingUser = await prisma.user.findUnique({
      where: { email: account.email },
    })

    if (!existingUser) {
      await auth.api.signUpEmail({
        body: {
          name: account.name,
          email: account.email,
          password: account.password,
        },
      })
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { email: account.email },
    })

    await ensureUserSpace({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    })
  }
}

async function main() {
  await seedAccounts()

  console.log("Seeded test accounts:")
  for (const account of testAccounts) {
    console.log(`- ${account.email} / ${account.password}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

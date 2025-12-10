import { db } from "@/drizzle/db"
import { user } from "@/drizzle/db/schema"
import { eq } from "drizzle-orm"

async function checkDevAccounts() {
  console.log("🔍 개발용 계정 확인 중...\n")

  const devEmails = ["dev@test.com", "designer@test.com"]

  for (const email of devEmails) {
    try {
      const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1)

      if (existingUser && existingUser.length > 0) {
        console.log(`✅ ${email}`)
        console.log(`   ID: ${existingUser[0].id}`)
        console.log(`   Name: ${existingUser[0].name}`)
        console.log(`   Email Verified: ${existingUser[0].emailVerified}`)
        console.log(`   Role: ${existingUser[0].role || "user"}`)
      } else {
        console.log(`❌ ${email} - 계정이 존재하지 않습니다`)
      }
      console.log()
    } catch (error) {
      console.error(`❌ ${email} 확인 중 에러:`, error)
    }
  }

  console.log("\n💡 계정이 없다면 다음 명령어로 생성하세요:")
  console.log("   bun scripts/create-dev-accounts.ts")
}

checkDevAccounts()
  .then(() => {
    console.log("✅ 확인 완료")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ 에러:", error)
    process.exit(1)
  })

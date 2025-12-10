import { db } from "@/drizzle/db"

import { auth } from "@/lib/auth"

// 개발용 계정 생성 (간단한 비밀번호 포함)
const DEV_ACCOUNTS = [
  {
    email: "dev@test.com",
    password: "123456",
    name: "김개발 (관리자)",
    role: "admin",
  },
  {
    email: "designer@test.com",
    password: "123456",
    name: "이디자이너",
    role: "user",
  },
  {
    email: "founder@test.com",
    password: "123456",
    name: "박창업",
    role: "user",
  },
  {
    email: "marketer@test.com",
    password: "123456",
    name: "최마케터",
    role: "user",
  },
]

async function createDevAccounts() {
  console.log("🔐 개발용 계정 생성 시작...")

  if (process.env.NODE_ENV === "production") {
    console.error("❌ 프로덕션 환경에서는 실행할 수 없습니다!")
    process.exit(1)
  }

  try {
    for (const account of DEV_ACCOUNTS) {
      console.log(`\n👤 계정 생성 중: ${account.email}`)

      try {
        // Better Auth를 사용하여 계정 생성
        await auth.api.signUpEmail({
          body: {
            email: account.email,
            password: account.password,
            name: account.name,
            // @ts-ignore
            role: account.role,
            emailVerified: true,
          },
        })

        console.log(`✅ ${account.email} 생성 완료`)
      } catch (error: any) {
        if (error.message?.includes("already exists")) {
          console.log(`ℹ️  ${account.email} 이미 존재함 (건너뛰기)`)
        } else {
          console.error(`❌ ${account.email} 생성 실패:`, error.message)
        }
      }
    }

    console.log("\n🎉 개발용 계정 설정 완료!")
    console.log("\n📝 로그인 정보:")
    console.log("   이메일: dev@test.com (또는 위의 다른 이메일)")
    console.log("   비밀번호: 123456")
  } catch (error) {
    console.error("❌ 에러 발생:", error)
    throw error
  }
}

// 실행
createDevAccounts()
  .then(() => {
    console.log("\n✅ 계정 생성 스크립트 완료")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ 계정 생성 스크립트 실패:", error)
    process.exit(1)
  })

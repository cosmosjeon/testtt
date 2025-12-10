// Dev 로그인 API 테스트
async function testDevLogin() {
  console.log("🧪 Dev 로그인 API 테스트 시작...\n")

  const testEmail = "dev@test.com"

  try {
    const response = await fetch("http://localhost:3000/api/dev-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: testEmail }),
    })

    console.log("응답 상태:", response.status, response.statusText)

    const data = await response.json()
    console.log("응답 데이터:", JSON.stringify(data, null, 2))

    if (response.ok) {
      console.log("\n✅ API 테스트 성공!")
      console.log("   User ID:", data.userId)
      console.log("   Email:", data.email)
      console.log("   Redirect:", data.redirectTo)

      // 쿠키 확인
      const setCookie = response.headers.get("set-cookie")
      if (setCookie) {
        console.log("\n🍪 세션 쿠키 설정됨:")
        console.log("   ", setCookie.substring(0, 100) + "...")
      } else {
        console.log("\n⚠️  세션 쿠키가 설정되지 않음!")
      }
    } else {
      console.log("\n❌ API 테스트 실패:", data.error)
    }
  } catch (error) {
    console.error("\n❌ 에러 발생:", error)
  }
}

testDevLogin()

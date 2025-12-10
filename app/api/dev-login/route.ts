import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { db } from "@/drizzle/db"
import { session, user } from "@/drizzle/db/schema"
import { generateId } from "better-auth"
import { eq } from "drizzle-orm"

// ============================================
// 🚧 DEV ONLY - Remove before production! 🚧
// ============================================
// 개발 환경에서만 사용 가능한 간단 로그인 API
// 프로덕션 배포 전에 이 파일 전체를 삭제하세요.
//
// 제거 방법:
// 1. 이 파일 삭제: app/api/dev-login/route.ts
// 2. sign-in-form.tsx에서 dev login 버튼 제거 (LINE 132-161)
// ============================================

export async function POST(req: Request) {
  // 프로덕션에서는 비활성화
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 })
  }

  try {
    const { email } = await req.json()

    // 이메일로 사용자 찾기
    const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1)

    if (!existingUser || existingUser.length === 0) {
      return NextResponse.json({ error: "User not found. Please sign up first." }, { status: 404 })
    }

    const userId = existingUser[0].id

    // 세션 생성 (better-auth 스키마 따름)
    const sessionToken = generateId()
    const sessionId = generateId()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30일 후 만료

    await db.insert(session).values({
      id: sessionId,
      userId,
      token: sessionToken,
      expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
      ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "dev",
      userAgent: req.headers.get("user-agent") || "dev",
    })

    // 쿠키 설정
    const cookieStore = await cookies()
    cookieStore.set("better-auth.session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    })

    return NextResponse.json({
      success: true,
      message: "Dev login successful",
      userId,
      email,
      redirectTo: "/",
    })
  } catch (error) {
    console.error("Dev login error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to login" },
      { status: 500 },
    )
  }
}

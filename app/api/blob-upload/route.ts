import { NextRequest, NextResponse } from "next/server"

import { put } from "@vercel/blob"

import { auth } from "@/lib/auth"

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB

export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 폼 데이터 파싱
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const type = formData.get("type") as string | null // 'logo' or 'product'

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // 파일 타입 검증
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP, and GIF allowed." },
        { status: 400 },
      )
    }

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File exceeds 1MB limit. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
        },
        { status: 400 },
      )
    }

    // 고유 파일명 생성
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = file.name.split(".").pop()
    const filename = `${type}/${session.user.id}/${timestamp}-${randomString}.${extension}`

    // Vercel Blob에 업로드
    const blob = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      size: file.size,
      contentType: file.type,
    })
  } catch (error) {
    console.error("Blob upload error:", error)
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 })
  }
}

export const runtime = "edge" // Optional: for lower latency

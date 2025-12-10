import { NextResponse } from "next/server"

import { db } from "@/drizzle/db"
import { project } from "@/drizzle/db/schema"
import { eq } from "drizzle-orm"

export async function POST(request: Request) {
  try {
    const { projectId, amount, launchType } = await request.json()

    // 프로젝트 존재 여부 확인
    const [projectData] = await db.select().from(project).where(eq(project.id, projectId)).limit(1)

    if (!projectData) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // 결제 초기화 데이터 반환
    // 클라이언트가 Toss Payments SDK를 사용하여 결제 진행
    return NextResponse.json({
      success: true,
      orderId: projectId,
      orderName: `${projectData.name} - ${launchType} Launch`,
      amount: amount,
      customerName: projectData.name,
    })
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

import { db } from "@/drizzle/db"
import { project } from "@/drizzle/db/schema"
import { eq } from "drizzle-orm"

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY!
const TOSS_API_BASE_URL = process.env.TOSS_API_BASE_URL || "https://api.tosspayments.com"

export async function POST(request: Request) {
  try {
    const { paymentKey, orderId, amount } = await request.json()

    // 금액이 우리 기록과 일치하는지 확인
    const [projectData] = await db.select().from(project).where(eq(project.id, orderId)).limit(1)

    if (!projectData) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Toss Payments API로 결제 승인 요청
    const authHeader = `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString("base64")}`

    const confirmResponse = await fetch(`${TOSS_API_BASE_URL}/v1/payments/confirm`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    })

    if (!confirmResponse.ok) {
      const errorData = await confirmResponse.json()
      console.error("Toss payment confirmation failed:", errorData)
      return NextResponse.json(
        { error: "Payment confirmation failed", details: errorData },
        { status: confirmResponse.status },
      )
    }

    const paymentData = await confirmResponse.json()

    return NextResponse.json({
      success: true,
      payment: paymentData,
      projectId: orderId,
      projectSlug: projectData.slug,
    })
  } catch (error) {
    console.error("Payment confirmation error:", error)
    return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 })
  }
}

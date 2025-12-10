import { NextResponse } from "next/server"

import { db } from "@/drizzle/db"
import { project } from "@/drizzle/db/schema"
import { eq } from "drizzle-orm"

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY!
const TOSS_API_BASE_URL = process.env.TOSS_API_BASE_URL || "https://api.tosspayments.com"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")
    const paymentKey = searchParams.get("paymentKey")

    if (!orderId || !paymentKey) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    // Toss Payments에서 결제 상태 조회
    const authHeader = `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString("base64")}`

    const paymentResponse = await fetch(`${TOSS_API_BASE_URL}/v1/payments/${paymentKey}`, {
      headers: {
        Authorization: authHeader,
      },
    })

    if (!paymentResponse.ok) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    const paymentData = await paymentResponse.json()

    // 프로젝트 데이터 가져오기
    const [projectData] = await db
      .select({
        id: project.id,
        slug: project.slug,
        launchStatus: project.launchStatus,
      })
      .from(project)
      .where(eq(project.id, orderId))

    if (!projectData) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      status:
        paymentData.status === "DONE"
          ? "complete"
          : paymentData.status === "WAITING_FOR_DEPOSIT"
            ? "pending"
            : "failed",
      projectId: projectData.id,
      projectSlug: projectData.slug,
      launchStatus: projectData.launchStatus,
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}

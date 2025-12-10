import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

import { db } from "@/drizzle/db"
import { launchQuota, launchStatus, launchType, project } from "@/drizzle/db/schema"
import { eq, sql } from "drizzle-orm"

const webhookSecret = process.env.TOSS_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("toss-signature") as string

    // Toss Payments 웹훅 서명 검증 (HMAC-SHA256)
    if (webhookSecret) {
      const crypto = require("crypto")
      const computedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex")

      if (computedSignature !== signature) {
        console.error("Webhook signature verification failed")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const event = JSON.parse(body)

    // 결제 확인 이벤트 처리
    if (event.eventType === "PAYMENT_CONFIRMED") {
      const { orderId, status, paymentKey } = event.data

      // orderId = projectId
      const projectId = orderId

      if (status === "DONE") {
        // 결제 성공
        const [projectData] = await db
          .select({
            id: project.id,
            launchType: project.launchType,
            scheduledLaunchDate: project.scheduledLaunchDate,
          })
          .from(project)
          .where(eq(project.id, projectId))

        if (!projectData) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        if (!projectData.scheduledLaunchDate) {
          return NextResponse.json({ error: "Project data incomplete" }, { status: 400 })
        }

        // 프로젝트 상태를 SCHEDULED로 업데이트
        await db
          .update(project)
          .set({
            launchStatus: launchStatus.SCHEDULED,
            featuredOnHomepage: projectData.launchType === launchType.PREMIUM_PLUS,
            updatedAt: new Date(),
          })
          .where(eq(project.id, projectId))

        // 런치 쿼터 업데이트
        const launchDate = projectData.scheduledLaunchDate
        const quotaResult = await db
          .select()
          .from(launchQuota)
          .where(eq(launchQuota.date, launchDate))
          .limit(1)

        if (quotaResult.length === 0) {
          await db.insert(launchQuota).values({
            id: crypto.randomUUID(),
            date: launchDate,
            freeCount: 0,
            premiumCount: projectData.launchType === launchType.PREMIUM ? 1 : 0,
            premiumPlusCount: projectData.launchType === launchType.PREMIUM_PLUS ? 1 : 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        } else {
          await db
            .update(launchQuota)
            .set({
              premiumCount:
                projectData.launchType === launchType.PREMIUM
                  ? sql`${launchQuota.premiumCount} + 1`
                  : launchQuota.premiumCount,
              premiumPlusCount:
                projectData.launchType === launchType.PREMIUM_PLUS
                  ? sql`${launchQuota.premiumPlusCount} + 1`
                  : launchQuota.premiumPlusCount,
              updatedAt: new Date(),
            })
            .where(eq(launchQuota.id, quotaResult[0].id))
        }

        revalidatePath(`/projects`)
        return NextResponse.json({ success: true })
      } else {
        // 결제 실패
        await db
          .update(project)
          .set({
            launchStatus: launchStatus.PAYMENT_FAILED,
            updatedAt: new Date(),
          })
          .where(eq(project.id, projectId))

        return NextResponse.json({ success: true })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

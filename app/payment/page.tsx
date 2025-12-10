"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { LAUNCH_SETTINGS } from "@/lib/constants"
import { useTossPayments } from "@/lib/hooks/use-toss-payments"
import { Button } from "@/components/ui/button"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("projectId")
  const launchType = searchParams.get("launchType")
  const [customerKey] = useState(() => crypto.randomUUID())

  const { paymentWidget, isLoading, error } = useTossPayments(customerKey)
  const paymentMethodsRef = useRef<HTMLDivElement>(null)
  const [isPaymentReady, setIsPaymentReady] = useState(false)

  // KRW 금액 (1 USD = 1100 KRW 가정)
  const amount = launchType === "premium" ? LAUNCH_SETTINGS.PREMIUM_PRICE * 1100 : 15000

  useEffect(() => {
    if (!paymentWidget || !paymentMethodsRef.current) return

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-methods",
      { value: amount, currency: "KRW" },
      { variantKey: "DEFAULT" },
    )

    paymentMethodsWidget.on("ready", () => {
      setIsPaymentReady(true)
    })
  }, [paymentWidget, amount])

  const handlePayment = async () => {
    if (!paymentWidget) return

    try {
      // 결제 주문 생성
      const createResponse = await fetch("/api/payment/toss/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          amount,
          launchType,
        }),
      })

      const { orderId, orderName } = await createResponse.json()

      // 결제 요청
      await paymentWidget.requestPayment({
        orderId: orderId,
        orderName: orderName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      })
    } catch (err) {
      console.error("Payment request failed:", err)
      alert("결제 요청에 실패했습니다. 다시 시도해주세요.")
    }
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl py-10">
        <div className="text-center">
          <h1 className="text-destructive text-2xl font-bold">결제 오류</h1>
          <p className="mt-4">{error}</p>
          <Button onClick={() => router.push("/")} className="mt-6">
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="mb-6 text-2xl font-bold">결제 진행</h1>

      <div className="mb-6">
        <div className="bg-muted/30 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">결제 금액</span>
            <span className="text-2xl font-bold">{amount.toLocaleString()}원</span>
          </div>
          <div className="text-muted-foreground mt-2 text-sm">
            {launchType === "premium" ? "프리미엄 런칭" : "프리미엄 플러스 런칭"}
          </div>
        </div>
      </div>

      <div id="payment-methods" ref={paymentMethodsRef} className="mb-6" />

      <Button onClick={handlePayment} disabled={!isPaymentReady || isLoading} className="w-full">
        {isLoading ? "로딩 중..." : `${amount.toLocaleString()}원 결제하기`}
      </Button>

      <div className="text-muted-foreground mt-4 text-center text-sm">
        결제 후 자동으로 프로젝트 페이지로 이동합니다
      </div>
    </div>
  )
}

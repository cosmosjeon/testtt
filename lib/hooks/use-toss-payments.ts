"use client"

import { useEffect, useState } from "react"

import { loadPaymentWidget } from "@tosspayments/tosspayments-sdk"

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!

export function useTossPayments(customerKey: string) {
  const [paymentWidget, setPaymentWidget] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWidget() {
      try {
        const widget = await loadPaymentWidget(clientKey, customerKey)
        setPaymentWidget(widget)
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to load payment widget:", err)
        setError("결제 위젯을 로드하는데 실패했습니다.")
        setIsLoading(false)
      }
    }

    loadWidget()
  }, [customerKey])

  return { paymentWidget, isLoading, error }
}

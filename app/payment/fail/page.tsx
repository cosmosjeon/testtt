"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { RiCloseCircleLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"

export default function PaymentFailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const message = searchParams.get("message")

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <div className="text-center">
        <RiCloseCircleLine className="text-destructive mx-auto h-16 w-16" />
        <h1 className="mt-4 text-2xl font-bold">결제 실패</h1>
        {message && (
          <p className="text-muted-foreground mt-2">오류: {decodeURIComponent(message)}</p>
        )}
        {code && <p className="text-muted-foreground mt-1 text-sm">오류 코드: {code}</p>}
        <div className="mt-6 flex justify-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            다시 시도
          </Button>
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    </div>
  )
}

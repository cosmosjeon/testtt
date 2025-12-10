import { SponsorCard } from "@/components/home/sponsor-card"

export function SponsorCards() {
  return (
    <>
      <SponsorCard
        name="스폰서 A"
        url="https://example.com"
        imageUrl="/logo.svg"
        description="여기에 스폰서 설명이 들어갑니다"
      />
      <SponsorCard
        name="스폰서 B"
        url="https://example.com"
        imageUrl="/logo.svg"
        description="여기에 스폰서 설명이 들어갑니다"
      />
      <SponsorCard
        name="스폰서 C"
        url="https://example.com"
        imageUrl="/logo.svg"
        description="여기에 스폰서 설명이 들어갑니다"
      />
    </>
  )
}

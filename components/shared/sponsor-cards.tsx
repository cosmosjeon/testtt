import { SponsorCard } from "@/components/home/sponsor-card"

export function SponsorCards() {
  return (
    <>
      <SponsorCard
        name="스폰서 A"
        url="https://example.com"
        imageUrl="https://placehold.co/200x200/e2e8f0/64748b?text=Sponsor+A"
        description="여기에 스폰서 설명이 들어갑니다"
      />
      <SponsorCard
        name="스폰서 B"
        url="https://example.com"
        imageUrl="https://placehold.co/200x200/e2e8f0/64748b?text=Sponsor+B"
        description="여기에 스폰서 설명이 들어갑니다"
      />
      <SponsorCard
        name="스폰서 C"
        url="https://example.com"
        imageUrl="https://placehold.co/200x200/e2e8f0/64748b?text=Sponsor+C"
        description="여기에 스폰서 설명이 들어갑니다"
      />
    </>
  )
}

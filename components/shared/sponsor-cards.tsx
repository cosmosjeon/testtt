import { SponsorCard } from "@/components/home/sponsor-card"

export function SponsorCards() {
  return (
    <>
      <SponsorCard
        name="Outsome"
        url="https://outsome.com"
        imageUrl="/outsome_logo.jpg"
        description="혁신적인 솔루션을 제공하는 스타트업"
      />
      <SponsorCard
        name="Zero to 100"
        url="https://zero100.startup"
        imageUrl="/zero100.webp"
        description="스타트업 성장 가속 프로그램"
      />
      <SponsorCard
        name="성균관대학교"
        url="https://www.skku.edu"
        imageUrl="/성균관대.jpg"
        description="미래를 선도하는 글로벌 명문대학"
      />
    </>
  )
}

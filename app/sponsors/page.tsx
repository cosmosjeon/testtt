import Link from "next/link"

import { RiCheckboxCircleFill } from "@remixicon/react"

import { SPONSORSHIP_SLOTS } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { getLast30DaysPageviews, getLast30DaysVisitors } from "@/app/actions/plausible"

export const metadata = {
  title: "스폰서 - Open-Launch",
  description: "Open-Launch를 후원하고 제품이나 서비스의 가시성을 높이세요.",
}

export default async function SponsorsPage() {
  const remainingSlots = SPONSORSHIP_SLOTS.TOTAL - SPONSORSHIP_SLOTS.USED
  const [visitors, pageviews] = await Promise.all([
    getLast30DaysVisitors(),
    getLast30DaysPageviews(),
  ])

  const generalSponsorshipBenefits = [
    "홈페이지 사이드바에 노출됩니다.",
    "모든 프로젝트 페이지에서 표시됩니다.",
    "개발자와 기술 애호가들에게 도달합니다.",
    "귀하의 웹사이트로 직접 연결됩니다.",
  ]

  const faqItems = [
    {
      question: "스폰서십이 언제 활성화되나요?",
      answer: "일반적으로 결제 확인 후 몇 시간 이내에 스폰서십이 활성화됩니다.",
    },
    {
      question: "어떤 종류의 제품이나 서비스를 홍보할 수 있나요?",
      answer:
        "개발자, 기술 애호가, 스타트업 및 SaaS 비즈니스와 관련된 제품 및 서비스의 스폰서십을 환영합니다. 저희 청중에게 적합하지 않은 스폰서십은 거부할 수 있는 권리를 보유합니다.",
    },

    {
      question: "이미지/로고 사양은 어떻게 되나요?",
      answer:
        "정사각형 로고(예: PNG, JPG, SVG)를 제공해주세요. 선명도를 위해 최소 200px 너비를 권장합니다. 멋지게 보이도록 함께 작업하겠습니다.",
    },
    {
      question: "모든 스폰서십 슬롯이 찼다면 어떻게 하나요?",
      answer:
        "모든 슬롯이 현재 차 있다면, 대기자 명단에 추가되도록 저희에게 연락하실 수 있습니다. 슬롯이 사용 가능해지는 즉시 알려드리겠습니다.",
    },
  ]

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-2xl font-bold sm:text-3xl">스폰서 되기</h1>
        <p className="text-muted-foreground mx-auto max-w-xl text-sm">
          Open-Launch를 후원하고 가시성을 높이세요. 제한된 스폰서십 슬롯으로 최대의 효과를 얻으세요.
        </p>
        <p className="text-primary text-center text-sm font-medium">
          현재 <span className="font-bold">{remainingSlots}</span>개의 슬롯이 사용 가능합니다!
        </p>
      </div>
      {/* General Benefits & Statistics Section */}
      <div className="mx-auto mb-4 max-w-3xl">
        <div className="bg-background/70 rounded-lg border p-5 md:p-6">
          <h2 className="mb-5 text-center text-xl font-semibold">주요 혜택 및 도달 범위</h2>
          <div className="mx-auto max-w-md">
            <ul className="mb-2 space-y-2 text-sm md:text-base">
              {generalSponsorshipBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <RiCheckboxCircleFill className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex items-start gap-3">
                <RiCheckboxCircleFill className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                <span>
                  <strong>{visitors?.toLocaleString() || "N/A"}</strong> 순 방문자 수{" "}
                  <span className="text-muted-foreground text-xs">(최근 30일)</span>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <RiCheckboxCircleFill className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                <span>
                  <strong>{pageviews?.toLocaleString() || "N/A"}</strong> 페이지 뷰{" "}
                  <span className="text-muted-foreground text-xs">(최근 30일)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsorship Options  */}
      <div className="mx-auto mb-12">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border md:grid-cols-10">
          {/* Weekly Option */}
          <div className="flex h-full flex-col p-6 md:col-span-5">
            <div className="flex-grow">
              <h3 className="mb-2 text-lg font-medium">주간 스포트라이트</h3>
              <div className="mb-3 text-3xl font-bold">
                $30
                <span className="text-muted-foreground text-base font-normal"> / 주</span>
              </div>
              <p className="text-muted-foreground mb-4 text-xs">
                단기 캠페인이나 특정 공지사항에 이상적입니다.
              </p>
              <ul className="mb-5 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-muted-foreground h-4 w-4" />
                  <span>7일간 노출</span>
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-muted-foreground h-4 w-4" />
                  <span>빠르고 쉬운 설정</span>
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-muted-foreground h-4 w-4" />
                  <span>홈페이지 및 프로젝트 페이지 표시</span>
                </li>
              </ul>
            </div>
            <div className="mt-auto pt-3">
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="mailto:contact@open-launch.com?subject=Weekly%20Sponsorship%20Inquiry">
                  일주일 스폰서십
                </Link>
              </Button>
            </div>
          </div>

          {/* Monthly Option */}
          <div className="bg-muted/50 flex h-full flex-col border-t p-6 md:col-span-5 md:border-t-0 md:border-l">
            <div className="flex-grow">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-primary text-lg font-medium">월간 파트너십</h3>
                <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  최고 가치
                </span>
              </div>
              <div className="text-primary mb-3 text-3xl font-bold">
                $99
                <span className="text-primary/90 text-base font-normal"> / 월</span>
              </div>
              <p className="text-muted-foreground mb-4 text-xs">
                지속적인 가시성과 최고의 가치로 노출을 극대화하세요.
              </p>
              <ul className="mb-5 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                  <span className="font-medium">1개월간 노출</span>
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                  <span className="font-medium">빠르고 쉬운 설정</span>
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                  <span className="font-medium">홈페이지 및 프로젝트 페이지 표시</span>
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                  <span className="font-medium">가장 비용 효율적인 솔루션</span>
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                  <span className="font-medium">우선 슬롯 고려</span>
                </li>
              </ul>
            </div>
            <div className="mt-auto pt-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="mailto:contact@open-launch.com?subject=Monthly%20Sponsorship%20Inquiry">
                  한 달 스폰서십
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl">자주 묻는 질문</h2>{" "}
        <Accordion type="single" collapsible className="w-full -space-y-px">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="py-3 text-left text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-3 text-sm">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

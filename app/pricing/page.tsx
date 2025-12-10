/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

import { db } from "@/drizzle/db"
import { seoArticle } from "@/drizzle/db/schema"
import { RiArticleLine, RiCheckboxCircleFill, RiInformationLine, RiLinkM } from "@remixicon/react"
import { desc } from "drizzle-orm"
import { Calendar, Clock } from "lucide-react"

import { LAUNCH_LIMITS, LAUNCH_SETTINGS } from "@/lib/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const metadata = {
  title: "가격 - Open-Launch",
  description: "프로젝트 론칭에 완벽한 플랜을 선택하세요",
}

const faqItems = [
  {
    id: "1",
    title: "론칭은 언제 진행되나요?",
    content: `모든 론칭은 UTC 기준 오전 8시에 진행됩니다. 품질있는 노출을 보장하기 위해 매일 제한된 수의 프로젝트를 론칭합니다.`,
  },
  {
    id: "2",
    title: "매일 몇 개의 프로젝트가 론칭되나요?",
    content: `매일 최대 ${LAUNCH_LIMITS.FREE_DAILY_LIMIT}개의 무료 프로젝트와 ${LAUNCH_LIMITS.PREMIUM_DAILY_LIMIT}개의 프리미엄 프로젝트를 론칭합니다.`,
  },
  {
    id: "3",
    title: "얼마나 미리 론칭을 예약할 수 있나요?",
    content: `무료 사용자는 최대 ${LAUNCH_SETTINGS.MAX_DAYS_AHEAD}일, 프리미엄 사용자는 최대 ${LAUNCH_SETTINGS.PREMIUM_MAX_DAYS_AHEAD}일 전에 예약할 수 있습니다.`,
  },
  {
    id: "4",
    title: "SEO 성장 패키지의 환불 정책은 어떻게 되나요?",
    content: `SEO 성장 패키지에 대한 환불은 제공하지 않습니다. 구매 후 서비스는 최종적이며 환불 불가합니다. 다만, 고객 만족을 위해 최선을 다하며 전체 과정에서 긴밀히 협력합니다.`,
  },
  {
    id: "5",
    title: "SEO 성장 패키지 콘텐츠는 어떻게 제작되나요?",
    content: `콘텐츠 제작 과정은 철저한 제품 테스트, 메모 작성, 스크린샷, 맞춤 일러스트레이션을 포함합니다. 제품 테스트 후 워크플로우 최적화를 위해 AI를 활용하지만, 모든 콘텐츠는 품질과 정확성을 보장하기 위해 인간 팀이 꼼꼼히 검토하고 편집하여 최종 완성합니다.`,
  },
]

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

async function getLatestReviews() {
  const reviews = await db.select().from(seoArticle).orderBy(desc(seoArticle.publishedAt)).limit(5)

  return reviews.map((review) => ({
    ...review,
    readingTime: calculateReadingTime(review.content),
  }))
}

export default async function PricingPage() {
  const latestReviews = await getLatestReviews()
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      {/* Domain Rating Badge */}
      <div className="mb-4 flex justify-center">
        <a href="https://frogdr.com/open-launch.com?utm_source=open-launch.com" target="_blank">
          {/* Light mode badge */}
          <img
            src="https://frogdr.com/open-launch.com/badge-white-sm.svg?round=1"
            alt="Monitor your Domain Rating with FrogDR"
            width="249"
            height="36"
            className="h-8 w-auto dark:hidden"
          />
          {/* Dark mode badge */}
          <img
            src="https://frogdr.com/open-launch.com/badge-dark-sm.svg?round=1"
            alt="Monitor your Domain Rating with FrogDR"
            width="249"
            height="36"
            className="hidden h-8 w-auto dark:block"
          />
        </a>
      </div>

      <div className="mb-4 text-center">
        <h1 className="mb-3 text-2xl font-bold sm:text-3xl">론칭 플랜 선택</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
          유연한 론칭 옵션으로 프로젝트가 받아야 할 가시성을 얻으세요. 모든 론칭은 UTC 기준 오전
          8시에 진행됩니다.
        </p>
      </div>

      {/* First row: Free and Premium */}
      <div className="mx-auto mb-4">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border md:grid-cols-10">
          {/* Free Launch Option */}
          <div className="flex h-full flex-col p-5 md:col-span-4">
            <div className="flex-grow">
              <h5 className="mb-2 text-base font-medium">무료 론칭</h5>
              <div className="mb-2 text-2xl font-bold">
                $0 <span className="text-muted-foreground text-sm font-normal">/론칭</span>
              </div>
              <p className="text-muted-foreground mb-3 text-xs">
                최대 {LAUNCH_SETTINGS.MAX_DAYS_AHEAD}일 예약 가능한 표준 론칭
              </p>

              <ul className="mb-5 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-muted-foreground h-4 w-4" />
                  <span>매일 {LAUNCH_LIMITS.FREE_DAILY_LIMIT}개 슬롯 제공</span>
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-muted-foreground h-4 w-4" />
                  <span>표준 론칭 대기열</span>
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="text-muted-foreground h-4 w-4" />
                  <span>홈페이지 등록</span>
                </li>
                <li className="flex items-start gap-2">
                  <RiCheckboxCircleFill className="text-muted-foreground mt-1 h-4 w-4" />
                  <div>
                    <span>다음 조건 시 Dofollow 백링크 제공:</span>
                    <div className="text-muted-foreground mt-1.5 space-y-1 text-xs">
                      <div>1. 일일 순위 상위 3위</div>
                      <div>2. 사이트에 저희 뱃지 표시</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-auto pt-3">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/projects/submit">무료 론칭</Link>
              </Button>
            </div>
          </div>

          {/* Premium Launch Option */}
          <div className="bg-muted/5 border-t p-5 md:col-span-6 md:border-t-0 md:border-l">
            <div className="flex h-full flex-col">
              <div className="flex-grow">
                <h5 className="mb-2 text-base font-medium">프리미엄 론칭</h5>
                <div className="mb-2 text-2xl font-bold">
                  ${LAUNCH_SETTINGS.PREMIUM_PRICE}{" "}
                  <span className="text-muted-foreground text-sm font-normal">/론칭</span>
                </div>
                <p className="text-muted-foreground mb-3 text-xs">더 빠른 론칭 날짜로 우선 예약</p>

                <ul className="mb-5 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                    <span className="font-semibold">무료 대기열 건너뛰기 - 우선 접근</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                    <span className="font-semibold">고권위 Dofollow 백링크 보장</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                    <span>매일 {LAUNCH_LIMITS.PREMIUM_DAILY_LIMIT}개 프리미엄 슬롯</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                    <span>더 빠른 론칭 날짜</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="text-primary h-4 w-4" />
                    <span>홈페이지 등록</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto pt-3">
                <Button size="sm" className="w-full" asChild>
                  <Link href="/projects/submit">프리미엄 시작하기</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second row: Article */}
      <div className="mx-auto mb-12 max-w-3xl">
        <div className="border-primary/20 bg-primary/5 rounded-lg border p-5">
          <div className="flex flex-col md:flex-row">
            <div className="mb-6 flex flex-col md:mb-0 md:w-2/5 md:border-r md:pr-6">
              <div className="flex-grow">
                <h5 className="mb-1 text-lg font-semibold">SEO 성장 패키지</h5>
                <div className="mb-4 flex flex-col gap-1">
                  <div className="flex items-baseline text-3xl font-bold">
                    ${LAUNCH_SETTINGS.ARTICLE_PRICE}
                    <span className="text-muted-foreground ml-2 text-base font-normal line-through">
                      $199
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 text-xs">
                  전용 SEO 아티클로 구글 랭킹 달성
                </p>
              </div>

              <div className="mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="w-full" variant="default">
                      SEO 성장 패키지 받기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto sm:max-w-lg">
                    <DialogHeader className="pb-6">
                      <DialogTitle className="text-xl font-semibold">SEO 성장 패키지</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        구글 랭킹을 위한 완벽한 SEO 솔루션
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Price */}
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          ${LAUNCH_SETTINGS.ARTICLE_PRICE}
                          <span className="text-muted-foreground ml-2 text-lg font-normal line-through">
                            $199
                          </span>
                        </div>
                      </div>

                      {/* What's included */}
                      <div>
                        <h3 className="mb-4 font-medium">포함 내용:</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="bg-primary/10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded">
                              <RiArticleLine className="text-primary h-3 w-3" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium">SEO 아티클</div>
                              <div className="text-muted-foreground text-xs">
                                맞춤 &ldquo;[제품명] 리뷰&rdquo; 콘텐츠
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="bg-primary/10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded">
                              <RiLinkM className="text-primary h-3 w-3" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium">프리미엄 론칭</div>
                              <div className="text-muted-foreground text-xs">
                                고권위 dofollow 백링크 포함
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Process */}
                      <div>
                        <h3 className="mb-4 font-medium">진행 과정:</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="bg-primary flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs font-medium text-white">
                              1
                            </div>
                            <div className="text-sm">결제 및 슬롯 확보</div>
                          </div>
                          <div className="flex gap-3">
                            <div className="bg-primary flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs font-medium text-white">
                              2
                            </div>
                            <div className="text-sm">
                              <div>24시간 내 연락</div>
                              <div className="text-muted-foreground text-xs">
                                제품 접근, 키워드, 세부사항
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="bg-primary flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs font-medium text-white">
                              3
                            </div>
                            <div className="text-sm">다음날 프리미엄 론칭</div>
                          </div>
                          <div className="flex gap-3">
                            <div className="bg-primary flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs font-medium text-white">
                              4
                            </div>
                            <div className="text-sm">5-7일 내 SEO 아티클 완성</div>
                          </div>
                        </div>
                      </div>

                      {/* Requirement */}
                      <div className="bg-muted/30 rounded p-3">
                        <div className="flex gap-2">
                          <RiInformationLine className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                          <div className="text-sm">
                            <span className="font-medium">필수사항:</span> 테스트용 무료 제품 접근
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <Button className="h-11 w-full" asChild>
                        <Link href={process.env.NEXT_PUBLIC_SEO_ARTICLE_LINK!} target="_blank">
                          SEO 패키지 받기 - ${LAUNCH_SETTINGS.ARTICLE_PRICE}
                        </Link>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="md:w-3/5 md:pl-6">
              <h6 className="mb-3 text-sm font-semibold">완전한 SEO 패키지 포함 내용:</h6>

              <div className="space-y-1">
                <div className="bg-primary/5 border-primary/20 rounded border p-2">
                  <div className="flex items-start gap-2">
                    <RiCheckboxCircleFill className="text-primary mt-0.5 h-4 w-4" />
                    <div>
                      <p className="text-sm font-semibold">전용 SEO 아티클</p>
                      <p className="text-muted-foreground text-xs">
                        <span className="text-primary/90 font-semibold">
                          &ldquo;[제품명] 리뷰&rdquo;
                        </span>{" "}
                        키워드 랭킹을 위한 맞춤 아티클
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 border-primary/20 rounded border p-2">
                  <div className="flex items-start gap-2">
                    <RiCheckboxCircleFill className="text-primary mt-0.5 h-4 w-4" />
                    <div>
                      <p className="text-sm font-semibold">프리미엄 론칭</p>
                      <p className="text-muted-foreground text-xs">
                        프리미엄 스팟 + 고권위 dofollow 백링크
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 border-primary/20 rounded border p-2">
                  <div className="flex items-start gap-2">
                    <RiCheckboxCircleFill className="text-primary mt-0.5 h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">구글 랭킹 전략</p>
                      <p className="text-muted-foreground text-xs">
                        검색 트래픽 확보를 위한 최적화 콘텐츠
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border-primary/20 rounded border p-2">
                  <div className="flex items-start gap-2">
                    <RiCheckboxCircleFill className="text-primary mt-0.5 h-4 w-4" />
                    <div>
                      <p className="text-sm font-medium">장기 SEO 가치</p>
                      <p className="text-muted-foreground text-xs">
                        지속적인 트래픽을 유도하는 콘텐츠
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Reviews Section */}
      {latestReviews.length > 0 && (
        <div className="mx-auto mb-12 max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-xl font-bold sm:text-2xl">최신 리뷰</h2>
            <p className="text-muted-foreground text-sm">
              고객을 위해 제작한 SEO 아티클 예시를 확인하세요
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {latestReviews.map((review) => (
                  <CarouselItem key={review.slug} className="pl-2 md:basis-1/2 md:pl-4">
                    <article className="group">
                      <Link
                        href={`/reviews/${review.slug}`}
                        className="bg-card hover:border-muted-foreground/20 block overflow-hidden rounded-2xl border"
                      >
                        {/* Review Image */}
                        <div className="bg-muted relative aspect-[16/9] overflow-hidden">
                          {review.image ? (
                            <img
                              src={review.image}
                              alt={review.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <div className="text-muted-foreground/30 text-4xl font-bold">
                                {review.title.charAt(0).toUpperCase()}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Review Content */}
                        <div className="px-6 py-4">
                          {/* Meta Information */}
                          <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <time dateTime={review.publishedAt.toISOString()}>
                                {formatDate(review.publishedAt)}
                              </time>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{review.readingTime}</span>
                            </div>
                          </div>

                          {/* Review Badge */}
                          <div className="mb-4">
                            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                              제품 리뷰
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-card-foreground group-hover:text-primary mb-2 line-clamp-3 text-xl font-bold transition-colors">
                            {review.title}
                          </h2>

                          {/* Description */}
                          <p className="text-muted-foreground line-clamp-3 text-sm">
                            {review.description}
                          </p>
                        </div>
                      </Link>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/reviews"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              모든 리뷰 보기 →
            </Link>
          </div>
        </div>
      )}

      <div className="mx-auto mb-12 max-w-3xl">
        <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl">자주 묻는 질문</h2>
        <Accordion type="single" collapsible className="w-full -space-y-px" defaultValue="1">
          {faqItems.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
            >
              <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-2">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

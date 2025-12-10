/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"

import { RiCalendarLine, RiHistoryLine, RiTrophyFill } from "@remixicon/react"
import { format, subDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/date-picker"
import { WinnerCard } from "@/components/winners/winner-card"
import { getWinnersByDate } from "@/app/actions/home"
import { getTopCategories } from "@/app/actions/projects"

export const metadata = {
  title: "Daily Winners - Open-Launch",
  description: "Check out the daily winners on Open-Launch",
}

// Composant pour afficher le message quand il n'y a pas de gagnants
function NoWinnersFound() {
  return (
    <div className="dark:bg-secondary/20 mx-3 rounded-lg border border-zinc-100 bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:mx-4 dark:border-zinc-800/50">
      <div className="bg-muted/30 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <RiTrophyFill className="text-muted-foreground h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-medium">위너를 찾을 수 없습니다</h3>
      <p className="text-muted-foreground mb-4 text-sm">
        이 날짜에 해당하는 위너가 없거나 경쟁이 아직 끝나지 않았습니다.
      </p>
      <Button asChild variant="outline" size="sm">
        <Link href="/winners">오늘의 위너로 돌아가기</Link>
      </Button>
    </div>
  )
}

export default async function WinnersPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  // Par défaut, utiliser la date d'hier (car ce sont les gagnants du jour précédent)
  const yesterday = subDays(new Date(), 1)
  const twoDaysAgo = subDays(new Date(), 2)
  const threeDaysAgo = subDays(new Date(), 3)

  // Récupérer la date des paramètres d'URL ou utiliser hier par défaut
  let selectedDate: Date
  const params = await searchParams
  if (params.date) {
    selectedDate = new Date(params.date)
    // Vérifier si la date est valide
    if (isNaN(selectedDate.getTime())) {
      selectedDate = yesterday
    }
  } else {
    selectedDate = yesterday
  }

  // Récupérer les gagnants de la date sélectionnée
  const winners = await getWinnersByDate(selectedDate)
  const topCategories = await getTopCategories(5)

  // Date formatée pour l'affichage
  const formattedDate = format(selectedDate, "MMMM d, yyyy")

  // Formatage pour les liens rapides
  const yesterdayFormatted = format(yesterday, "yyyy-MM-dd")
  const twoDaysAgoFormatted = format(twoDaysAgo, "yyyy-MM-dd")
  const threeDaysAgoFormatted = format(threeDaysAgo, "yyyy-MM-dd")

  return (
    <main className="bg-secondary/20 min-h-screen">
      <div className="container mx-auto max-w-[1200px] px-4 pt-8 pb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
          {/* Contenu principal */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="px-3 text-xl font-bold sm:px-4 sm:text-2xl">일일 위너</h1>
              </div>

              <div className="dark:bg-secondary/10 mx-3 rounded-lg border border-zinc-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sm:mx-4 dark:border-zinc-800/50">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="mb-1 text-lg font-medium">{formattedDate}의 위너</h2>
                    <p className="text-muted-foreground text-sm">
                      이 프로젝트들은 오늘의 최고 성과로 선정되었습니다.
                    </p>
                  </div>
                  <div className="self-start sm:self-center">
                    <DatePicker date={selectedDate} />
                  </div>
                </div>
              </div>
            </div>

            {winners.length === 0 ? (
              <NoWinnersFound />
            ) : (
              <div className="space-y-4">
                {winners.map((winner, index) => (
                  <div key={winner.id} className="mx-3 sm:mx-4">
                    <WinnerCard
                      name={winner.name}
                      slug={winner.slug}
                      description={winner.description}
                      thumbnail={winner.logoUrl}
                      dailyRanking={winner.dailyRanking || index + 1}
                      upvoteCount={winner.upvoteCount}
                      commentCount={winner.commentCount || 0}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-3">
            {/* About Daily Winners */}
            <div className="space-y-3 p-5 pt-0">
              <h3 className="flex items-center gap-2 font-semibold">일일 위너 소개</h3>
              <div className="dark:bg-secondary/10 rounded-md border border-zinc-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:border-zinc-800/50">
                <p className="text-muted-foreground text-sm">
                  매일 Open Launch는 런칭된 프로젝트 중 가장 많은 업보트를 받은 상위 3개 프로젝트를
                  자동으로 선정합니다.
                </p>
              </div>
            </div>

            {/* Quick Date Access */}
            <div className="space-y-3 p-5">
              <h3 className="flex items-center gap-2 font-semibold">
                <RiHistoryLine className="h-4 w-4" />
                최근 위너
              </h3>
              <div className="space-y-2">
                <Link
                  href={`/winners?date=${yesterdayFormatted}`}
                  className={`flex items-center gap-2 rounded-md p-2 text-sm transition-colors ${
                    format(selectedDate, "yyyy-MM-dd") === yesterdayFormatted
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/40"
                  }`}
                >
                  <RiCalendarLine className="text-muted-foreground h-4 w-4" />
                  어제
                </Link>
                <Link
                  href={`/winners?date=${twoDaysAgoFormatted}`}
                  className={`flex items-center gap-2 rounded-md p-2 text-sm transition-colors ${
                    format(selectedDate, "yyyy-MM-dd") === twoDaysAgoFormatted
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/40"
                  }`}
                >
                  <RiCalendarLine className="text-muted-foreground h-4 w-4" />
                  {format(twoDaysAgo, "MMMM d")}
                </Link>
                <Link
                  href={`/winners?date=${threeDaysAgoFormatted}`}
                  className={`flex items-center gap-2 rounded-md p-2 text-sm transition-colors ${
                    format(selectedDate, "yyyy-MM-dd") === threeDaysAgoFormatted
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/40"
                  }`}
                >
                  <RiCalendarLine className="text-muted-foreground h-4 w-4" />
                  {format(threeDaysAgo, "MMMM d")}
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">인기 카테고리</h3>
                <Button variant="ghost" size="sm" className="text-sm" asChild>
                  <Link href="/categories" className="flex items-center gap-1">
                    전체 보기
                  </Link>
                </Button>
              </div>
              <div className="space-y-2">
                {topCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories?category=${category.id}`}
                    className="hover:bg-muted/40 flex items-center justify-between rounded-md p-2"
                  >
                    <span className="text-sm hover:underline">{category.name}</span>
                    <span className="text-muted-foreground bg-secondary rounded-full px-2 py-0.5 text-xs">
                      {category.count} 프로젝트
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 p-5">
              <h3 className="flex items-center gap-2 font-semibold">빠른 접근</h3>
              <div className="space-y-2">
                <Link
                  href="/trending"
                  className="flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:underline"
                >
                  지금 트렌딩
                </Link>
                <Link
                  href="/trending?filter=month"
                  className="flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:underline"
                >
                  이번 달 베스트
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

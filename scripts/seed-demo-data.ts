import { db } from "@/drizzle/db"
import { category, project, projectToCategory, upvote, user } from "@/drizzle/db/schema"
import { nanoid } from "nanoid"

// 데모 사용자
const DEMO_USERS = [
  {
    id: nanoid(),
    name: "김태현",
    email: "taehyun@demo.com",
    emailVerified: true,
    image: "/oppieD.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "admin",
    banned: false,
    banReason: null,
    banExpires: null,
    stripeCustomerId: null,
  },
  {
    id: nanoid(),
    name: "이서연",
    email: "seoyeon@demo.com",
    emailVerified: true,
    image: "/oppieG.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
    banned: false,
    banReason: null,
    banExpires: null,
    stripeCustomerId: null,
  },
  {
    id: nanoid(),
    name: "박지훈",
    email: "jihoon@demo.com",
    emailVerified: true,
    image: "/logo.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
    banned: false,
    banReason: null,
    banExpires: null,
    stripeCustomerId: null,
  },
  {
    id: nanoid(),
    name: "최민지",
    email: "minji@demo.com",
    emailVerified: true,
    image: "/outsome_logo.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
    banned: false,
    banReason: null,
    banExpires: null,
    stripeCustomerId: null,
  },
  {
    id: nanoid(),
    name: "정우진",
    email: "woojin@demo.com",
    emailVerified: true,
    image: "/oppieD.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
    banned: false,
    banReason: null,
    banExpires: null,
    stripeCustomerId: null,
  },
]

// 데모 프로젝트 - 더 현실적인 설명
const DEMO_PROJECTS = [
  // 오늘의 런칭 (ongoing)
  {
    id: nanoid(),
    name: "코드메이트",
    slug: "codemate",
    description:
      "AI가 함께하는 페어 프로그래밍 경험. 실시간 코드 리뷰와 버그 탐지로 개발 속도를 2배 향상시키세요. 팀 협업을 위한 스마트 제안 기능으로 코드 품질을 한 단계 업그레이드합니다.",
    websiteUrl: "https://codemate.dev",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: "https://github.com/codemate",
    twitterUrl: "https://twitter.com/codemate",
    techStack: ["TypeScript", "OpenAI", "VSCode Extension"],
    pricing: "freemium",
    platforms: ["desktop"],
    launchStatus: "ongoing",
    scheduledLaunchDate: new Date(),
    launchType: "premium",
    featuredOnHomepage: true,
    dailyRanking: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    name: "디자인콜렉트",
    slug: "design-collect",
    description:
      "웹에서 발견한 멋진 디자인을 한 곳에 모으세요. 크롬 확장 프로그램으로 클릭 한 번에 저장하고, 팀과 공유하며, 프로젝트별로 정리할 수 있습니다. 디자이너를 위한 최고의 영감 관리 도구입니다.",
    websiteUrl: "https://designcollect.app",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: null,
    twitterUrl: "https://twitter.com/designcollect",
    techStack: ["React", "Chrome Extension", "Firebase"],
    pricing: "free",
    platforms: ["web"],
    launchStatus: "ongoing",
    scheduledLaunchDate: new Date(),
    launchType: "free",
    featuredOnHomepage: false,
    dailyRanking: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    name: "밋업플래너",
    slug: "meetup-planner",
    description:
      "팀 미팅 일정 조율이 이렇게 쉬울 수 있습니다. 참여자들의 캘린더를 자동으로 분석하여 최적의 시간을 제안하고, 회의실 예약과 화상회의 링크까지 한 번에 생성합니다. 더 이상 일정 조율에 시간 낭비하지 마세요.",
    websiteUrl: "https://meetupplanner.co",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: "https://github.com/meetup-planner",
    twitterUrl: null,
    techStack: ["Next.js", "Google Calendar API", "Zoom API"],
    pricing: "freemium",
    platforms: ["web"],
    launchStatus: "ongoing",
    scheduledLaunchDate: new Date(),
    launchType: "premium",
    featuredOnHomepage: false,
    dailyRanking: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 어제 런칭 (launched - 어제)
  {
    id: nanoid(),
    name: "스마트노트",
    slug: "smart-note",
    description:
      "메모를 AI가 자동으로 정리하고 분류합니다. 회의록, 아이디어, 할 일을 한 곳에서 관리하고, 강력한 검색으로 언제든지 찾아보세요. 마크다운 지원과 실시간 동기화로 어디서나 작업할 수 있습니다.",
    websiteUrl: "https://smartnote.app",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: "https://github.com/smart-note",
    twitterUrl: "https://twitter.com/smartnote",
    techStack: ["React", "Electron", "OpenAI", "Supabase"],
    pricing: "paid",
    platforms: ["web", "desktop", "mobile"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 86400000),
    launchType: "premium_plus",
    featuredOnHomepage: true,
    dailyRanking: 1,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: nanoid(),
    name: "폼빌더프로",
    slug: "form-builder-pro",
    description:
      "코드 없이 아름다운 폼을 만드세요. 드래그 앤 드롭으로 직관적인 UI를 구성하고, 응답 데이터를 자동으로 분석합니다. 결제 연동, 이메일 알림, 웹훅까지 모든 기능이 포함되어 있습니다.",
    websiteUrl: "https://formbuilderpro.com",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: null,
    twitterUrl: "https://twitter.com/formbuilderpro",
    techStack: ["Vue.js", "Node.js", "MongoDB"],
    pricing: "freemium",
    platforms: ["web"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 86400000),
    launchType: "premium",
    featuredOnHomepage: false,
    dailyRanking: 2,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: nanoid(),
    name: "커뮤니티허브",
    slug: "community-hub",
    description:
      "온라인 커뮤니티를 쉽게 만들고 관리하세요. 포럼, 이벤트, 멤버십을 하나의 플랫폼에서 운영할 수 있습니다. 강력한 모더레이션 도구와 분석 대시보드로 건강한 커뮤니티를 만드세요.",
    websiteUrl: "https://communityhub.io",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: "https://github.com/community-hub",
    twitterUrl: "https://twitter.com/communityhub",
    techStack: ["Next.js", "PostgreSQL", "Redis"],
    pricing: "paid",
    platforms: ["web"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 86400000),
    launchType: "premium",
    featuredOnHomepage: false,
    dailyRanking: 3,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },

  // 이번 달 베스트 (launched - 지난 주)
  {
    id: nanoid(),
    name: "데이터비주얼",
    slug: "data-visual",
    description:
      "복잡한 데이터를 아름다운 차트로 변환하세요. 20가지 이상의 차트 타입과 실시간 업데이트 지원으로 대시보드를 쉽게 만들 수 있습니다. API 연동으로 자동화된 리포트도 생성 가능합니다.",
    websiteUrl: "https://datavisual.dev",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: "https://github.com/data-visual",
    twitterUrl: "https://twitter.com/datavisual",
    techStack: ["D3.js", "React", "TypeScript"],
    pricing: "freemium",
    platforms: ["web"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 7 * 86400000),
    launchType: "premium_plus",
    featuredOnHomepage: true,
    dailyRanking: 1,
    createdAt: new Date(Date.now() - 7 * 86400000),
    updatedAt: new Date(Date.now() - 7 * 86400000),
  },
  {
    id: nanoid(),
    name: "스타트업툴킷",
    slug: "startup-toolkit",
    description:
      "초기 스타트업에 필요한 모든 도구를 한 곳에. 재무 관리, 고객 관리, 프로젝트 트래킹을 통합 대시보드에서 관리하세요. 투자 유치를 위한 데이터 룸 기능도 포함되어 있습니다.",
    websiteUrl: "https://startuptoolkit.co",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: null,
    twitterUrl: "https://twitter.com/startuptoolkit",
    techStack: ["React", "Node.js", "PostgreSQL"],
    pricing: "paid",
    platforms: ["web"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 10 * 86400000),
    launchType: "premium",
    featuredOnHomepage: true,
    dailyRanking: 2,
    createdAt: new Date(Date.now() - 10 * 86400000),
    updatedAt: new Date(Date.now() - 10 * 86400000),
  },
  {
    id: nanoid(),
    name: "마케팅오토",
    slug: "marketing-auto",
    description:
      "이메일 마케팅과 SNS 발행을 자동화하세요. AI가 최적의 발행 시간을 제안하고, A/B 테스트로 최고의 성과를 냅니다. 캠페인 성과를 실시간으로 추적하고 개선하세요.",
    websiteUrl: "https://marketingauto.io",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: null,
    twitterUrl: "https://twitter.com/marketingauto",
    techStack: ["Python", "React", "Celery", "Redis"],
    pricing: "freemium",
    platforms: ["web"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 14 * 86400000),
    launchType: "premium",
    featuredOnHomepage: true,
    dailyRanking: 3,
    createdAt: new Date(Date.now() - 14 * 86400000),
    updatedAt: new Date(Date.now() - 14 * 86400000),
  },
  {
    id: nanoid(),
    name: "코드스니펫",
    slug: "code-snippet",
    description:
      "자주 사용하는 코드 스니펫을 저장하고 팀과 공유하세요. 태그와 카테고리로 쉽게 찾고, IDE에서 바로 사용할 수 있습니다. 개인과 팀 모두를 위한 코드 라이브러리입니다.",
    websiteUrl: "https://codesnippet.dev",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: "https://github.com/code-snippet",
    twitterUrl: null,
    techStack: ["Next.js", "MongoDB", "VSCode Extension"],
    pricing: "free",
    platforms: ["web", "desktop"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 20 * 86400000),
    launchType: "free",
    featuredOnHomepage: false,
    dailyRanking: 4,
    createdAt: new Date(Date.now() - 20 * 86400000),
    updatedAt: new Date(Date.now() - 20 * 86400000),
  },
  {
    id: nanoid(),
    name: "피드백박스",
    slug: "feedback-box",
    description:
      "고객 피드백을 효율적으로 수집하고 관리하세요. 웹사이트 위젯으로 쉽게 의견을 받고, 투표와 우선순위로 제품 로드맵을 결정합니다. 고객의 목소리를 제품에 반영하세요.",
    websiteUrl: "https://feedbackbox.app",
    logoUrl: "/logo.svg",
    coverImageUrl: "/logo.svg",
    productImage: "/logo.svg",
    githubUrl: "https://github.com/feedback-box",
    twitterUrl: "https://twitter.com/feedbackbox",
    techStack: ["React", "Node.js", "PostgreSQL"],
    pricing: "freemium",
    platforms: ["web"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 25 * 86400000),
    launchType: "premium",
    featuredOnHomepage: false,
    dailyRanking: 5,
    createdAt: new Date(Date.now() - 25 * 86400000),
    updatedAt: new Date(Date.now() - 25 * 86400000),
  },
]

async function seedDemoData() {
  console.log("🎬 데모 데이터 생성 시작...")

  try {
    // 기존 데이터 삭제
    console.log("\n🗑️  기존 데이터 삭제 중...")
    await db.delete(upvote)
    await db.delete(projectToCategory)
    await db.delete(project)
    await db.delete(user)
    console.log("✅ 기존 데이터 삭제 완료")

    // 1. 사용자 생성
    console.log("\n👥 사용자 생성 중...")
    const insertedUsers = await db.insert(user).values(DEMO_USERS).returning()
    console.log(`✅ ${insertedUsers.length}명의 사용자 생성 완료`)

    // 2. 프로젝트 생성
    console.log("\n🚀 프로젝트 생성 중...")
    const projectsWithUsers = DEMO_PROJECTS.map((proj, idx) => ({
      ...proj,
      createdBy: insertedUsers[idx % insertedUsers.length].id,
    }))
    const insertedProjects = await db.insert(project).values(projectsWithUsers).returning()
    console.log(`✅ ${insertedProjects.length}개의 프로젝트 생성 완료`)

    const ongoingCount = insertedProjects.filter((p) => p.launchStatus === "ongoing").length
    console.log(`   - 오늘의 런칭: ${ongoingCount}개`)
    console.log(`   - 이미 런칭됨: ${insertedProjects.length - ongoingCount}개`)

    // 3. 카테고리 매핑
    console.log("\n🏷️  카테고리 매핑 중...")
    const categories = await db.query.category.findMany()
    const categoryMappings = [
      { projectIdx: 0, categoryIds: ["dev-tools", "ai", "saas"] }, // 코드메이트
      { projectIdx: 1, categoryIds: ["design-tools", "productivity", "web-dev"] }, // 디자인콜렉트
      { projectIdx: 2, categoryIds: ["productivity", "saas", "platform"] }, // 밋업플래너
      { projectIdx: 3, categoryIds: ["productivity", "ai", "mobile-dev"] }, // 스마트노트
      { projectIdx: 4, categoryIds: ["web-dev", "saas", "no-code"] }, // 폼빌더프로
      { projectIdx: 5, categoryIds: ["platform", "saas", "web-dev"] }, // 커뮤니티허브
      { projectIdx: 6, categoryIds: ["data-science", "analytics", "dev-tools"] }, // 데이터비주얼
      { projectIdx: 7, categoryIds: ["productivity", "saas", "fintech"] }, // 스타트업툴킷
      { projectIdx: 8, categoryIds: ["marketing", "automation", "saas"] }, // 마케팅오토
      { projectIdx: 9, categoryIds: ["dev-tools", "productivity", "web-dev"] }, // 코드스니펫
      { projectIdx: 10, categoryIds: ["saas", "productivity", "platform"] }, // 피드백박스
    ]

    const mappings = []
    for (const mapping of categoryMappings) {
      const projectId = insertedProjects[mapping.projectIdx].id
      for (const catId of mapping.categoryIds) {
        const cat = categories.find((c) => c.id === catId)
        if (cat) {
          mappings.push({ projectId, categoryId: cat.id })
        }
      }
    }
    await db.insert(projectToCategory).values(mappings)
    console.log(`✅ ${mappings.length}개의 카테고리 매핑 완료`)

    // 4. 투표 생성 (현실적인 분포)
    console.log("\n👍 투표 생성 중...")
    const votes = []
    for (let i = 0; i < insertedProjects.length; i++) {
      const proj = insertedProjects[i]
      // 최신 프로젝트일수록 적은 투표
      const baseVotes = proj.launchStatus === "ongoing" ? 15 : 30
      const daysOld = Math.floor(
        (Date.now() - new Date(proj.createdAt).getTime()) / (1000 * 60 * 60 * 24),
      )
      const voteCount = baseVotes + daysOld * 5 + Math.floor(Math.random() * 20)

      for (let j = 0; j < voteCount; j++) {
        const voter = insertedUsers[j % insertedUsers.length]
        votes.push({
          id: nanoid(),
          projectId: proj.id,
          userId: voter.id,
          createdAt: new Date(Date.now() - Math.random() * daysOld * 86400000),
        })
      }
    }
    await db.insert(upvote).values(votes)
    console.log(`✅ ${votes.length}개의 투표 생성 완료`)

    console.log("\n🎉 데모 데이터 생성 완료!")
    console.log("\n📊 생성된 데이터 요약:")
    console.log(`   - 사용자: ${insertedUsers.length}명`)
    console.log(`   - 프로젝트: ${insertedProjects.length}개`)
    console.log(`     • 오늘의 런칭 (ongoing): ${ongoingCount}개`)
    console.log(`     • 이미 런칭 (launched): ${insertedProjects.length - ongoingCount}개`)
    console.log(`   - 카테고리 매핑: ${mappings.length}개`)
    console.log(`   - 투표: ${votes.length}개`)
  } catch (error) {
    console.error("❌ 에러 발생:", error)
    throw error
  }
}

// 실행
seedDemoData()
  .then(() => {
    console.log("\n✅ 데모 데이터 시드 완료")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ 데모 데이터 시드 실패:", error)
    process.exit(1)
  })

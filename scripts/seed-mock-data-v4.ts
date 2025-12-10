import { db } from "@/drizzle/db"
import { category, project, projectToCategory, upvote, user } from "@/drizzle/db/schema"
import { nanoid } from "nanoid"

// Mock users - 기존 이미지 사용
const MOCK_USERS = [
  {
    id: nanoid(),
    name: "김개발",
    email: "dev@test.com",
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
    name: "이디자이너",
    email: "designer@test.com",
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
    name: "박창업",
    email: "founder@test.com",
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
    name: "최마케터",
    email: "marketer@test.com",
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
]

// Mock projects - 일부는 ongoing으로 설정하여 "오늘의 인기 프로젝트"에 표시
const MOCK_PROJECTS = [
  {
    id: nanoid(),
    name: "SolarBeam",
    slug: "solarbeam",
    description:
      "태양광 발전의 미래를 재정의합니다. 🌞 AI 기반 실시간 에너지 분석으로 발전 효율을 최대 40% 향상시키고, 스마트 그리드와 완벽하게 통합되어 탄소 중립 사회를 앞당깁니다. 이미 전 세계 1,000개 이상의 발전소가 SolarBeam과 함께 더 나은 에너지 미래를 만들고 있습니다. 실시간 모니터링, 예측 분석, 자동 최적화까지 - 지속가능한 에너지의 모든 것이 여기에 있습니다.",
    websiteUrl: "https://solarbeam.com",
    logoUrl: "/solarbeam.png",
    coverImageUrl: "/solarbeam.png",
    productImage: "/solarbeam.png",
    githubUrl: "https://github.com/example/solarbeam",
    twitterUrl: "https://twitter.com/solarbeam",
    techStack: ["React", "Python", "TensorFlow", "IoT", "AWS"],
    pricing: "freemium",
    platforms: ["web", "mobile"],
    launchStatus: "ongoing", // ⭐ 오늘의 런칭 1
    scheduledLaunchDate: new Date(),
    launchType: "premium",
    featuredOnHomepage: true,
    dailyRanking: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    name: "Slit Design",
    slug: "slit-design",
    description:
      "디자인의 한계를 넘어서세요. ✨ 직관적인 인터페이스로 빠르게 프로토타입을 만들고, 팀과 실시간으로 협업하며, 클라이언트에게 즉시 피드백을 받으세요. Figma의 강력함과 Canva의 간편함을 하나로 결합했습니다. 이미 50,000명의 디자이너가 Slit을 사용하여 아이디어를 현실로 만들고 있습니다. 디자인 시스템, 컴포넌트 라이브러리, 버전 관리까지 - 모던 디자인 워크플로우의 완성.",
    websiteUrl: "https://slit.design",
    logoUrl: "/slit.png",
    coverImageUrl: "/slit.png",
    productImage: "/slit.png",
    githubUrl: null,
    twitterUrl: "https://twitter.com/slitdesign",
    techStack: ["React", "WebGL", "TypeScript", "Figma API"],
    pricing: "paid",
    platforms: ["web", "desktop"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 86400000),
    launchType: "premium_plus",
    featuredOnHomepage: true,
    dailyRanking: 2,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: nanoid(),
    name: "헤어집사",
    slug: "hair-butler",
    description:
      "당신만을 위한 완벽한 헤어스타일을 찾아드립니다. 💇 AI 얼굴형 분석과 최신 K-뷰티 트렌드를 결합하여 99.7% 만족도의 맞춤형 헤어스타일을 추천합니다. 10만 건 이상의 헤어 데이터로 학습한 AI가 얼굴형, 피부톤, 라이프스타일까지 고려하여 당신에게 가장 어울리는 스타일을 제시합니다. 가상 시뮬레이션으로 미리 확인하고, 내 주변 추천 샵까지 바로 예약하세요. 더 이상 헤어스타일로 고민하지 마세요!",
    websiteUrl: "https://hairbutler.kr",
    logoUrl: "/헤어집사.png",
    coverImageUrl: "/헤어집사.png",
    productImage: "/헤어집사.png",
    githubUrl: null,
    twitterUrl: "https://twitter.com/hairbutler",
    techStack: ["Flutter", "TensorFlow", "Firebase", "Computer Vision"],
    pricing: "free",
    platforms: ["mobile"],
    launchStatus: "ongoing", // ⭐ 오늘의 런칭 2
    scheduledLaunchDate: new Date(),
    launchType: "free",
    featuredOnHomepage: false,
    dailyRanking: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    name: "TreeDi",
    slug: "treedi",
    description:
      "복잡한 구조를 아름다운 3D로 시각화하세요. 🌳 조직도, 마인드맵, 데이터 구조를 3차원 공간에서 자유롭게 탐색하고 편집하세요. 평면적인 다이어그램은 이제 그만! TreeDi의 인터랙티브 3D 뷰로 복잡한 관계를 한눈에 파악하고, 팀원들과 실시간으로 협업하세요. Fortune 500 기업의 80%가 TreeDi로 더 나은 의사결정을 하고 있습니다. VR/AR 지원으로 몰입감 있는 프레젠테이션까지 가능합니다.",
    websiteUrl: "https://treedi.app",
    logoUrl: "/treedi1.jpg",
    coverImageUrl: "/트리디3.png",
    productImage: "/트리디3.png",
    githubUrl: "https://github.com/example/treedi",
    twitterUrl: "https://twitter.com/treedi_app",
    techStack: ["Three.js", "React", "D3.js", "WebGL"],
    pricing: "freemium",
    platforms: ["web"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 86400000),
    launchType: "premium",
    featuredOnHomepage: true,
    dailyRanking: 1,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: nanoid(),
    name: "Faxi",
    slug: "faxi",
    description:
      "팩스를 21세기로. 📠 클라우드 기반 스마트 팩스 솔루션으로 언제 어디서나 팩스를 보내고 받으세요. 물리적 팩스기는 이제 박물관에만! Faxi는 이메일처럼 간편하지만 팩스의 법적 효력을 그대로 유지합니다. 디지털 서명, OCR 자동 텍스트 추출, 256비트 암호화까지 - 보안과 편의성을 동시에 잡았습니다. 이미 5,000개 기업이 Faxi로 연간 평균 $50,000의 비용을 절감하고 있습니다.",
    websiteUrl: "https://faxi.io",
    logoUrl: "/faxi1.png",
    coverImageUrl: "/faxi1.png",
    productImage: "/faxi1.png",
    githubUrl: null,
    twitterUrl: "https://twitter.com/faxi_io",
    techStack: ["Node.js", "React", "AWS", "OCR"],
    pricing: "paid",
    platforms: ["web", "api"],
    launchStatus: "ongoing", // ⭐ 오늘의 런칭 3
    scheduledLaunchDate: new Date(),
    launchType: "premium",
    featuredOnHomepage: false,
    dailyRanking: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    name: "Anyon",
    slug: "anyon",
    description:
      "진짜 질문, 진짜 답변이 오가는 곳. 💬 완전 익명 Q&A 플랫폼 Anyon에서 부담 없이 질문하고, 솔직하게 답변하세요. AI 기반 스마트 모더레이션이 유해 콘텐츠는 걸러내고, 양질의 대화만 남깁니다. 이미 100만 명의 사용자가 Anyon에서 진솔한 대화를 나누고 있습니다. 전문가 인증 시스템, 신뢰도 점수, 실시간 번역까지 - 전 세계 사람들과 경계 없이 소통하세요.",
    websiteUrl: "https://anyon.chat",
    logoUrl: "/anyon1.webp",
    coverImageUrl: "/anyon1.webp",
    productImage: "/anyon1.webp",
    githubUrl: "https://github.com/example/anyon",
    twitterUrl: "https://twitter.com/anyon_chat",
    techStack: ["Next.js", "PostgreSQL", "Redis", "WebSocket"],
    pricing: "free",
    platforms: ["web", "mobile"],
    launchStatus: "ongoing", // ⭐ 오늘의 런칭 4
    scheduledLaunchDate: new Date(),
    launchType: "free",
    featuredOnHomepage: false,
    dailyRanking: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    name: "Spec Analytics",
    slug: "spec-analytics",
    description:
      "데이터로 제품을 분석하는 가장 스마트한 방법. 📊 경쟁사 제품 사양을 실시간으로 추적하고, AI가 시장 트렌드를 자동으로 분석합니다. Spec Analytics는 10만 개 이상의 제품 데이터베이스를 기반으로 당신의 제품 포지셔닝을 최적화합니다. 벤치마크 리포트, 가격 분석, 기술 스택 비교까지 - 제품 매니저와 마케터가 꼭 필요한 모든 인사이트가 여기에. 데이터 기반 의사결정으로 시장을 선도하세요.",
    websiteUrl: "https://spec.analytics",
    logoUrl: "/spec.jpg",
    coverImageUrl: "/spec.jpg",
    productImage: "/spec.jpg",
    githubUrl: null,
    twitterUrl: "https://twitter.com/spec_analytics",
    techStack: ["Python", "Pandas", "React", "D3.js"],
    pricing: "paid",
    platforms: ["web", "api"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 86400000),
    launchType: "premium_plus",
    featuredOnHomepage: true,
    dailyRanking: 2,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: nanoid(),
    name: "Zero to 100",
    slug: "zero-to-100",
    description:
      "100일 만에 아이디어를 비즈니스로 만드는 여정. 🚀 스타트업 성장 가속 프로그램 Zero to 100은 검증된 프레임워크와 실리콘밸리 멘토의 1:1 코칭을 제공합니다. 이미 500개 스타트업이 Zero to 100을 통해 총 $500M의 투자를 유치했습니다. MVP 개발부터 첫 고객 확보, 피벗, PMF까지 - 창업의 모든 단계를 체계적으로 돌파하세요. 주 1회 피드백 세션, 전용 리소스 라이브러리, 창업자 커뮤니티까지. 당신의 아이디어가 다음 유니콘이 될 수 있습니다.",
    websiteUrl: "https://zero100.startup",
    logoUrl: "/zero100.webp",
    coverImageUrl: "/zero100.webp",
    productImage: "/zero100.webp",
    githubUrl: null,
    twitterUrl: "https://twitter.com/zero100startup",
    techStack: ["Community", "Mentorship", "Education"],
    pricing: "freemium",
    platforms: ["web"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(),
    launchType: "premium",
    featuredOnHomepage: false,
    dailyRanking: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedMockDataV4() {
  console.log("🌱 목 데이터 V4 생성 시작...")
  console.log("⭐ 오늘의 런칭 프로젝트 포함!")

  try {
    // 기존 데이터 확인
    const existingUsers = await db.query.user.findMany()
    const existingProjects = await db.query.project.findMany()

    if (existingProjects.length > 0) {
      console.log("\n⚠️  기존 프로젝트를 삭제하고 새로 생성합니다...")
      await db.delete(upvote)
      await db.delete(projectToCategory)
      await db.delete(project)
      console.log("✅ 기존 프로젝트 데이터 삭제 완료")
    }

    // 1. 사용자 처리
    let insertedUsers = existingUsers
    if (existingUsers.length === 0) {
      console.log("\n👤 사용자 생성 중...")
      insertedUsers = await db.insert(user).values(MOCK_USERS).returning()
      console.log(`✅ ${insertedUsers.length}명의 사용자 생성 완료`)
    } else {
      console.log("\n👤 기존 사용자 재사용")
    }

    // 2. 프로젝트 생성
    console.log("\n📦 프로젝트 생성 중...")
    const projectsWithUsers = MOCK_PROJECTS.map((proj, idx) => ({
      ...proj,
      createdBy: insertedUsers[idx % insertedUsers.length].id,
    }))
    const insertedProjects = await db.insert(project).values(projectsWithUsers).returning()
    console.log(`✅ ${insertedProjects.length}개의 프로젝트 생성 완료`)

    // ongoing 프로젝트 수 확인
    const ongoingCount = insertedProjects.filter((p) => p.launchStatus === "ongoing").length
    console.log(`   - 오늘의 런칭 (ongoing): ${ongoingCount}개`)
    console.log(`   - 이미 런칭됨 (launched): ${insertedProjects.length - ongoingCount}개`)

    // 3. 카테고리 매핑
    console.log("\n🏷️  카테고리 매핑 중...")
    const categories = await db.query.category.findMany()
    const categoryMappings = [
      { projectIdx: 0, categoryIds: ["greentech", "ai", "iot"] }, // SolarBeam
      { projectIdx: 1, categoryIds: ["design-tools", "ui-ux", "saas"] }, // Slit
      { projectIdx: 2, categoryIds: ["ai", "healthtech", "mobile-dev"] }, // 헤어집사
      { projectIdx: 3, categoryIds: ["data-science", "design-tools", "saas"] }, // TreeDi
      { projectIdx: 4, categoryIds: ["productivity", "saas", "api"] }, // Faxi
      { projectIdx: 5, categoryIds: ["platform", "saas", "ai"] }, // Anyon
      { projectIdx: 6, categoryIds: ["data-science", "analytics", "saas"] }, // Spec
      { projectIdx: 7, categoryIds: ["edtech", "platform", "productivity"] }, // Zero to 100
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

    // 4. 투표 생성 (더 많이!)
    console.log("\n👍 투표 생성 중...")
    const votes = []
    for (let i = 0; i < insertedProjects.length; i++) {
      const proj = insertedProjects[i]
      const voteCount = Math.floor(Math.random() * 81) + 20 // 20-100 투표
      for (let j = 0; j < voteCount; j++) {
        const voter = insertedUsers[j % insertedUsers.length]
        votes.push({
          id: nanoid(),
          projectId: proj.id,
          userId: voter.id,
          createdAt: new Date(Date.now() - Math.random() * 86400000),
        })
      }
    }
    await db.insert(upvote).values(votes)
    console.log(`✅ ${votes.length}개의 투표 생성 완료`)

    console.log("\n🎉 목 데이터 V4 생성 완료!")
    console.log("\n📊 생성된 데이터:")
    console.log(`   - 사용자: ${insertedUsers.length}명`)
    console.log(`   - 프로젝트: ${insertedProjects.length}개`)
    console.log(`     • 오늘의 런칭: ${ongoingCount}개 (SolarBeam, 헤어집사, Faxi, Anyon)`)
    console.log(`     • 이미 런칭: ${insertedProjects.length - ongoingCount}개`)
    console.log(`   - 카테고리 매핑: ${mappings.length}개`)
    console.log(`   - 투표: ${votes.length}개 (20-100 per project)`)
  } catch (error) {
    console.error("❌ 에러 발생:", error)
    throw error
  }
}

// 실행
seedMockDataV4()
  .then(() => {
    console.log("\n✅ 시드 스크립트 V4 완료")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ 시드 스크립트 V4 실패:", error)
    process.exit(1)
  })

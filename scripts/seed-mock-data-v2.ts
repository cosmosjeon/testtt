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

// Mock projects - public 폴더의 실제 이미지 사용
const MOCK_PROJECTS = [
  {
    id: nanoid(),
    name: "SolarBeam",
    slug: "solarbeam",
    description:
      "태양광 발전의 미래를 만듭니다. AI 기반 실시간 에너지 분석으로 발전 효율을 최대 40% 향상시키고, 스마트 그리드와 완벽하게 통합되어 탄소 중립 사회를 앞당깁니다. 이미 1,000개 이상의 발전소가 SolarBeam과 함께 더 나은 에너지 미래를 만들고 있습니다.",
    websiteUrl: "https://solarbeam.com",
    logoUrl: "/solarbeam.png",
    coverImageUrl: "/solarbeam.png",
    productImage: "/solarbeam.png",
    githubUrl: "https://github.com/example/solarbeam",
    twitterUrl: "https://twitter.com/solarbeam",
    techStack: ["React", "Python", "TensorFlow", "IoT", "AWS"],
    pricing: "freemium",
    platforms: ["web", "mobile"],
    launchStatus: "launched",
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
      "혁신적인 UI/UX 디자인 도구. 직관적인 인터페이스로 빠르게 프로토타입을 만들고, 팀과 실시간으로 협업하세요.",
    websiteUrl: "https://slit.design",
    logoUrl: "/slit.png",
    coverImageUrl: "/slit.png",
    productImage: "/slit.png",
    githubUrl: null,
    twitterUrl: "https://twitter.com/slitdesign",
    techStack: ["Figma", "React", "WebGL", "TypeScript"],
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
      "AI 기반 맞춤형 헤어 스타일 추천 서비스. 얼굴형 분석과 최신 트렌드를 결합하여 당신에게 완벽한 스타일을 찾아드립니다.",
    websiteUrl: "https://hairbutler.kr",
    logoUrl: "/헤어집사.png",
    coverImageUrl: "/헤어집사.png",
    productImage: "/헤어집사.png",
    githubUrl: null,
    twitterUrl: "https://twitter.com/hairbutler",
    techStack: ["Flutter", "TensorFlow", "Firebase", "Computer Vision"],
    pricing: "free",
    platforms: ["mobile"],
    launchStatus: "launched",
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
      "3D 트리 시각화 및 관리 도구. 조직도, 마인드맵, 데이터 구조를 아름다운 3D로 표현하고 공유하세요.",
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
      "스마트 팩스 솔루션. 클라우드 기반으로 언제 어디서나 팩스를 보내고 받으세요. 디지털 서명과 보안 전송 기능 포함.",
    websiteUrl: "https://faxi.io",
    logoUrl: "/faxi1.png",
    coverImageUrl: "/faxi1.png",
    productImage: "/faxi1.png",
    githubUrl: null,
    twitterUrl: "https://twitter.com/faxi_io",
    techStack: ["Node.js", "React", "AWS", "OCR"],
    pricing: "paid",
    platforms: ["web", "api"],
    launchStatus: "launched",
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
      "실시간 익명 Q&A 플랫폼. 누구든지 질문하고 답변할 수 있는 오픈 커뮤니티. AI 기반 콘텐츠 모더레이션 포함.",
    websiteUrl: "https://anyon.chat",
    logoUrl: "/anyon1.webp",
    coverImageUrl: "/anyon1.webp",
    productImage: "/anyon1.webp",
    githubUrl: "https://github.com/example/anyon",
    twitterUrl: "https://twitter.com/anyon_chat",
    techStack: ["Next.js", "PostgreSQL", "Redis", "WebSocket"],
    pricing: "free",
    platforms: ["web", "mobile"],
    launchStatus: "launched",
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
      "제품 사양 분석 및 비교 플랫폼. 데이터 기반으로 제품의 성능을 분석하고 경쟁사와 비교하세요.",
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
      "스타트업 성장 가속 프로그램. 아이디어부터 제품 출시까지, 100일 안에 목표를 달성하세요. 멘토링과 리소스 제공.",
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

async function seedMockDataV2() {
  console.log("🌱 목 데이터 V2 생성 시작...")
  console.log("📁 public 폴더의 실제 이미지를 사용합니다")

  try {
    // 기존 데이터 확인
    const existingUsers = await db.query.user.findMany()
    const existingProjects = await db.query.project.findMany()

    if (existingUsers.length > 0 || existingProjects.length > 0) {
      console.log("\n⚠️  기존 데이터가 존재합니다.")
      console.log(`   - 사용자: ${existingUsers.length}명`)
      console.log(`   - 프로젝트: ${existingProjects.length}개`)
      console.log("\n기존 프로젝트를 삭제하고 새로 생성합니다...")

      // 기존 프로젝트 관련 데이터 삭제
      await db.delete(upvote)
      await db.delete(projectToCategory)
      await db.delete(project)

      console.log("✅ 기존 프로젝트 데이터 삭제 완료")
    }

    // 1. 사용자 생성 또는 재사용
    let insertedUsers = existingUsers
    if (existingUsers.length === 0) {
      console.log("\n👤 사용자 생성 중...")
      insertedUsers = await db.insert(user).values(MOCK_USERS).returning()
      console.log(`✅ ${insertedUsers.length}명의 사용자 생성 완료`)
    } else {
      console.log("\n👤 기존 사용자 재사용")
    }

    // 2. 프로젝트 생성 (사용자 ID 할당)
    console.log("\n📦 프로젝트 생성 중...")
    const projectsWithUsers = MOCK_PROJECTS.map((proj, idx) => ({
      ...proj,
      createdBy: insertedUsers[idx % insertedUsers.length].id,
    }))
    const insertedProjects = await db.insert(project).values(projectsWithUsers).returning()
    console.log(`✅ ${insertedProjects.length}개의 프로젝트 생성 완료`)

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
          mappings.push({
            projectId,
            categoryId: cat.id,
          })
        }
      }
    }
    await db.insert(projectToCategory).values(mappings)
    console.log(`✅ ${mappings.length}개의 카테고리 매핑 완료`)

    // 4. 투표 생성
    console.log("\n👍 투표 생성 중...")
    const votes = []
    for (let i = 0; i < insertedProjects.length; i++) {
      const proj = insertedProjects[i]
      // 각 프로젝트에 랜덤 투표 수 (10-50)
      const voteCount = Math.floor(Math.random() * 41) + 10
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

    console.log("\n🎉 목 데이터 V2 생성 완료!")
    console.log("\n📊 생성된 데이터:")
    console.log(`   - 사용자: ${insertedUsers.length}명`)
    console.log(`   - 프로젝트: ${insertedProjects.length}개`)
    console.log(`   - 카테고리 매핑: ${mappings.length}개`)
    console.log(`   - 투표: ${votes.length}개`)
    console.log("\n🖼️  사용된 이미지:")
    console.log("   - /solarbeam.png")
    console.log("   - /slit.png")
    console.log("   - /헤어집사.png")
    console.log("   - /treedi1.jpg, /트리디3.png")
    console.log("   - /faxi1.png")
    console.log("   - /anyon1.webp")
    console.log("   - /spec.jpg")
    console.log("   - /zero100.webp")
  } catch (error) {
    console.error("❌ 에러 발생:", error)
    throw error
  }
}

// 실행
seedMockDataV2()
  .then(() => {
    console.log("\n✅ 시드 스크립트 V2 완료")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ 시드 스크립트 V2 실패:", error)
    process.exit(1)
  })

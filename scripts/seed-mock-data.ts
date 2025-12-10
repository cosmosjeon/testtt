import { db } from "@/drizzle/db"
import { category, project, projectToCategory, upvote, user } from "@/drizzle/db/schema"
import { nanoid } from "nanoid"

// Mock users
const MOCK_USERS = [
  {
    id: nanoid(),
    name: "김개발",
    email: "dev@test.com",
    emailVerified: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dev",
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
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=designer",
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
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=founder",
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
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=marketer",
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
    banned: false,
    banReason: null,
    banExpires: null,
    stripeCustomerId: null,
  },
]

// Mock projects
const MOCK_PROJECTS = [
  {
    id: nanoid(),
    name: "CodeFlow AI",
    slug: "codeflow-ai",
    description:
      "AI-powered code review and optimization tool. Automatically analyzes your code for bugs, performance issues, and best practices. Supports 20+ programming languages.",
    websiteUrl: "https://codeflow-ai.com",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=codeflow",
    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    productImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
    githubUrl: "https://github.com/example/codeflow-ai",
    twitterUrl: "https://twitter.com/codeflow_ai",
    techStack: ["TypeScript", "Python", "TensorFlow", "React", "Node.js"],
    pricing: "freemium",
    platforms: ["web", "api"],
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
    name: "DesignHub",
    slug: "designhub",
    description:
      "Collaborative design platform for teams. Create, share, and iterate on designs in real-time. Built-in version control and feedback system.",
    websiteUrl: "https://designhub.io",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=designhub",
    coverImageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    productImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200",
    githubUrl: null,
    twitterUrl: "https://twitter.com/designhub",
    techStack: ["React", "WebRTC", "PostgreSQL", "Redis", "WebGL"],
    pricing: "paid",
    platforms: ["web", "desktop"],
    launchStatus: "launched",
    scheduledLaunchDate: new Date(Date.now() - 86400000), // Yesterday
    launchType: "premium_plus",
    featuredOnHomepage: true,
    dailyRanking: 2,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: nanoid(),
    name: "TaskMaster Pro",
    slug: "taskmaster-pro",
    description:
      "The ultimate productivity app for remote teams. Manage tasks, track time, and collaborate seamlessly. Integrates with 50+ tools.",
    websiteUrl: "https://taskmaster.pro",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=taskmaster",
    coverImageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    productImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200",
    githubUrl: "https://github.com/example/taskmaster",
    twitterUrl: "https://twitter.com/taskmaster_pro",
    techStack: ["Next.js", "Tailwind", "Prisma", "PostgreSQL"],
    pricing: "freemium",
    platforms: ["web", "mobile"],
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
    name: "DataViz Studio",
    slug: "dataviz-studio",
    description:
      "Turn your data into beautiful interactive visualizations. No coding required. Drag-and-drop interface with powerful analytics.",
    websiteUrl: "https://dataviz.studio",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=dataviz",
    coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    productImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    githubUrl: null,
    twitterUrl: "https://twitter.com/dataviz_studio",
    techStack: ["D3.js", "React", "Python", "FastAPI"],
    pricing: "paid",
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
    name: "APIfy",
    slug: "apify",
    description:
      "Build and deploy REST APIs in minutes. Auto-generate documentation, handle authentication, and scale effortlessly.",
    websiteUrl: "https://apify.dev",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=apify",
    coverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    productImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
    githubUrl: "https://github.com/example/apify",
    twitterUrl: "https://twitter.com/apify_dev",
    techStack: ["Go", "Docker", "Kubernetes", "PostgreSQL"],
    pricing: "freemium",
    platforms: ["api"],
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
    name: "SecureVault",
    slug: "securevault",
    description:
      "End-to-end encrypted password manager with zero-knowledge architecture. Your data, your control. Works offline.",
    websiteUrl: "https://securevault.app",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=secure",
    coverImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    productImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200",
    githubUrl: "https://github.com/example/securevault",
    twitterUrl: "https://twitter.com/securevault_app",
    techStack: ["Rust", "React Native", "SQLite", "WebCrypto"],
    pricing: "freemium",
    platforms: ["web", "mobile", "desktop"],
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
    name: "MLOps Platform",
    slug: "mlops-platform",
    description:
      "Complete MLOps solution for data science teams. Train, deploy, and monitor ML models at scale. Built for production.",
    websiteUrl: "https://mlops.platform",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=mlops",
    coverImageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    productImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200",
    githubUrl: null,
    twitterUrl: "https://twitter.com/mlops_platform",
    techStack: ["Python", "TensorFlow", "PyTorch", "Kubernetes", "MLflow"],
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
    name: "NoCode Builder",
    slug: "nocode-builder",
    description:
      "Build web apps without writing code. Visual programming interface with powerful logic engine. Deploy anywhere.",
    websiteUrl: "https://nocode-builder.com",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=nocode",
    coverImageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    productImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
    githubUrl: null,
    twitterUrl: "https://twitter.com/nocode_builder",
    techStack: ["Vue.js", "Node.js", "MongoDB"],
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

async function seedMockData() {
  console.log("🌱 목 데이터 생성 시작...")

  try {
    // 1. 사용자 생성
    console.log("👤 사용자 생성 중...")
    const insertedUsers = await db.insert(user).values(MOCK_USERS).returning()
    console.log(`✅ ${insertedUsers.length}명의 사용자 생성 완료`)

    // 2. 프로젝트 생성 (사용자 ID 할당)
    console.log("📦 프로젝트 생성 중...")
    const projectsWithUsers = MOCK_PROJECTS.map((proj, idx) => ({
      ...proj,
      createdBy: insertedUsers[idx % insertedUsers.length].id,
    }))
    const insertedProjects = await db.insert(project).values(projectsWithUsers).returning()
    console.log(`✅ ${insertedProjects.length}개의 프로젝트 생성 완료`)

    // 3. 카테고리 매핑
    console.log("🏷️  카테고리 매핑 중...")
    const categories = await db.query.category.findMany()
    const categoryMappings = [
      { projectIdx: 0, categoryIds: ["ai", "developer-tools", "saas"] }, // CodeFlow AI
      { projectIdx: 1, categoryIds: ["design-tools", "ui-ux", "saas"] }, // DesignHub
      { projectIdx: 2, categoryIds: ["productivity", "saas", "marketing-tools"] }, // TaskMaster
      { projectIdx: 3, categoryIds: ["data-science", "analytics", "saas"] }, // DataViz
      { projectIdx: 4, categoryIds: ["api", "developer-tools", "devops"] }, // APIfy
      { projectIdx: 5, categoryIds: ["security", "mobile-dev", "saas"] }, // SecureVault
      { projectIdx: 6, categoryIds: ["machine-learning", "ai", "devops"] }, // MLOps
      { projectIdx: 7, categoryIds: ["cms", "web-dev", "saas"] }, // NoCode Builder
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
    console.log("👍 투표 생성 중...")
    const votes = []
    for (let i = 0; i < insertedProjects.length; i++) {
      const proj = insertedProjects[i]
      // 각 프로젝트에 랜덤 투표 수 (5-30)
      const voteCount = Math.floor(Math.random() * 26) + 5
      for (let j = 0; j < voteCount; j++) {
        const voter = insertedUsers[j % insertedUsers.length]
        votes.push({
          id: nanoid(),
          projectId: proj.id,
          userId: voter.id,
          createdAt: new Date(Date.now() - Math.random() * 86400000), // 지난 24시간 내 랜덤
        })
      }
    }
    await db.insert(upvote).values(votes)
    console.log(`✅ ${votes.length}개의 투표 생성 완료`)

    console.log("\n🎉 목 데이터 생성 완료!")
    console.log("\n📊 생성된 데이터:")
    console.log(`   - 사용자: ${insertedUsers.length}명`)
    console.log(`   - 프로젝트: ${insertedProjects.length}개`)
    console.log(`   - 카테고리 매핑: ${mappings.length}개`)
    console.log(`   - 투표: ${votes.length}개`)
    console.log("\n💡 테스트 계정:")
    console.log("   - dev@test.com (관리자)")
    console.log("   - designer@test.com")
    console.log("   - founder@test.com")
    console.log("   - marketer@test.com")
  } catch (error) {
    console.error("❌ 에러 발생:", error)
    throw error
  }
}

// 실행
seedMockData()
  .then(() => {
    console.log("\n✅ 시드 스크립트 완료")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ 시드 스크립트 실패:", error)
    process.exit(1)
  })

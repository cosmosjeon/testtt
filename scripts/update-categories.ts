import { db } from "@/drizzle/db"
import { category } from "@/drizzle/db/schema"
import { eq } from "drizzle-orm"

const CATEGORY_UPDATES = [
  // Development & IT
  { id: "developer-tools", name: "개발자 도구" },
  { id: "api", name: "API & 통합" },
  { id: "open-source", name: "오픈소스" },
  { id: "web-dev", name: "웹 개발" },
  { id: "mobile-dev", name: "모바일 개발" },
  { id: "devops", name: "DevOps & 클라우드" },
  { id: "databases", name: "데이터베이스" },
  { id: "testing-qa", name: "테스팅 & QA" },
  { id: "cms", name: "CMS & 노코드" },

  // AI & Data Science
  { id: "ai", name: "인공지능" },
  { id: "machine-learning", name: "머신러닝" },
  { id: "data-science", name: "데이터 과학 & 분석" },
  { id: "nlp", name: "자연어 처리" },

  // Design & UX
  { id: "design-tools", name: "디자인 도구" },
  { id: "ui-ux", name: "UI/UX" },
  { id: "prototyping", name: "프로토타이핑" },
  { id: "graphics", name: "그래픽 & 일러스트" },

  // Business & Marketing
  { id: "saas", name: "SaaS" },
  { id: "marketing-tools", name: "마케팅 도구" },
  { id: "sales-tools", name: "영업 도구" },
  { id: "productivity", name: "생산성" },
  { id: "finance-tech", name: "금융 & 핀테크" },
  { id: "ecommerce", name: "이커머스" },
  { id: "analytics", name: "비즈니스 분석" },

  // Hardware & IoT
  { id: "hardware", name: "하드웨어" },
  { id: "iot", name: "사물인터넷 (IoT)" },
  { id: "robotics", name: "로보틱스" },
  { id: "wearables", name: "웨어러블" },

  // Niche & Emerging Tech
  { id: "blockchain", name: "블록체인 & 암호화폐" },
  { id: "ar-vr", name: "AR/VR" },
  { id: "gaming", name: "게임 기술" },
  { id: "edtech", name: "교육 기술" },
  { id: "healthtech", name: "헬스케어 기술" },
  { id: "greentech", name: "친환경 기술" },

  // Platforms & Infrastructure
  { id: "platform", name: "플랫폼" },
  { id: "serverless", name: "서버리스" },
  { id: "security", name: "보안" },
]

const updateCategories = async () => {
  console.log("🔄 카테고리 업데이트 시작...")

  try {
    for (const cat of CATEGORY_UPDATES) {
      await db.update(category).set({ name: cat.name }).where(eq(category.id, cat.id))
      console.log(`✅ ${cat.id} → ${cat.name}`)
    }

    console.log("\n🎉 모든 카테고리가 한글로 업데이트되었습니다!")
  } catch (error) {
    console.error("❌ 에러 발생:", error)
    throw error
  }
}

// 실행
updateCategories()
  .then(() => {
    console.log("\n✅ 카테고리 업데이트 완료")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n❌ 카테고리 업데이트 실패:", error)
    process.exit(1)
  })

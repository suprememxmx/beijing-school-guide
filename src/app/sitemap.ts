import type { MetadataRoute } from "next"
import { getContentFiles } from "@/lib/content"
import { CONTENT_CATEGORIES, STAGES, DISTRICTS } from "@/lib/constants"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bjsxzn.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/schools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Stage pages
    ...STAGES.map((stage) => ({
      url: `${SITE_URL}/stage/${stage.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: stage.active ? 0.9 : 0.3,
    })),
    // District pages
    ...DISTRICTS.map((district) => ({
      url: `${SITE_URL}/district/${district.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]

  // Category pages
  for (const cat of CONTENT_CATEGORIES) {
    entries.push({
      url: `${SITE_URL}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  }

  // Article pages (guides + policies)
  for (const cat of ["guides", "policies"] as const) {
    const items = getContentFiles(cat)
    for (const item of items) {
      entries.push({
        url: `${SITE_URL}/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }
  }

  // School pages
  const schools = getContentFiles("schools")
  for (const school of schools) {
    entries.push({
      url: `${SITE_URL}/schools/${school.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  }

  // Comparison pages
  const comparisons = getContentFiles("comparisons")
  for (const comparison of comparisons) {
    entries.push({
      url: `${SITE_URL}/comparison/${comparison.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  }

  return entries
}

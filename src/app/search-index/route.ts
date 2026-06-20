import { NextResponse } from "next/server"
import { getAllContent } from "@/lib/content"

export const dynamic = "force-static"

export async function GET() {
  const allContent = getAllContent()

  const index = allContent.map((item) => ({
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    slug: item.slug,
    category: item.frontmatter.category,
    tags: item.frontmatter.tags || [],
    district: item.frontmatter.district || "",
    schoolType: item.frontmatter.schoolType || "",
  }))

  return NextResponse.json(index)
}

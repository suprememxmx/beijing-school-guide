export type ContentType = "guides" | "policies" | "comparisons" | "schools"
export type Stage = "preschool-to-primary" | "primary-to-middle" | "high-school"

export interface ContentFrontmatter {
  title: string
  slug: string
  description: string
  category: ContentType
  stage?: Stage
  city?: string
  district?: string
  schoolType?: string
  tags: string[]
  publishedAt: string
  featuredImage?: string
}

export interface SchoolFrontmatter extends ContentFrontmatter {
  category: "schools"
  stage: Stage
  district: string
  schoolType: "public" | "private" | "international"
  address?: string
  website?: string
  features: string[]
}

export interface ArticleFrontmatter extends ContentFrontmatter {
  category: "guides" | "policies" | "comparisons"
  stage: Stage
}

export type PageFrontmatter = SchoolFrontmatter | ArticleFrontmatter

export interface ContentItem<T = PageFrontmatter> {
  frontmatter: T
  content: string
  slug: string
}

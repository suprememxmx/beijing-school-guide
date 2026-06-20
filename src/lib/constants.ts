import type { Stage } from "@/types/content"

export const SITE_NAME = "北京升学指南"
export const SITE_DESCRIPTION = "北京升学一站式信息站，覆盖幼升小、小升初、中考等阶段，帮助家长了解入学政策、学校信息、择校方法"
export const SITE_URL = "https://bjsxzn.com" // 临时占位，后续可改
export const SITE_LOCALE = "zh-CN"

export const STAGES: Array<{ slug: Stage; name: string; description: string; active: boolean }> = [
  { slug: "preschool-to-primary", name: "幼升小", description: "幼儿园 → 小学", active: true },
  { slug: "primary-to-middle", name: "小升初", description: "小学 → 初中", active: false },
  { slug: "high-school", name: "中考", description: "初中 → 高中", active: false },
] as const

export const DISTRICTS = [
  { slug: "haidian", name: "海淀区" },
  { slug: "xicheng", name: "西城区" },
  { slug: "dongcheng", name: "东城区" },
  { slug: "chaoyang", name: "朝阳区" },
  { slug: "fengtai", name: "丰台区" },
  { slug: "shijingshan", name: "石景山区" },
  { slug: "tongzhou", name: "通州区" },
  { slug: "daxing", name: "大兴区" },
  { slug: "shunyi", name: "顺义区" },
  { slug: "changping", name: "昌平区" },
] as const

export const SCHOOL_TYPES: Array<{ slug: string; name: string }> = [
  { slug: "public", name: "公立" },
  { slug: "private", name: "私立" },
  { slug: "international", name: "国际" },
] as const

export const CONTENT_CATEGORIES = [
  { slug: "guides", name: "择校指南", description: "择校方法论、实操指南" },
  { slug: "policies", name: "政策解读", description: "最新入学政策分析" },
  { slug: "comparisons", name: "学校对比", description: "学校之间的多维度对比" },
  { slug: "schools", name: "学校档案", description: "北京各学校详细介绍" },
] as const

export type DistrictSlug = (typeof DISTRICTS)[number]["slug"]
export type CategorySlug = (typeof CONTENT_CATEGORIES)[number]["slug"]

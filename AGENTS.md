<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 北京升学指南（bjsxzn.com）

北京升学信息站，覆盖幼升小、小升初、初升高（中考）。中文内容站，内容靠 MD + SSG 产出。

## 站点概况
- 部署：Vercel，`git push` 到 https://github.com/suprememxmx/beijing-school-guide 自动部署。
- 技术栈：Next.js 16 + Tailwind CSS 4 + TypeScript；内容用 gray-matter + remark 读取，SSG 静态生成。
- 页面：`/`、`/[slug]`、`/schools`、`/schools/[slug]`、`/category/[slug]`、`/comparison/[slug]`、`/stage/[slug]`、`/district/[slug]`、`/search`（客户端过滤 `/search-index` JSON）。
- 中文字体用系统字体（Google Fonts 国内不可用）；右侧固定卡片 + 手机浮动按钮放公众号 primaming。

## 内容结构
- `content/guides`（约 145 篇）、`content/policies`、`content/comparisons`、`content/schools`（45 篇学校档案）。
- frontmatter：title、slug、category、stage、city、district、schoolType、tags、publishedAt、description。
- `stage`：`preschool-to-primary` / `primary-to-middle` / `middle-to-high`。
- 完成度：幼升小 ≈85%、小升初 ≈60%、初升高 ≈45%（初升高最缺，优先补）。

## SEO / 收录
- Google Search Console 已绑、sitemap.xml 已提交；百度已验证 + 自动推送代码已加。
- 百度手动提交记录在 `.baidu-submit-log.json`（只提 `unsubmittedUrls`，别重复提交）。

## 内容校准（cheat-on-content）
- `.cheat-state.json`、`predictions/`、`rubric-memo.md`、`benchmark.md`、`script_patterns.md`、`audience.md` 是校准闭环的状态文件，`predictions/` 里的预测段**不可改**。
- `.claude/settings.json` 里的 cheat hooks 是 Claude Code 专用，在 DSH 里不会自动执行——改动 `predictions/` 前要自己守住"预测段不可变"。
- 最近状态：calibration_samples 30，in_progress 指向 `predictions/2026-06-23_481f18435c4e_高考交易.md`。

## 日常操作
- 改内容后：`pnpm build` 验证，再 `git add -A && git commit -m "..." && git push`。
- 写内容要求：真实准确，政策以官方发布为准；详细工整，不敷衍。


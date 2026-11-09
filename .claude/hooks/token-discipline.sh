#!/usr/bin/env bash
# Token discipline SessionStart hook — 每次开会话自动提醒，防止长会话烧缓存读
# 与 cheat-on-content 托管 hook 分开，独立挂载，删除本文件即关闭。
cat << 'EOF'
💸 token 纪律提醒：写公众号/长文要精简生产——一次到位、少来回、自己想办法，别靠多轮对话和反复读上下文烧钱。长任务中途用 /compact，干完就关会话。
EOF

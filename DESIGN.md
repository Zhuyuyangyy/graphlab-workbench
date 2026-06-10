# GraphLab Design Notes

## Visual Direction

科研档案纸面 + 分析指挥台。底色像研究手稿和网格纸，关键数据与图谱节点使用克制但高识别度的红、青、绿、金色。整体要有比赛方案的可信度，不追求夸张的未来感。

## Color Strategy

采用 full palette，但主背景保持低饱和暖纸色。重点色只用于状态、节点类型、趋势线和可点击焦点。

- Paper: warm off-white, not pure white.
- Ink: near-black with warm tint, not pure black.
- Role red: used for岗位、当前焦点、关键趋势。
- Skill cyan: used for能力节点和数据能力。
- Evidence gold: used for数据源、证据链。
- Governance green: used for稳定增长与系统可信感。

## Typography

中文标题使用高字重无衬线，强调研究题目的力量感。英文和数字使用 Georgia 类衬线字体，形成学术报告感。正文保持 14-16px，行高 1.55-1.75。

## Layout

- 左侧固定叙事导航。
- 主区域按录屏讲解顺序从上到下组织。
- 图谱是视觉主角，必须大、清楚、可聚焦。
- 右侧用于岗位推演和雷达图，强调“点击岗位后结果变化”。
- 底部趋势图承接“动态演化”主题。

## Motion

动效只用于状态反馈：节点聚焦、自动演示、卡片进入、趋势点变化。避免弹跳和过度转场，使用 transform 和 opacity。

## Accessibility

按钮和交互元素要有 44px 以上点击区域。图表颜色不能成为唯一信息来源，需要配合标签和图例。移动端不能横向溢出。

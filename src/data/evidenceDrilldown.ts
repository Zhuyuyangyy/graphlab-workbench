import type { DrilldownDefinition } from "../types/domain";

export const drilldownDefinitions: DrilldownDefinition[] = [
  {
    nodeId: "business",
    definition: "把岗位任务、业务场景和能力要求翻译成可建模的分析对象。",
    evidences: [
      { sourceId: "job", excerpt: "JD 高频出现“理解业务流程并拆解 AI 落地场景”。", roleIds: ["ai-pm"] },
      { sourceId: "contest", excerpt: "赛题要求从岗位需求中抽取任务链和能力标签。", roleIds: ["ai-pm", "knowledge-analyst"] },
      { sourceId: "report", excerpt: "行业报告把复合型岗位定义为“业务语境 + 数据推理”。", roleIds: ["ai-pm"] },
    ],
  },
  {
    nodeId: "prototype",
    definition: "把分析结论转成可验证的信息架构、流程原型和交互证据。",
    evidences: [
      { sourceId: "job", excerpt: "产品岗要求能独立完成低保真原型和需求验收标准。", roleIds: ["ai-pm"] },
      { sourceId: "course", excerpt: "课程大纲把“原型验证”放在数据产品设计模块。", roleIds: ["ai-pm"] },
      { sourceId: "contest", excerpt: "竞赛任务强调用可视化页面呈现岗位能力推理过程。", roleIds: ["ai-pm"] },
    ],
  },
  {
    nodeId: "aigc",
    definition: "围绕 AIGC 工具、提示词和智能体工作流构建岗位能力证据。",
    evidences: [
      { sourceId: "job", excerpt: "招聘 JD 写明“熟悉 AIGC 工具并能改造业务流程”。", roleIds: ["ai-pm"] },
      { sourceId: "paper", excerpt: "论文摘要显示 AIGC 应用从内容生成转向流程协同。", roleIds: ["ai-pm", "knowledge-analyst"] },
      { sourceId: "report", excerpt: "2024 后行业报告中“场景产品化”与 AIGC 共现显著上升。", roleIds: ["ai-pm"] },
      { sourceId: "contest", excerpt: "赛题要求解释能力需求随技术窗口变化的原因。", roleIds: ["ai-pm", "knowledge-analyst"] },
    ],
  },
  {
    nodeId: "data",
    definition: "从多源文本中抽取、聚合并解释岗位相关的数据能力。",
    evidences: [
      { sourceId: "job", excerpt: "JD 要求能用 SQL、BI 和指标体系支撑产品判断。", roleIds: ["ai-pm", "data-engineer"] },
      { sourceId: "course", excerpt: "课程大纲覆盖数据分析、数据仓库和质量评估。", roleIds: ["data-engineer"] },
      { sourceId: "resume", excerpt: "学生简历中项目经历常以指标分析和看板呈现。", roleIds: ["ai-pm", "data-engineer"] },
    ],
  },
  {
    nodeId: "etl",
    definition: "把招聘、课程、论文等异构文本清洗成统一字段与稳定管道。",
    evidences: [
      { sourceId: "job", excerpt: "数据开发岗明确要求建设 ETL 管道和调度任务。", roleIds: ["data-engineer"] },
      { sourceId: "course", excerpt: "课程模块包含数据采集、清洗、装载和质量校验。", roleIds: ["data-engineer"] },
      { sourceId: "resume", excerpt: "候选项目经历出现“Airflow 调度”和“增量同步”。", roleIds: ["data-engineer"] },
    ],
  },
  {
    nodeId: "governance",
    definition: "保证多源岗位证据的口径一致、来源可信和质量可控。",
    evidences: [
      { sourceId: "job", excerpt: "企业侧强调数据标准、血缘、权限和质量监控经验。", roleIds: ["data-engineer"] },
      { sourceId: "report", excerpt: "行业报告指出复合岗位评价需要统一标签口径。", roleIds: ["data-engineer", "knowledge-analyst"] },
      { sourceId: "course", excerpt: "培养方案把数据治理纳入数据工程核心能力。", roleIds: ["data-engineer"] },
    ],
  },
  {
    nodeId: "stream",
    definition: "处理实时岗位需求信号和持续更新的能力热度变化。",
    evidences: [
      { sourceId: "job", excerpt: "数据开发岗要求熟悉实时计算、消息队列和监控链路。", roleIds: ["data-engineer"] },
      { sourceId: "report", excerpt: "行业报告提到岗位需求窗口缩短，需要准实时更新。", roleIds: ["data-engineer"] },
      { sourceId: "contest", excerpt: "赛题强调动态图谱更新，而非一次性静态展示。", roleIds: ["data-engineer", "knowledge-analyst"] },
    ],
  },
  {
    nodeId: "sql",
    definition: "用 SQL 和仓库模型支撑岗位匹配、能力统计和证据回溯。",
    evidences: [
      { sourceId: "job", excerpt: "招聘需求高频出现 SQL、数仓建模和指标口径维护。", roleIds: ["data-engineer"] },
      { sourceId: "course", excerpt: "数据库与数据仓库课程提供结构化查询能力基础。", roleIds: ["data-engineer"] },
      { sourceId: "resume", excerpt: "简历项目常用 SQL 解释用户行为和岗位画像。", roleIds: ["ai-pm", "data-engineer"] },
    ],
  },
  {
    nodeId: "kg",
    definition: "把岗位、能力、证据和时间组织成可追溯关系网络。",
    evidences: [
      { sourceId: "paper", excerpt: "论文摘要集中讨论实体关系抽取与图谱补全方法。", roleIds: ["knowledge-analyst"] },
      { sourceId: "course", excerpt: "课程大纲设置知识表示、图数据库和语义建模内容。", roleIds: ["knowledge-analyst"] },
      { sourceId: "contest", excerpt: "赛题要求构建岗位和能力图谱并解释动态演化。", roleIds: ["knowledge-analyst"] },
    ],
  },
  {
    nodeId: "nlp",
    definition: "从 JD、课纲、论文摘要中抽取岗位、技能、任务和工具实体。",
    evidences: [
      { sourceId: "paper", excerpt: "研究摘要关注命名实体识别、关系抽取和语义匹配。", roleIds: ["knowledge-analyst"] },
      { sourceId: "contest", excerpt: "赛题原始资料需要从文本中抽出岗位与能力短语。", roleIds: ["knowledge-analyst"] },
      { sourceId: "course", excerpt: "自然语言处理课程覆盖分词、分类和信息抽取。", roleIds: ["knowledge-analyst"] },
    ],
  },
  {
    nodeId: "neo4j",
    definition: "承载岗位能力关系查询、路径追踪和图谱可视分析。",
    evidences: [
      { sourceId: "job", excerpt: "图谱分析岗位要求熟悉 Neo4j、Cypher 或图数据库。", roleIds: ["knowledge-analyst"] },
      { sourceId: "paper", excerpt: "图数据库被用于存储多跳关系和证据路径。", roleIds: ["knowledge-analyst"] },
      { sourceId: "course", excerpt: "知识图谱实践课包含图数据库建模与查询。", roleIds: ["knowledge-analyst"] },
    ],
  },
  {
    nodeId: "reasoning",
    definition: "用路径、共现和规则推断岗位与能力之间的隐性关系。",
    evidences: [
      { sourceId: "paper", excerpt: "论文摘要强调关系推理能补足稀疏证据链。", roleIds: ["knowledge-analyst"] },
      { sourceId: "report", excerpt: "行业报告把“可解释推荐”列为人才分析系统关键能力。", roleIds: ["knowledge-analyst"] },
      { sourceId: "contest", excerpt: "赛题要求输出岗位匹配和能力缺口的解释依据。", roleIds: ["knowledge-analyst", "ai-pm"] },
    ],
  },
  {
    nodeId: "prompt",
    definition: "把岗位任务转写为可复用的提示词、评测样例和工作流指令。",
    evidences: [
      { sourceId: "job", excerpt: "AI 产品岗位要求能设计 Prompt 并沉淀业务模板。", roleIds: ["ai-pm"] },
      { sourceId: "paper", excerpt: "研究摘要把提示工程视为模型应用落地的中间层。", roleIds: ["ai-pm", "knowledge-analyst"] },
      { sourceId: "contest", excerpt: "竞赛材料要求说明 AIGC 工具如何服务岗位任务。", roleIds: ["ai-pm"] },
    ],
  },
  {
    nodeId: "agent",
    definition: "将模型、工具调用、记忆和评测组织成可执行的智能体流程。",
    evidences: [
      { sourceId: "paper", excerpt: "论文摘要中 Agent 编排与工具调用共现频次上升。", roleIds: ["ai-pm", "knowledge-analyst"] },
      { sourceId: "job", excerpt: "新兴岗位要求能设计智能体工作流并验证效果。", roleIds: ["ai-pm"] },
      { sourceId: "contest", excerpt: "赛题希望前端能展示自动化分析链路而非静态页面。", roleIds: ["ai-pm", "knowledge-analyst"] },
    ],
  },
  {
    nodeId: "evaluation",
    definition: "用指标、样例和人工复核评估模型或图谱推理结果是否可信。",
    evidences: [
      { sourceId: "job", excerpt: "企业要求建立模型效果评测、灰度验证和反馈闭环。", roleIds: ["ai-pm", "knowledge-analyst"] },
      { sourceId: "paper", excerpt: "论文摘要讨论知识抽取结果的准确率和可解释性评估。", roleIds: ["knowledge-analyst"] },
      { sourceId: "contest", excerpt: "赛题评分关注页面效果与设计思路是否能自证。", roleIds: ["ai-pm"] },
    ],
  },
  {
    nodeId: "privacy",
    definition: "处理简历、招聘和课程数据时保持权限、脱敏和合规边界。",
    evidences: [
      { sourceId: "job", excerpt: "数据岗位要求理解隐私保护、权限控制和数据安全规范。", roleIds: ["data-engineer"] },
      { sourceId: "report", excerpt: "行业报告强调人才数据分析需要可审计的数据治理链路。", roleIds: ["data-engineer"] },
      { sourceId: "resume", excerpt: "学生简历作为证据源时需要脱敏后才能进入图谱。", roleIds: ["data-engineer", "knowledge-analyst"] },
    ],
  },
  {
    nodeId: "viz",
    definition: "用联动视图把岗位、能力、证据和时间变化解释清楚。",
    evidences: [
      { sourceId: "contest", excerpt: "前端考核强调页面效果和设计思路，需要可视化表达。", roleIds: ["ai-pm", "knowledge-analyst"] },
      { sourceId: "job", excerpt: "岗位要求能用看板表达指标、缺口和趋势判断。", roleIds: ["ai-pm", "data-engineer"] },
      { sourceId: "report", excerpt: "行业报告建议用可解释图表辅助人才培养决策。", roleIds: ["ai-pm", "knowledge-analyst"] },
    ],
  },
  {
    nodeId: "feature",
    definition: "从岗位文本和能力标签中构造可计算、可比较的特征。",
    evidences: [
      { sourceId: "job", excerpt: "数据岗位需要把业务字段转成稳定特征并服务模型训练。", roleIds: ["data-engineer"] },
      { sourceId: "course", excerpt: "机器学习课程强调特征工程、数据清洗和验证集构建。", roleIds: ["data-engineer"] },
      { sourceId: "resume", excerpt: "简历项目中常见特征构造、样本标注和指标提升描述。", roleIds: ["data-engineer"] },
    ],
  },
  {
    nodeId: "bi",
    definition: "把岗位画像和能力热度沉淀成面向评审的指标看板。",
    evidences: [
      { sourceId: "job", excerpt: "JD 要求熟悉 BI 工具并能建设管理驾驶舱。", roleIds: ["ai-pm", "data-engineer"] },
      { sourceId: "resume", excerpt: "候选简历多用 BI 看板展示业务指标和数据结论。", roleIds: ["data-engineer"] },
      { sourceId: "course", excerpt: "数据分析课程包含可视化报表和指标体系设计。", roleIds: ["ai-pm", "data-engineer"] },
    ],
  },
  {
    nodeId: "job",
    definition: "招聘 JD 是岗位需求和技能热度的主证据入口。",
    evidences: [
      { sourceId: "job", excerpt: "AI 产品经理 JD 明确要求 AIGC 工具链和原型验证。", roleIds: ["ai-pm"] },
      { sourceId: "job", excerpt: "数据开发 JD 集中出现 ETL、治理、实时计算和数仓。", roleIds: ["data-engineer"] },
      { sourceId: "job", excerpt: "图谱分析 JD 要求实体抽取、关系建模和图数据库经验。", roleIds: ["knowledge-analyst"] },
    ],
  },
  {
    nodeId: "course",
    definition: "课程大纲提供培养侧能力供给和知识模块证据。",
    evidences: [
      { sourceId: "course", excerpt: "数据仓库课程覆盖 SQL、建模和 ETL 实践。", roleIds: ["data-engineer"] },
      { sourceId: "course", excerpt: "知识图谱课程覆盖实体抽取、图数据库和关系推理。", roleIds: ["knowledge-analyst"] },
      { sourceId: "course", excerpt: "产品设计课程把原型验证和数据分析放入综合项目。", roleIds: ["ai-pm"] },
    ],
  },
  {
    nodeId: "paper",
    definition: "论文摘要补充前沿技术方向和能力演化依据。",
    evidences: [
      { sourceId: "paper", excerpt: "近年摘要中 Agent、评测和工具调用主题显著增加。", roleIds: ["ai-pm", "knowledge-analyst"] },
      { sourceId: "paper", excerpt: "知识图谱研究持续关注抽取、补全和关系推理。", roleIds: ["knowledge-analyst"] },
      { sourceId: "paper", excerpt: "模型应用研究强调评测数据集和可解释结果。", roleIds: ["ai-pm", "knowledge-analyst"] },
    ],
  },
  {
    nodeId: "contest",
    definition: "竞赛题库提供问题场景、评价标准和展示约束。",
    evidences: [
      { sourceId: "contest", excerpt: "赛题要求用多源异构数据构建岗位能力图谱。", roleIds: ["knowledge-analyst"] },
      { sourceId: "contest", excerpt: "前端考核强调页面效果和设计思路，需要可录屏演示。", roleIds: ["ai-pm"] },
      { sourceId: "contest", excerpt: "动态演化分析要求时间轴能体现能力需求变化。", roleIds: ["ai-pm", "knowledge-analyst"] },
    ],
  },
  {
    nodeId: "resume",
    definition: "学生简历提供候选能力、项目经历和培养成效侧证据。",
    evidences: [
      { sourceId: "resume", excerpt: "简历项目经历常出现 SQL、BI 看板和数据分析任务。", roleIds: ["data-engineer", "ai-pm"] },
      { sourceId: "resume", excerpt: "部分候选人描述 AIGC 应用、Prompt 模板和模型评测。", roleIds: ["ai-pm"] },
      { sourceId: "resume", excerpt: "图谱项目经历包含实体抽取、Neo4j 和关系查询。", roleIds: ["knowledge-analyst"] },
    ],
  },
  {
    nodeId: "report",
    definition: "行业报告提供需求窗口、趋势拐点和岗位结构变化证据。",
    evidences: [
      { sourceId: "report", excerpt: "2024 后“场景产品化”与 AIGC 能力需求同步上升。", roleIds: ["ai-pm"] },
      { sourceId: "report", excerpt: "企业数据治理岗位从建设管道转向质量和合规并重。", roleIds: ["data-engineer"] },
      { sourceId: "report", excerpt: "知识图谱能力被纳入复合型数据人才画像。", roleIds: ["knowledge-analyst"] },
    ],
  },
  {
    nodeId: "standard",
    definition: "技能标准用于校准能力名称、等级和评价口径。",
    evidences: [
      { sourceId: "course", excerpt: "培养标准要求把数据安全、治理和评测纳入能力矩阵。", roleIds: ["data-engineer"] },
      { sourceId: "report", excerpt: "行业标准强调技能标签需要跨岗位统一定义。", roleIds: ["knowledge-analyst"] },
      { sourceId: "contest", excerpt: "赛题输出需要岗位匹配、能力缺口和培养建议同口径。", roleIds: ["ai-pm", "knowledge-analyst"] },
    ],
  },
  {
    nodeId: "patent",
    definition: "专利简报补充技术方案、工具链和前沿应用信号。",
    evidences: [
      { sourceId: "paper", excerpt: "专利摘要中出现智能体编排、任务拆解和检索增强。", roleIds: ["ai-pm", "knowledge-analyst"] },
      { sourceId: "report", excerpt: "技术简报显示企业正在把模型能力嵌入业务系统。", roleIds: ["ai-pm"] },
      { sourceId: "job", excerpt: "新岗位 JD 要求理解 AI 工具链和工程化落地路径。", roleIds: ["ai-pm", "data-engineer"] },
    ],
  },
];

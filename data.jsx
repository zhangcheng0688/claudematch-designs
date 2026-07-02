// ============================================================
// ClaudeMatch — Model Data & Mock Content
// ============================================================

const MODELS = [
  {
    id: "opus",
    name: "Opus",
    version: "4.8",
    tagline: "最强大的推理能力",
    description: "Claude Opus 是我们最强大的模型，专为处理高度复杂的任务而设计。它在多步骤推理、数学运算、代码生成和学术分析方面表现卓越，是企业和研究人员的首选。",
    pricing: { input: 15, output: 75 },
    contextWindow: "200K tokens",
    maxOutput: "32K tokens",
    trainingCutoff: "2025年12月",
    modalities: ["文本", "图像", "代码", "工具调用"],
    color: "#AF52DE",
    gradient: "linear-gradient(135deg, #AF52DE 0%, #7B2DDE 100%)",
    icon: "diamond",
    scores: {
      reasoning: 98,
      coding: 95,
      writing: 92,
      analysis: 97,
      speed: 60,
      costEfficiency: 35,
    },
    bestFor: [
      "复杂多步骤推理",
      "高难度代码生成与调试",
      "学术研究与论文撰写",
      "企业级数据分析",
      "金融建模与风险评估",
      "法律文书审阅",
    ],
    reviews: [
      { user: "张明", role: "CTO, 某金融科技公司", rating: 5, text: "Opus 在我们的量化交易系统中表现出色，复杂推理几乎没有失误。虽然价格高，但对核心业务来说完全值得。" },
      { user: "Sarah Chen", role: "研究主管", rating: 5, text: "在多轮学术论证中，Opus 的理解深度远超其他模型，是我们研究团队的得力助手。" },
      { user: "田中 健太", role: "首席架构师", rating: 4.5, text: "代码审查和系统架构建议非常专业，偶尔响应时间稍长，但质量无可挑剔。" },
    ],
    benchmarks: [
      { name: "MMLU", score: "95.2%", rank: 1 },
      { name: "HumanEval", score: "93.8%", rank: 1 },
      { name: "GPQA", score: "88.5%", rank: 1 },
      { name: "MATH", score: "94.1%", rank: 1 },
    ],
  },
  {
    id: "sonnet",
    name: "Sonnet",
    version: "4.6",
    tagline: "性能与效率的最佳平衡",
    description: "Claude Sonnet 在能力和效率之间取得了理想平衡。它适合大多数商业应用场景，从内容创作到软件开发，以合理价格提供出色的输出质量，是日常使用的最佳选择。",
    pricing: { input: 3, output: 15 },
    contextWindow: "200K tokens",
    maxOutput: "16K tokens",
    trainingCutoff: "2025年12月",
    modalities: ["文本", "图像", "代码", "工具调用"],
    color: "#FF9500",
    gradient: "linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)",
    icon: "star",
    scores: {
      reasoning: 88,
      coding: 90,
      writing: 91,
      analysis: 87,
      speed: 78,
      costEfficiency: 70,
    },
    bestFor: [
      "日常软件开发辅助",
      "内容创作与文案撰写",
      "商业报告与分析",
      "客户服务自动化",
      "多语言翻译",
      "产品文档生成",
    ],
    reviews: [
      { user: "Alex Johnson", role: "全栈开发者", rating: 5, text: "Sonnet 是我日常编码的首选，速度快且代码质量高，价格也合理。对于大多数开发任务来说已经足够了。" },
      { user: "李梦", role: "内容总监", rating: 4.5, text: "中文写作质量很高，尤其在营销文案和产品说明方面，比很多竞品都自然流畅。" },
      { user: "Marco Rossi", role: "产品经理", rating: 5, text: "性价比之王。我们团队每天大量使用，效果稳定且成本可控。" },
    ],
    benchmarks: [
      { name: "MMLU", score: "92.1%", rank: 2 },
      { name: "HumanEval", score: "91.5%", rank: 2 },
      { name: "GPQA", score: "84.3%", rank: 2 },
      { name: "MATH", score: "89.7%", rank: 2 },
    ],
  },
  {
    id: "haiku",
    name: "Haiku",
    version: "4.5",
    tagline: "极速响应，轻量高效",
    description: "Claude Haiku 是最轻量、最快速的模型，专为高吞吐量和低延迟场景优化。适合需要实时响应的大规模应用，如聊天机器人、内容审核和简单问答系统。",
    pricing: { input: 0.80, output: 4 },
    contextWindow: "200K tokens",
    maxOutput: "8K tokens",
    trainingCutoff: "2025年10月",
    modalities: ["文本", "代码"],
    color: "#34C759",
    gradient: "linear-gradient(135deg, #34C759 0%, #1DB844 100%)",
    icon: "bolt",
    scores: {
      reasoning: 70,
      coding: 75,
      writing: 78,
      analysis: 68,
      speed: 98,
      costEfficiency: 95,
    },
    bestFor: [
      "大规模客服对话",
      "实时内容审核",
      "简单问答与信息提取",
      "数据标注与分类",
      "社交媒体监控",
      "轻量级代码补全",
    ],
    reviews: [
      { user: "Priya Patel", role: "工程副总裁", rating: 4.5, text: "在我们的客服系统中，Haiku 延迟极低，每天处理百万级对话毫无压力，成本控制非常出色。" },
      { user: "王磊", role: "数据团队负责人", rating: 4, text: "文本分类和信息提取速度惊人，对于简单任务完全够用，复杂场景还需升级到 Sonnet。" },
      { user: "Carlos Mendez", role: "创业公司 CTO", rating: 4.5, text: "作为早期创业公司，Haiku 让我们以极低成本获得 AI 能力，是 MVP 阶段的完美选择。" },
    ],
    benchmarks: [
      { name: "MMLU", score: "85.3%", rank: 3 },
      { name: "HumanEval", score: "82.7%", rank: 3 },
      { name: "GPQA", score: "75.1%", rank: 3 },
      { name: "MATH", score: "78.4%", rank: 3 },
    ],
  },
  {
    id: "fable",
    name: "Fable",
    version: "5",
    tagline: "最新一代创意模型",
    description: "Claude Fable 5 是我们最新推出的模型，针对创意任务和用户体验进行了深度优化。它在故事创作、对话体验和视觉理解方面有独特优势，适合面向终端用户的产品。",
    pricing: { input: 3, output: 15 },
    contextWindow: "200K tokens",
    maxOutput: "16K tokens",
    trainingCutoff: "2026年3月",
    modalities: ["文本", "图像", "代码", "工具调用", "创意生成"],
    color: "#FF375F",
    gradient: "linear-gradient(135deg, #FF375F 0%, #E01A4F 100%)",
    icon: "sparkle",
    scores: {
      reasoning: 82,
      coding: 80,
      writing: 94,
      analysis: 80,
      speed: 75,
      costEfficiency: 65,
    },
    bestFor: [
      "创意写作与故事生成",
      "对话式 AI 产品",
      "品牌内容与广告创意",
      "游戏叙事设计",
      "教育互动内容",
      "多模态内容理解",
    ],
    reviews: [
      { user: "Emma Williams", role: "创意总监", rating: 5, text: "Fable 的创意写作能力令人惊叹。在我们的广告项目中，它产出的文案比人类撰稿人更有灵气。" },
      { user: "陈晓东", role: "游戏制作人", rating: 4.5, text: "NPC 对话和剧情分支的设计非常自然，为我们的 RPG 项目节省了大量创作时间。" },
      { user: "Lucas Bernard", role: "教育科技创始人", rating: 4.5, text: "在互动教学内容生成方面，Fable 的叙事节奏和趣味性远超预期，学生参与度提升了 40%。" },
    ],
    benchmarks: [
      { name: "MMLU", score: "91.2%", rank: 2 },
      { name: "HumanEval", score: "84.3%", rank: 3 },
      { name: "GPQA", score: "81.7%", rank: 3 },
      { name: "MATH", score: "83.5%", rank: 3 },
    ],
  },
];

const COMPARE_DIMENSIONS = [
  { key: "reasoning", label: "推理能力", icon: "brain" },
  { key: "coding", label: "代码能力", icon: "code" },
  { key: "writing", label: "写作质量", icon: "pencil" },
  { key: "analysis", label: "分析能力", icon: "chart" },
  { key: "speed", label: "响应速度", icon: "speed" },
  { key: "costEfficiency", label: "成本效率", icon: "dollar" },
];

const USE_CASES = [
  { id: "enterprise", label: "企业应用", icon: "building" },
  { id: "development", label: "软件开发", icon: "code" },
  { id: "content", label: "内容创作", icon: "pencil" },
  { id: "research", label: "学术研究", icon: "book" },
  { id: "customer", label: "客户服务", icon: "chat" },
  { id: "creative", label: "创意设计", icon: "sparkle" },
];

const CATEGORIES = [
  { id: "all", label: "全部" },
  { id: "top", label: "顶级性能" },
  { id: "balanced", label: "均衡之选" },
  { id: "fast", label: "极速响应" },
  { id: "creative", label: "创意优先" },
];

const FEATURED_COLLECTIONS = [
  { id: "enterprise", title: "企业级部署", description: "选择最适合你业务规模的模型", models: ["opus", "sonnet"] },
  { id: "startup", title: "初创团队推荐", description: "高性价比方案，快速启动 AI 能力", models: ["sonnet", "haiku"] },
  { id: "creative", title: "创意工作室", description: "释放创意潜能的最佳组合", models: ["fable", "sonnet"] },
];

// Assign categories to each model
const modelCategories = {
  opus: ["all", "top"],
  sonnet: ["all", "balanced", "top"],
  haiku: ["all", "fast"],
  fable: ["all", "creative", "balanced"],
};

const modelPricingTiers = [
  { name: "Opus 4.8", input: "$15.00", output: "$75.00", inputCents: 15.00, outputCents: 75.00 },
  { name: "Sonnet 4.6", input: "$3.00", output: "$15.00", inputCents: 3.00, outputCents: 15.00 },
  { name: "Fable 5", input: "$3.00", output: "$15.00", inputCents: 3.00, outputCents: 15.00 },
  { name: "Haiku 4.5", input: "$0.80", output: "$4.00", inputCents: 0.80, outputCents: 4.00 },
];

function getModelById(id) {
  return MODELS.find(m => m.id === id);
}

function getModelsByCategory(catId) {
  if (catId === "all") return [...MODELS];
  return MODELS.filter(m => modelCategories[m.id].includes(catId));
}

function getTopPickForUseCase(useCaseId) {
  const mapping = {
    enterprise: "opus",
    development: "sonnet",
    content: "sonnet",
    research: "opus",
    customer: "haiku",
    creative: "fable",
  };
  return getModelById(mapping[useCaseId] || "sonnet");
}

// Export to window for cross-file access
Object.assign(window, {
  MODELS, COMPARE_DIMENSIONS, USE_CASES, CATEGORIES,
  FEATURED_COLLECTIONS, modelCategories, modelPricingTiers,
  getModelById, getModelsByCategory, getTopPickForUseCase,
});

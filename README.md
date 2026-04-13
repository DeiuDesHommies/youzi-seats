# youzi-seats

> *「不是把席位神化，而是把市场如何理解这些席位，拆开给你看。」*

**一个面向 A 股游资 / 龙虎榜 persona 的研究型静态资料库。**

它不是交易指令工具，也不是“跟着某个席位买”的模仿器。`youzi-seats` 做的是把市场常见的游资 persona，整理成一套**可浏览、可比较、可追溯、可继续扩展**的结构化资料：包括 persona 定位、风格标签、代表案例、来源证明、风险边界，以及可直接渲染的 skill 原文。

[看页面效果](#页面里有什么) · [快速开始](#快速开始) · [仓库结构](#仓库结构) · [数据结构](#数据结构) · [风险边界](#风险边界)

---

## 页面里有什么

当前仓库已经实现了一套可本地打开的静态页面，用来浏览和比较游资 persona。

### 你现在可以做的事

- 浏览 persona 列表
- 按 **人物 / 席位 / 风格 / 标签** 筛选
- 查看单个 persona 的定位、适用场景、失效方式、风险轨道
- 查看 **claim 级 provenance** 绑定的公开来源
- 查看代表案例和 skill 原文
- 最多选择 **3 个 persona** 做并排比较

当前已收录 4 个 persona：

- [陈小群](./skills/chen-xiaoqun/metadata.json)
- [章盟主](./skills/zhangmengzhu/metadata.json)
- [炒股养家](./skills/chaogu-yangjia/metadata.json)
- [作手新一（dry-run）](./skills/zuoshou-xinyi/metadata.json)

---

## 为什么这个库有意义

市面上很多“游资内容”，要么只有叙事，要么只有席位截图，要么直接滑向“带单 / 神话化”。

`youzi-seats` 不是这么组织的。

这个项目把每个 persona 都拆成统一结构：

- **怎么被市场理解**：定位、一句话总结、风格标签
- **什么时候容易成立**：preferred setups
- **什么时候容易失效**：failure modes、misuse warnings
- **证据从哪来**：sources + claim provenance
- **实际怎么落地成阅读材料**：`skill.md`

它更像一个研究型浏览器，而不是一个情绪化口号集合。

---

## 页面里展示哪些内容

打开 [`index.html`](./index.html) 后，页面包含三大块：

### 1. 左侧：浏览与筛选

- 人物筛选
- 席位筛选
- 风格筛选
- 标签筛选
- Persona 列表
- Compare 选择器
- 当前筛选结果

### 2. 右侧：单个 persona 详情

每个 persona 会展示：

- 一句话总结
- 整体置信度
- 风格标签
- Persona 定位
- 适用 / 不适用场景
- 风险轨道与责任说明
- Dual-Lens 结论（价值侧 / 失败侧）
- Claim 级 Provenance
- 公开来源卡片
- 代表案例
- Skill 原文

### 3. 底部：Compare View

适合拿来做这种对比：

- 新生代热点接力 persona 和老牌高辨识度 persona 的差别
- “情绪周期 / 强势股理解” 和 “题材敏锐 / 波段趋势” 的差别
- 首发样板 persona 和 dry-run 扩展条目的差别

---

## 快速开始

这个项目当前就是：

- 一个静态页面入口：[`index.html`](./index.html)
- 一份页面逻辑：[`app.js`](./app.js)
- 一套样式：[`styles.css`](./styles.css)
- 一组 persona 数据：[`skills/`](./skills)

### 方式 1：直接打开

直接打开根目录下的 [`index.html`](./index.html) 即可。

### 方式 2：本地起一个静态服务

如果浏览器对本地 `fetch()` 有限制，可以在仓库根目录运行：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 数据结构

每个 persona 都是一个固定结构的独立 unit：

```text
skills/<persona-id>/
├── skill.md
├── metadata.json
├── evidence/
│   └── sources.json
└── cases/
    └── cases.json
```

对应职责：

- [`skill.md`](./skills/chen-xiaoqun/skill.md)：面向阅读的研究型成品
- [`metadata.json`](./skills/chen-xiaoqun/metadata.json)：结构化渲染字段
- [`evidence/sources.json`](./skills/chen-xiaoqun/evidence/sources.json)：来源和证据层
- [`cases/cases.json`](./skills/chen-xiaoqun/cases/cases.json)：代表案例

筛选索引放在 [`indexes/`](./indexes) 下：

- [`personas.json`](./indexes/personas.json)
- [`seats.json`](./indexes/seats.json)
- [`styles.json`](./indexes/styles.json)
- [`tags.json`](./indexes/tags.json)

---

## 页面怎么工作

[`app.js`](./app.js) 当前做的事情很直接：

1. 读取索引文件
2. 加载 persona 的 `metadata / evidence / cases / skill`
3. 绑定筛选器
4. 渲染详情页
5. 渲染 compare view

也就是说，这个仓库的重点不是工程复杂度，而是**资料结构化**和**研究可追溯性**。

---

## 当前收录的 persona

### 陈小群

高热度新生代 persona，项目中的 persona 入口型样板，突出热点题材、情绪接力、龙头博弈与快节奏兑现。

- [metadata](./skills/chen-xiaoqun/metadata.json)
- [skill](./skills/chen-xiaoqun/skill.md)
- [sources](./skills/chen-xiaoqun/evidence/sources.json)
- [cases](./skills/chen-xiaoqun/cases/cases.json)

### 章盟主

老牌高辨识度 persona，偏题材敏锐、波段趋势、大资金博弈，适合和新生代热点接力型 persona 做对照。

- [metadata](./skills/zhangmengzhu/metadata.json)
- [skill](./skills/zhangmengzhu/skill.md)
- [sources](./skills/zhangmengzhu/evidence/sources.json)
- [cases](./skills/zhangmengzhu/cases/cases.json)

### 炒股养家

兼具席位认知与“心法学习”属性的 persona，更偏研究 / 学习型入口。

- [metadata](./skills/chaogu-yangjia/metadata.json)
- [skill](./skills/chaogu-yangjia/skill.md)
- [sources](./skills/chaogu-yangjia/evidence/sources.json)
- [cases](./skills/chaogu-yangjia/cases/cases.json)

### 作手新一

非首发 dry-run persona，用来验证未来新增 persona 时，是否能沿着统一结构继续扩展。

- [metadata](./skills/zuoshou-xinyi/metadata.json)
- [skill](./skills/zuoshou-xinyi/skill.md)
- [sources](./skills/zuoshou-xinyi/evidence/sources.json)
- [cases](./skills/zuoshou-xinyi/cases/cases.json)

---

## Schema 与约束

项目已经把 persona skill 的统一规则写在：

- [`schemas/persona-skill-schema.md`](./schemas/persona-skill-schema.md)

此外仓库里还放了几份相关规则文档：

- [`schemas/evidence-confidence-schema.md`](./schemas/evidence-confidence-schema.md)
- [`schemas/risk-boundary-schema.md`](./schemas/risk-boundary-schema.md)
- [`schemas/publishing-rules.md`](./schemas/publishing-rules.md)
- [`schemas/persona-maintenance-workflow.md`](./schemas/persona-maintenance-workflow.md)

当前这套结构强调四件事：

1. **可比较**：不同 persona 用同一套字段描述
2. **可扩展**：新条目可以按 unit 增长
3. **可追溯**：核心结论要能回到来源
4. **有边界**：不能把 market-attributed persona 写成官方身份认证

---

## 仓库结构

```text
youzi-seats/
├── index.html
├── app.js
├── styles.css
├── indexes/
├── skills/
├── schemas/
├── openspec/
└── .opencode/
```

其中真正和当前页面 / 数据展示直接相关的，主要是：

- [`index.html`](./index.html)
- [`app.js`](./app.js)
- [`styles.css`](./styles.css)
- [`indexes/`](./indexes)
- [`skills/`](./skills)
- [`schemas/`](./schemas)

`openspec/` 和 `.opencode/` 属于过程 / 工具侧产物，不是这个静态资料库的核心使用入口。

---

## 适合怎么用

这个仓库更适合：

- 做游资 persona 的研究型资料整理
- 做盘后复盘，观察市场如何借 persona 解释热点与席位
- 对比不同 persona 的风格标签、适用场景和失效方式
- 继续往这个库里补新的 persona unit

不适合：

- 把 persona 页面当成交易建议
- 把公开榜单披露当成实时信号
- 把席位标签直接当成自然人身份确认
- 脱离题材周期、承接条件、市场环境做机械模仿

---

## 风险边界

这是一个研究资料库，不是交易指令系统。

- persona 是市场认知入口，不是官方身份认证
- 龙虎榜等公开披露信息天然有滞后
- 市场对席位的归因经常带有叙事强化
- 标签化理解可能有用，但也最容易被误用

如果你把它当作“研究市场如何理解某类游资 persona”的资料库，它是有价值的。

如果你把它当作“照着买就行”的工具，那就是误用。

---

## License

MIT

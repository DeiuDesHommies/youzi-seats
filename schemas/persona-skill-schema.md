# Persona Skill Schema

每一个 persona skill 都必须使用同一套结构，保证可比较、可扩展、可维护。

## 必备字段

- `id`: persona 的稳定标识
- `name`: 展示名称
- `launch`: 是否属于首发批次
- `oneLineSummary`: 一句话风格总结
- `overallConfidence`: 整体置信度
- `positioning`: persona 的角色定位
- `styleTags`: 风格标签
- `associatedSeats`: 市场通常关联的营业部/席位
- `corePatterns`: 常见行为模式
- `preferredSetups`: 偏好的市场场景
- `failureModes`: 常见失效方式
- `misuseWarnings`: 容易被误用的地方
- `uncertaintyNotes`: 不能过度解读的内容
- `responsibility`: 研究用途与责任边界
- `riskRail`: 页面上持续展示的风险提示

## 配套材料

每个 persona skill 单元必须包含：

- `skill.md`：面向阅读的研究型成品
- `metadata.json`：结构化渲染数据
- `evidence/sources.json`：来源清单与证据层
- `cases/cases.json`：代表案例

## 输出规则

每个 skill 必须同时呈现：

1. **优势/模式**
2. **失败/误用/失配场景**
3. **证据层级**
4. **来源可追溯信息**

严禁把 market-attributed persona 直接写成官方认证身份。

# Evidence & Confidence Schema

## 证据分层

### Hard Evidence

可直接引用的公开结构化信息，例如：

- 交易所龙虎榜公开数据
- 主流财经媒体对具体席位与金额的客观报道
- 可公开核验的历史榜单页面

### Interpretation

基于公开数据的解释性归纳，例如：

- 主流媒体对风格的描述
- 稳定出现的复盘观察
- 多来源一致的风格总结

### Uncertain Narrative

不可直接当作事实使用的叙事，例如：

- 市场江湖称号
- 社区传闻
- 无法核验的个人身份细节

## 置信度规则

### High

结论直接由公开数据或公开报道支撑，且不存在明显冲突。

### Medium

结论由多个解释性来源支持，且没有被硬证据否定。

### Low

结论主要来自市场叙事、部分推断或证据不足，只能作提示，不能作定论。

## Provenance Card 字段

每条关键结论需要记录：

- `sourceTier`: 来源层级
- `freshness`: 信息时间或最近可见时间
- `verifiability`: 直接可证 / 间接推断
- `contradictionStatus`: 是否存在冲突证据
- `notes`: 简短说明

# Persona Maintenance Workflow

## 新增 persona 的标准流程

1. 先通过首批准入规则评估候选人
2. 建立 persona 单元目录
3. 收集 `sources.json` 与 `cases.json`
4. 生成 `metadata.json`
5. 编写 `skill.md`
6. 更新 `indexes/*.json`
7. 在 UI 中确认可检索、可浏览、可渲染

## 维护原则

- 修改优先发生在 supporting materials，而不是直接改展示结论
- 如果来源失效或结论被新资料推翻，先更新 provenance 与 uncertainty
- 新 persona 不得破坏既有 schema

## 扩展验证

只要新增 persona 只需要：

- 新增一个 `skills/<persona-id>/` 目录
- 更新索引文件
- 无需修改 UI 结构或旧 persona 文件

则说明库结构保持稳定。

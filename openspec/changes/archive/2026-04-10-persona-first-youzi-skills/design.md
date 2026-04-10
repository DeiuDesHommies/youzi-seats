## Context

Recent research indicates that named A-share youzi personas still attract visible attention across 2025–2026 finance media, community platforms, and龙虎榜-oriented product surfaces. Persona framing therefore provides a stronger top-of-funnel than abstract style-only packaging. At the same time, the evidence base is structurally mixed: exchange disclosures and龙虎榜 data can support seat-level behavior analysis, but natural-person attribution and many style narratives remain partly inferential.

The design therefore needs to satisfy two constraints at once. First, it must preserve the acquisition and memorability benefits of persona-first packaging. Second, it must keep the product grounded as a research and education library rather than a real-time recommendation surface. By April 2026, external signals also show that trust architecture can no longer be treated as an afterthought: persona heat remains useful, but provenance, risk explanation, and responsibility boundaries must become part of the product shape itself. This proposal assumes a small first version with three initial persona skills and a shared schema that can later expand.

The main architectural risk is not technical difficulty but structural drift. If the project is built as a handful of articles, it will become difficult to compare personas, revise evidence, or add more seats later. The design therefore must define the repository and product shape clearly enough that new persona skills can be added as new units rather than as ad hoc content.

## Goals / Non-Goals

**Goals:**
- Establish a persona-first skill architecture where named traders are the entry point and structured style/risk analysis is the substance.
- Define a publishable skill schema that clearly separates public evidence, interpretation, and uncertainty.
- Standardize the minimum research workflow needed to produce consistent first-batch persona skills.
- Define a stable project structure that supports future expansion to more personas without redesigning the library.
- Define an explicit indexing model so skills can later be discovered by persona, seat, style, and tag.
- Define a provenance and trust model so persona conclusions remain inspectable and revisable.
- Add explicit boundary language so the product remains educational and research-oriented.

**Non-Goals:**
- Building a full A-share short-term cognition operating system.
- Building a real-time signal engine, alert system, or follow-trading product.
- Proving or certifying the real-world identity behind any named persona.
- Building a large-scale market data platform before validating the first persona skills.
- Automating a full `nuwa-skill`-style universal persona distillation pipeline in V1.

## Decisions

### 1. Persona-first packaging, style-first substance
The product will present named personas such as 陈小群、章盟主、炒股养家 as the outer packaging because persona framing has better searchability, memorability, and click-through potential than abstract style labels. Internally, each skill will still be built from observable style/risk primitives rather than from claims of authoritative identity reconstruction.

**Why this over style-first naming?** Style-first is cleaner operationally, but it is colder and weaker for early discovery. Persona-first better matches current user attention patterns.

### 2. Publish a fixed persona skill schema
Each persona skill will use one shared schema so all skills remain comparable. The schema should include: persona label, one-sentence style summary, evidence layers, common action patterns, preferred setups, risk and failure conditions, representative cases, and explicit uncertainty notes.

**Why this over free-form writeups?** Free-form persona articles drift into mythology and make the collection impossible to compare or expand consistently.

### 3. Separate project structure into unit, evidence, case, schema, and index layers
The implementation should organize content so each persona skill is a unit with clearly separated supporting materials. The target shape is:

```text
skills/
  <persona-id>/
    skill.md
    metadata.json
    evidence/
    cases/

schemas/
  persona-skill-schema.md
  evidence-confidence-schema.md
  risk-boundary-schema.md

indexes/
  personas.json
  seats.json
  styles.json
  tags.json
```

`skill.md` is the publishable artifact. `evidence/` holds source-backed research notes. `cases/` holds representative historical examples. `schemas/` define the common shape. `indexes/` make the library expansion-ready.

**Why this over flat content pages?** This keeps revisions local, makes future growth predictable, and allows multiple discovery views without rewriting the content model.

### 4. Use layered evidence instead of single-source narratives
The research workflow will classify sources into at least three layers:
- hard evidence: exchange disclosures, public龙虎榜 records, structured aggregators used for navigation;
- interpretation: media analyses and repeatable public writeups;
- noisy narrative: community consensus, market lore, and unverified persona claims.

Only the first two layers may directly support publishable claims. The third layer must be labeled as uncertain context.

**Why this over “best effort summary”?** Persona products become fragile if they cannot distinguish hard facts from repeated myths.

In addition to layers, each publishable conclusion should carry a confidence label:
- **High confidence**: directly supported by public structured evidence.
- **Medium confidence**: consistent across multiple interpretation sources and not contradicted by hard evidence.
- **Low confidence**: repeated market narrative or partial inference that must remain explicitly tentative.

### 5. Start with a small first batch instead of broad coverage
The first version should launch with a curated set of three persona skills that are both high-heat and clearly differentiated, rather than trying to cover every known youzi persona.

**Why this over larger launch scope?** The first risk is not lack of breadth; it is lack of clarity and consistency. A smaller batch makes the schema easier to validate.

The first-batch selection rule should be explicit rather than intuitive. A persona qualifies for V1 only if it satisfies all of the following:
- visible current attention or search/discussion heat;
- strong differentiation from the other selected personas;
- enough public evidence to build a non-trivial skill;
- manageable attribution ambiguity and manageable reputational risk.

### 6. Build compliance and risk framing into the content model
Every persona skill must include language that states the content is for research and education, not real-time recommendation. Each skill must also include risk warnings about disclosure lag, attribution uncertainty, and the danger of blind follow-trading.

**Why this over generic site-wide disclaimer only?** Persona content specifically increases the chance that users interpret the product as follow-trading guidance. Localized guardrails are necessary.

### 7. Support future expansion through indexes, not through new top-level redesign
The library should assume that more persona skills will be added over time. Expansion must happen by adding a new persona unit and updating index files, rather than by redesigning the core content model.

**Why this over waiting until later?** Expansion pressure arrives early; if not planned now, later additions will create inconsistent structure and duplicated logic.

### 8. Add trust and provenance as first-class architecture layers
The library should not rely on confidence labels alone. Each persona skill should expose a structured provenance card for key claims and an always-on risk rail for misuse prevention. The trust layer should answer four questions for every important conclusion: where the claim came from, how fresh it is, how directly it is supported, and whether conflicting evidence exists.

The risk layer should remain lightweight but persistent. It should state that the skill is a research artifact, not a direct trading command; it should highlight the main misuse mode of blind follow-trading; and it should clarify that persona packaging is an interface choice rather than a claim of official identity certification.

**Why this over generic disclaimers?** 2026 product patterns increasingly expose trust and risk as product structure, not footer text. This also improves maintainability when the same claim must be revised later.

### 9. Use dual-lens presentation for every persona output
Each final persona skill should present both upside and failure modes rather than emitting a single dominant narrative. The product should consistently pair:
- style thesis with style failure mode;
- attraction signal with lag or misuse warning;
- insight with uncertainty or contradiction.

**Why this over one-sided summaries?** This keeps the library from drifting into promotional persona storytelling and matches the way modern finance products increasingly pair opportunity and risk.

## Risks / Trade-offs

- **Persona heat can overpower nuance** → Mitigation: require evidence-level labels and uncertainty sections in every skill.
- **Users may misread the product as荐股 or跟单工具** → Mitigation: keep outputs historical, explanatory, and non-directive; avoid real-time buy/sell framing.
- **Attribution disputes can damage trust** → Mitigation: phrase persona claims as research-based reconstruction tied to public seat behavior rather than as official identity confirmation.
- **A small first batch may feel narrow** → Mitigation: choose initial personas with strong contrast so the collection demonstrates breadth of style even with limited count.
- **Future additions may break consistency** → Mitigation: require all new persona skills to enter through the same schema and index update workflow.
- **Evidence maintenance cost grows with every new persona** → Mitigation: keep evidence materials separate from the publishable skill and attach confidence labels to conclusions.
- **Confidence labels alone may feel too abstract** → Mitigation: add provenance cards that show source tier, freshness, verifiability, and contradiction status.
- **Persona packaging can still trigger one-sided reading** → Mitigation: require dual-lens outputs and persistent risk rails on every persona page.

## Usage Model

This library is designed to be used in three time horizons:

1. **Pre-market orientation**
   - Users review a persona skill to understand whether the current market setup resembles the persona’s typical behavior conditions.
   - The product helps users form an observation checklist rather than a direct trading instruction.

2. **Post-market review**
   - Users compare that day’s seat behavior, sector movement, and market interpretation against persona patterns and historical cases.
   - The product acts as a structured复盘解释器 rather than a signal generator.

3. **Long-term learning and research**
   - Users or analysts compare multiple persona skills, build style memory, and maintain a reusable archive of cases and evidence.

This product can realistically live in four surfaces:
- a standalone library website,
- a finance-app research section,
- an AI assistant workspace that uses persona skills as context,
- or an internal research knowledge base.

For a first version, the most stable interpretation is: **a browseable research library with expansion paths toward assistant and dashboard experiences later**.

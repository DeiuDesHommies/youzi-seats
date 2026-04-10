## ADDED Requirements

### Requirement: Each persona skill must follow a fixed schema
The system SHALL require every persona skill to use the same publishable structure so entries remain comparable and maintainable.

#### Scenario: Publishing a new persona skill
- **WHEN** a new persona skill is prepared for publication
- **THEN** it includes a standard set of sections covering persona label, style summary, evidence layers, common patterns, risk boundaries, case studies, and uncertainty notes

### Requirement: Each persona skill must reference structured supporting materials
The system SHALL keep the publishable persona skill separate from its supporting evidence materials, case materials, and metadata.

#### Scenario: Reviewing a persona unit
- **WHEN** a maintainer inspects a persona skill unit
- **THEN** the unit contains a publishable skill artifact plus separately organized supporting materials for evidence, cases, and metadata

### Requirement: Persona skill claims must distinguish evidence from interpretation
The system SHALL separate hard evidence, interpreted conclusions, and uncertain narrative material within each persona skill.

#### Scenario: Reviewing a skill claim
- **WHEN** a user reads a claim about a persona's behavior or style
- **THEN** the system indicates whether the claim is grounded in public evidence, derived interpretation, or uncertain market narrative

### Requirement: Persona skill conclusions must expose confidence levels
The system SHALL label publishable conclusions with explicit confidence levels derived from source quality and consistency.

#### Scenario: Reading a summarized conclusion
- **WHEN** a user reads a summary statement about a persona's style or behavior
- **THEN** the system shows whether that conclusion is high, medium, or low confidence

### Requirement: Persona skill claims must expose provenance cards
The system SHALL attach provenance metadata to key publishable claims so users and maintainers can inspect how the claim was formed.

#### Scenario: Inspecting a key claim
- **WHEN** a user or maintainer opens the provenance view for a persona claim
- **THEN** the system shows the source tier, source freshness, verifiability status, and contradiction status for that claim

### Requirement: Persona skill outputs must use dual-lens presentation
The system SHALL present major persona conclusions with both value and failure context.

#### Scenario: Reading a persona synthesis block
- **WHEN** a user reads a summary of a persona's style or edge
- **THEN** the system also presents the matching failure mode, misuse mode, or scenario mismatch warning for that same conclusion

### Requirement: Persona skill entries must include explicit boundaries
The system SHALL include explicit boundary language that limits over-claiming and clarifies what the skill does not prove.

#### Scenario: Encountering identity-sensitive content
- **WHEN** a persona skill references a named trader or associated seat behavior
- **THEN** the system clarifies that the entry is a research-based reconstruction and not official identity certification

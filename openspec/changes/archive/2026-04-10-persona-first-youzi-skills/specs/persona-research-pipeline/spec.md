## ADDED Requirements

### Requirement: Persona skill creation must use a layered evidence workflow
The system SHALL require persona skill research to be organized into evidence layers before publication.

#### Scenario: Collecting research materials
- **WHEN** a researcher gathers materials for a persona skill
- **THEN** the materials are classified into hard evidence, interpretation sources, and uncertain narrative sources

### Requirement: First-batch persona selection must follow explicit admission criteria
The system SHALL require V1 persona selection to use explicit criteria rather than ad hoc preference.

#### Scenario: Evaluating a candidate for the first batch
- **WHEN** a candidate persona is considered for the initial launch set
- **THEN** the system evaluates it for current attention, differentiation, evidence sufficiency, and manageable attribution risk before acceptance

### Requirement: Persona publication must be supported by minimum evidence coverage
The system SHALL require each persona skill to include enough public evidence and historical cases to justify publication as a first-class library entry.

#### Scenario: Evaluating publication readiness
- **WHEN** a persona skill is reviewed for release
- **THEN** the entry is only publishable if it contains identified public sources, representative cases, and a completed uncertainty section

### Requirement: Persona research outputs must support future indexing
The system SHALL capture enough normalized metadata to place each persona skill into persona, seat, style, and tag indexes.

#### Scenario: Finalizing a persona research package
- **WHEN** a persona skill is approved for publication
- **THEN** the research package includes the metadata needed to index that skill in future library views

### Requirement: Persona research outputs must support provenance review
The system SHALL capture enough claim-level metadata to support provenance cards for important persona conclusions.

#### Scenario: Preparing a publishable conclusion
- **WHEN** a researcher promotes a conclusion into the final persona skill
- **THEN** the research package records its source tier, freshness, verifiability, and contradiction status

### Requirement: Persona research must preserve risk-oriented context
The system SHALL capture the limits of followability and the main risks of misinterpreting persona behavior.

#### Scenario: Reading the research conclusion
- **WHEN** a user reads the final persona synthesis
- **THEN** the system explains the main failure modes of blind imitation, including disclosure lag, attribution uncertainty, and scenario mismatch

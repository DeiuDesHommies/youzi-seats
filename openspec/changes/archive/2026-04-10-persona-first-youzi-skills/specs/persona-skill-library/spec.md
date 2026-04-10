## ADDED Requirements

### Requirement: Users can browse a curated persona skill library
The system SHALL provide a curated library of named A-share youzi persona skills that users can browse and compare as research artifacts.

#### Scenario: Viewing the initial library
- **WHEN** a user opens the persona skill library
- **THEN** the system shows the available first-batch persona skills as distinct entries with consistent labels and summaries

#### Scenario: Comparing multiple persona entries
- **WHEN** a user reviews more than one persona skill entry
- **THEN** the system presents each entry using the same structural sections so the differences between personas are understandable

### Requirement: The library must support expansion through indexed persona units
The system SHALL organize persona skills as individually maintainable units that can be added to the library without restructuring existing content.

#### Scenario: Adding a new persona skill
- **WHEN** a new persona skill is introduced after the initial launch batch
- **THEN** the system can add it as a new persona unit and update the relevant indexes without changing the schema of existing skills

#### Scenario: Discovering skills by multiple views
- **WHEN** a user navigates the library by persona, seat, style, or tag
- **THEN** the system resolves those views through structured indexes instead of duplicated content pages

### Requirement: Persona entries must be framed as research content
The system SHALL present persona skill entries as research and education content rather than as real-time trading recommendations.

#### Scenario: Reading a persona skill entry
- **WHEN** a user opens any persona skill
- **THEN** the entry includes visible research-oriented framing and does not present direct buy or sell instructions

### Requirement: Persona entries must include persistent risk rails
The system SHALL display a persistent risk and responsibility layer within each persona skill entry.

#### Scenario: Viewing a persona page
- **WHEN** a user reads any persona skill entry
- **THEN** the page includes always-on language clarifying that the entry is a research artifact, not a direct execution guide, and highlights the primary misuse risk of blind imitation

# Phase 00: UI and Interaction Contract

## Workspace routes

The application has a dashboard, editor, preview/export view, and conversion history. Projects and conversion jobs are distinct: a project is editable state, while a job is an immutable operation against one project version.

## Editor workspace

The editor has four regions: a left navigation/assets sidebar, a top toolbar, a central surface, and a right contextual inspector. A status bar shows active page or slide, zoom, save status, selection detail, and compatibility warnings.

Selecting nothing exposes surface settings. Selecting one element exposes controls specific to its element type. Selecting multiple elements exposes only shared controls. A disabled action explains why it is unavailable.

All mutations dispatch a document command. Selection, viewport, active surface, and active tool are feature-scoped editor state; the document itself remains the single canonical source of editable content.

## HTML workspace

HTML projects provide source and visual modes. Source mode has a source editor, rendered preview, validation results, viewport controls, and export action. Visual mode only exposes content that was imported into the canonical model. Unsupported structures or styles remain reported rather than being represented inaccurately.

## Preview and export

Preview is read-only. Export requires a selected format and validated format-specific options. The application displays compatibility warnings before generation, tracks progress through a conversion job, validates the generated output, and enables download only after success.

# Phase 00: Architecture Baseline

## Status

Approved for implementation planning. This document defines the MVP boundary; later phases may extend it without bypassing its contracts.

## MVP scope

The first usable release supports creating a document or presentation project, importing raw HTML or an HTML file, editing supported content, saving and reopening the project, previewing it, and exporting supported content to PDF, DOCX, PPTX, and HTML.

PDF, DOCX, and PPTX import; OCR; collaboration; templates with remote data; and AI-assisted editing are deferred. An unsupported feature produces a typed warning; it is never silently discarded.

## Supported-format matrix

| Format               | MVP input    | MVP output             | Fidelity promise                                                      |
| -------------------- | ------------ | ---------------------- | --------------------------------------------------------------------- |
| Raw HTML / HTML file | Yes          | Yes                    | Supported semantic HTML and CSS only; scripts are removed.            |
| PDF                  | No           | Yes                    | Paginated output generated from the canonical model.                  |
| DOCX                 | No           | Yes                    | Text, basic formatting, tables, and images supported by the exporter. |
| PPTX                 | No           | Yes                    | Freeform slides, text, shapes, and images supported by the exporter.  |
| PNG / JPEG / WebP    | Asset upload | Page/slide image later | Images can be placed in projects; raster export is deferred.          |
| JSON project         | Yes          | Yes                    | Lossless persistence format for the versioned canonical model.        |

## Stable module boundaries

| Module               | Owns                                                  | Must not own                                       |
| -------------------- | ----------------------------------------------------- | -------------------------------------------------- |
| `document-model`     | Schema, IDs, validation, serialization, migrations    | React state, database access, format-library calls |
| `editing`            | Validated commands, change records, undo/redo         | Canvas implementation or persistence               |
| `html-import`        | Sanitized HTML parsing and supported-feature warnings | Editor state or export logic                       |
| `conversion`         | Importer/exporter contracts and implementations       | Canonical-model mutation                           |
| `project-management` | Project lifecycle and version orchestration           | Renderer-specific behavior                         |
| `server`             | Authentication, repositories, storage, jobs, security | React component state                              |
| `components`         | Presentation and interaction                          | Business rules and direct database calls           |

## Canonical project model

Every project is a versioned JSON document with stable IDs. A project has a `kind` of `document` or `presentation`, assets, ordered surfaces, metadata, and a schema version. A surface is a `page` or `slide`, has dimensions and a layout mode, and owns ordered elements.

Elements use a discriminated union: `text`, `image`, `shape`, `line`, `table`, and `group`. Every element includes an ID, optional parent group ID, visibility, lock state, style, and either flow metadata or freeform bounds. References must target an existing object in the same project.

Flow surfaces use semantic blocks and calculated layout. Freeform surfaces use explicit `x`, `y`, `width`, `height`, and rotation in surface-relative points. A renderer may calculate derived layout, but may not store renderer state in the canonical model.

Schema changes require a numeric schema-version increment, a pure migration from each supported prior version, and migration fixtures. Unknown schema versions are rejected with a typed validation error.

## Editing and history contract

All edits enter through a command registry. Initial commands are `insert_element`, `update_text`, `update_style`, `move_element`, `resize_element`, `delete_element`, `add_surface`, and `reorder_surfaces`.

Each command validates untrusted input, checks targets and constraints, deterministically returns an updated document plus a reversible change record, or returns a typed failure. The UI, keyboard shortcuts, APIs, and future AI client use this same registry. Undo applies the inverse change record; redo reapplies the original record.

## Conversion contract

An importer accepts a validated source, options, and cancellation signal, then returns a canonical project plus structured warnings. An exporter accepts a validated canonical project, options, and cancellation signal, then returns generated-file metadata plus structured warnings. Neither interface persists data; services orchestrate persistence and job state.

Warning categories are `unsupported_feature`, `lossy_conversion`, `missing_asset`, and `validation_notice`. Error categories are `validation`, `unsupported_format`, `security`, `storage`, `conversion`, `timeout`, and `unexpected`. Errors are safe for users and retain diagnostic context only in server logs.

## Persistence and storage

The database records project metadata, immutable project versions, asset metadata, and export jobs. Object storage holds uploads and generated outputs. An export job records the exact source project version, requested format and settings, status, warnings, error data, and output asset reference. Generated files never replace the canonical project version.

## Security requirements

Uploads are checked for size, extension, MIME type, and file signature where applicable. HTML and SVG are sanitized; imported HTML is rendered in a sandboxed context with no application credentials or script execution. Remote assets are disabled for MVP. Export processes have time, memory, and file-size limits. Authorization is enforced for every project, asset, and output access once accounts are introduced.

## Test and completion gates

Phase 01 must provide type checking, linting, formatting, Vitest, and Playwright. Phase 02 must include schema, migration, command, undo/redo, serialization, and invalid-input tests. Each importer/exporter needs contract tests and representative fixtures. A format is not marked supported until its acceptance workflow passes.

## Phase exit criteria

Phase 00 is complete when this baseline, the format matrix, UI interaction contract, and unified-workspace decision are accepted. Phase 01 starts with the application shell and engineering tooling; Phase 02 starts only after the model and command contracts above are represented as strict TypeScript types and tests.

# Universal Document Studio

## Product Requirements, UI Design, Architecture, and Implementation Roadmap

**Document type:** Project plan and technical blueprint\
**Application type:** Full-stack web application\
**Primary stack:** Next.js, React, TypeScript\
**Status:** Planning / Phase 00\
**AI features:** Deliberately deferred until the final major
implementation phase

------------------------------------------------------------------------

## 1. Product Vision

Universal Document Studio is a browser-based application for importing,
creating, previewing, editing, and converting documents between
supported formats.

It combines three capabilities:

1.  **Universal file converter:** Import supported files and export them
    to other supported formats.
2.  **Visual document editor:** Edit text, fonts, colors, images,
    shapes, positioning, pages, and slides.
3.  **Document creation studio:** Start from a blank project, paste raw
    HTML, import a file, or eventually create and edit content with AI.

The product should feel like a professional web application inspired by
tools such as Canva and online document editors. Users should not need
to install desktop software.

### Product principles

-   **One source of truth:** Every editable project has a canonical
    document representation independent of the export format.
-   **Conversion and editing are separate:** Converting a file must not
    silently overwrite the source. Editing changes the working project.
-   **Preview before export:** Users can inspect layout and formatting
    before downloading the result.
-   **Preserve content:** Unsupported features must generate explicit
    warnings rather than disappear silently.
-   **Reliable exports:** Validate generated files and report failures
    accurately.
-   **Undo and redo are fundamental:** Editing operations should be
    reversible.
-   **AI comes last:** Manual editing and conversion must work
    independently of AI.
-   **Architecture before features:** Establish interfaces, data
    contracts, test standards, and module boundaries before implementing
    dependent features.

------------------------------------------------------------------------

## 2. Product Scope

### 2.1 Input formats

  -----------------------------------------------------------------------
  Format                              Planned capability
  ----------------------------------- -----------------------------------
  Raw HTML                            Paste or write HTML source and
                                      preview it

  HTML file                           Import and preview supported
                                      HTML/CSS

  PDF                                 View pages, extract text, and
                                      progressively reconstruct editable
                                      content

  DOCX                                Import supported Word text,
                                      headings, tables, images, and
                                      formatting

  PPTX                                Import presentations and supported
                                      slide elements

  Images                              Import PNG, JPEG, WebP, and other
                                      explicitly supported formats

  Blank project                       Create a document or presentation
                                      from scratch
  -----------------------------------------------------------------------

### 2.2 Output formats

  -----------------------------------------------------------------------
  Format                              Planned capability
  ----------------------------------- -----------------------------------
  PDF                                 Paginated, printable output with
                                      page settings

  DOCX                                Editable Microsoft Word document

  PPTX                                Editable PowerPoint presentation

  HTML                                Standalone HTML output with
                                      supported styles and assets

  PNG/JPEG                            Export individual pages or slides
                                      as images

  JSON project                        Save and restore the canonical
                                      editable document model
  -----------------------------------------------------------------------

A generated PDF, DOCX, or PPTX must not replace the canonical project.
The editable project remains available after export.

### 2.3 Editing capabilities

-   Direct text editing.
-   Headings, paragraphs, lists, and tables.
-   Font family, size, weight, color, alignment, and line height.
-   Background colors, borders, fills, shapes, lines, and corner radii.
-   Add, delete, move, resize, rotate, and reorder elements.
-   Image upload, cropping, fitting, positioning, and replacement.
-   Multiple pages and multiple slides.
-   Page dimensions, orientation, margins, and background settings.
-   Zoom, pan, fit-to-page, and fit-to-width.
-   Undo and redo.
-   Copy, paste, duplicate, and delete.
-   Multi-selection, alignment, distribution, grouping, and ungrouping
    where supported.
-   Save, reopen, autosave, and restore earlier versions.
-   Export settings, conversion warnings, and conversion history.
-   AI-assisted creation and editing in the final phase.

### Scope and fidelity limits

The application must not promise perfect reconstruction of every
arbitrary PDF, Word file, PowerPoint deck, or HTML page. Formats have
different layout rules and feature sets. Define a supported feature
matrix, build representative fixtures, and expand support through tested
increments.

PDF viewing and extraction are distinct from full
PDF-to-editable-document reconstruction. Complex layouts and scanned
documents require additional work; OCR can be added when justified.

------------------------------------------------------------------------

## 3. User Interface and Experience

The design should be clean, desktop-first, and inspired by professional
design tools. It should not feel like a simple upload form.

### 3.1 Main application areas

1.  **Dashboard:** Recent projects, templates, new document actions,
    imports, and conversion history.
2.  **Editor workspace:** Canvas, page or slide navigation, tools, and
    contextual properties.
3.  **Preview workspace:** Read-only rendering of the final document
    with zoom and page navigation.
4.  **Import and conversion center:** Upload files, choose output
    formats, inspect compatibility, and manage conversion jobs.
5.  **AI assistant:** Added in the final phase as a contextual assistant
    for document creation and editing.

### 3.2 Dashboard

The dashboard should include:

-   Top navigation with product logo, workspace selector, search, and
    user menu.
-   Prominent **New document** action.
-   Import area supporting file uploads and raw HTML.
-   Quick-start cards for:
    -   Blank document
    -   Presentation
    -   HTML to PDF
    -   Import existing file
-   Recent projects with thumbnails, project name, last modified time,
    and project type.
-   Template cards for reports, invoices, proposals, letters, and
    presentations.
-   Conversion history with status and download access.

Distinguish **projects** from **conversion jobs**. A project is an
editable artifact. A conversion job is an operation performed on a
specific source or project version.

### 3.3 Main editor layout

Use a three-panel workspace with a top toolbar and status area.

#### Left sidebar --- Navigation and assets

Contains:

-   Pages or slides list.
-   Document outline.
-   Uploaded images and other assets.
-   Shapes and reusable components.
-   Add, duplicate, delete, and reorder page actions.

#### Top toolbar --- Global and contextual actions

Contains:

-   Project name and save status.
-   Undo and redo.
-   Add element actions.
-   Zoom controls.
-   Preview and export actions.
-   Contextual controls for the currently selected element.

When text is selected, show text controls. When a shape or image is
selected, show relevant controls for that element.

#### Center --- Interactive canvas

The central area displays the current page or slide.

Users should be able to:

-   Select elements.
-   Edit supported text inline.
-   Drag elements to move them.
-   Resize using handles.
-   Rotate supported elements.
-   See page boundaries and alignment guides.
-   Zoom and pan.
-   Switch between pages or slides.

Use a neutral workspace background so the document stands out clearly.

#### Right sidebar --- Properties inspector

The inspector changes based on selection.

-   **Nothing selected:** page settings, background, dimensions, and
    document properties.
-   **Text selected:** typography, formatting, alignment, line height,
    and color.
-   **Shape selected:** fill, stroke, dimensions, rotation, opacity, and
    corner radius.
-   **Image selected:** size, crop, fit, positioning, and replacement.
-   **Multiple elements selected:** shared formatting, alignment,
    distribution, and grouping where supported.
-   **Page selected:** dimensions, orientation, margins, and background.

Unsupported actions should explain the limitation rather than silently
doing nothing.

#### Bottom/status area

Displays current page, zoom, save state, selection details, and
compatibility warnings.

### 3.4 Raw HTML workspace

Provide a dedicated split-screen experience:

-   Left: HTML source editor with syntax highlighting.
-   Right: live rendered preview.
-   Top toolbar: filename, unsaved changes, viewport controls, refresh,
    and export.
-   Validation panel: HTML/CSS warnings and unsupported features.

Support two modes:

1.  **Source mode:** edit HTML and CSS.
2.  **Visual mode:** edit supported document elements.

The modes must synchronize through a defined import/render pipeline.
Arbitrary HTML cannot always be losslessly represented by the visual
editor model, so the application must identify unsupported structures
and styles.

Render imported HTML in a restricted sandbox. Do not allow untrusted
scripts to access the main application.

### 3.5 Preview and export screen

The screen should include:

-   Large rendered preview.
-   Page/slide navigation and zoom.
-   Output format selection: PDF, DOCX, PPTX, or HTML.
-   Format-specific settings.
-   Compatibility warnings and missing-asset information.
-   Generate export action.
-   Progress, success, failure, and retry states.
-   Download action after output validation.

PDF settings can include paper size, orientation, margins, page ranges,
and background printing. PowerPoint settings can include slide
dimensions. HTML settings can distinguish a standalone file from an HTML
package containing assets.

### 3.6 AI workspace --- final phase

Eventually add a collapsible side panel or dedicated creation screen
with:

-   Natural-language prompt box.
-   Selected-element context.
-   Proposed edit list.
-   Change summary.
-   Preview, apply, reject, and undo actions.

AI must operate through validated document commands. It must not bypass
the canonical model, write arbitrary database changes, or execute
generated code.

------------------------------------------------------------------------

## 4. Architecture

The main architectural risk is mixing editor state, HTML rendering,
conversion logic, and persistence into a large collection of React
components. Establish clear boundaries from the beginning.

### 4.1 Application layers

1.  **Next.js application:** Dashboard, editor, preview, import/export
    UI, routing, and server endpoints.
2.  **Application services:** Project operations, document operations,
    import orchestration, export jobs, and validation.
3.  **Document core:** Canonical schema, validation, editing commands,
    history, and serialization.
4.  **Conversion engine:** Format-specific importers, renderers, and
    exporters.
5.  **Persistence:** Project data, versions, job records, and metadata.
6.  **File storage:** Uploads, assets, temporary files, and generated
    exports.

### 4.2 Canonical document model

The canonical model is the source of truth for all editable content.

It should define explicit types for:

-   Document and presentation projects.
-   Pages and slides.
-   Text blocks and text runs.
-   Images and media assets.
-   Shapes, lines, and connectors.
-   Tables and cells.
-   Groups and element positioning.
-   Styles, dimensions, margins, and page settings.
-   Metadata, schema version, and source-format information.

Requirements:

-   Every element has a stable identifier.
-   References between elements are validated.
-   The schema is versioned.
-   Saved documents can be migrated safely as the application evolves.
-   The model supports both flow and freeform layout.
-   The model is independent of Fabric.js, Tiptap, and specific export
    libraries.

#### Flow layout

Content follows document rules, such as paragraphs and tables flowing
onto subsequent pages.

#### Freeform layout

Elements have explicit positions and dimensions, as on a presentation
slide or design canvas.

A shared project model can support both, but renderers and exporters
must distinguish them.

### 4.3 Editing command engine

All document changes should go through a shared command layer. Examples:

-   `insert_element`
-   `update_text`
-   `update_style`
-   `move_element`
-   `resize_element`
-   `delete_element`
-   `add_page`
-   `reorder_pages`
-   `group_elements`

Each command must:

1.  Validate its input.
2.  Confirm target elements exist.
3.  Enforce allowed properties and constraints.
4.  Apply a deterministic change.
5.  Record sufficient information for undo/redo.
6.  Produce useful errors when rejected.

The UI, keyboard shortcuts, future AI, and other editing clients should
use the same command layer.

### 4.4 Rendering engine

The rendering engine translates the canonical model into visible
content.

It must support:

-   Canvas rendering.
-   Page and slide previews.
-   Selection and zoom.
-   Print/export rendering.
-   Supported HTML output.

Screen rendering and PDF output will not automatically be identical.
Test fonts, line wrapping, margins, images, and page breaks across both.

### 4.5 Conversion engine

Each format should use an adapter with a consistent contract. The
application selects an importer or exporter without depending on its
internal implementation.

Interfaces must eventually cover:

-   Input validation.
-   Conversion options.
-   Structured errors and warnings.
-   Cancellation where possible.
-   Resource limits and timeouts.
-   Output metadata.
-   Temporary resource cleanup.

### 4.6 Persistence and storage

Store canonical project content separately from generated files.

-   Database records contain project metadata, ownership, versions, and
    job records.
-   Large assets live in file or object storage.
-   Database records reference assets and record their metadata.
-   Export jobs record the source project/version, requested format and
    settings, status, output reference, warnings, errors, and
    timestamps.

This makes it possible to identify exactly which project version
produced an export.

------------------------------------------------------------------------

## 5. Recommended Technology Stack

  -----------------------------------------------------------------------
  Area                    Choice                  Purpose
  ----------------------- ----------------------- -----------------------
  Framework               Next.js App Router      Full-stack web
                                                  application

  Language                TypeScript, strict mode Safer contracts across
                                                  modules

  UI                      Tailwind CSS +          Consistent, accessible
                          shadcn/ui               components

  Visual canvas           Fabric.js               Freeform shapes,
                                                  selection,
                                                  transformation, and
                                                  rendering

  Rich text               Tiptap                  Structured text,
                                                  headings, lists, and
                                                  tables

  Validation              Zod                     Validate documents, API
                                                  inputs, and export
                                                  settings

  Client state            Zustand                 Editor state,
                                                  selection, tool state,
                                                  and history
                                                  coordination

  Database                PostgreSQL + Prisma     Projects, versions, and
                                                  job records

  HTML to PDF             Playwright + Chromium   Browser-based HTML/CSS
                                                  rendering

  DOCX generation         `docx`                  Programmatic Word
                                                  document generation

  DOCX import             Mammoth                 Extract supported Word
                                                  content into HTML

  PPTX generation         PptxGenJS               Editable PowerPoint
                                                  slide generation

  PDF inspection          PDF.js                  PDF page viewing and
                                                  text extraction

  Testing                 Vitest + Playwright     Unit, integration, and
                                                  end-to-end testing

  Runtime                 Docker-compatible       Reproducible conversion
                          Node.js environment     dependencies
  -----------------------------------------------------------------------

### Important technology boundaries

-   Fabric.js and Tiptap solve different editing problems. Fabric.js is
    for freeform positioning; Tiptap is for flowing rich text. Do not
    force both into one editor surface.
-   Fabric.js must not become a second source of truth. Editor changes
    must synchronize with the canonical document model through the
    editing command layer.
-   Playwright and Chromium need a suitable server runtime. Do not
    assume every serverless environment supports browser binaries or
    long-running conversions.
-   Next.js can host the application and initial server-side conversion
    routes. A separate worker can be added later behind stable
    conversion interfaces if scale or execution limits require it.

------------------------------------------------------------------------

## 6. Proposed Repository Structure

``` text
universal-document-studio/
├── src/
│   ├── app/
│   │   ├── (workspace)/
│   │   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   ├── editor/[projectId]/
│   │   │   └── conversions/
│   │   ├── api/
│   │   │   ├── projects/
│   │   │   ├── uploads/
│   │   │   ├── exports/
│   │   │   └── conversions/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── dashboard/
│   │   ├── editor/
│   │   ├── preview/
│   │   └── export/
│   ├── features/
│   │   ├── document-model/
│   │   ├── editing/
│   │   ├── html-import/
│   │   ├── file-import/
│   │   ├── conversion/
│   │   ├── project-management/
│   │   └── ai/                 # Reserved for final phase
│   ├── server/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── storage/
│   │   ├── jobs/
│   │   └── security/
│   └── lib/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── conversion/
│   └── e2e/
├── prisma/
├── docs/
│   ├── architecture/
│   ├── format-support/
│   └── decisions/
├── scripts/
├── Dockerfile
└── package.json
```

This is a target structure, not a requirement to create every directory
immediately. Introduce modules as needed while maintaining the defined
boundaries.

------------------------------------------------------------------------

## 7. Implementation Roadmap

Each phase has a specific outcome, required tests, and acceptance
criteria. Dependent work should not begin until the current phase meets
its acceptance criteria.

### Phase 00 --- Requirements and Architecture

**Goal:** Make major technical decisions before implementation.

Deliverables:

-   Product requirements document.
-   Supported input/output format matrix.
-   Canonical document schema specification.
-   Layout model specification.
-   Importer/exporter interfaces.
-   Error and warning conventions.
-   UI wireframes and interaction definitions.
-   Security and file-processing requirements.
-   Testing strategy and initial test fixtures.
-   Architecture decision records.

**Acceptance criteria:** Every MVP feature has a module, an input/output
contract, and a testable completion condition. Major dependencies are
explicit rather than accidental implementation choices.

### Phase 01 --- Project Foundation

**Goal:** Establish a stable engineering environment.

Implement:

-   Next.js App Router with strict TypeScript.
-   Tailwind CSS and shadcn/ui.
-   Linting and formatting rules.
-   Unit, integration, and browser-test infrastructure.
-   Environment-variable validation.
-   Centralized error handling and structured logging.
-   API response conventions.
-   Docker development/runtime setup.
-   CI checks for lint, type checking, and tests.
-   Health endpoint and application shell.

**Acceptance criteria:** A clean checkout can install dependencies, run
the application, pass required checks, and build successfully using
documented commands.

### Phase 02 --- Canonical Document Core

**Goal:** Create the source of truth for editable content.

Implement:

-   Versioned document schema.
-   Document, page, slide, and element types.
-   Stable IDs and validated references.
-   Text, shape, image, line, and table representations.
-   Flow and freeform layout definitions.
-   Schema migration conventions.
-   Editing command registry.
-   Command and property validation.
-   Undo/redo-compatible change records.
-   Serialization and deserialization.
-   Deterministic test fixtures.

**Acceptance criteria:** Documents can be created, serialized, restored,
validated, and modified through commands without involving the UI or a
conversion library.

### Phase 03 --- Editor Shell and Design System

**Goal:** Establish the full UI structure before implementing every
editing interaction.

Implement:

-   Dashboard layout.
-   Editor header and global toolbar.
-   Left navigation and assets sidebar.
-   Center canvas workspace.
-   Right properties inspector.
-   Preview screen.
-   Export dialog.
-   Upload and conversion-center screens.
-   Loading, empty, error, and success states.
-   Consistent typography, spacing, borders, and icons.
-   Desktop-first layout with sensible smaller-screen behavior.

**Acceptance criteria:** Every major screen is navigable, visually
consistent, and has defined loading and failure states.

### Phase 04 --- Visual Editing Engine

**Goal:** Build reliable manual editing before conversion complexity.

Implementation order:

1.  Canvas initialization and page boundaries.
2.  Selection and deselection.
3.  Add, move, resize, and delete shapes.
4.  Text creation and inline editing.
5.  Text formatting and color controls.
6.  Image insertion and transformation.
7.  Layer ordering and alignment.
8.  Page creation, deletion, and reordering.
9.  Zoom, pan, and keyboard shortcuts.
10. Undo/redo and change tracking.
11. Multi-selection and grouping where supported.
12. Selection properties synchronized with the inspector.

All changes must go through the shared document core.

**Acceptance criteria:** Editing, saving, and restoring a document
produces the same canonical model, and undo/redo returns to the correct
prior state. Interaction tests cover every supported operation.

### Phase 05 --- HTML Input and Preview

**Goal:** Deliver the first end-to-end workflow for raw HTML.

Implement:

-   Paste HTML into a source editor.
-   Upload `.html` files.
-   Syntax highlighting.
-   Live preview with controlled refresh.
-   A documented subset of HTML and CSS support.
-   Local asset handling.
-   Page sizing and print-style settings.
-   Visual import for supported HTML structures.
-   Warnings for unsupported CSS or interactive behavior.
-   Safe isolated preview rendering.
-   Dirty-state tracking for source and visual edits.

**Acceptance criteria:** Representative HTML fixtures render
consistently. Unsupported elements produce clear warnings, and imported
HTML cannot access the main application through the preview.

### Phase 06 --- PDF Rendering and Export

**Goal:** Produce predictable, printable PDFs.

Implement:

-   Server-side HTML rendering with Playwright.
-   Page dimensions and orientation.
-   Margins and page breaks.
-   Background and image printing.
-   Font loading and asset readiness.
-   Export progress and failure reporting.
-   Temporary-file cleanup.
-   Validation that output is a readable PDF.
-   Regression tests for layout, page count, and visual appearance.

**Acceptance criteria:** Representative documents export correctly in
the production runtime. Generated output is checked against approved
fixtures and inspected for both text and rendered pages.

### Phase 07 --- DOCX and PPTX Export

**Goal:** Generate editable Word documents and presentations from the
canonical project.

DOCX support:

-   Headings and paragraphs.
-   Font styling and alignment.
-   Lists and tables.
-   Images.
-   Page setup and supported page breaks.

PPTX support:

-   Slide dimensions and backgrounds.
-   Text boxes and formatting.
-   Shapes and colors.
-   Images and positioning.
-   Slide ordering.
-   Alignment and basic grouping where supported.

Exporters must report source features they cannot represent.

**Acceptance criteria:** Generated files open in compatible office
software or renderers, preserve supported content, and pass
format-specific regression tests.

### Phase 08 --- Project Persistence

**Goal:** Turn the editor into a persistent application.

Implement:

-   Project CRUD operations.
-   Database-backed metadata and document versions.
-   Asset storage and references.
-   Autosave with debounce.
-   Explicit save and save-status indicators.
-   Recovery after refresh or temporary network failure.
-   Version history and restore.
-   Export history linked to the source version.
-   Concurrency protection against overwriting newer edits.

Autosave must not create a permanent version for every keystroke.
Separate routine save operations from meaningful version snapshots.

**Acceptance criteria:** A user can close the editor, return later,
restore a prior version, and export the exact version selected.

### Phase 09 --- Import and Conversion Center

**Goal:** Expand beyond HTML-created projects.

Implement in stages:

-   DOCX import using a supported content parser.
-   PPTX import with slide and shape extraction.
-   PDF page rendering and text extraction.
-   OCR for scanned PDFs when justified.
-   Import preview before committing changes.
-   Conversion settings and compatibility reports.
-   File-size limits and input validation.
-   Job states, retries, cancellation, and cleanup.
-   Source-file retention according to a defined policy.

PDF imports should initially focus on viewing and extraction. Complex
PDF reconstruction into fully editable elements should expand
incrementally.

**Acceptance criteria:** Each importer has documented feature support,
fixture tests, explicit warnings, and a reliable failure path. A failed
import must not corrupt an existing project.

### Phase 10 --- Quality and Production Readiness

**Goal:** Make the system dependable under real usage.

Implement and verify:

-   Upload and download authorization.
-   File-type verification beyond filename extensions.
-   HTML and SVG sanitization.
-   Sandboxed preview behavior.
-   SSRF protection for remote assets.
-   Export timeouts, file-size limits, and resource limits.
-   Rate limits for expensive operations.
-   Logging and observability.
-   Database and storage failure handling.
-   Accessibility and keyboard navigation.
-   Large-document performance tests.
-   Visual regression tests.
-   Backup and recovery procedures.
-   Production deployment and rollback documentation.

**Acceptance criteria:** Security checks, load tests, failure-injection
tests, and end-to-end workflows pass in a production-like environment.

### Phase 11 --- AI Creation and Editing

**Goal:** Add AI without redesigning the editor architecture.

Implement:

-   Natural-language document generation.
-   Document-aware instructions.
-   Selected-element context.
-   Structured editing commands.
-   Schema and permission validation.
-   Proposed-change previews.
-   Apply, reject, and undo operations.
-   Context limits and content selection.
-   Provider abstraction and API-key protection.
-   Audit records for AI-applied changes.

**Acceptance criteria:** AI creates projects or modifies selected
content without bypassing the canonical model, breaking undo/redo, or
executing untrusted code.

------------------------------------------------------------------------

## 8. Testing Strategy

Testing infrastructure should be established during Phase 01, not added
after the application becomes large.

  -----------------------------------------------------------------------
  Test level                          What it verifies
  ----------------------------------- -----------------------------------
  Unit tests                          Schema validation, editing
                                      commands, style calculations, and
                                      format mapping

  Integration tests                   Database operations, importers,
                                      exporters, and file storage

  Contract tests                      Every importer/exporter follows
                                      agreed interfaces

  Round-trip tests                    Supported content survives export
                                      and re-import where the format
                                      allows it

  Visual regression tests             Layout, typography, spacing, and
                                      positioning remain consistent

  End-to-end tests                    Real workflows from import through
                                      editing to download

  Security tests                      Malicious uploads, unsafe HTML,
                                      unauthorized access, and resource
                                      abuse

  Performance tests                   Large documents, canvas
                                      responsiveness, export duration,
                                      and memory usage
  -----------------------------------------------------------------------

### Mandatory engineering rules

Apply the full **Mandatory Coding Standards** section below to every phase. In particular: scalability first, no duplicated business logic, fewer than 10 executable lines per function except documented rare exceptions, comments explaining each function's behavior and return/side-effect contract, descriptive and appropriately documented variables/constants, no prop drilling for shared application state, strict typing, explicit error handling, and test/review gates. Keep TypeScript strict mode enabled, avoid `any` unless a documented exception is justified, and do not claim a format is supported until its acceptance tests pass.

Maintain a conversion fixture library containing representative HTML
pages, DOCX files, PPTX decks, and PDFs. Run regression tests whenever a
renderer or exporter changes.

------------------------------------------------------------------------

## 9. Security and Deployment

File conversion applications process potentially dangerous input.
Security is part of the architecture from the beginning.

### File processing

-   Validate file size, type, extension, and actual file signature where
    applicable.
-   Never trust a filename or browser-provided MIME type.
-   Keep uploaded assets separate from executable application files.
-   Apply timeouts and resource limits to expensive conversions.
-   Delete temporary files according to a defined cleanup policy.

### HTML and assets

-   Render untrusted HTML in a restricted context.
-   Prevent previews from accessing application cookies, credentials,
    and internal APIs.
-   Sanitize imported SVG and HTML where necessary.
-   Restrict server-side remote fetching to prevent SSRF.
-   Avoid executing arbitrary JavaScript during document conversion.

### Application infrastructure

-   Keep conversion dependencies and browser binaries in a reproducible
    runtime.
-   Enforce ownership checks on every project, asset, and export
    request.
-   Store secrets only on the server.
-   Introduce authentication when persistent, user-owned projects are
    implemented.
-   Move long-running exports to a dedicated worker if they exceed
    normal request limits.

The application can remain in a single Next.js repository initially. A
separate worker is an optional later deployment component, not a
requirement to start.

------------------------------------------------------------------------

## 10. Minimum Viable Product

The MVP is a complete, usable HTML-to-document editor with visual
editing and export.

### MVP feature checklist

-   [ ] Next.js application shell and dashboard.
-   [ ] Paste raw HTML and upload HTML files.
-   [ ] Live, sandboxed HTML preview.
-   [ ] Visual editing for supported text and shapes.
-   [ ] Font, color, alignment, and positioning controls.
-   [ ] Add and manipulate images.
-   [ ] Multiple pages and basic page settings.
-   [ ] Undo and redo.
-   [ ] PDF export with page settings.
-   [ ] DOCX export for supported content.
-   [ ] PPTX export for supported slide content.
-   [ ] Save and reopen projects.
-   [ ] Conversion errors and compatibility warnings.
-   [ ] Automated unit, integration, and end-to-end tests.

The MVP is not complete merely because buttons work. A user must be able
to take a representative document through the complete workflow, edit
it, export it, reopen the project, and recover the same supported
content.

PDF/DOCX/PPTX import, advanced PDF reconstruction, OCR, collaboration,
and AI follow the foundational work.

------------------------------------------------------------------------

## 11. Phase Execution Workflow

Every phase follows the same process:

1.  **Specify:** Define interfaces, data contracts, edge cases, and
    acceptance criteria.
2.  **Implement:** Build the feature within its intended module
    boundaries.
3.  **Test:** Run unit, integration, and relevant end-to-end tests,
    including regression tests.
4.  **Verify:** Confirm UI behavior, persistence, and conversion output
    meet acceptance criteria.
5.  **Document:** Record architecture, configuration, test commands,
    limitations, and known issues.
6.  **Close the phase:** Resolve failures before starting dependent
    work.

Each phase should have a completion report listing:

-   Modules and files added or changed.
-   Decisions made.
-   Tests executed and their results.
-   Known limitations.
-   Remaining issues.
-   Prerequisites for the next phase.

A generated summary or successful build is not proof that a feature
works.

------------------------------------------------------------------------

## 12. Immediate Next Step: Phase 00

Begin with requirements and architecture rather than feature
implementation.

The first deliverable should contain:

1.  Functional requirements and supported-format matrix.
2.  UI screen and interaction specifications.
3.  Canonical document schema and layout rules.
4.  Editing command and history design.
5.  Importer/exporter contracts.
6.  Repository structure and dependency choices.
7.  Persistence and storage strategy.
8.  Test plan, acceptance criteria, and stop conditions.
9.  MVP scope and deferred features.
10. Architecture decisions that should remain stable as the project
    grows.

### Key architecture decision

The editor should be a **unified workspace** with:

-   A page-based freeform canvas for design-heavy documents and slides.
-   A rich-text mode for flowing documents.
-   Shared project model, assets, history, persistence, and export
    services.
-   Specialized editing surfaces for the different layout models.

Validate and document this decision before implementing Phase 02 because
it affects the schema, editor architecture, and conversion fidelity.

------------------------------------------------------------------------

---

## 13. Mandatory Coding Standards

These standards apply from the first implementation phase and are required for every feature, bug fix, refactor, and AI integration. Scalability is the primary engineering priority, followed by correctness, maintainability, readability, and performance.

### 13.1 Scalability First

- Design modules around clear responsibilities and stable contracts.
- Keep UI components, document logic, persistence, and conversion implementations separate.
- Avoid architecture that assumes a single user, a single document, or small files.
- Use pagination, bounded queries, streaming, and background jobs where appropriate.
- Apply resource limits and timeouts to file processing and exports.
- Keep expensive operations out of the browser's main interaction path and out of request handlers when their duration exceeds the runtime's limits.
- Use interfaces for storage, importers, exporters, and other replaceable infrastructure.
- Avoid premature distributed systems: preserve module boundaries so components can be separated later when real requirements justify it.
- Define measurable performance budgets and test representative large documents.
- Every major architecture decision must explain its scaling implications and trade-offs.

### 13.2 Clean Code and No Duplication

- Do not copy and paste business logic between components, services, importers, exporters, or API routes.
- Before adding a helper, search for an existing utility or service that already owns the responsibility.
- Extract repeated behavior into a single, well-named helper, domain function, or service.
- Keep each module focused on one responsibility.
- Avoid giant components, utility files that become miscellaneous dumping grounds, and services that take responsibility for unrelated domains.
- Do not create abstractions solely to reduce line count; abstractions must have a clear name, purpose, and ownership.
- Use constants and enums for shared domain values rather than repeating magic strings or numbers.
- Prefer explicit, predictable behavior over hidden side effects.
- Remove dead code, unused imports, unreachable branches, and obsolete commented-out code.
- Before finishing a feature, review changed code for duplicated logic and unnecessary complexity.

### 13.3 Function Size: Fewer Than 10 Lines

**Every function should contain fewer than 10 executable lines.** This is a project rule and should be checked during code review.

- Count executable statements, not blank lines or comments.
- Prefer small functions with one clearly defined responsibility.
- Extract meaningful operations into well-named helper functions when a function approaches the limit.
- Use guard clauses to reduce nesting.
- Keep conditionals and loops small; extract their logic into named helpers when needed.
- Do not game the rule by moving a large block into an obscure helper, splitting code into meaningless one-line functions, or hiding complexity behind nested callbacks.
- A helper must express a meaningful operation and be independently understandable and testable.
- If a framework callback, generated function, or unavoidable integration function cannot reasonably meet the rule, document the exception and its reason in the code review. Exceptions must be rare and explicit.

This limit applies to application functions and methods. Declarative configuration, schemas, type definitions, and framework-required structures should remain readable and should not be distorted just to satisfy a line-count rule.

### 13.4 Function Documentation and Comments

Every function must have a concise comment or documentation block immediately above it explaining:

1. **What it does.**
2. **What input or state it uses**, where not already obvious from the signature.
3. **What it returns or produces**, including relevant side effects.
4. **Important failure behavior or constraints**, when applicable.

For TypeScript, use JSDoc for exported functions and important service/domain functions. Keep comments accurate whenever behavior changes.

Example:

```ts
/**
 * Normalizes a supported document title.
 * @param title - User-provided title text.
 * @returns A trimmed title, or a documented fallback when empty.
 */
function normalizeTitle(title: string): string {
  return title.trim() || DEFAULT_DOCUMENT_TITLE;
}
```

Do not write vague comments such as `// handles title`. Explain intent and contract. Comments must add information beyond simply repeating the function name.

### 13.5 Variable and Constant Documentation

Variables, constants, state values, and non-obvious derived values must have clear, self-documenting names. Add a brief comment or JSDoc when their purpose, units, lifetime, constraints, or relationship to other values is not immediately clear.

- Document module-level constants and configuration values, including why they exist and any important limits.
- Document non-obvious state variables and derived values.
- For dimensions, timeouts, file sizes, scores, and limits, make units explicit in names or comments.
- Explain non-obvious boolean flags in terms of what `true` and `false` mean.
- Avoid vague names such as `data`, `value`, `temp`, `obj`, and `result` when a domain-specific name is available.
- Do not add misleading comments or repeat the same explanation on every obvious loop index. A comment should explain purpose or constraints, not state the syntax.

Examples:

```ts
/** Maximum permitted upload size, measured in bytes. */
const MAX_UPLOAD_SIZE_BYTES = 20 * 1024 * 1024;

/** Whether the current project has unsaved canonical-model changes. */
const hasUnsavedDocumentChanges = false;
```

For local variables, clear naming is mandatory; add comments for non-obvious purpose, units, constraints, or calculations. This keeps the code documented without burying it under comments that merely repeat obvious names.

### 13.6 No Prop Drilling

Application-wide or cross-feature state must not be passed through several layers of React components merely to reach a deeply nested component.

Use the appropriate shared mechanism:

- **Domain services:** Business operations such as project management, document commands, import, export, and version history.
- **Feature-scoped stores:** Shared interactive state such as selected element, active page, editor tools, and undo/redo status.
- **Server-side services and repositories:** Persistence, authorization, and database operations.
- **React context:** Only where a scoped provider is a natural fit, such as a feature boundary or dependency configuration.
- **Local component state and props:** Keep these for state and values that genuinely belong to a component or its direct children.

Rules:

- Components should call well-defined feature actions or consume feature-scoped state rather than receive unrelated state through many intermediate components.
- Do not turn every local value into a global store or service.
- Do not put all application logic into one universal service or one global store.
- Services must have explicit interfaces and must not depend on React component rendering.
- Keep state ownership clear and avoid duplicate copies of the same source of truth.
- Use dependency injection or explicit construction where needed to keep services testable.
- Do not use a service as a workaround for poor component boundaries; keep the UI component tree understandable.

### 13.7 Type Safety and Error Handling

- Keep TypeScript strict mode enabled.
- Avoid `any`; use precise types, generics, discriminated unions, or `unknown` with validation.
- Validate untrusted data at runtime, including uploads, imported document models, API inputs, and AI-generated commands.
- Use typed error categories for validation, unsupported features, conversion failures, storage failures, and unexpected errors.
- Never silently swallow exceptions or return fake success values.
- User-facing errors must be understandable; logs should retain diagnostic context without leaking secrets or private document content.
- Functions should have predictable return contracts and documented side effects.
- Avoid hidden mutation of shared state.

### 13.8 Testing and Review Gates

Every change must satisfy the following before a phase is considered complete:

- Type checking, linting, formatting, and relevant tests pass.
- New behavior has tests at the appropriate unit, integration, contract, or end-to-end level.
- Existing regression tests continue to pass.
- Function-size and documentation rules are reviewed.
- Duplication and unnecessary abstraction are checked.
- Prop drilling and state ownership are reviewed.
- Error paths, invalid inputs, and resource limits are tested where relevant.
- The implementation matches the documented module contracts.
- Exceptions to a coding rule are documented and justified.

The goal is not simply to make the code compile. It is to keep the architecture understandable and scalable as the feature set grows.

---

## 14. Coding Standards Checklist

Use this checklist during implementation and code review:

- [ ] The design supports expected growth without introducing unnecessary distributed infrastructure.
- [ ] Each module and service has one clear responsibility.
- [ ] No duplicated business logic was introduced.
- [ ] Every function has fewer than 10 executable lines, or a documented exception.
- [ ] Every function has a comment/JSDoc explaining behavior and return/side-effect contract.
- [ ] Variables and constants have descriptive names and comments where purpose, units, or constraints need explanation.
- [ ] No application-wide state is prop-drilled through multiple component levels.
- [ ] Shared state is owned by the correct feature-scoped store or service.
- [ ] React components are not responsible for database access or conversion implementation details.
- [ ] Inputs and document data are validated.
- [ ] Errors are handled explicitly and consistently.
- [ ] Tests cover the change and existing regression tests pass.
- [ ] Any exception is documented with a clear reason.

---

## 15. Guiding Principle

Build the document core and its contracts correctly once, then extend it through tested modules. The visual editor and conversion engine must work reliably without AI. AI will eventually be a client of the established architecture, not a reason to redesign it.

Scalability is the primary architectural goal. Clean code, no duplication, small documented functions, explicit variable intent, and service/store-based state ownership are mandatory engineering rules from the first commit.

---

## 15. Guiding Principle

Build the document core and its contracts correctly once, then extend it
through tested modules. The visual editor and conversion engine must
work reliably without AI. AI will eventually be a client of the
established architecture, not a reason to redesign it.

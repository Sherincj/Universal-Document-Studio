# Universal Document Studio

Universal Document Studio is a full-stack web application for creating, editing, previewing, and converting documents across multiple formats. Built with Next.js and TypeScript, it combines a visual document editor with a modular conversion engine, enabling users to work with HTML, PDF, Word documents, and PowerPoint presentations in one workspace.

## Key Features

- **Multi-format conversion:** Convert supported documents between HTML, PDF, DOCX, and PPTX.
- **Visual document editor:** Edit text, fonts, colors, images, shapes, positioning, and page layouts.
- **Live preview:** Review document appearance before exporting.
- **HTML editing:** Paste raw HTML or import HTML files and preview the rendered output.
- **Document management:** Save projects, restore previous versions, and manage exported files.
- **Extensible architecture:** Use a shared document model and modular import/export adapters.
- **AI-assisted editing — planned:** Generate documents and apply context-aware edits using natural-language instructions.

## Technology Stack

- Next.js and React
- TypeScript
- Tailwind CSS and shadcn/ui
- Fabric.js and Tiptap
- PostgreSQL and Prisma
- Playwright, DOCX tooling, and PptxGenJS

## Engineering Principles

The project prioritizes scalability, clean code, reusable helpers, separation of concerns, strict type safety, documented functions, minimal duplication, and comprehensive testing. AI capabilities will be introduced after the core editor and conversion workflows are established.

## Project Status

**Phase 00 architecture baseline in progress.** The approved contracts and MVP boundaries are documented in [docs/phase-00-architecture.md](docs/phase-00-architecture.md), with the editor interaction contract in [docs/phase-00-ui-interactions.md](docs/phase-00-ui-interactions.md).

## Local development

Copy `.env.example` to `.env.local`, then install dependencies and run the development server:

```bash
npm install
npm run dev
```

Quality checks are available through `npm run lint`, `npm run typecheck`, `npm run format`, `npm test`, and `npm run test:e2e`.

## Deployment foundation

The project includes a multi-stage `Dockerfile` that produces a standalone Next.js runtime. The health endpoint at `/api/health` returns the standard API success envelope and can be used for platform liveness checks.

Tailwind CSS is configured in `src/app/globals.css`, and `components.json` prepares the repository for standard shadcn/ui components as they are introduced.

## Vision

Build a reliable, extensible document workspace where users can create or import content, edit it visually, preview the result, and export it to their preferred format—with AI-assisted creation and editing as a future enhancement.

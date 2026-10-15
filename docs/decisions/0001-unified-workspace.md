# ADR 0001: Use a unified workspace with specialized editing surfaces

## Status

Accepted in Phase 00.

## Context

Documents need flow layout for rich text and paginated content. Presentations and design-heavy pages need direct freeform positioning. Forcing both through Fabric.js or Tiptap would compromise editing fidelity and make the editor implementation the source of truth.

## Decision

Use one canonical project model, asset system, command layer, history system, persistence model, and conversion boundary. Use specialized surfaces for flow layout and freeform layout. Both surfaces dispatch the same validated editing commands and render from the same canonical model.

## Consequences

The application avoids duplicated project and export logic while allowing each editing surface to use the right interaction model. Elements may have layout-mode-specific constraints, and cross-mode conversion can be lossy; these cases require explicit warnings. Fabric.js and Tiptap remain adapters, never persistence formats or authoritative state.

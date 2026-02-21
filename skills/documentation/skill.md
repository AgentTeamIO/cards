# Technical Documentation

You are writing technical documentation. Follow this methodology to produce clear, accurate, and maintainable docs from code analysis.

## Documentation Process

### Step 1: Determine the Audience and Type
Identify what is needed before writing:

| Type | Audience | Purpose |
|------|----------|---------|
| **API Reference** | Developers integrating with the API | Endpoint signatures, request/response schemas, auth, errors |
| **README** | New developers or users | Quick start, installation, basic usage |
| **Architecture Overview** | Team members, future maintainers | System structure, component roles, data flow |
| **Runbook** | Operators | Step-by-step procedures for common operations and incidents |

### Step 2: Analyze the Code
- Read the public API surface: exported functions, types, HTTP handlers, CLI commands.
- Trace data flow through the system to understand component interactions.
- Identify configuration options and their defaults.
- Note error cases and how they surface to users.
- Check existing docs and comments for context the code alone does not convey.

### Step 3: Write with These Principles

**Accuracy over completeness.** Wrong docs are worse than missing docs. Only document what you can verify from the code.

**Lead with the common case.** Show the simplest working example first, then cover options and edge cases.

**Structure for scanning.** Use headings, tables, and code blocks. Developers scan, they do not read linearly.

**Show, do not tell.** A working code example communicates more than a paragraph of prose.

**Document the why, not just the what.** "This timeout is 30s because downstream P99 is 25s" is more useful than "Timeout: 30s".

**Keep it maintainable.** Avoid duplicating information. Reference canonical sources. Use concrete values from the code, not hardcoded examples that drift.

### Step 4: Structure by Doc Type

**API Reference format:**
```
## `METHOD /path`

{one-line description}

**Auth**: {required auth}

**Request**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|

**Response** (`{status}`):
{JSON example}

**Errors**:
| Status | Code | Description |
```

**README format:**
```
# {Project Name}

{one-line description}

## Quick Start
{3-5 steps to get running}

## Usage
{common operations with examples}

## Configuration
{key options}
```

**Architecture Overview format:**
```
# Architecture

## Overview
{2-3 sentence summary of what the system does}

## Components
{each component: role, responsibility, key interfaces}

## Data Flow
{how a request flows through the system}

## Key Decisions
{important trade-offs and their rationale}
```

### Step 5: Verify
- Run every code example to confirm it works.
- Confirm endpoint paths, parameter names, and types match the code.
- Check that the document is self-contained: a reader should not need to read the source code to use the documented feature.

# security-audit

Security audit skill that systematically checks for OWASP top 10 vulnerabilities, dependency CVEs, secrets exposure, and access control issues.

## Usage

Load this skill when an AI agent needs to perform a security review of a codebase or its dependencies.

**Example prompts:**
- "Audit this web application for security vulnerabilities"
- "Check our dependencies for known CVEs"
- "Review the authentication flow for security issues"

## What It Does

1. Maps the attack surface (endpoints, inputs, parsers, external calls)
2. Reviews each OWASP top 10 category against the code
3. Checks for hardcoded secrets, weak cryptography, and missing input validation
4. Audits dependencies for known vulnerabilities
5. Produces a severity-classified report with specific remediations

## Compatible Engines

- claude-code

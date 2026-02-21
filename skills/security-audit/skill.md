# Security Audit

You are performing a security audit of a codebase. Follow this systematic methodology to identify vulnerabilities, assess risk, and recommend remediations.

## Audit Process

### Phase 1: Scope and Reconnaissance
- Identify the attack surface: HTTP endpoints, CLI inputs, file parsers, IPC, database queries, external API calls.
- Map authentication and authorization boundaries. Where does unauthenticated code end and authenticated code begin?
- Catalog dependencies and their versions from manifest files (package.json, go.mod, Cargo.toml, requirements.txt).
- Note the deployment model: what runs server-side vs client-side? What has network exposure?

### Phase 2: OWASP Top 10 Review

Check each category against the codebase:

1. **Injection** (SQL, NoSQL, OS command, LDAP) — Is user input ever interpolated into queries or commands without parameterization?
2. **Broken Authentication** — Are passwords hashed with strong algorithms? Are sessions invalidated on logout? Is MFA supported?
3. **Sensitive Data Exposure** — Are secrets in source code, logs, or error messages? Is data encrypted in transit (TLS) and at rest?
4. **XML External Entities (XXE)** — Are XML parsers configured to disable external entity resolution?
5. **Broken Access Control** — Can users access resources they should not? Are authorization checks applied consistently?
6. **Security Misconfiguration** — Are debug modes, default credentials, or unnecessary features enabled? Are security headers set?
7. **Cross-Site Scripting (XSS)** — Is user input rendered in HTML without escaping? Are CSP headers configured?
8. **Insecure Deserialization** — Is untrusted data deserialized without validation? Are there gadget chains?
9. **Known Vulnerabilities** — Do dependencies have published CVEs? Are they up to date?
10. **Insufficient Logging** — Are security events (auth failures, access denied, input validation) logged? Are logs protected from injection?

### Phase 3: Code-Specific Checks

**Secrets and credentials:**
- Search for hardcoded API keys, passwords, tokens, private keys.
- Check for secrets in environment variables that are logged or exposed.
- Verify .gitignore excludes sensitive files (.env, credentials, private keys).

**Cryptography:**
- Are strong algorithms used (AES-256, SHA-256+, Ed25519)? Flag MD5, SHA-1, DES, RC4.
- Are random values generated with cryptographically secure sources?
- Are IVs/nonces unique and not reused?

**Access control:**
- Is authorization checked on every endpoint, not just the UI layer?
- Are object-level permissions enforced (IDOR prevention)?
- Are admin functions protected by role checks?

**Input validation:**
- Is all external input validated at the boundary (type, length, format, range)?
- Are file uploads restricted by type and size?
- Are path traversal sequences (../) rejected?

### Phase 4: Dependency Audit
- List all direct and transitive dependencies with versions.
- Cross-reference against CVE databases (NVD, GitHub Advisory, OSV).
- Flag outdated packages, especially those with known security fixes in newer versions.
- Note packages that are unmaintained (no commits in 12+ months).

## Severity Classification

| Severity | CVSS Range | Criteria |
|----------|------------|----------|
| **Critical** | 9.0-10.0 | Remote code execution, auth bypass, full data breach |
| **High** | 7.0-8.9 | Privilege escalation, significant data exposure, stored XSS |
| **Medium** | 4.0-6.9 | Limited data exposure, CSRF, reflected XSS, missing security headers |
| **Low** | 0.1-3.9 | Information disclosure, missing best practices |

## Output Format

```
## Security Audit Report

### Summary
- **Critical**: {count}
- **High**: {count}
- **Medium**: {count}
- **Low**: {count}
- **Scope**: {what was audited}

### Findings

#### [{severity}] {title}
- **Location**: `{file}:{line}`
- **Category**: {OWASP category or custom}
- **Description**: {what the vulnerability is}
- **Impact**: {what an attacker could achieve}
- **Remediation**: {specific fix with code example}
- **References**: {CVE, CWE, or documentation links}

### Dependency Report
| Package | Current | Latest | CVEs | Action |
|---------|---------|--------|------|--------|

### Recommendations
{prioritized list of remediations, grouped by effort level}
```

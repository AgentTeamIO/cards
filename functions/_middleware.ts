// Cloudflare Pages middleware for three-domain routing.
//
// Domain mapping:
//   agentcard.cc   → serves api/v1/agents/* (AgentCard view)
//   skillscard.cc  → serves api/v1/skills/* (SkillsCard view)
//   teamcard.cc    → serves api/v1/teams/*  (TeamCard view)
//
// Routes:
//   GET /                        → redirect to /v1/{kind}/index.json
//   GET /v1/{kind}/*         → pass through (static files)
//   GET /v1/index.json       → full index (all domains)
//   GET /{slug}.json             → shortcut: /v1/{kind}/{slug}.json
//   GET /{slug}/a2a.json         → shortcut: /v1/agents/{slug}/a2a.json (agentcard.cc only)

interface Env {
  ASSETS: Fetcher;
}

const DOMAIN_KIND_MAP: Record<string, string> = {
  "agentcard.cc": "agents",
  "skillscard.cc": "skills",
  "teamcard.cc": "teams",
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const url = new URL(request.url);
  const hostname = url.hostname;
  const kind = DOMAIN_KIND_MAP[hostname];

  // Handle OPTIONS preflight for any domain
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  // If not a mapped domain (e.g. *.pages.dev preview), serve normally
  if (!kind) {
    const response = await context.next();
    return addCorsHeaders(response);
  }

  // Root → kind index
  if (url.pathname === "/" || url.pathname === "") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${url.origin}/v1/${kind}/index.json`,
        ...Object.fromEntries(corsHeaders()),
      },
    });
  }

  // Shortcut: /{slug}/a2a.json (agentcard.cc only)
  if (kind === "agents") {
    const a2aMatch = url.pathname.match(/^\/([a-z0-9][a-z0-9.-]*)\/a2a\.json$/);
    if (a2aMatch) {
      url.pathname = `/v1/agents/${a2aMatch[1]}/a2a.json`;
      return fetchAsset(context, url);
    }
  }

  // Shortcut: /{slug}.json → /v1/{kind}/{slug}.json
  const slugMatch = url.pathname.match(/^\/([a-z0-9][a-z0-9.-]*)\.json$/);
  if (slugMatch) {
    url.pathname = `/v1/${kind}/${slugMatch[1]}.json`;
    return fetchAsset(context, url);
  }

  // Pass through (static file serving for /v1/* and everything else)
  const response = await context.next();
  return addCorsHeaders(response);
};

async function fetchAsset(
  context: EventContext<Env, string, unknown>,
  url: URL,
): Promise<Response> {
  const newRequest = new Request(url.toString(), context.request);
  const response = await context.env.ASSETS.fetch(newRequest);
  return addCorsHeaders(response);
}

function corsHeaders(): Headers {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return headers;
}

function addCorsHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Only set Content-Type to JSON for .json responses; leave others untouched
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json") || response.url?.endsWith(".json")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

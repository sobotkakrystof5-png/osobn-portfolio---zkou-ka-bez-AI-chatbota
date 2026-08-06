# n8n-MCP — instrukce pro tento projekt

Tento projekt má nakonfigurovaný [n8n-mcp](https://github.com/czlonkowski/n8n-mcp) server (viz `.mcp.json`) —
dává Claude Code přístup k dokumentaci n8n nodů, validaci workflow a (volitelně) přímé správě
n8n instance přes API.

## Kontext projektu

- Lokální n8n instance běží na `http://localhost:5678` (viz `.env.local` → `NEXT_PUBLIC_N8N_WEBHOOK_URL`).
- Produkční chat widget (`components/N8nChatWidget.tsx`) volá n8n Chat Trigger webhook — to je
  oddělené od n8n-mcp a nepotřebuje API klíč.
- n8n-mcp bez `N8N_API_KEY` funguje jen v režimu dokumentace/validace (bezpečné, žádné credentials).
  Pro plnou správu workflow (create/update/execute) je potřeba nastavit `N8N_API_KEY` — vygeneruj ho
  v n8n UI (Settings → API), pak v terminálu `export N8N_API_KEY=...` před spuštěním `claude`
  (klíč se necommituje, `.mcp.json` ho čte přes `${N8N_API_KEY}`).

## Bezpečnost

**Nikdy needituj produkční workflow napřímo přes AI.** Vždy nejdřív workflow zkopíruj, testuj ve vývoji,
a před nasazením do produkce validuj.

## n8n-skills (expertní skill pack)

Projekt má k `n8n-mcp` doinstalovaný [n8n-skills](https://github.com/czlonkowski/n8n-skills) —
14 specializovaných skillů + router skill (`using-n8n-mcp-skills`), nainstalované projektově v
`.claude/skills/` (ne globálně v `~/.claude/skills/`, takže jedou i pro ostatní přispěvatele bez
dalšího setupu). Nahrazují dřívější ruční poznámky o krocích/validaci níže v tomto souboru — ty
byly vázané na starší verzi n8n-mcp API (např. samostatné `validate_workflow_connections` /
`validate_workflow_expressions` tooly už neexistují, nahradil je unifikovaný `validate_workflow`).

**Vždy nejdřív zavolej `using-n8n-mcp-skills`** (Skill tool) před jakoukoli prací na n8n workflow —
i drobnou. Ten routuje na konkrétní skill podle úkolu:

| Skill | Kdy |
|---|---|
| `n8n-mcp-tools-expert` | Volání MCP toolů (search/get_node, validate, workflow management, credentials, audit) |
| `n8n-workflow-patterns` | Návrh architektury (webhook, HTTP API, DB, AI, scheduled) |
| `n8n-expression-syntax` | `{{ }}` výrazy, `$json`/`$node`, časté chyby |
| `n8n-node-configuration` | Konfigurace konkrétního nodu, `displayOptions`, `patchNodeField` |
| `n8n-validation-expert` | Interpretace chyb/warningů z validace, false positives, `n8n_autofix_workflow` |
| `n8n-code-javascript` / `n8n-code-python` | Code node (JS je default, Python jen na explicitní žádost) |
| `n8n-code-tool` | Kód pro AI-agent-callable Custom Code Tool — jiný runtime než Code node |
| `n8n-error-handling` | Error output větve, retry, Error Trigger, 4xx/5xx response shapes |
| `n8n-binary-and-data` | `$binary` vs `$json`, soubory/obrázky, CDN pro chat |
| `n8n-subworkflows` | Extrakce sdílené logiky do sub-workflow |
| `n8n-agents` | AI Agent nody (model/memory/tools/outputParser, `$fromAI`) |
| `n8n-multi-instance` | Práce s víc n8n instancemi na jednom účtu |
| `n8n-self-hosting` | Nasazení self-hosted n8n na VM (Docker Compose + Caddy) — mimo tento projekt, jen když se řeší hosting samotného n8n |

Tři nepodmíněná pravidla z routeru (`using-n8n-mcp-skills`), platí vždy:
1. Skill se volá **před** samotnou akcí (psaní výrazu, konfigurace nodu, návrh workflow), ne jen před MCP toolem.
2. **Validuj i verifikuj** — `validate_workflow` před aktivací, a `n8n_get_workflow` po každém create/update
   ke kontrole `connections` (validace projde i u tiše odpojených wires).
3. **Credentials nikdy v textových polích** — vždy přes n8n credential systém, i u HTTP Request nodu.

Enforcement hooks (SessionStart router injection, PreToolUse per-node reminders, PostToolUse routing
po `validate_workflow`) jsou zkopírované do `.claude/hooks/` a zapojené v `.claude/settings.json`
(cesty přes `$CLAUDE_PROJECT_DIR`, funguje nezávisle na tom, kam je repo naklonovaný). Skripty čtou
JSON ze stdin a při jakékoli chybě tiše selžou (exit 0) — nikdy neblokují tool call, jen injectují
`additionalContext`.

Atribuce: `.claude/NOTICES-n8n-skills`, `.claude/NOTICES-APACHE-2.0.txt`, `.claude/LICENSE-n8n-skills`
(MIT, autor Romuald Członkowski; část hooks adaptována z `n8n-io/skills`, Apache-2.0).

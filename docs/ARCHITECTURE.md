# NEXUS AI Architecture

## 1. Product shape

NEXUS AI is a control plane for multiple AI providers and specialized agents. It should not attempt to copy every vendor's product. It should expose common capabilities through adapters, then coordinate work through a central orchestration layer.

## 2. Logical components

1. **Client applications** — Android-first application and responsive web client.
2. **NEXUS API** — authentication, user settings, conversation/session management, policy enforcement, and audit events.
3. **Orchestrator** — plans tasks, selects agents/models, delegates work, handles retries/timeouts, and combines results.
4. **Provider gateway** — a normalized interface to hosted and self-hosted model providers. Evaluate LiteLLM as the initial gateway.
5. **Agent registry** — stores agent identity, description, capabilities, supported tools, provider/model preferences, version, and permission profile.
6. **Tool gateway** — exposes approved tools through MCP-compatible interfaces; validates authorization and input/output schemas.
7. **Agent interoperability** — evaluate A2A for communication with independently hosted agents.
8. **Persistence and observability** — PostgreSQL for durable records; structured logs, usage/cost tracking, traces, and audit history.

## 3. Provider strategy

Potential provider families to evaluate (not yet connected):

- OpenAI
- Anthropic
- Google Gemini
- xAI
- Meta Llama (hosted or self-hosted distributions)
- Mistral
- DeepSeek
- Cohere
- Perplexity
- Amazon Bedrock
- Microsoft Azure AI
- NVIDIA-hosted and self-hosted inference
- Qwen and other compatible open-weight models

A provider is not considered integrated merely because it appears in this list. Each adapter must pass authentication, model discovery, basic generation, streaming (if supported), error handling, rate-limit handling, and cost/usage tests.

## 4. Agent registry model

Each registered agent should have, at minimum:

- Stable agent ID and human-readable name
- Description and capability tags
- Endpoint or internal handler reference
- Supported input/output schema
- Provider/model requirements (if any)
- Tool allowlist
- Permission tier
- Timeout, retry, and rate-limit policy
- Version, health status, and last verification time

Do not treat an agent's self-description as proof of its capabilities. Validate declared capabilities and enforce them at runtime.

## 5. Orchestration behavior

The orchestrator should:

1. Classify the user's task and constraints.
2. Select the smallest suitable set of agents.
3. Provide each agent only the context required for its task.
4. Run independent tasks in parallel when safe.
5. Require explicit user approval for consequential external actions.
6. Validate outputs, resolve disagreements, and produce a traceable final result.
7. Record provider/model usage and estimated cost.

A multi-agent response should not be assumed to be more accurate merely because more agents participated.

## 6. Security and privacy boundaries

- Provider credentials stay on the server and are never sent to the mobile client.
- Use per-user secrets, encrypted at rest, with rotation and revocation support.
- Apply least-privilege tool permissions and per-agent scopes.
- Require confirmation before financial transactions, account changes, sending messages, publishing content, deleting data, or other consequential actions.
- Use audit logs for tool calls and approval decisions.
- Redact secrets and sensitive data from logs.
- Treat prompts, retrieved documents, tool results, and other agent outputs as untrusted data.
- Provide usage limits, budgets, rate limits, and emergency disable controls.

## 7. Suggested implementation phases

### Phase 1 — Foundation
- Confirm application runtime and deployment target.
- Establish backend API and configuration conventions.
- Add provider gateway abstraction and health checks.
- Add provider/model registry and secure credential handling.
- Add tests with mocked provider responses.

### Phase 2 — First live providers
- Integrate OpenAI and Anthropic first.
- Add Gemini, xAI, and additional compatible providers incrementally.
- Verify each adapter against current vendor documentation and account access.

### Phase 3 — Agents and orchestration
- Add agent registry and capability discovery.
- Add task planner, delegation, result aggregation, and execution traces.
- Add MCP tool gateway with explicit permission scopes.

### Phase 4 — Interoperability
- Evaluate A2A for external agent discovery and communication.
- Add import/registration workflow for trusted third-party agents.
- Require verification and permission review before activation.

### Phase 5 — Android experience
- Build the command center, agent catalog, task activity, approvals, settings, and usage dashboard.
- Keep sensitive provider credentials and orchestration on the backend.

## 8. Initial technical choices to validate

- **Provider gateway:** LiteLLM is a candidate for normalizing access to many model providers; validate current supported providers, license, deployment needs, and feature gaps.
- **Agent orchestration:** choose a framework only after confirming the existing app stack; evaluate LangGraph and comparable options.
- **Agent interoperability:** evaluate the current A2A specification and ecosystem.
- **Tool interoperability:** use MCP where it provides a clear tool integration boundary.
- **Database:** PostgreSQL for users, provider configuration metadata, agent registry, sessions, usage, and audit events. Secrets should use a dedicated secrets mechanism rather than plain database fields.

## 9. Definition of done for an integration

A provider or agent may be marked **Verified** only after:
- credentials are configured securely;
- a health or connectivity check succeeds;
- a representative request succeeds;
- expected errors and rate limits are handled;
- timeout and retry behavior are tested;
- usage/cost data is captured where available;
- permissions and data handling are documented.

## 10. Current status

The repository is being initialized with architecture documentation. No provider adapters, agent orchestration, MCP server, A2A integration, or Android application are claimed to be implemented yet.

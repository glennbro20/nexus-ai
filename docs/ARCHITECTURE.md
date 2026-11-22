# NEXUS AI Architecture

## 1. Product principle: neutral collaborative intelligence

NEXUS is not a wrapper that makes one AI the boss and treats others as optional add-ons. It is a neutral coordination layer. All connected providers and agents enter through documented adapters and receive equal standing in the collaboration process.

The user should not have to choose a model. The user gives NEXUS a task; NEXUS coordinates the connected systems, manages the work, and returns one synthesized result with important disagreements and source attribution visible when useful.

Equal footing means equal opportunity to contribute under consistent policies. It does not mean claiming every model has identical capabilities, forcing every provider into every request, or hiding costs and limitations.

## 2. Logical components

1. **Client applications** — Android-first application and responsive web client.
2. **NEXUS API** — authentication, settings, sessions, policy enforcement, approvals, and audit events.
3. **Neutral orchestrator** — decomposes tasks, invites relevant connected agents, coordinates parallel work, compares results, resolves conflicts, and synthesizes the response.
4. **Provider gateway** — normalized access to hosted and self-hosted model providers; evaluate LiteLLM.
5. **Provider/model registry** — stores provider identity, supported models, capabilities, health, access state, cost metadata, and verification status.
6. **Agent registry** — stores agent identity, capabilities, tools, endpoint/handler, version, and permission profile.
7. **Tool gateway** — approved tools exposed through MCP-compatible interfaces with authorization and schema validation.
8. **Agent interoperability** — evaluate A2A for independent agent discovery and communication.
9. **Persistence and observability** — PostgreSQL for durable metadata, sessions, usage, traces, and audit events.

## 3. Neutrality and collaboration rules

- No provider receives a permanent ranking advantage or exclusive authority.
- Provider adapters implement the same common contract and pass the same integration tests.
- The orchestrator is provider-neutral and cannot be controlled by a provider being evaluated.
- For substantive tasks, the default policy should request independent contributions from the broadest practical set of connected, relevant agents, subject to the user's cost, latency, privacy, and availability settings.
- For simple or latency-sensitive tasks, NEXUS may use a smaller set automatically; this is an operational optimization, not a user-facing model choice.
- Agents should initially work independently when practical to reduce groupthink and anchoring.
- The synthesis stage compares claims, evidence, uncertainty, and disagreements. It must not resolve a disagreement by provider brand or popularity.
- Preserve dissenting, well-supported views rather than manufacturing consensus.
- A single final response is presented to the user, with expandable collaboration details and attribution where useful.
- Never claim an agent participated unless its call succeeded and its output was received.

## 4. Provider strategy

Potential provider families to evaluate (not yet connected):

- OpenAI
- Anthropic
- Google Gemini
- xAI
- Meta Llama (hosted or self-hosted)
- Mistral
- DeepSeek
- Cohere
- Perplexity
- Amazon Bedrock
- Microsoft Azure AI
- NVIDIA inference
- Qwen and other compatible open-weight models

A provider is not integrated merely because it appears in this list. Each adapter must pass authentication, model discovery, request/response, streaming where supported, error handling, rate-limit handling, usage/cost capture, and security tests. Some services expose models rather than independent agents; NEXUS should accurately distinguish the two.

## 5. Orchestration lifecycle

1. Receive the user's task and constraints once.
2. Classify task type, sensitivity, required tools, and expected output.
3. Find available agents by verified capabilities, not marketing claims.
4. Apply the user's collaboration policy, privacy constraints, budget, and latency limits.
5. Dispatch independent subtasks in parallel where safe; give each agent only necessary context.
6. Collect outputs with provider/agent identity, model/version, timestamps, and usage metadata.
7. Validate outputs, compare evidence, identify contradictions, and request targeted follow-up where worthwhile.
8. Synthesize one coherent answer, explicitly preserving material uncertainty and unresolved disagreement.
9. Present one answer and optionally an audit view of which agents contributed.
10. Record usage, cost, latency, failures, and quality feedback for continuous evaluation.

## 6. Agent registry model

Each registered agent needs:
- Stable ID and human-readable name
- Description and capability tags
- Endpoint or internal handler
- Input/output schema
- Provider/model requirements, if any
- Tool allowlist and permission scope
- Timeout, retry, and rate-limit policy
- Version, health status, and last verification time

Self-described capabilities are not proof. Validate them at runtime.

## 7. Security and privacy boundaries

- Provider credentials stay server-side and never reach the mobile client.
- Encrypt secrets at rest; support rotation and revocation.
- Apply least-privilege, per-user and per-agent tool scopes.
- Require explicit approval for financial transactions, account changes, sending messages, publishing, deleting data, and other consequential actions.
- Log tool calls and approval decisions; redact secrets and sensitive data.
- Treat prompts, retrieved documents, tool results, and agent outputs as untrusted data.
- Provide per-user budgets, rate limits, usage visibility, and an emergency disable control.
- Respect provider data retention and training settings; disclose when data must be sent to an external provider.

## 8. Suggested implementation phases

### Phase 1 — Foundation
- Confirm the existing app runtime and deployment target.
- Establish backend API and configuration conventions.
- Define common provider adapter contract and provider registry.
- Add secure credential handling, health checks, and mocked adapter tests.
- Establish neutral collaboration policy and usage controls.

### Phase 2 — Provider adapters
- Implement and verify initial provider adapters.
- Add more providers incrementally through the same contract.
- Do not privilege any provider in orchestration defaults.

### Phase 3 — Collaboration engine
- Add agent registry, task planner, parallel delegation, evidence comparison, synthesis, traces, and cost accounting.
- Add MCP tool gateway with explicit permission scopes.

### Phase 4 — Interoperability
- Evaluate A2A for external agent discovery and collaboration.
- Add trusted agent registration and verification workflow.

### Phase 5 — Android experience
- Build the single-input command center, agent activity view, approvals, settings, and usage dashboard.
- Keep secrets and orchestration on the backend.

## 9. Technical choices to validate

- Provider gateway: evaluate LiteLLM for provider normalization, current support, license, and feature gaps.
- Orchestration: evaluate LangGraph and alternatives only after confirming the existing stack.
- Agent interoperability: evaluate current A2A specification and ecosystem.
- Tool interoperability: use MCP where it provides a clear boundary.
- Database: PostgreSQL for users, provider metadata, agent registry, sessions, usage, and audit events. Store secrets in a dedicated secrets mechanism, not plain database fields.

## 10. Definition of done

An integration is Verified only after secure credentials, successful connectivity and representative requests, error/rate-limit handling, timeout/retry tests, usage capture, permission review, and documented data handling.

## 11. Current status

This repository currently contains architecture documentation only. No provider adapters, live orchestration, MCP server, A2A integration, or Android app are yet implemented.

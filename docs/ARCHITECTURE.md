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
8. **Media orchestration gateway** — routes audio, video, image, and 3D jobs to specialist providers through capability-specific adapters.
9. **Agent interoperability** — evaluate A2A for independent agent discovery and communication.
10. **Persistence and observability** — PostgreSQL for durable metadata, sessions, usage, traces, and audit events; object storage for generated media assets.

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

Potential language-model provider families to evaluate (not yet connected):

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

## 5. Multimodal media orchestration

NEXUS must treat media generation as first-class work, not as a text agent feature. A media request can be planned by the neutral orchestrator, executed by one or more specialist media providers, and returned as managed assets with provenance and cost records.

Capability families:
- **Audio:** text-to-speech, speech-to-text, real-time voice agents, voice conversion/cloning (with consent and rights checks), dubbing, music, and sound effects.
- **Video:** text-to-video, image-to-video, video-to-video editing, extension, avatars, lip-sync, and post-processing.
- **Images:** text/image generation, editing, reference-guided generation, and upscaling.
- **3D/real-time:** text/image-to-3D and interactive audiovisual experiences where supported.

Potential integrations to evaluate:
- **ElevenLabs:** specialist audio and voice stack — speech, transcription, voice agents, music, and sound effects.
- **Runway API:** video, image, audio and avatar/media workflows; verify exact model availability and current API access.
- **fal:** multi-provider inference catalog spanning image, video, audio and 3D models.
- **Replicate:** API access to hosted and community models, with model-specific schemas.
- **Google Veo via Gemini/Vertex APIs:** video generation; verify project/region eligibility and current API terms.
- **Kling and Luma:** direct specialist video APIs where their unique controls/models justify separate adapters.
- Additional providers such as HeyGen, MiniMax, and others should be evaluated against actual API access, capabilities, terms, and cost.

Do not hard-code a single media vendor as the default for all tasks. Select behind the scenes based on required capability, output quality, reference inputs, duration/resolution, latency, availability, data policy, and user budget. When useful, compare multiple providers with the same prompt and references.

### Media job lifecycle

1. Parse the creative brief and determine required media type, duration, aspect ratio, resolution, language, references, and output format.
2. Identify compatible, verified providers and model endpoints.
3. Estimate costs and show a clear approval step when a request may incur meaningful charges.
4. Submit asynchronous jobs and track queued/running/succeeded/failed states.
5. Retrieve outputs securely, validate format/duration, and store assets in object storage.
6. Return previews, asset links, provider/model provenance, and actual usage/cost.
7. Support retry, cancellation, and cleanup of temporary assets.

### Media security and rights

- Keep media API keys on the backend.
- Obtain user consent and confirm rights before voice cloning, face/likeness use, or use of third-party reference media.
- Apply content and safety policies consistently across vendors.
- Use signed, expiring URLs for private generated assets.
- Track retention/deletion policies and provider data handling.
- Never expose provider credentials in Android/web clients or logs.

## 6. Orchestration lifecycle

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

## 7. Agent registry model

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

## 8. Security and privacy boundaries

- Provider credentials stay server-side and never reach the mobile client.
- Encrypt secrets at rest; support rotation and revocation.
- Apply least-privilege, per-user and per-agent tool scopes.
- Require explicit approval for financial transactions, account changes, sending messages, publishing, deleting data, and other consequential actions.
- Log tool calls and approval decisions; redact secrets and sensitive data.
- Treat prompts, retrieved documents, tool results, and agent outputs as untrusted data.
- Provide per-user budgets, rate limits, usage visibility, and an emergency disable control.
- Respect provider data retention and training settings; disclose when data must be sent to an external provider.

## 9. Suggested implementation phases

### Phase 1 — Foundation
- Confirm the existing app runtime and deployment target.
- Establish backend API and configuration conventions.
- Define common provider adapter contract and provider registry.
- Add secure credential handling, health checks, and mocked adapter tests.
- Establish neutral collaboration policy and usage controls.

### Phase 2 — Provider adapters
- Implement and verify initial language-model provider adapters.
- Add more providers incrementally through the same contract.
- Do not privilege any provider in orchestration defaults.

### Phase 3 — Collaboration engine
- Add agent registry, task planner, parallel delegation, evidence comparison, synthesis, traces, and cost accounting.
- Add MCP tool gateway with explicit permission scopes.

### Phase 4 — Media services
- Implement media job abstraction and object storage.
- Integrate ElevenLabs for audio first.
- Add a multi-provider video gateway (evaluate Runway, fal, and Replicate) and direct video providers where needed.
- Add image and 3D providers using the same asset/job lifecycle.
- Implement cost estimation, approvals, status polling/webhooks, and asset management.

### Phase 5 — Interoperability
- Evaluate A2A for external agent discovery and collaboration.
- Add trusted agent registration and verification workflow.

### Phase 6 — Android experience
- Build the single-input command center, agent activity view, media studio, asset library, approvals, settings, and usage dashboard.
- Keep secrets and orchestration on the backend.

## 10. Technical choices to validate

- Provider gateway: evaluate LiteLLM for language-model normalization, current support, license, and feature gaps.
- Media gateway: use a common internal job contract; evaluate direct APIs and aggregators such as fal, Runway, and Replicate based on coverage, cost, terms, and reliability.
- Orchestration: evaluate LangGraph and alternatives only after confirming the existing stack.
- Agent interoperability: evaluate current A2A specification and ecosystem.
- Tool interoperability: use MCP where it provides a clear boundary.
- Database: PostgreSQL for users, provider metadata, agent registry, sessions, usage, and audit events.
- Object storage: private bucket for generated audio, video, images, and derived assets; signed URLs for access.
- Store secrets in a dedicated secrets mechanism, not plain database fields.

## 11. Definition of done

An integration is Verified only after secure credentials, successful connectivity and representative requests, error/rate-limit handling, timeout/retry tests, usage capture, permission review, and documented data handling.

## 12. Current status

This repository currently contains architecture documentation only. No provider adapters, live orchestration, media generation integration, MCP server, A2A integration, or Android app are yet implemented.

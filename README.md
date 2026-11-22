# NEXUS AI

NEXUS AI is a neutral, provider-agnostic collaborative intelligence platform. Its purpose is to bring many AI providers and specialized agents into one workspace so they can contribute together without making the user choose a favorite.

## Core principle: equal footing

- No provider is the default owner, privileged voice, or permanent "best" AI.
- The user asks once; NEXUS coordinates the work across the connected systems.
- When useful and within the user's configured budget/latency policy, multiple connected providers contribute independently and in parallel.
- NEXUS compares evidence, surfaces meaningful disagreements, and synthesizes one clear response.
- Provider selection and task routing happen behind the scenes. The user does not need to pick a model.
- Provider availability, capability, evidence quality, privacy, and cost are measured transparently; equal footing does not mean pretending all systems have identical capabilities.

## Project goals

- Connect hosted and self-hosted AI model providers through one interface.
- Maintain a provider/model registry with capability and health metadata.
- Register specialized agents and let them collaborate through controlled interfaces.
- Support MCP tool integrations and evaluate A2A for agent-to-agent interoperability.
- Provide an Android-first experience and responsive web client.
- Keep credentials server-side and require approval for consequential actions.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/COLLABORATION_PRINCIPLES.md](docs/COLLABORATION_PRINCIPLES.md).

## Development status

This repository currently contains project and architecture documentation. It does not yet contain a working mobile app, backend, provider adapters, or live multi-agent orchestration. Those components must be implemented and tested before they are described as operational.

## Security

- Never commit API keys, access tokens, passwords, or personal financial/medical data.
- Use environment variables or a managed secrets store for credentials.
- Apply least-privilege permissions and require approval for consequential external actions.
- Treat provider responses, retrieved content, and agent outputs as untrusted input.
- Provide cost limits, rate limits, audit logs, and an emergency disable control.

## Integration strategy

Build a provider-neutral gateway and agent registry. Evaluate LiteLLM for model access, MCP for tool connectivity, and A2A for external agent collaboration. Verify each integration against current vendor APIs, account access, model availability, pricing, and usage limits before enabling it.

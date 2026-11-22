# NEXUS AI

NEXUS AI is a provider-agnostic, multi-agent workspace designed to connect AI model providers, discover specialized agents, and coordinate work through a central orchestrator.

## Project goals

- Connect multiple hosted and self-hosted AI model providers through one interface.
- Maintain a provider and model registry with capability metadata.
- Register and invoke specialized agents through controlled tool interfaces.
- Support agent-to-agent collaboration and Model Context Protocol (MCP) integrations.
- Provide an Android-first user experience, with a responsive web interface.
- Keep provider credentials server-side and enforce explicit permissions for consequential actions.

## Architecture direction

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the proposed architecture, integration phases, security boundaries, and initial provider strategy.

## Development status

This repository is being initialized. No production integrations or deployed agent orchestration should be assumed until implemented and tested.

## Security

- Never commit API keys, access tokens, passwords, or personal financial/medical data.
- Use environment variables or a managed secrets store for credentials.
- Keep tool permissions least-privilege and require confirmation for consequential external actions.
- Treat provider responses and agent outputs as untrusted input.

## Initial integration strategy

Start with a provider gateway abstraction (evaluate LiteLLM) rather than hard-coding each vendor into the application. Add providers incrementally and verify their current API, authentication, model availability, pricing, and usage limits before enabling them.

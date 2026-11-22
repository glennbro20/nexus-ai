# NEXUS AI Collaboration Principles

## User experience
The user submits one request to NEXUS. They do not select a provider, manually forward prompts, or reconcile several chat windows. NEXUS returns one synthesized response.

## Equal footing
Every connected provider and agent uses the same adapter contract, policy checks, telemetry, and evaluation process. No vendor is the default authority. NEXUS's orchestrator is independent of the providers it coordinates.

## Broad collaboration by default
For substantive tasks, NEXUS should invite all relevant, currently available connected agents within the user's configured budget, privacy, and latency limits. Simple tasks can be handled by fewer agents automatically. This is an internal optimization and must not force the user to choose.

## Independent reasoning before synthesis
When practical, agents receive the task independently before seeing other agents' answers. This reduces anchoring. The synthesis process compares evidence and reasoning, not brand identity.

## Honest disagreement
NEXUS must distinguish agreement, corroboration, contradiction, and uncertainty. It must not fabricate consensus or discard a well-supported minority view. A final answer can be singular while preserving important caveats.

## Transparent operation
Only successful calls count as participation. NEXUS records which agents contributed, model/version, latency, failures, and usage/cost. Users can inspect collaboration details without being required to manage them.

## Safety and permissions
Agents do not inherit unrestricted authority from one another. Each tool call is independently authorized. Consequential external actions require explicit user approval, even when multiple agents recommend them.

## Fair evaluation
Evaluate agents with shared task sets and metrics appropriate to the task: correctness, evidence quality, calibration, robustness, latency, and cost. Use evaluation results to improve routing, not to create permanent vendor favoritism.

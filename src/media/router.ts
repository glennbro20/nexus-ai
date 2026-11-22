import type { MediaJobRequest, MediaProvider } from "./types.js";
import { MediaProviderRegistry } from "./registry.js";

export class NoEligibleMediaProviderError extends Error {
  constructor(modality: string, capability: string) {
    super(`No enabled provider supports ${modality}/${capability}`);
    this.name = "NoEligibleMediaProviderError";
  }
}

export class MediaRouter {
  constructor(private readonly registry: MediaProviderRegistry) {}

  async submit(request: MediaJobRequest): Promise<Awaited<ReturnType<MediaProvider["submit"]>>> {
    const eligible = this.registry.getEligible(request.modality, request.capability);
    if (eligible.length === 0) {
      throw new NoEligibleMediaProviderError(request.modality, request.capability);
    }

    const budget = request.constraints?.maxEstimatedCostUsd;
    const withinBudget = eligible.filter(({ descriptor }) =>
      budget === undefined ||
      descriptor.estimatedCostUsd === undefined ||
      descriptor.estimatedCostUsd <= budget
    );

    if (withinBudget.length === 0) {
      throw new Error("No eligible provider fits the configured cost ceiling");
    }

    // Deterministic tie-breaking keeps tests reproducible. Production routing will
    // use measured quality, health, latency, privacy and actual cost telemetry.
    const selected = [...withinBudget].sort((a, b) =>
      a.descriptor.id.localeCompare(b.descriptor.id)
    )[0];

    return selected.submit(request);
  }
}

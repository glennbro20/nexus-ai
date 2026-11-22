import type { MediaCapability, MediaModality, MediaProvider } from "./types.js";

export class MediaProviderRegistry {
  private readonly providers = new Map<string, MediaProvider>();

  register(provider: MediaProvider): void {
    if (this.providers.has(provider.descriptor.id)) {
      throw new Error(`Provider already registered: ${provider.descriptor.id}`);
    }
    this.providers.set(provider.descriptor.id, provider);
  }

  getEligible(modality: MediaModality, capability: MediaCapability): MediaProvider[] {
    return [...this.providers.values()].filter(({ descriptor }) =>
      descriptor.enabled &&
      descriptor.modalities.includes(modality) &&
      descriptor.capabilities.includes(capability)
    );
  }

  list(): MediaProvider[] {
    return [...this.providers.values()];
  }
}

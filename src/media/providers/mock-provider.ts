import type { MediaProvider, MediaJobRequest } from "../types.js";

export class MockMediaProvider implements MediaProvider {
  constructor(
    readonly descriptor: MediaProvider["descriptor"],
    private readonly now: () => Date = () => new Date()
  ) {}

  async submit(request: MediaJobRequest) {
    const timestamp = this.now().toISOString();
    return {
      id: `mock_${this.descriptor.id}_${Date.now()}`,
      providerId: this.descriptor.id,
      request,
      status: "succeeded" as const,
      createdAt: timestamp,
      updatedAt: timestamp,
      outputAssetIds: []
    };
  }
}

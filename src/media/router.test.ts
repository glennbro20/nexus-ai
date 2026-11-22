import test from "node:test";
import assert from "node:assert/strict";
import { MediaProviderRegistry } from "./registry.js";
import { MediaRouter, NoEligibleMediaProviderError } from "./router.js";
import { MockMediaProvider } from "./providers/mock-provider.js";

const audioProvider = new MockMediaProvider({
  id: "mock-audio",
  displayName: "Mock Audio",
  capabilities: ["text-to-speech"],
  modalities: ["audio"],
  verification: "mock",
  enabled: true,
  estimatedCostUsd: 0.01
});

test("routes a supported media request to an eligible provider", async () => {
  const registry = new MediaProviderRegistry();
  registry.register(audioProvider);
  const router = new MediaRouter(registry);

  const job = await router.submit({
    modality: "audio",
    capability: "text-to-speech",
    input: { text: "Hello from NEXUS" }
  });

  assert.equal(job.providerId, "mock-audio");
  assert.equal(job.status, "succeeded");
});

test("rejects requests when no provider supports the capability", async () => {
  const router = new MediaRouter(new MediaProviderRegistry());

  await assert.rejects(
    () => router.submit({
      modality: "video",
      capability: "text-to-video",
      input: { prompt: "A sunrise over the ocean" }
    }),
    NoEligibleMediaProviderError
  );
});

test("respects the request cost ceiling", async () => {
  const registry = new MediaProviderRegistry();
  registry.register(audioProvider);
  const router = new MediaRouter(registry);

  await assert.rejects(
    () => router.submit({
      modality: "audio",
      capability: "text-to-speech",
      input: { text: "Hello" },
      constraints: { maxEstimatedCostUsd: 0.001 }
    }),
    /cost ceiling/
  );
});

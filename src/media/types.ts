export type MediaModality = "audio" | "video" | "image" | "3d";

export type MediaCapability =
  | "text-to-speech"
  | "speech-to-text"
  | "voice-agent"
  | "music-generation"
  | "sound-effects"
  | "text-to-video"
  | "image-to-video"
  | "video-to-video"
  | "avatar-video"
  | "text-to-image"
  | "image-edit"
  | "image-upscale"
  | "text-to-3d"
  | "image-to-3d";

export type MediaJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface MediaInput {
  prompt?: string;
  text?: string;
  sourceAssetIds?: string[];
  options?: Record<string, string | number | boolean>;
}

export interface MediaJobRequest {
  modality: MediaModality;
  capability: MediaCapability;
  input: MediaInput;
  constraints?: {
    maxEstimatedCostUsd?: number;
    maxDurationSeconds?: number;
    aspectRatio?: string;
    resolution?: string;
    language?: string;
    privacy?: "standard" | "restricted";
  };
}

export interface ProviderDescriptor {
  id: string;
  displayName: string;
  capabilities: MediaCapability[];
  modalities: MediaModality[];
  verification: "mock" | "candidate" | "verified";
  enabled: boolean;
  estimatedCostUsd?: number;
}

export interface MediaJob {
  id: string;
  providerId: string;
  request: MediaJobRequest;
  status: MediaJobStatus;
  createdAt: string;
  updatedAt: string;
  outputAssetIds: string[];
  error?: string;
}

export interface MediaProvider {
  descriptor: ProviderDescriptor;
  submit(request: MediaJobRequest): Promise<MediaJob>;
}

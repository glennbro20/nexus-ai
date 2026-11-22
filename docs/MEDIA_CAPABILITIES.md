# NEXUS AI — Media Capabilities and Integration Plan

## Purpose

NEXUS should let the user request audio, video, images, and eventually 3D content in plain language. The user should not need to know which vendor or model to select. The media orchestrator chooses compatible verified services behind the scenes, within privacy and budget limits.

This document lists integration candidates, not connected accounts or completed integrations.

## Audio

### ElevenLabs — first specialist integration candidate

Capabilities to evaluate:
- Text-to-speech and expressive narration
- Speech-to-text and transcription
- Real-time conversational voice agents
- Dubbing and multilingual audio
- Sound effects and music generation
- Voice design and consent-based voice cloning

Official resources:
- API overview: https://elevenlabs.io/api
- Developer documentation: https://elevenlabs.io/docs/overview/intro/

Other audio providers and model endpoints can be evaluated through aggregators such as fal and Replicate, plus direct vendor APIs where justified.

## Video

### Multi-provider API candidates

| Candidate | Why evaluate it | Official developer resource |
|---|---|---|
| Runway API | Video generation/editing, image workflows, avatars and model catalog | https://docs.dev.runwayml.com/ |
| fal | Aggregated video, image, audio and 3D model endpoints | https://fal.ai/inference |
| Replicate | Hosted model catalog and custom/community models | https://replicate.com/docs |
| Google Veo | Direct Google video-generation API | https://ai.google.dev/gemini-api/docs/video |
| Kling | Direct provider API for Kling-specific models and controls | https://klingai.com/ |
| Luma | Direct provider API for Luma video/image models | https://lumalabs.ai/ |

The exact models, supported operations, account eligibility, pricing, regional availability, and terms must be checked at implementation time. Do not infer that an aggregator exposes every model or feature from a provider's consumer app.

## Images and creative assets

Evaluate image generation/editing through OpenAI, Google, Runway, fal, Replicate, and other providers. Use reference-guided editing only where the selected endpoint supports it. Store original prompt, references, model, parameters, generated asset, and provenance metadata.

## Common media job contract

Every media adapter should implement a common internal contract:

- `provider`, `model`, and `capability`
- Validated input schema and reference asset IDs
- Requested output settings (format, duration, dimensions, aspect ratio, language)
- Estimated cost and user approval state
- Job ID and state: queued, running, succeeded, failed, cancelled
- Progress/status polling or webhook callback
- Output asset metadata and private storage reference
- Actual usage/cost, timestamps, and error details

Provider-specific request schemas remain inside their adapters. The Android client should not call vendor APIs directly.

## User experience

The user should be able to say:
- "Read this document aloud in a natural voice."
- "Turn this script into a narrated video."
- "Make a short vertical video from these images."
- "Transcribe this recording and summarize it."
- "Create background music and sound effects for this clip."

NEXUS automatically determines the needed audio/video/image pipeline, obtains approval when the estimated cost exceeds the user's threshold, runs the jobs, and presents the finished assets in one library.

## Safety, rights, and cost

- API credentials stay server-side.
- Require consent and rights checks for voice cloning and identifiable likenesses.
- Validate rights to uploaded reference audio, images, and video.
- Apply content policy and vendor terms to every media route.
- Use private object storage and signed expiring URLs.
- Estimate and track spend; add per-user daily/monthly limits and a kill switch.
- Disclose external processing and provider data retention terms.
- Do not mark a provider integrated until its adapter and operational tests pass.

## Implementation order

1. Implement media job schema, status lifecycle, storage, and usage ledger.
2. Integrate ElevenLabs audio APIs.
3. Integrate one multi-provider video gateway; compare Runway, fal, and Replicate for the required model coverage and cost.
4. Add direct video-provider adapters only where they provide important unique features.
5. Add image, dubbing, lip-sync, avatar, and post-processing workflows.
6. Add the Android media studio and generated asset library.

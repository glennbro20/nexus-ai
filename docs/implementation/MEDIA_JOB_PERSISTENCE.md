# Media Job Persistence Design

## Purpose

Define durable PostgreSQL storage for NEXUS AI media jobs before connecting live audio/video providers. This document is a schema proposal, not a claim that a database or API is deployed.

## Design rules

- A media job belongs to one authenticated user.
- Provider credentials are never stored in these tables.
- Store provider job IDs and non-secret routing metadata only.
- Record state transitions and usage separately so retries do not erase history.
- Store media bytes in private object storage; persist object keys, checksums, MIME types, and metadata in PostgreSQL.
- Use signed, short-lived URLs when a user requests an asset.
- Every billable provider submission must pass budget and approval policy before dispatch.

## Core tables

### media_jobs

| Column | Type | Notes |
|---|---|---|
| id | UUID primary key | NEXUS job identifier |
| user_id | UUID not null | Owner; references the authentication user table |
| modality | text not null | audio, video, image, or 3d |
| capability | text not null | e.g. text_to_speech, text_to_video |
| status | text not null | queued, running, succeeded, failed, cancelled |
| request_json | JSONB not null | Validated task parameters; exclude secrets |
| selected_provider | text nullable | Provider selected by policy |
| selected_model | text nullable | Model/endpoint identifier |
| estimated_cost_microunits | bigint nullable | Estimate in a documented currency unit |
| actual_cost_microunits | bigint nullable | Final reported cost |
| created_at / updated_at | timestamptz | Audit timestamps |
| completed_at | timestamptz nullable | Terminal timestamp |

### media_job_attempts

One row per provider submission or retry.

- id UUID primary key
- job_id UUID references media_jobs
- attempt_number integer
- provider text
- model text
- provider_job_id text nullable
- status text
- request_fingerprint text
- error_code text nullable
- error_summary text nullable (redacted; never store credentials)
- started_at, finished_at timestamptz
- usage_json JSONB nullable

### media_assets

- id UUID primary key
- job_id UUID references media_jobs
- object_key text not null (private bucket key, not a public URL)
- modality text not null
- mime_type text not null
- byte_size bigint nullable
- checksum_sha256 text nullable
- duration_ms bigint nullable
- width integer nullable
- height integer nullable
- metadata_json JSONB not null default '{}'
- created_at timestamptz

### media_job_events

Append-only lifecycle and approval events.

- id UUID primary key
- job_id UUID references media_jobs
- event_type text not null
- from_status text nullable
- to_status text nullable
- actor_type text not null (system, user, provider)
- actor_id text nullable
- details_json JSONB not null default '{}'
- created_at timestamptz

## Required constraints and indexes

- CHECK constraints for allowed modality and status values.
- Unique (job_id, attempt_number) on media_job_attempts.
- Index media_jobs(user_id, created_at DESC).
- Index media_jobs(status, updated_at) for worker polling.
- Index media_job_attempts(provider, provider_job_id) where provider_job_id is not null.
- Index media_assets(job_id).
- Index media_job_events(job_id, created_at).
- Enforce tenant ownership in every API query; use PostgreSQL row-level security as defense in depth where supported.

## State machine

- queued -> running | cancelled | failed
- running -> succeeded | failed | cancelled
- succeeded, failed, and cancelled are terminal.
- A retry creates a new attempt; it does not rewrite a completed attempt.
- Provider webhooks must be authenticated and idempotent. Polling and webhook updates must use conditional state transitions to avoid regressions.

## API outline

- POST /v1/media/jobs — validate request, calculate estimate, enforce budget/approval, create queued job.
- GET /v1/media/jobs/:id — return owner-scoped status and safe metadata.
- POST /v1/media/jobs/:id/cancel — request cancellation where supported.
- GET /v1/media/jobs/:id/assets — return asset metadata and fresh signed links.
- Provider callbacks — internal authenticated webhook endpoints, never exposed as general user actions.

## Before production

1. Confirm the existing authentication and user table.
2. Apply migrations in a non-production database.
3. Add tenant-isolation, transition, idempotency, retention, and webhook-signature tests.
4. Add worker leasing/locking so two workers cannot submit the same attempt.
5. Add a budget ledger and explicit approval threshold.
6. Verify backups, deletion behavior, and provider data-retention settings.

Peerly — MVP Tech Specification 

1. Platform & Tech
- Mobile: React Native + Expo (EAS builds, OTA updates)
- Backend: Spring Boot (Java 21), REST over HTTPS
- DB: PostgreSQL (AWS RDS)
- Chat: Nakama (1:1); Peerly user_id ⇄ Nakama user_id 1:1
- Media: AWS S3 (presigned PUT) + CloudFront
- Push: Expo Push → APNs/FCM
- Infra: AWS App Runner (backend), RDS, S3, CloudFront, Route53, ACM
- IaC: Terraform (dev/prod tfvars), GitHub Actions CI
- Obs: CloudWatch logs/metrics, Sentry/Bugsnag for app + server

2. Non-Functional (MVP)
- Availability: 99.5%
- Latency: p95 < 300 ms for GET /discover
- Privacy: 16+ gate; GDPR export/delete
- Security: JWT + refresh; bcrypt(10–12) or Argon2id
- Limits: 10 friend requests/day/user (configurable)

3. API Conventions
- Base path: /v1
- Auth: Authorization: Bearer <access_jwt>
- Pagination: cursor-based — ?limit=&cursor=; response { items, nextCursor }
- Errors: RFC7807 { type, title, status, detail, code }
- Idempotency: Idempotency-Key on create POSTs (connections, reports, messages)
- Rate limits: 429 + Retry-After

4. Data Model (MVP + scale-safe)
- Keys/time: UUIDv7 IDs; UTC timestamps; created_at, updated_at
- Soft delete: deleted_at on user, message, connection
- User
    Columns: id, username, email, password_hash, display_name, avatar_url, bio, role, city, friends_count, created_at, last_active_at, deleted_at
    UNIQUE(email), UNIQUE(username); INDEX(city), INDEX(last_active_at)
- Tag / UserTag
    tag(id, name, category) UNIQUE(name)
    user_tag(user_id, tag_id, intent) UNIQUE(user_id,tag_id,intent)
    INDEX(intent,tag_id)
- UserLanguage
    user_id, lang_code (BCP-47) UNIQUE(user_id,lang_code)
- Availability
    user_id, slot where slot ∈ {MORN,EVE,WKNDS,WKNT} UNIQUE(user_id,slot)
- Save
    saver_id, saved_user_id UNIQUE pair
- Connection
    id, requester_id, recipient_id, status, created_at, updated_at, deleted_at
    pair_key = LEAST(a,b)||'_'||GREATEST(a,b) UNIQUE(pair_key)
    INDEX(status,updated_at)
- Block
    blocker_id, blocked_user_id UNIQUE pair
- Report
    reporter_id, reported_user_id, reason, detail, status('open','actioned','dismissed'), handled_by, handled_at
    INDEX(reported_user_id,status)
- Messaging
    conversation(id, last_message_at, deleted_at)
    conversation_participant(conversation_id,user_id) UNIQUE pair
    message(id, conversation_id, sender_id, body, created_at, message_index BIGINT, deleted_at)
    INDEX(conversation_id,message_index)
    Since using Nakama: store nakama_conversation_id on conversation

5. Endpoints (MVP set)
- Auth
    POST /v1/auth/register
    POST /v1/auth/login
    POST /v1/auth/refresh
    POST /v1/auth/logout (revoke refresh)
- Profile
    GET /v1/users/me
    PATCH /v1/users/me
    PUT /v1/users/me/tags
    PUT /v1/users/me/languages
    PUT /v1/users/me/availability
    POST /v1/users/me/avatar/upload-url (returns S3 presigned PUT)
    DELETE /v1/users/me (async GDPR delete job)
- Discover & Search
    GET /v1/discover?city=&limit=&cursor=
    GET /v1/search?q=&city=&role=&lang=&availability=&limit=&cursor=
- Social
    POST /v1/save/{userId} / DELETE /v1/save/{userId}
    POST /v1/block/{userId}
    POST /v1/report (Idempotency-Key)
    POST /v1/connections { recipientId } (Idempotency-Key)
    GET /v1/connections?status=pending|accepted&limit=&cursor=
    PATCH /v1/connections/{id} { action: accept|decline|cancel }
- Messaging
    GET /v1/conversations?limit=&cursor=
    GET /v1/conversations/{id}/messages?limit=&cursor=
    POST /v1/conversations/{id}/messages { body } (Idempotency-Key)
- Privacy
    POST /v1/privacy/export → { jobId }
    GET /v1/privacy/jobs/{jobId} → { status, resultUrl? }
    DELETE /v1/users/me

6. Matching & Ranking
- Candidate set: same city, not blocked, not connected.
- Score = w1*tag_overlap + w2*language + w3*availability + w4*recency + w5*profile_completeness – w6*report_ratio
- Diversity: cap repeats per session; round-robin by tag cluster.
- Weights configurable (DB/env), not hard-coded.

7. Auth Details
- Access JWT 15–30 min; Refresh 7–30 days; rotate & revoke.
- Password hashing: bcrypt(10–12) or Argon2id.
- Brute-force backoff on failed login.
- Account deletion: revoke all active refresh tokens when user is deleted.

8. Media
- Client requests presigned PUT for users/{id}/avatars/{uuid}.
- Client uploads direct to S3; server validates MIME/size and stores avatar_url.
- Serve via CloudFront; no public S3 URLs.

9. Safety & Abuse
- Block check enforced on save, connect, message, search/discover.
- Reports move open → actioned|dismissed (audit who/when).
- Age gate 16+ at onboarding.

10. Rate Limits
- Friend requests: 10/day per user; return 429 + Retry-After.
- Auth endpoints: per-IP burst limit (basic).

11. Analytics (MVP)
- Onboarding completion; discover impressions/actions; requests (sent/accepted/declined); DMs sent; reports/blocks.
- Store as simple event rows or CloudWatch logs; expand later.

12. Observability
- Logs: JSON with request_id, user_id, route, latency.
- Metrics: p50/p95 for GET /discover, request→accept conversion.
- Errors: Sentry/Bugsnag in app + server.
- Tracing: OpenTelemetry enabled in Spring (export later if needed).

13. Infra & Environments
- Terraform with envs/dev.tfvars and envs/prod.tfvars.
- Secrets in SSM/Secrets Manager (prod); .env only for local dev.
- RDS automatic snapshots; S3 lifecycle for temp exports.
- Route53 + ACM; CloudFront in front of S3.

14. Build Order (revised)
    1) API contract first
        Do: Finalise docs/openapi.yaml (/v1, cursor pagination, RFC7807, Idempotency-Key).
        Output: docs/api-contract.md auto-derived + generated TS client in app/src/api.
        Quick test: Lint spec; generate client; import in RN.
    2) DB baseline
        Do: server/flyway/V1__init.sql with all tables + UNIQUE/INDEXes; seed cities, tags.
        Output: Local Postgres up via docker-compose; Flyway migrates on boot.
        Quick test: SELECT COUNT(*) FROM tag; returns >0.
    3) Auth (email/password)
        Do: POST /auth/register|login|refresh|logout; bcrypt/Argon2id; refresh store; lockout/backoff.
        Output: Integration tests for happy/invalid/lockout; Sentry hooked.
        Quick test: Login → get access+refresh; refresh works; logout revokes.
    4) Profile basics
        Do: GET/PATCH /users/me; PUT tags/languages/availability.
        Output: Constraints enforced; returns full user.
        Quick test: Update bio/city; add tags; read back.
    5) Media upload (avatars)
        Do: POST /users/me/avatar/upload-url (presigned PUT) → PATCH /users/me with CloudFront URL.
        Output: S3 object visible via CDN URL.
        Quick test: Upload JPEG <5 MB; profile shows new avatar URL.
    6) Discover (read path)
        Do: GET /discover?city=&limit=&cursor= with basic ranking + required indexes.
        Output: Stable cursor paging; diversity cap per session (simple).
        Quick test: Scroll twice; no dups; nextCursor changes; p95 < 300 ms locally.
    7) Connections
        Do: POST /connections (Idempotency-Key), GET /connections?status=, PATCH /connections/{id} (accept/decline/cancel); block checks everywhere.
        Output: Duplicate prevention via pair_key; rate limit 10/day.
        Quick test: Send → accept; retry same POST with same Idempotency-Key does not create second row.
    8) Messaging (MVP)
        DO (Nakama): create/link users; open 1:1; list/send messages via Nakama SDK; persist conversation rows with nakama_conversation_id.
        Output: App can send/receive 1:1.
        Quick test: Two test users exchange >3 messages; order correct with cursor.
    9) Rate limits + analytics
        Do: Enforce 10/day requests; return 429 + Retry-After. Add event logging (rows or CloudWatch): onboarding, discover impressions/actions, requests, DMs, reports/blocks.
        Output: rate_limit table or view; events table.
        Quick test: Send 11th request → 429; events row exists.
    10) CI + Dev deploys
        Do: server-ci.yml (test/build), app-ci.yml (lint/TS), infra-ci.yml (terraform fmt/validate/plan).
        Do: App Runner (dev) with Docker image; Expo EAS dev build; smoke tests script.
        Output: Dev backend URL; RN app pointing to it via EXPO_PUBLIC_API_BASE_URL.
        Quick test: Fresh device can register, update profile, discover, request, chat.
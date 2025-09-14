Peerly — MVP Tech Specification 

0) Monorepo 
Peerly/
  docs/
    peerly-product-spec.md
    peerly-tech-spec.md
    api-contract.md
    openapi.yaml
    adr/
    runbooks/
    threat-model.md
    README.md
  app/                       # React Native + Expo
    src/
      api/                   # ← generated from openapi.yaml (TS client)
      features/
      components/
      hooks/
    __tests__/
    app.json
    package.json
  server/                    # Spring Boot 3.3+, Java 21
    src/main/java/...
    src/main/resources/
    src/test/java/...
    flyway/                  # V1__init.sql etc.
    build.gradle | pom.xml
    Dockerfile
  chat/                      # Nakama
    config.yaml
    server_modules/
  infra/                     # IaC + envs
    terraform/
      modules/               # s3/, apprunner/, rds/, cloudfront/, route53/ (optional now)
      envs/
        dev/
          main.tf
          variables.tf
          dev.tfvars
        prod/
          main.tf
          variables.tf
          prod.tfvars
    README.md                # how to plan/apply
  scripts/
    dev.up.sh                # docker compose up (postgres, minio, nakama)
    dev.down.sh
    db.migrate.sh
    db.seed.sh
    privacy.export.ts
    privacy.delete.ts
    loadtest.k6.js
    test.sh
  .github/
    workflows/
      server-ci.yml
      app-ci.yml
      infra-ci.yml
    ISSUE_TEMPLATE.md
    CODEOWNERS
  .env.example
  docker-compose.yml         # local postgres (+minio/nakama)
  Makefile                   # make dev/test/deploy helpers
  CONTRIBUTING.md
  SECURITY.md
  LICENSE
  README.md



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
  1) API contract
      Frontend: generate TS client (app/src/api) from openapi.yaml; set up routing, theme, state, error toasts.
      Backend: finalize spec.
      Milestone: app compiles calling typed client (no raw fetch).
  2) Onboarding & Auth
      Frontend: Progressive onboarding (Welcome → Role → Skills → City → Availability → Languages → Profile → Create Account), separate Login screen for returning users, token storage, refresh flow.
      Backend: /auth/register|login|refresh|logout, /users/me, PUT tags/languages/availability.
      Milestone: new user completes full onboarding flow and lands on Discover; returning user can log in.
  3) Media (avatars)
      Frontend: image picker → call upload-url → PUT to S3 → PATCH profile with URL.
      Backend: presigned PUT endpoint.
      Milestone: avatar shows in Profile.
  4) Discover
      Frontend: feed UI (infinite scroll + pull-to-refresh), card actions (Save/Request).
      Backend: /discover?city&limit&cursor, ranking + indexes.
      Milestone: scroll 2+ pages without dupes; refresh resets feed.
  5) Connections
      Frontend: Request button, Requests inbox (Pending/Accepted), Accept/Decline/Cancel.
      Backend: POST/GET/PATCH connections, idempotency, block checks, rate limit.
      Milestone: full request lifecycle between two test users.
  6) Messaging (MVP)
      Frontend: Chat list + 1:1 thread; send/receive; basic retry.
      Backend: Nakama integration (or simple tables).
      Milestone: two devices can chat.
  7) Analytics + Rate limits
      Frontend: send key client events; handle 429 with friendly UI.
      Backend: event logging; 429 + Retry-After.
      Milestone: events visible server-side; 11th request is blocked.
  8) Search (optional for MVP if Discover is good)
      Frontend: search screen with filters; re-use card UI.
      Backend: /search?...&cursor.
      Milestone: filter by tag/role/language.
  9) CI/CD + Builds
      Frontend: EAS preview builds, OTA channel; env wiring.
      Backend: App Runner dev; smoke tests.
      Milestone: testers install via TestFlight/Play Internal and complete core flow.
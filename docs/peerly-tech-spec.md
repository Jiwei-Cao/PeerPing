Peerly — MVP Tech Specification

1. Platform & Tech
- Mobile: React Native + Expo
- Backend: Spring Boot (Java 21) + REST API
- Database: PostgreSQL (RDS)
- Chat: Nakama
- Storage: AWS S3 + CloudFront
- Push: Expo Push → APNs/FCM
- Infra: AWS App Runner, RDS, S3, Route53
- Auth: Email/password + Sign in with Apple

2. Data Model (Key Tables)
- User
    id, username, email, password_hash
    display_name, avatar_url, bio
    role (learner/teacher/both)
    city
    friends_count (cached)
    created_at, last_active_at
- Tag
    id, name, category
- UserTag
    user_id, tag_id, intent (learn/teach)
- UserLanguage
    user_id, lang_code
- Availability
    user_id, slot
- Save
    saver_id, saved_user_id
- Connection
    id
    requester_id, recipient_id
    status (pending / accepted / declined / cancelled)
    created_at, updated_at
- Block
    blocker_id, blocked_user_id
- Report
    reporter_id, reported_user_id, reason, detail
- Conversation and Message
    conversation_id, participants, messages

3. API Endpoints (Summary)
- Auth
    POST /auth/register
    POST /auth/login
    GET /auth/me
- Profile
    GET /users/me
    PATCH /users/me
    PUT /users/me/tags
    PUT /users/me/languages
    PUT /users/me/availability
- Discover & Search
    GET /discover?city=London&page
    GET /search?q&city=London&role&lang&availability&page
- Social
    POST /save/{userId}
    DELETE /save/{userId}
    POST /block/{userId}
    POST /report
    POST /connections {recipientId}
    PATCH /connections/{id} {accept|decline|cancel}
    GET /connections?status=pending|accepted
- Messaging
    GET /conversations
    GET /conversations/{id}/messages
    POST /conversations/{id}/messages

4. Monorepo 
> **Note:** Key directories + representative files only.
Peerly/
  docs/
    peerly-product-spec.md
    peerly-tech-spec.md
    api-contract.md
    openapi.yaml
    adr/
    runbooks/
    threat-model.md
    README.md                 # explains docs purpose
  app/
    src/
    __tests__/                # RN tests
    app.json
    package.json
  server/
    src/main/java/...
    src/main/resources/
    src/test/java/...          # unit/integration tests
    build.gradle|pom.xml
    flyway/
    Dockerfile
  chat/
    config.yaml
    server_modules/
  infra/
    terraform/
      modules/
      envs/
        dev/
          main.tf
          variables.tf
          dev.tfvars
        prod/
          main.tf
          variables.tf
          prod.tfvars
    pipelines/
    README.md                 # explains terraform usage
  scripts/
    dev.up.sh
    dev.down.sh
    db.migrate.sh
    db.seed.sh
    privacy.export.ts
    privacy.delete.ts
    loadtest.k6.js
    test.sh                   # optional wrapper for tests
  .github/
    workflows/
      server-ci.yml
      app-ci.yml
      infra-ci.yml
    ISSUE_TEMPLATE.md
    CODEOWNERS                # optional
  .env.example
  docker-compose.yml
  Makefile
  CONTRIBUTING.md
  SECURITY.md
  LICENSE
  README.md
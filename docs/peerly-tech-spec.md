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
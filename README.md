# PeerPing

A peer-to-peer learning platform connecting learners and teachers within UK cities.

## Project Structure

```
PeerPing/
├── docs/              # Documentation
│   ├── openapi.yaml   # API specification
│   ├── api-contract.md
│   ├── peerping-product-spec.md
│   └── peerping-tech-spec.md
├── app/               # React Native + Expo app
│   ├── src/
│   │   ├── api/       # Generated TypeScript client
│   │   ├── features/  # Feature modules
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── utils/
│   │   └── theme/
│   └── package.json
├── server/            # Spring Boot backend (to be created)
├── infra/             # Terraform infrastructure (to be created)
└── scripts/           # Utility scripts

```

## Quick Start

### Prerequisites

1. Fix npm permissions (if you encounter permission errors):
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

2. Install dependencies:
   ```bash
   cd app
   npm install
   ```

3. Generate API client from OpenAPI spec:
   ```bash
   npm run generate-api
   # or
   ./scripts/generate-api-client.sh
   ```

### Development

1. Start the Expo development server:
   ```bash
   cd app
   npm start
   ```

2. Run on iOS simulator:
   ```bash
   npm run ios
   ```

3. Run on Android emulator:
   ```bash
   npm run android
   ```

## API Contract

The API is fully documented in:
- OpenAPI specification: `docs/openapi.yaml`
- Human-readable format: `docs/api-contract.md`

The TypeScript client is auto-generated from the OpenAPI spec and provides:
- Type-safe API calls
- Automatic token refresh
- Error handling
- Request/response interfaces

## Tech Stack

### Frontend (Mobile App)
- React Native + Expo
- TypeScript
- React Navigation
- React Query (data fetching)
- Zustand (state management)
- React Hook Form
- Expo Secure Store (token storage)

### Backend (To be implemented)
- Spring Boot (Java 21)
- PostgreSQL
- JWT authentication
- AWS S3 (media storage)
- Nakama (real-time chat)

### Infrastructure
- AWS App Runner
- AWS RDS (PostgreSQL)
- AWS S3 + CloudFront
- Terraform

## Build Order (MVP)

1. ✅ API Contract - OpenAPI spec and TypeScript client
2. 🚧 App Structure - Routing, theme, state management
3. ⏳ Auth - Login/signup screens and JWT flow
4. ⏳ Profile & Onboarding
5. ⏳ Media Upload (avatars)
6. ⏳ Discover Feed
7. ⏳ Connections (friend requests)
8. ⏳ Messaging
9. ⏳ Search & Filters
10. ⏳ CI/CD & Deployment

## Contributing

See `CONTRIBUTING.md` for development guidelines.

## License

Proprietary - All rights reserved
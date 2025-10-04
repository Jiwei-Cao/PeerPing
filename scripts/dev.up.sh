#!/bin/bash

echo "Starting PeerPing development environment..."

# Start Docker Compose services
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
for i in {1..30}; do
  if docker-compose exec postgres pg_isready -U peerping > /dev/null 2>&1; then
    echo "PostgreSQL is ready!"
    break
  fi
  echo -n "."
  sleep 1
done

# Show status
docker-compose ps

echo ""
echo "Development environment is ready!"
echo "PostgreSQL: localhost:5432"
echo "MinIO Console: http://localhost:9001 (minioadmin/minioadmin)"
echo ""
echo "To start the Spring Boot server:"
echo "  cd server && ./mvnw spring-boot:run"
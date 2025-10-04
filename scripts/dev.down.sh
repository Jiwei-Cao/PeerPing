#!/bin/bash

echo "Stopping PeerPing development environment..."

# Stop and remove Docker Compose services
docker-compose down

echo "Development environment stopped."
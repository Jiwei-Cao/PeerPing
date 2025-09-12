#!/bin/bash

# Script to generate TypeScript client from OpenAPI spec
# This can be run after fixing npm permissions

echo "Generating TypeScript client from OpenAPI spec..."

# Check if openapi-generator-cli is installed globally
if ! command -v openapi-generator-cli &> /dev/null
then
    echo "Installing openapi-generator-cli globally..."
    npm install -g @openapitools/openapi-generator-cli
fi

# Generate the client
openapi-generator-cli generate \
  -i docs/openapi.yaml \
  -g typescript-fetch \
  -o app/src/api \
  --additional-properties=typescriptThreePlus=true,supportsES6=true,withInterfaces=true

echo "TypeScript client generated successfully!"
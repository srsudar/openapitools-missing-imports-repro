#!/bin/bash
set -euo pipefail

source scripts/helpers.sh

print_header "  ⚙️  ⏳ Generating typescript OpenAPI paths..."
echo ""
echo "  This maps the routes we define in our OpenAPI file to typescript types,"
echo "  which can be useful for matching routes to their types."
echo ""

npx openapi-typescript \
  ./openapi/islands-api.yaml \
  -o ./generated/openapi/typescript/islands-api-path-types.ts \
  --alphabetize \
  --root-types \
  --make-paths-enum

echo ""
print_header "  ⚙️  ✅ Done!"

echo ""
echo ""

set -x

npm run generate:json2ts

set +x

print_header "  🚀 ⏳ Generating OpenAPI fetch libraries..."
echo ""
echo "  This generates client libraries based on our OpenAPI spec. These"
echo "  libraries let us interact with a human-readable API rather than force"
echo "  us to make bare network calls."
echo ""

set -x

openapi-generator-cli generate \
  -i ./openapi/islands-api.yaml \
  -g typescript-fetch \
  -o generated/openapi/typescript/islands-api/client \
  --additional-properties=supportsES6=true,modelPropertyNaming=original,withoutDate=true

set +x

print_header "  🚀 ✅ Done!"
echo ""

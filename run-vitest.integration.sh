#!/bin/bash

TEST_FILES=$(find modules -name "*.integration.test.js")
if [ -z "$TEST_FILES" ]; then
  echo "Aucun fichier de test trouvé dans le dossier 'modules'."
  exit 1
fi

for file in $TEST_FILES; do
  echo "Running test file: $file"
  vitest run $file --config ./vitest.config.integration.js

  if [ $? -ne 0 ]; then
    echo "Test failed for file: $file"
    exit 1
  fi
done

echo "All tests ran successfully!"

.PHONY: build test
MAKEFLAGS += --silent

## telemetry
opt-out-telemetry:
	pnpm next telemetry disable

## generate
generate: generate-webmanifest generate-sitemap generate-schema generate-images

generate-images:
	pnpm vite-node script/assets/images.ts

generate-webmanifest:
	pnpm vite-node script/site/webmanifest.ts

generate-sitemap:
	pnpm next-sitemap

generate-schema:
	pnpm vite-node script/seo/schema.ts

## deployment
temporarily-remove-test-files: clear-snapshot
	pnpm shx mv test/snapshot/snapshot-images ../../snapshot-images

pre-deploy-production: copy-env-production build-production temporarily-remove-test-files

# next config
generate-web-pages:
	pnpm shx cp next/web.mjs next.config.mjs &&\
		pnpm vite-node script/pages/web.ts

generate-web-stuffs: generate-web-pages generate-schema

generate-desktop-stuffs:
	pnpm shx cp next/desktop.mjs next.config.mjs &&\
		pnpm vite-node script/pages/desktop.ts

## .env
generate-environment-type-definition:
	pnpm vite-node script/env/type-def.ts

copy-env:
	pnpm shx cp config/.env.${environment} .env

copy-env-development:
	make copy-env environment="development"

copy-env-production:
	make copy-env environment="production"

copy-env-testing:
	make copy-env environment="testing"

clear-cache:
	pnpm shx rm -rf .next

# development

start-development: copy-env-development generate-web-stuffs clear-cache dev

start-testing: copy-env-testing generate-web-stuffs clear-cache dev

start-production: copy-env-production generate-web-stuffs clear-cache dev

## build
build-development: clear-cache copy-env-development generate-web-stuffs build

build-production: clear-cache copy-env-production generate-web-stuffs build generate

build-testing: clear-cache copy-env-testing generate-web-stuffs build

build-development-desktop: clear-cache copy-env-development generate-desktop-stuffs build

build-production-desktop: clear-cache copy-env-production generate-desktop-stuffs build

build:
	pnpm next build

## start
start:
	pnpm next start $(arguments)

## dev
dev:
	pnpm next dev

## format
format:
	pnpm prettier --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write

## lint
lint:
	pnpm eslint --ignore-path .gitignore --ext .mjs,.tsx,.ts --color && pnpm knip

## typecheck
typecheck:
	pnpm tsc -p tsconfig.json $(arguments) 

## test
test-type:
	pnpm vitest test/$(path)/**.test.ts $(arguments)

test-unit:
	make test-type path="unit" arguments="$(arguments)"

clear-snapshot:
	pnpm shx rm -rf test/snapshot/generated-*.test.ts

test-snapshot: clear-snapshot
	pnpm vite-node script/test/snapshot.ts &&\
		make test-type path="snapshot" arguments="$(arguments)"

pretest-ci:
	node node_modules/puppeteer/install.js

test: build-testing test-unit test-snapshot

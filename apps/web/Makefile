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

# next config
generate-web-pages:
	pnpm shx cp next/web.mjs next.config.mjs &&\
		pnpm vite-node script/pages/web.ts

generate-web-pages-and-schema: generate-web-pages generate-schema generate-webmanifest

generate-desktop-pages:
	pnpm shx cp next/desktop.mjs next.config.mjs &&\
		pnpm vite-node script/pages/native.ts

generate-desktop-pages-and-schema: generate-desktop-pages generate-schema

generate-mobile-pages:
	pnpm shx cp next/mobile.mjs next.config.mjs &&\
		pnpm vite-node script/pages/native.ts

generate-mobile-pages-and-schema: generate-mobile-pages generate-schema

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

start-development: copy-env-development generate-web-pages-and-schema clear-cache dev

start-testing: copy-env-testing generate-web-pages-and-schema clear-cache dev

start-production: copy-env-production generate-web-pages-and-schema clear-cache dev

## build
build-development: clear-cache copy-env-development generate-web-pages-and-schema build

build-production: clear-cache copy-env-production clear-snapshot generate-web-pages-and-schema build generate-sitemap

build-testing: clear-cache copy-env-testing generate-web-pages-and-schema build

build-development-desktop: clear-cache copy-env-development generate-desktop-pages-and-schema build

build-production-desktop: clear-cache copy-env-production generate-desktop-pages-and-schema build

build-development-mobile: clear-cache copy-env-development generate-mobile-pages-and-schema build

build-production-mobile: clear-cache copy-env-production generate-mobile-pages-and-schema build

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
	pnpm prettier --ignore-path .gitignore --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write

## lint
lint:
	pnpm eslint . --color && pnpm knip

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
	node node_modules/puppeteer/install.mjs

test: build-testing test-unit test-snapshot

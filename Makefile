.PHONY: build test
MAKEFLAGS += --silent

## telemetry
opt-out-telemetry:
	pnpm next telemetry disable

## generate
generate: generate-webmanifest generate-sitemap

generate-webmanifest:
	pnpm vite-node script/site/webmanifest.ts

generate-sitemap:
	pnpm next-sitemap

## deployment
deploy-staging: build-staging
	vercel

deploy-production: build-production
	vercel --prod

clear-cache:
	rm -rf .next

start-development: clear-cache dev

start-testing: clear-cache dev

start-staging: clear-cache dev

start-production: clear-cache dev

## build
build-development: clear-cache build

build-production: clear-cache build generate

build-staging: clear-cache build

build-testing: clear-cache build

build:
	pnpm next build

## start
start:
	pnpm next start $(arguments)

## dev
dev:
	pnpm next dev

## format
format-generate-config:
	pnpm prettier-config-generate

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

test-integration:
	make test-type path="integration" arguments="$(arguments)"

test-snapshot:
	make test-type path="snapshot" arguments="$(arguments)"

test: build-testing test-unit test-integration test-snapshot

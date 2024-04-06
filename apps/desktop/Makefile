.PHONY: build test
MAKEFLAGS += --silent

# build
build-production: build-executable-production build

build-development: build-executable-development build

build:
	pnpm tauri build

build-executable:
	pnpm shx rm -rf build &&\
		cd ../web &&\
		make build-$(environment)-desktop

build-executable-development:
	make build-executable environment=development

build-executable-production:
	make build-executable environment=production

# format
format:
	pnpm prettier --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write


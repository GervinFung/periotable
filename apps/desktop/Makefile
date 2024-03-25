.PHONY: build test
MAKEFLAGS += --silent

# build
build-production:
	pnpm tauri build

build-development: build-executable-development

build-executable:
	rm -rf build &&\
		cd ../web &&\
		make build-$(environment) &&\
		mv desktop ../desktop/build

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


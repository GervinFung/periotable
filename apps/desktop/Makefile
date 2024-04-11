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

# rust
install-rust:
	curl https://sh.rustup.rs -sSf | sh -s -- -y

# dependencies
install-ubuntu-prerequisites:
	sudo apt-get update
	sudo apt-get install libwebkit2gtk-4.0-dev \
		build-essential \
		curl \
		wget \
		file \
		libssl-dev \
		libgtk-3-dev \
		libayatana-appindicator3-dev \
		librsvg2-dev

# release body
generate-release-body:
	pnpm vite-node script/release/body.ts

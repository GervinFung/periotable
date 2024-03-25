.PHONY: build test
MAKEFLAGS += --silent

build-production:
	pnpm tauri build

# build
build-desktop:
	rm -rf build &&\
		cd ../web &&\
		make build-desktop &&\
		mv desktop ../desktop/build

# format
format:
	pnpm prettier --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write


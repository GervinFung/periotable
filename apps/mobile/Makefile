.PHONY: build test
MAKEFLAGS += --silent

# build
build:
	pnpm cap sync

build-executable:
	pnpm shx rm -rf build &&\
		cd ../web &&\
		make build-$(environment)-mobile

build-executable-development:
	make build-executable environment=development

build-executable-production:
	make build-executable environment=production

# android
sync-android:
	pnpm cap sync android

clean-android:
	cd android && ./gradlew clean

build-production-android: build-executable-production build
	cd android && ./gradlew assembleRelease

build-development-android: build-executable-development build
	cd android && ./gradlew assembleDebug

# format
format:
	pnpm prettier --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write

# release body
generate-release-body:
	pnpm vite-node script/release/body.ts

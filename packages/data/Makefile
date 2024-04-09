# .env
generate-environment-type-definition:
	pnpm vite-node script/type-def.ts

generate-data:
	pnpm vite-node script/data.ts

# format
format:
	pnpm prettier --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write


# typecheck
typecheck:
	pnpm tsc -p tsconfig.json

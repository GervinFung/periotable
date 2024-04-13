# format
format-write:
	pnpm --stream -r format-write

format-check:
	pnpm --stream -r format-check

# typecheck
typecheck:
	pnpm --stream -r typecheck

# lint
lint-workflows:
	actionlint

# web deployment
web-deploy-production:
	vercel --prod

deploy-web:
	cd apps/web &&\
		make build-production &&\
		cd ../../ &&\
		make web-deploy-production

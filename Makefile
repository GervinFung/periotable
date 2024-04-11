postinstall:
	cd apps/desktop && make install-rust

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
		make pre-deploy-production &&\
		cd ../../ &&\
		make web-deploy-production &&\
		mv snapshot-images apps/web/test/snapshot/snapshot-images

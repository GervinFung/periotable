# format
format-write:
	pnpm --stream -r format-write

format-check:
	pnpm --stream -r format-check

typecheck:
	pnpm --stream -r typecheck

generate-environment-type-definition:
	pnpm --stream -r generate-environment-type-definition

# web deployment
web-deploy-production:
	vercel --prod

deploy-web:
	cd apps/web &&\
		make pre-deploy-production &&\
		cd ../../ &&\
		make web-deploy-production &&\
		mv snapshot-images apps/web/test/snapshot/snapshot-images

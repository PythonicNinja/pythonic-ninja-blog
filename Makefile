.PHONY: install dev build preview migrate clean fmt

# Root-level helpers that operate inside web/
install:
	npm ci --prefix web

dev:
	npm run dev --prefix web

build:
	npm run build --prefix web

preview:
	npm run preview --prefix web

migrate:
	npm run migrate:pelican --prefix web

clean:
	rm -rf web/dist web/.astro

fmt:
	npx --yes prettier -w web

itermocil:
	cp pythonic-ninja-blog.yml ~/.itermocil/.
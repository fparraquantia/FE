.PHONY: help
help: ## Display this help message
	@ cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: lint
lint: node_modules ## check lint npm run lint
	echo "add here some lint"

.PHONY: test
test: node_modules ## run test cases npm test
	echo "add here some test"

run: node_modules ## run development
	
	
build: node_modules ## create build files
	

clear_build: ## clear build files
	rm -rf packages/web-app/build

clear: ## clear all installed cache (node_modules)
			rm -rf ./node_modules || true; 
			
node_modules: package.json
	
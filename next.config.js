const path = require('path')

module.exports = {
	webpack: config => {
		config.resolve.modules.push(path.resolve('src'))

		return config
	},
	env: {
		NEXT_PUBLIC_API_URL: 'http://localhost:8000/graphql/'
	}
}
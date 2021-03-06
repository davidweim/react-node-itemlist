module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: 'tsconfig.json'
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
	transform: {
		'^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
	},
	testMatch: [
		'**/*.test.(ts|js)'
	],
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "/localStorage-Items/"
    ]
};
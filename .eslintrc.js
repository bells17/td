module.exports = {
	"env": {
		"es6": true,
		"node": true
	},
	"extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
	"parserOptions": {
		"sourceType": "module"
	},
  "globals": {
    "describe": true,
    "it": true
  },
	"rules": {
		"indent": [
			"error",
			2,
      {
        "SwitchCase": 1
      }
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double",
      {
        "avoidEscape": true
      }
		],
		"semi": [
			"error",
			"always"
		]
	}
};
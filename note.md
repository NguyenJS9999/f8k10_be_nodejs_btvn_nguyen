{
	"name": "f8-k10",
	"version": "1.0.0",
	"description": "learn nodejs + expressjs",
	"main": "index.js",
	"type": "module",
	"scripts": {
		"dev": "concurrently \"nodemon index\" \"json-server --watch db.json --port 3000 \""
	},
	"keywords": [
		"f8",
		"nodejs",
		"expressjs",
		"hoc-lap-trinh"
	],
	"author": "hoangnm-ndm",
	"license": "MIT",
	"dependencies": {
		"concurrently": "^9.1.0",
		"express": "^4.21.2",
		"json-server": "^0.17.0",
		"mongoose": "^8.9.2",
		"nodemon": "^3.1.9"
	}
}

/* 
Kita akan menuliskan routing yang ada di app.js, ke dalam file ini.

Perhatikan bahwa kita memiliki 3 route yang sudah dideklarasikan:
- GET /users
- GET /users/:id
- GET /users/:id/companies

Analisis:
- Semuanya memiliki prefix (awalan) `/users`

Sehingga pada file ini, kita hanya perlu menuliskan route TANPA PREFIX `/users`

Jadi yang akan dideklarasikan di sini adalah:
- GET /
- GET /:id
- GET /:id/companies
*/

// Import express.Router
const express = require("express");
const router = express.Router();

// Karena di sini akan membaca file, maka kita perlu menggunakan fs/promises
const fs = require("node:fs/promises");

// Ganti app.get menjadi router.get
// Buang awalan (prefix) /users, apabila hilang semua, hanya menjadi /
// /users -> /
router.get("/", async function HTTPGetUsersHandler(req, res) {
	try {
		const data = await fs.readFile("./data/dummy.json", "utf-8");

		const dataInJson = JSON.parse(data);

		if (req.query.reversed === "true") {
			dataInJson.sort((a, b) => b.id - a.id);
		}

		res.send(`<pre>${JSON.stringify(dataInJson, null, 2)}</pre>`);
	} catch (err) {
		console.error(err);

		res.status(500).send("Internal Server Error");
	}
});

// Ganti app.get menjadi router.get
// Buang awalan (prefix) /users
// /users/:id -> /:id
router.get("/:id", async function HTTPGetUsersInputHandler(req, res) {
	const paramId = Number(req.params.id);

	const data = await fs.readFile("./data/dummy.json", "utf-8");
	const dataInJson = JSON.parse(data);

	const dataById = dataInJson.find((element) => Number(element.id) === paramId);

	if (dataById) {
		res.send(`<pre>${JSON.stringify(dataById, null, 2)}</pre>`);
	} else {
		res.status(404).send("Data tidak ditemukan");
	}
});

// Ganti app.get menjadi router.get
// Buang awalan (prefix) /users
// /users/:id/companies -> /:id/companies
router.get(
	"/:id/companies",
	async function HTTPGetUserCompaniesHandler(req, res) {
		const paramId = Number(req.params.id);
		const queryPosition = req.query.position;

		const data = await fs.readFile("./data/dummy.json", "utf-8");
		const dataInJson = JSON.parse(data);

		let dataById = dataInJson.find((element) => Number(element.id) === paramId);

		if (queryPosition != null) {
			dataById = dataById.companies[queryPosition];
		} else {
			dataById = dataById.companies;
		}

		res.send(`<pre>${JSON.stringify(dataById, null, 2)}</pre>`);
	},
);

// Karena ini akan digunakan pada tempat yang lain, kita perlu export router
module.exports = router;

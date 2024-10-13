const fs = require("node:fs/promises");

const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", function HTTPGetRootHandler(req, res) {
	res.send("Hello world");
});

// Selain define endpoint users,
// Kita juga bisa mengkombinasikan untuk membaca file json di sini
// dan menampilkannya ke dalam browser kita, yay !
app.get("/users", async function HTTPGetUsersHandler(req, res) {
	try {
		// Di sini kita menggunakan fs.readFile untuk membaca file json
		const data = await fs.readFile("./data/dummy.json", "utf-8");

		// Kita parse data yang kita baca dari file json
		// (supaya hasilnya dalam bentuk JSON)
		const dataInJson = JSON.parse(data);

		// Di sini kita akan membaca query parameter dari request
		// dengan nama "reversed"
		if (req.query.reversed === "true") {
			// Jika query parameter reversed bernilai true,
			// kita akan membalikkan dataInJson
			dataInJson.sort((a, b) => b.id - a.id);
		}

		// Kita kirimkan dataInJson ke browser,
		// supaya terlihat rapih, kita gunakan <pre>
		// agar data yang kita kirimkan terlihat lebih rapih
		res.send(`<pre>${JSON.stringify(dataInJson, null, 2)}</pre>`);
	} catch (err) {
		console.error(err);

		// Jika terjadi error, kita akan mengirimkan status 500
		// dan pesan "Internal Server Error"
		res.status(500).send("Internal Server Error");
	}
});

// Pada endpoint ini kita akan menggunakan req.params
app.get("/users/:id", async function HTTPGetUsersInputHandler(req, res) {
	// Di sini kita akan mengambil id yang diinputkan
	const paramId = Number(req.params.id);

	const data = await fs.readFile("./data/dummy.json", "utf-8");
	const dataInJson = JSON.parse(data);

	// Di sini kita akan mencari data berdasarkan id yang diinputkan
	const dataById = dataInJson.find((element) => Number(element.id) === paramId);

	if (dataById) {
		// Jika data ditemukan, kita akan mengirimkan data tersebut
		res.send(`<pre>${JSON.stringify(dataById, null, 2)}</pre>`);
	} else {
		// Jika data tidak ditemukan, kita akan mengirimkan status 404
		res.status(404).send("Data tidak ditemukan");
	}
});

// Di endpoint ini kita akan mengkombinasikan req.params dan req.query
// :id = req.params
// ?position = req.query
app.get(
	"/users/:id/companies",
	async function HTTPGetUserCompaniesHandler(req, res) {
		// Di sini kita akan mengambil id yang diinputkan
		const paramId = Number(req.params.id);
		// Di sini kita akan mengambil query parameter position
		const queryPosition = req.query.position;

		const data = await fs.readFile("./data/dummy.json", "utf-8");
		const dataInJson = JSON.parse(data);

		let dataById = dataInJson.find((element) => Number(element.id) === paramId);

		if (queryPosition != null) {
			// Jika query parameter position tidak null,
			// kita akan mengambil data companies berdasarkan position
			dataById = dataById.companies[queryPosition];
		} else {
			// Jika query parameter position null,
			// kita akan mengambil semua data companies
			dataById = dataById.companies;
		}

		res.send(`<pre>${JSON.stringify(dataById, null, 2)}</pre>`);
	},
);

app.listen(3000, () => {
	console.log(`Welcome to express at port ${PORT}`);
});

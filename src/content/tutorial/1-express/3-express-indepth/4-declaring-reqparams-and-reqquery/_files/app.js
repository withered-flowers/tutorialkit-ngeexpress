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

// Disini ceritanya kita menginginkan inputan id dari browser untuk kita
// proses / tampilkan kembali
app.get("/users/id", function HTTPGetUsersInputHandler(req, res) {
	res.send(id);
});

app.listen(3000, () => {
	console.log(`Welcome to express at port ${PORT}`);
});

const express = require("express");
const app = express();

// Default port aplikasi express
// Port untuk development jangan di bawah 1024,
// reserved for system usage (well-known ports)
const PORT = 3000;

// Di sini kita mendefinisikan penggunaan endpoint '/'
// yang akan meng-handle HTTP GET method
app.get("/", function HTTPGetRootHandler(req, res) {
	res.send("Hello world");
});

// app.listen(port, callback)
// digunakan untuk meng-serve aplikasi web yang dibuat pada port tertentu
app.listen(3000, () => {
	console.log(`Welcome to express at port ${PORT}`);
});

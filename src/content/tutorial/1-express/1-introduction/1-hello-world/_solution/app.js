const cors = require("cors");
const express = require("express");

const app = express();
const port = 3000;

// Middleware
app.use(
	cors({
		origin: "*", // Allow all origins
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos");
	const responseJson = await response.json();

	const responseFormatted = {
		message: "Hello World!",
		data: responseJson,
	};

	res
		.status(200)
		.send(`<pre>${JSON.stringify(responseFormatted, null, 2)}</pre>`);
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

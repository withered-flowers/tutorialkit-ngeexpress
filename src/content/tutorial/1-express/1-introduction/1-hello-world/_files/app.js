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
app.get("/", (req, res) => {
	// TODO: Let's write something here
	res.send("empty");
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");

// Import router yang sudah dibuat
const usersRouter = require("./routes/users");

const app = express();

const PORT = 3000;

app.get("/", function HTTPGetRootHandler(req, res) {
	res.send("Hello world");
});

// Gunakan router yang sudah dibuat
// Jangan lupa tambahkan prefix /users
app.use("/users", usersRouter);

app.listen(3000, () => {
	console.log(`Welcome to express at port ${PORT}`);
});

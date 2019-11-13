// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date_string?", function (request, response) {
	const dateString = request.params.date_string;

	try {
		const dateReceived = dateString ? new Date(dateString) : new Date();

		if(!dateReceived.getTime()) {
			throw new Error();
		}

		const dateFormatted = {
			unix: Number(dateReceived.getTime()),
			utc: dateReceived.toUTCString()
		};

		response.send(dateFormatted);

	} catch (err) {
		return response.send({error: 'Invalid Date'});
	}
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

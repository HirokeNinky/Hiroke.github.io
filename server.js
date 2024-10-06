const express = require("express");
const app = express();

const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.use(express.static("public"));

app.get('/settings/report', async (req, res) => {
res.redirect('https://forms.gle/anT5undy4mBcxcZRA')
});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/settings/report", (request, response) => {
  response.sendFile(__dirname + "/views/report.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

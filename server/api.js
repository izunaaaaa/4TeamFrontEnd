const express = require(`express`);
const app = express();

app.listen(8080, function () {
  console.log("datga");
});
app.get(`/api/users/:type`, async (req, res) => {
  res.send("connect");
});

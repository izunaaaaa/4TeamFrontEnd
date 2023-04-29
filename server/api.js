const express = require(`express`);
const app = express();

app.get(`/api/users/:type`, async (req, res) => {
  res.send("connect");
});

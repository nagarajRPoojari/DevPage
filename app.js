const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hi ");
});

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
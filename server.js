const express = require("express");
const app = express();
const torrent1337 = require('./services/1337x')
const exampleScrap = require('./services/example')
const bitSearch = require('./services/bitSearch')

const port = process.env.PORT || 6000;



app.get("/", async(req, res) => {
  try {
   const resp = await bitSearch('Breaking Bad Season 4')
   console.log(resp)
   res.send("Hello")
  } catch (error) {
   
  }
});

app.listen(port, () => {
   console.log(`Server is running on ${port}`);
});

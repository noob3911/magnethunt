const express = require("express");
const app = express();
const torrent1337 = require('./services/1337x')
const exampleScrap = require('./services/example')

const port = process.env.PORT || 6000;



app.get("/", async(req, res) => {
  try {
   const resp = await exampleScrap()
   res.send(resp)
  } catch (error) {
   
  }
});

app.listen(port, () => {
   console.log(`Server is running on ${port}`);
});

const express = require("express");
const app = express();
const cors = require('cors')
const torrent1337 = require('./services/1337x')
const bitSearch = require('./services/bitSearch')
const Routes = require('./routes/route')

const port = process.env.PORT || 6000;
app.use(cors());
app.use(express.json());

app.use('/', Routes)

app.get('/',(req,res)=>{
   res.send("Radhe Radhe !!")
})


app.listen(port, () => {
   console.log(`Server is running on ${port}`);
});

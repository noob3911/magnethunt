const cheerio = require("cheerio");
const axios = require("axios");

async function bitSearch(query, page = "1") {
  var ALLTORRENT = [];
  const url =
    // "https://bitsearch.to/search?q=" +
    // query +
    // "&sort=seeders";

    "https://bitsearch.to/search?q=gadar&sort=seeders"
  let html;
  try {
    html = await axios.get(
      url,
      // (headers = {
      //   "User-Agent":
      //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
      // })
    );
  } catch {
    return null;
  }

  const $ = cheerio.load(html.data);

 ALLTORRENT.push(html)
return ALLTORRENT
   
}

module.exports = bitSearch;
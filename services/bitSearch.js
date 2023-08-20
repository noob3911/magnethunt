const cheerio = require("cheerio");
const axios = require("axios");

async function bitSearch(query) {
   var ALLTORRENT = [];
   const url = `https://bitsearch.to/search?q=${query}&sort=seeders`;
   let html;
   try {
      html = await axios.get(
         url,
         // (headers = {
         //    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.5790.170 Safari/537.36",
         // })
      );
   } catch {
      return null;
   }

   const $ = cheerio.load(html.data);
   $("li.search-result").each((_, element) => {
      let size = $(element).find(".info div div").eq(3).text();
      if (size) {
         let torrent = {
            Name: $(element).find(".info .title").text(),
            Size: $(element).find(".info div div").eq(3).text(),
            Seeders: $(element).find(".info div div").eq(4).text().trim(),
            Leechers: $(element).find(".info div div").eq(5).text().trim(),
            Magnet: $(element).find(".links a").eq(1).attr("href"),
         };
         ALLTORRENT.push(torrent);
      }
   });

   return ALLTORRENT;
}

module.exports = bitSearch;

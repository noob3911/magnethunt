const cheerio = require("cheerio");
const axios = require('axios')
const exampleScrap = async() => {
  let allTitle =[]
  let url = 'https://www.tricksnomy.com'
  try {
   const html = await axios.get(url)
   const $ = cheerio.load(html.data)
   const titles = $('.post-outer').map((_, element)=>{
      const title = $(element).find('.entry-title > a').text()
      return title
   }).get()
   console.log(titles)
  } catch (error) {
   
  }
};

module.exports = exampleScrap;

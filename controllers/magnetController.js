const Controller = require("./controller");
const torren1337 = require("../services/1337x");
const bitSearch = require("../services/bitSearch");

class MagnetController extends Controller {
   constructor(response) {
      super(response);
   }

   async search(request) {
      const { search } = request.query;

      try {
         //  const torren1337Results = torren1337(search);
         //  const bitSearchResults = bitSearch(search);

         //  const [torren1337Data, bitSearchData] = await Promise.all([torren1337Results, bitSearchResults]);

         //  const combinedResults = {
         //     torren1337: torren1337Data,
         //     bitSearch: bitSearchData,
         //  };
         //  this.sendResponse(combinedResults);

         const [bitSearchResults, torren1337Results] = await Promise.all([
            torren1337(search).catch((error) => {
               console.error("Error from torren1337:", error);
               return [];
            }),
            bitSearch(search).catch((error) => {
               console.error("Error from bitSearch:", error);
               return [];
            }),
         ]);

         const combinedResults = (bitSearchResults || []).concat(torren1337Results || []);

         combinedResults.sort((a, b) => b.seeders - a.seeders);

         const top20Results = combinedResults.slice(0, 20);

         this.sendResponse(top20Results);
      } catch (error) {
         console.error(error);
      }
   }
}

module.exports = MagnetController;

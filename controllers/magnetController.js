const Controller = require("./controller");
const torren1337 = require("../services/1337x");
const bitSearch = require("../services/bitSearch");
const torLock = require('../services/torlock')
const torProject = require('../services/torproject')

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

         const [torren1337Results, bitSearchResults, torResults, torProjectResults] = await Promise.all([
            torren1337(search).catch((error) => {
               console.error("Error from torren1337:", error);
               return [];
            }),
            bitSearch(search).catch((error) => {
               console.error("Error from bitSearch:", error);
               return [];
            }),
            torLock(search).catch((error) => {
               console.error("Error from bitSearch:", error);
               return [];
            }),
            torProject(search).catch((error) => {
               console.error("Error from bitSearch:", error);
               return [];
            }),
         ]);
         const validTorren1337Results = torren1337Results?.filter((result) => {
            return result.Magnet && result.Magnet.startsWith("magnet:");
         });


         // const combinedResults = [...(validTorren1337Results || []), ...(torResults || [])];
         // const combo =[...combinedResults, ...(bitSearchResults || []), ...(torProjectResults||[])]
         // combo.sort((a, b) => b.seeders - a.seeders);
         // const top20Results = combo.slice(0, 25);

         const combinedResults = [
            ...(validTorren1337Results || []),
            ...(torResults || []),
            ...(bitSearchResults || []),
            ...(torProjectResults || []),
          ];
          
          combinedResults.sort((a, b) => b.seeders - a.seeders);
          
          const top25Results = combinedResults.slice(0, 25);

         this.sendResponse(top25Results);

      } catch (error) {
         console.error(error);
      }
   }
}

module.exports = MagnetController;

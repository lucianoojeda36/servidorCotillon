import * as cheerio from 'cheerio';
import axios from 'axios';
import scrapeIt from 'scrape-it';

// export const handlerDataScrap = () => {
//   axios
//     .get(
//       'https://listado.mercadolibre.com.ar/afeitadora#D[A:afeitadora]'
//     )
//     .then(res => {
//       console.log('entro')
//       const $ = cheerio.load(res.data);
//       console.log('entro2======',$('.producto'))
//       $('div.ui-search-layout__item').each((index, element) => {
//         console.log('element========>',element)
//         // const blogTitle = $(element).find('.producto_txt').text();
//         // console.log('=============>',blogTitle)
//       });
//     })
//     .catch(err => console.error(err));
// };

export const handlerDataScrap = () => {

//   scrapeIt("https://ionicabizau.net", {
//     title: ".header.container h1"
//   , desc: ".header.container h2"
//   , avatar: {
//         selector: ".header img"
//       , attr: "src"
//     }
// }).then(({ data, response }) => {
//     console.log(`Status Code: ${response.statusCode}`)
//     console.log(data)
// })
scrapeIt('https://www.cotilloncasaalberto.com.ar/pedido/carpeta_ver.php?idcarpeta=11219&idcarpeta_padre=11219&menu_1=2&menu_2=2', {
    presentations: {
      listItem: '.producto div',
      // data: {
      //   title: '.producto_txt a',
      // },
    },
  }).then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`)
        console.log(data)
    })
  
};

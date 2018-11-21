const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('data.html');

writeStream.write(`<html dir="ltr" lang="en" > \n <html> \n`);

request('https://www.myurl.com/', (error, response, html) => {
  if (!error && response.statusCode == 200) {
  const $ = cheerio.load(html);

  $('div.clsss > ul > li').each((i, el) => {
    const link = $(el)
      .find('a')
      .attr('href');

    followUrl(link);

  });
  console.log('Done...');
  }
});


function followUrl(link){
  request( link , (error, response, html) => {
  if (!error && response.statusCode == 200) {
  const $ = cheerio.load(html);

  $('div.content').each((i, el) => {
    const title = $(el)
      .find('h1')
      .text();
    const content = $(el)
      .find('.class')
      .text();

    writeStream.write(`<h2>${title}</h2><p>${content}</p>\n`);
  });

    writeStream.write(`</html> \n`);
    
  console.log(`Done for url: ${link}`);
   }
  });
}

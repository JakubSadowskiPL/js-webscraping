const request = require('request');
const cheerio = require('cheerio');
const glossaryLinks = require('./links');
const fs = require('fs');
const writeStream = fs.createWriteStream('data.html');

writeStream.write(`<html dir="ltr" lang="en" > \n <html> \n`);

request(`https://www.myurl.com/`, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    
    $('div.content').each((i, el) => {
      const title = $(el)
        .find('h1')
        .text();
      const content = $(el)
        .find('.class')
        .text();

      writeStream.write(`<h1>${title}</h1><p>${content}</p> \n`);
    });
    
    writeStream.write(`</html> \n`);
    
    console.log('Done...');
  }
});

///require fs which stands for file-system -> fs is a module
const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
////////////////
//FILES

// //Blocking / Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// // read the content of input.txt and return it as string in utf-8 encoding
// console.log(textIn);

// const textOut = `this is the text from another file  : ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('Written suceesfully !');

//Nonblocking/ Asynchronous way
// try {
//     fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//         if (err) throw err;
//         console.log(data + '\n');
//         fs.readFile('./txt/input.txt', 'utf-8', (err, data2) => {
//             if (err) throw err;
//             console.log(data2 + '\n');

//             console.log("\nData read with success !");

//             fs.writeFile('./txt/last.txt', `${data}\n${data2}`, 'utf-8', err => {
//                 if (err) throw err;
//                 console.log('Files written with success !');
//             });
//         });
//     });
// } catch (error) {
//     console.log('An error occurred: ', error.message);
// }

// console.log("Will read file !!!");


////////////////////
//SERVER
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
  );
  const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
  );
  const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
  );
  
  const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
  const dataObj = JSON.parse(data);
  
  //const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
  //console.log(slugs);
  
  const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
  
    // Overview page
    if (pathname === '/' || pathname === '/overview') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });
  
      const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
      const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
      res.end(output);
  
      // Product page
    } else if (pathname === '/product') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });
      const product = dataObj[query.id];
      const output = replaceTemplate(tempProduct, product);
      res.end(output);
  
      // API
    } else if (pathname === '/api') {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(data);
  
      // Not found
    } else {
      res.writeHead(404, {
        'Content-type': 'text/html',
        'my-own-header': 'hello-world'
      });
      res.end('<h1>Page not found!</h1>');
    }
  });
  
  server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
  });
  
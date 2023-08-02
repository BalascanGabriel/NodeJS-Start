///require fs which stands for file-system -> fs is a module
const http = require('http'); // Import the 'http' module to create an HTTP server
const url = require('url'); // Import the 'url' module to handle URLs
const fs = require('fs'); // Import the 'fs' module to read files
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


// Read the contents of HTML template files
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// Read the contents of 'data.json' file and parse it into a JavaScript object
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


// Create an HTTP server using 'http.createServer(callback)'
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); // Parse the request URL and extract 'query' and 'pathname'

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html' // Set the response content type to 'text/html'
    });

    // Generate the HTML for product cards using 'dataObj' and 'replaceTemplate()' function
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

    // Replace the '{%PRODUCT_CARDS%}' placeholder in the 'tempOverview' template with the generated HTML
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    // Send the final HTML as the response using 'res.end(output)'
    res.end(output);

  // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html' // Set the response content type to 'text/html'
    });

    // Extract the 'query.id' parameter from the URL to identify the specific product
    const product = dataObj[query.id];

    // Generate the HTML for the specific product using 'replaceTemplate()' function and 'tempProduct' template
    const output = replaceTemplate(tempProduct, product);

    // Send the final HTML as the response using 'res.end(output)'
    res.end(output);

  // API Endpoint
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json' // Set the response content type to 'application/json'
    });

    // Send the entire 'data' (JSON data from 'data.json') as the response using 'res.end(data)'
    res.end(data);

  // Not found (Any other URL)
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html', // Set the response content type to 'text/html'
      'my-own-header': 'hello-world' // Set a custom header 'my-own-header' with the value 'hello-world'
    });

    // Send an HTML message saying "Page not found!" as the response using 'res.end()'
    res.end('<h1>Page not found!</h1>');
  }
});

// Start the server and listen on port 8000 and the IP address 127.0.0.1 (localhost)
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});

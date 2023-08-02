///require fs which stands for file-system -> fs is a module
const fs = require('fs');
const http = require('http');
const url = require('url');
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

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/') {
        res.write('Response from the server !\n');
        res.end('Hello from the server !');
    } else if (pathName === '/overview') {
        res.write('Response from the server !\n');
        res.end('This is the OVERVIEW!');
    } else if (pathName === '/product') {
        res.write('Response from the server !\n');
        res.end('This is the PRODUCT !');
    } else if (pathName === '/api') { 

    res.writeHead(200, {
        'Content-type': 'application/json'
    })
    res.end(data);

}
        else {
    res.writeHead(404, {
        'Content-type': 'text/html',
        'my-own-header': 'hello-world'
    });
    res.end('<h1>PAGE NOT FOUND !!!</h1>');
}
});

const port = 8000;

server.listen(port, '127.0.0.1', () => {
    console.log(`Listening on port ${port}`);
});
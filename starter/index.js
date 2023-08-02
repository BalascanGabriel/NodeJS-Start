///require fs which stands for file-system -> fs is a module
const fs = require('fs');

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
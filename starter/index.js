///require fs which stands for file-system -> fs is a module
const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// read the content of input.txt and return it as string in utf-8 encoding
console.log(textIn);

const textOut = `this is the text from another file  : ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOut);
console.log('Written suceesfully !');
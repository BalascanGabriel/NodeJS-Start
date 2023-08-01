///require fs which stands for file-system -> fs is a module
const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// read the content of input.txt and return it as string in utf-8 encoding

console.log(textIn);
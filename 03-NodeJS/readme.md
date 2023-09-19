NODEJS

* create index.js
* $ npm init -y
* create .gitignore (copy from http://gitignore.io)

ENV

* create .env ->
```sh
# CommentLine
NODE_ENV = production
ENV_HOST = 127.0.0.1
ENV_PORT = 8000 # Comment
ENV_EXAMPLE_STR = 'Hello World'
ENV_EXAMPLE_TXT = "Zero One True Three"
```
* $ npm i dotenv
* index.js ->
```js
// get ENV_VARS from .env file:
require("dotenv").config(); // $ npm i dotenv // https://www.npmjs.com/package/dotenv
// console.log(process.env); 
console.log("NODE_ENV:", process.env.NODE_ENV); 
console.log("ENV_HOST:", process.env.ENV_HOST + ':' + process.env.ENV_PORT); 
console.log("ENV_EXAMPLE_STR:", process.env.ENV_EXAMPLE_STR); 
console.log("ENV_EXAMPLE_TXT:", process.env.ENV_EXAMPLE_TXT.split(' ')); 
```
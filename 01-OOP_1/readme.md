# NodeJS

-   Node.JS Official & Download Döküman icin: https://nodejs.org
-   Documents: https://nodejs.org/api

### Check versions:

```sh
    $ node -v
    node --version
    $ npm -v
```

### NPM

```sh

    $ npm help

    $ npm init -y # package.json
    $ npm list

    $ npm install express
    $ npm i express --save

    $ npm i nodemon --save-dev # package/scripts -> "dev": "nodemon index.js"
    $ npm run dev # yarn dev

    $ npm install # install packaces (at package.json)
    $ npm install --production
    $ npm i --omit=dev # install packaces with development modules

    # GLOBAL
    $ npm --global list
    $ npm -g list
    $ npm i -g nodemon
    $ nodemon -v

    # NPX
    $ npx create-react-app newfolder # Ctrl+C
```

### NodeShell

```sh
    $ node
    > console.log('Hello World')
    > let moduleName = require("module")
    > moduleName.builtinModules // Show included modules.
    > .exit

```

-   npm init -y # package.json
-   npm install express
-   nodemon indexedDB.js

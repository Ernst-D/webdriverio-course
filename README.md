# WebdriverIO-course

## Pre-requisites

- NVM (Node Version Manager)
    - [Unix](https://github.com/nvm-sh/nvm#installing-and-updating)
    - [Windows](https://github.com/coreybutler/nvm-windows#installation--upgrades) 
    
    Install nvm and use active LTS version of nodejs. [More about lts versions](https://nodejs.org/en/about/releases/).
    
- [Visual Studio Code](https://code.visualstudio.com/)

## Table of Contents

- [Step1](#step1) 

## Step1. Setup

### Localhost application

For our test framework we need to select application under the test (AUT). We will use [Cypress Real-World-App](https://github.com/cypress-io/cypress-realworld-app) (what a surprise). What the app it is and what's it made of - you can read on GitHub. The main thing you need know is that this app uses [yarn](https://yarnpkg.com/), and you need to install it via npm:

```shell
npm i yarn -g
```

Clone this project and follow the guide for deploy (basically, you will need to run tow commands: `yarn install` and `yarn dev`). After application start you will be able to access it by `http://localhost:3000`. There will be a login form, so you credentials you can find in `/data/database.json`.

### Test framework backbone

First of all, make sure you're installed `nodejs` through `nvm`. In my case, I installed node 16.13.1 and made in default by command:
    
- Unix: `nvm alias default 16.13.1`
- Windows: `nvm use 16.13.1`

If everything is correct - init project with npm: `npm init -y`. Then, install WDIO-CLI: `npm i @wdio/cli -D`. 
Check you CLI by `npx wdio --help`. If it shows an output of commands - great. 

Lets create backbone for our test framework: 
```shell
npx wdio config
``` 

We gonna need to select some options: 

`local machine` -> `mocha` -> `no compiliers` -> just press Enter -> `Y` autogenerate some test files -> use Page Objects -> set default location for Page Objects -> use only `spec` reporter -> don't use `wait-for` lib, just press Enter -> use only `chromedriver` -> skip `baseUrl` setup. 

Greate, now you have a backbone, generated from WDIO-CLI. 

Run `npx wdio wdio.conf.js`. It will run autogenerated spec.


### First test

After we have deployed the app, we can start writing our automated tests. Lets create `login.spec.js` in our `./test/specs`. 

```js
describe("Test suite",()=>{
    it("Test case",async()=>{
        await browser.url("/");
        let usernameInput = await $('#username');
        let passwordInput = await $("#password")
        await usernameInput.waitForDisplayed();
        await usernameInput.setValue("Tavares_Barrows");
        await passwordInput.setValue("s3cret");
        await $('[data-test="signin-submit"]').waitForEnabled();
        await $('[data-test="signin-submit"]').click();
        await $('[data-test="transaction-list"]').waitForDisplayed();
        await browser.saveScreenshot("./image.png");
    })
})
```

Run this with next command
```shell
npx wdio wdio.conf.js --spec ./test/specs/login.spec.js
```

**NOTE:** If test will fail with invalid credentials - find valid one in `./data/database.json` and put in this line: 
```js
await usernameInput.setValue("specific_username");
```

Finally, we ran our first test! It should open the browser window, browser navigates to our localhost app, perform login and make screenshot of it.

But if we take a look at screenshot - we will see that there is no pictures uploaded on a page. 

So our can we consider that our test is flaky? Not actually, but we should wait until our page will be fully loaded. 
We will fix this in a steps to come.

## Step2. JS tooling

Since we're going to create production-like solution: we better to use latest features of the language, we need to have autocomplete for our code and we need to stick by some rules for our code syntax.

### Autocomplete: jsconfig

First, autocomplete. In JS world it sometimes could be hard to achieve since JS "doesn't have" (only built-in types) type system and some IDEs itself doesn't know anything about the code of your project (TypeScript and its usage - its another topic). Due to the fact we're using VS Code for this course, we need to provide IDE info about created types that comes from some libraries. 

Create `jsconfig.json` file in a root of the project and enter next content:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework"
        ]
    }
}
```

With this config we will provide types to IDE so every `js` file will know about these built in types.

### Code format: eslint

JS provide a lot of freedom how you can write your code. Semicolumns, single/double quotes, spaces in parameters. VS Code doesn't provide out of the box some features for code formatting.

For JavaScript code formatting we will use [eslint](https://eslint.org/). 

Run `npm install eslint --save-dev`. Then run `npm init @eslint/config`. 

You gonna need to set a few answers durng the setup: 

- How would you like to use ESLint? -> *To check syntax and find problems*, we don't need any code style int this project.
- What type of modules does your project use? -> *JavaScript modules (import/export)*. We will use latest features of JavaScript language so better to use module syntax.
- Which framework does your project use? -> *None of these*. It suggest us front-end frameworks, but our project is a nodejs project, so *none of these*.
- Does your project use TypeScript? -> *No*. Not yet.
- Where does your code run? -> *Node and Browser*. Even if we have nodejs project (our code runs in a nodejs), our is able to be evaluated in browser (WebDriver can execute js in a browser).
- What format do you want your config file to be in? -> *JSON*. Doesn't actually, but for convinience (better for googling) we will use JSON.

Great! We generated `.eslintrc.json`. Probably, your code will now be highlighted with red, but we will solve it. 

First of all, install plugin for linter: `npm install eslint-plugin-wdio --save-dev`. Then, edit `extends` property to `["plugin:wdio/recommended"]` value and add `plugins` property with value `["wdio"]`. 

Your config should looks like this:
```json
{
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": ["plugin:wdio/recommended"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    },
    "plugins": [
        "wdio"
    ]
}
```

Then, lets add some `rules`. `Rules` helps us to have clean syntax and quickly format our code. For example, force us to use semicolons. Edit "rules" to the next look:
```json
"rules": {
    "prefer-const":"off",
    "no-console":"error",
    "semi":"error",
    "lines-between-class-members":["warn","always"],
    "array-callback-return":"warn",
    "func-call-spacing":["warn","never"],
    "require-await":"error",
    "arrow-spacing": ["warn", { "before": true, "after": true }]
}
```

You can hover with your mouse and see, what some of these rules are actually do. 

And then, finally, you can go to the files and apply *Quick fix*, or you run `npx eslint . --fix --ext .js` in terminal to apply rules to your code.

## Transform: babel

We can use [babel](https://babeljs.io/) to enable latest features of ECMAScript and [module syntax](https://nodejs.org/api/esm.html).

First of all, lets install next packages:

```shell
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register
```
Then create `babel.config.js` which will transform our code to make it compatible for execution. 

```js
module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: '16'
            }
        }]
    ]
}
```

After that we can convert our files to ES modules, just go to the `example.e2e.js` and imported files and convert them. 

**NOTE:** We shall stay with ES modules because it will provide us the latest features of JS and also it can show us some specific situation when we had to use both versions of JS modules.
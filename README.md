# WebdriverIO-course

## Pre-requisites

- NVM (Node Version Manager)
    - [Unix](https://github.com/nvm-sh/nvm#installing-and-updating)
    - [Windows](https://github.com/coreybutler/nvm-windows#installation--upgrades) 
    
    Install nvm and use active LTS version of nodejs. [More about lts versions](https://nodejs.org/en/about/releases/).
    
- [Visual Studio Code](https://code.visualstudio.com/)

## Table of Contents

- [Step1](#step1) 
- [Step2](#step2) 
- [Step3](#step3)
- [Step4](#step4)
- [Step5](#step5)
- [Step6](#step6)


<h2 id='step1'>Step1. Setup</h2>

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

****

<h2 id='step2'> Step2. Tooling </h2>

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

****

<h2 id='step3'> Step3. Debugging </h2>

In order to investigate errors in our tests caused by test flakiness or test failures -  we need to have ability to dive through our code.

Debugging is our primary weapon for code inspection.

There are two ways you can debug your code in WebdriverIO:

1. You can use [`debug` method](https://webdriver.io/docs/api/browser/debug). Just put `await browser.debug()` in some place of the test and when execution comes to this moment - your code will enter to [REPL mode](https://webdriver.io/docs/repl). Also you will be able to interact with launched browser.

    **Important note:**
        
    - If you want to stay more time in a REPL mode - create environment variable which presence will increase test framework timeout (we're use Mocha, default -  60000ms. But there could be a case when you use Cucumber/Jasmine). Example for Mocha:

    Enter this variable in your terminal (Windows, PowerShell):
    ```powershell
    $env:WDIO_DEBUG=1
    ```
    Or (Unix):
    ```shell
    export WDIO_DEBUG=1
    ```
    Then find  edit `wdio.conf.js` with next segment:
    ```js
        mochaOpts: {
            ui: 'bdd',
            timeout: process.env.WDIO_DEBUG == 1 ? 70000 : 60000
        },
    ```

    Depending upon existence of WDIO_DEBUG env variable - we configure default timeout. This check also can be very useful for some debug purposes, for example we can change logic in some commands.


2. You can use [JavaScript Debug Terminal](https://code.visualstudio.com/docs/nodejs/nodejs-debugging) for nodejs projects (WebdriverIO runs in nodejs). Just open this terminal, put breakpoints somewhere in your code and run command in terminal. When execution comes to your breakpoint - it will stop and you will be able to walk through your code step by step.


You can try both of these methods in `example.e2e.js`.

<h2 id='step4'>Step4. Page Object Model</h2>

"When you write tests against a web page, you need to refer to elements within that web page in order to click links and determine what's displayed. However, if you write tests that manipulate the HTML elements directly your tests will be brittle to changes in the UI. A page object wraps an HTML page, or fragment, with an application-specific API, allowing you to manipulate page elements without digging around in the HTML." 

This is a direct passage from Martin Fowler's article about Page Object. You better read whole [article](https://martinfowler.com/bliki/PageObject.html). But lets refactor our `login.spec.js`; From this view:
```js
describe("Test suite",() => {
    it("Test case",async() => {
        await browser.url("/");
        let usernameInput = await $('#username');
        let passwordInput = await $("#password");
        await usernameInput.waitForDisplayed();
        await usernameInput.setValue("Tavares_Barrows");
        await passwordInput.setValue("s3cret");
        await $('[data-test="signin-submit"]').waitForEnabled();
        await $('[data-test="signin-submit"]').click();
        await $('[data-test="transaction-list"]').waitForDisplayed();
        await browser.saveScreenshot("./image.png");
    });
});
```
To this:
```js
describe("User common flow",() => {
    it("can login and see transaction list",async() => {
        await loginPage.open();
        await loginPage.login();
        await dashboardPage.waitForPageLoad();
    });
});
```

We should move all logic and interaction into separate modules, so our test cases will contain only description of user flow. The rest of the refactored you can check in repo. Note, that we added `waitForPageLoad` method for Dashboard Page: it serves us as a custom wait for ui to be loaded and assertion that page is loaded.

Further, we will move actions, that we can perform on a page, and page objects, which describes elements of ui, to separate modules.

<h2 id='step5'>Step5. Wait for elements </h2>

Waiting for elements is one of key things when working 
on modern web app e2e tests. WebDriver doesn't have built-in waitings for web elements (it has only wait for page to be loaded), but WebDriverIO API has special methods for waitings. Check out element section in [API docs](https://webdriver.io/docs/api). 

Other thing worth mentioning - [waitUntil method](https://webdriver.io/docs/api/element/waitUntil), you need to remember, that condition **must always return boolean**, otherwise your test will fail due to test framework timeout.

This command gives you a lot versatility on how you can wait. For example, we need to wait until some text will be changed on the page:

```js
await browser.waitUntil(async()=>{
    let text = await ui.elem("//h1").getText();
    return (text.includes("Your income & balances are") && !text.includes("being verified"));
})
```

**<h3>Task. Write your first full e2e test</h3>**

We need to practically reinforce the knowledge we gained in the previous steps. So we will create e2e test for our real-world-application. The test case is next (it is written in a Gherkin language):

```gherkin
Feature: User creates request transaction

    Some description needs to be added  

    Scenario: User logs in
        Given User is on the login page
        When It logs as Tavares_Barrows
        Then It sees the home page
        And User sees his username
    
    Scenario: User creates request transaction
        Given User is on the home page
        And User creates new transaction to user Giovanna74
        When It fill amount of money and adds note on transaction page
        And It clicks on a request button
        Then User see request in notifications
        And User can see request in Mine transactions
```

One user logs in to the app, creates a request for transaction to another user, and that second user logs in and see the request for the transaction.

Use page object pattern and, probably, you gonna need to use waiting for elements.

<h2 id='step6'>Step6. Test specs management </h2>

For this step, you probably gonna use this [guideline](https://webdriver.io/docs/organizingsuites/). 

In this step we will talk about test specs management: how to select specific test spec, how to run specific test, how to group test cases and how to exclude test cases.

First of all, lets create a copy of our `login.spec.js` - `copy.login.spec.js` and copy the content of login spec. Great, now we have two specs (or three, depends on a completion of task in *step5*). Also we created new spec which test [Webmail](https://ej2.syncfusion.com/showcase/typescript/webmail) application (`./test/specs/webmail`)

You also might notice that now we have `myaccount.spec.js` which will logs in user, navigates it to the user settings and play with it's email (these changes would be great to verify through network assertions, but this kind of assertions will be covered later). 

Now we can start talk about specs management. First thing we should mention - is a `specs` property in `wdio.conf.js`. It defines the root directory for your tests. So when you run `npx wdio ./wdio.conf.js` - it will launch those spec files, which directory are `./test/specs.

<h3>Run specific test suite </h3>

Okay, now we know where from WDIO-CLI takes test files. 
Let's try to run specific test spec. We will use `--spec` flag and our terminal command should looks like this: 
```shell
npx wdio ./wdio.conf.js --spec test/specs/cypress-rwa/myaccount.spec.js
```
You can use this flag to run one or more test specs. For, example:
```shell
npx wdio ./wdio.conf.js --spec test/specs/cypress-rwa/myaccount.spec.js --spec ./test/specs/webmail/inbox.spec.js
```

<h3>Run specific group of test suites </h3>

In `wdio.conf.js` we can specify group of test. For example, now we have tests for cypress-rwa and for webmail app. We would like to have such cli flag that would allow us to run tests related only to the specific app. Let's add next property `suites` to `wdio.conf.js`: 
```js
    suites:{
        webmail:[
            './test/specs/webmail/**'
        ],
        cypress_rwa:[
            'test/specs/cypress-rwa/**'
        ]
    }
```
With this you can type, for example: 
```shell
npm run test -- --suite webmail
```

With `--suite` flag - you will be able to run specific set of tests cases. You also can add some more tests into the suite. Let's create new suite which will contain webmail specs and one more spec from cypress_rwa:
```js
mix:[
    './test/specs/webmail/**',
    'test/specs/cypress-rwa/login.spec.js'
    ],
```

<h3>Exclude specific test from suites </h3>

For example, we don't want to run cypress spec, which we included to the `mix` suite, we can excluded by `--exclude` flag:
```shell
npm run test -- --suite mix --exclude test/specs/cypress-rwa/**
``` 

<h3>Run specific test from spec file </h3>

Sometimes we need to run specific test case from spec, so we need to use `--mochaOpts.grep "some text in name of the test case"`. For example:
```shell
npm run test -- --spec test/specs/webmail/inbox.spec.js --mochaOpts.grep "can check profile sidebar"
```
As you can see, we have also have tests which contains `skip` - this is a way we can skip some test cases from spec. 

Regarding to `--mochaOpts.grep` - you can just provide string template for specific test, for example `--mochaOpts.grep "can check "`.

**Important note:** if you want to use this feature further - you **must** be sure that state of the test in your suite doesn't depend from the previous one (unless this is a first test in a suite).
# WebdriverIO-course

## Pre-requisites

- NVM (Node Version Manager)
    - [Unix](https://github.com/nvm-sh/nvm#installing-and-updating)
    - [Windows](https://github.com/coreybutler/nvm-windows#installation--upgrades) 
    
    Install nvm and use active LTS version of nodejs. [More about lts versions](https://nodejs.org/en/about/releases/).
    
- [Visual Studio Code](https://code.visualstudio.com/)

## Table of Contents

- [Step1](#step1) 

## Step1

First of all, make sure you're installed `nodejs` through `nvm`. In my case, I installed node 16.13.1 and made in default by command:
    
- Unix: `nvm alias default 16.13.1`
- Windows: `nvm use 16.13.1`

If everything is correct - init project with npm: `npm init -y`. Then, install WDIO-CLI: `npm i @wdio/cli -D`. 
Check you CLI by `npx wdio --help`. If it shows an output of commands - great. 

Lets create backbone for our test framework: `npx wdio config`. We gonna need to select some options: 

`local machine` -> `mocha` -> `no compiliers` -> just press Enter -> `Y` autogenerate some test files -> use Page Objects -> set default location for Page Objects -> use only `spec` reporter -> don't use `wait-for` lib, just press Enter -> use only `chromedriver` -> skip `baseUrl` setup


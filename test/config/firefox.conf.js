const {config} = require("./wdio.conf");

config.capabilities = [{
    maxInstances:5,
    browserName:"firefox"
}];
config.services = ["selenium-standalone"];

config.beforeTest = async function(){
    await browser.maximizeWindow();
};

exports.config = config;
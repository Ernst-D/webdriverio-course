const config = require("./shared.conf").default;

config.afterTest = async function(){
    let browserName = driver.capabilities.browserName;
    await browser.saveScreenshot(`./new_conf-${browserName}.png`);
};

exports.config = config;
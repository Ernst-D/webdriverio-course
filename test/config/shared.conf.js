const {config} = require("./wdio.conf");
const sharedConf = config;

sharedConf.maxInstances = 1;

sharedConf.capabilities = [
    {
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true
    },
    {
        maxInstances:1, 
        browserName:"firefox"
    }
];

sharedConf.services = ["selenium-standalone"];

export default sharedConf;
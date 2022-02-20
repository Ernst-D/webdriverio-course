export default {
    /**
     * 
     * @param {WebdriverIO.Element} element 
     */
    async waitAndClick(element){
        return await element.waitAndClick();
    },
    async customCommandExample(){
        await browser.saveScreenshot("./customCommandShot.png");
    }
};
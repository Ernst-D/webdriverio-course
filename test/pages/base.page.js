export default class BasePage {
    constructor(pageUrl){
        this.url = pageUrl;
    }

    get pageTitle(){
        return browser.getTitle();
    }

    async open(){
        return await browser.url(this.url);
    }
}
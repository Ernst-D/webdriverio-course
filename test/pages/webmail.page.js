import BasePage from "./base.page";

const webmailUrl = "https://ej2.syncfusion.com/showcase/typescript/webmail";

class WebmailPage extends BasePage{
    constructor(pageUrl){
        super();
        this.url = pageUrl;
    }

    get messageComponent(){
        return $('[class="e-content"] [class="e-list-item e-level-1"]');
    }

    get messageContent(){
        return $('[id="accContent"]');
    }

    get inboxName(){
        return $('[id="profile-div"]');
    }

}
export default new WebmailPage(webmailUrl);
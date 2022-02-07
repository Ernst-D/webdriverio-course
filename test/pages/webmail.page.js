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

// export default {
//     messageComponent: '[class="e-content"] [class="e-list-item e-level-1"]',
//     messageContent: '[id="accContent"]',
//     inboxName: '[data-uid="7"] > :nth-child(2) > .e-list-text',
//     profile:{
//         name:'#profile-div',
//         sidebar:'[class="profile-content"]',
//         links:'[class="about-anchor"]'
//     },
    
// };
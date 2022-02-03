import BasePage from "./base.page";

class DashboardPage extends BasePage {
    constructor(pageUrl){
        super();
        this.url = pageUrl;
    }

    get transactionList(){
        return $('[data-test="transaction-list"]');
    }
    
    get userAvatars(){
        return $$('[class="MuiAvatar-img"]');
    }
    
    async waitForPageLoad(){
        return await this.transactionList.waitForDisplayed();
    }
}
export default new DashboardPage("/");
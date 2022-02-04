import BasePage from "./base.page";

class UserSettingPage extends BasePage {
    constructor(pageUrl){
        super();
        this.url = pageUrl;
    }

    get emailInput(){
        return $('[data-test="user-settings-email-input"]');
    }

    get submitBtn(){
        return $('[data-test="user-settings-submit"]');
    }
}
export default new UserSettingPage("/user/settings");
import BasePage from "./base.page";

class LoginPage extends BasePage{
    
    get usernameInput(){
        return $('#username');
    }

    get passwordInput(){
        return $("#password");
    }

    constructor(pageUrl){
        super();
        this.url = pageUrl;
    }
    
    async login(){
        await this.usernameInput.waitForDisplayed();
        await this.usernameInput.setValue("Tavares_Barrows");
        await this.passwordInput.setValue("s3cret");
        await $('[data-test="signin-submit"]').waitForEnabled();
        await $('[data-test="signin-submit"]').click();
    }
}
export default new LoginPage("/signin");
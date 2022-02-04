import dashboardPage from "../../pages/dashboard.page";
import loginPage from "../../pages/login.page";

describe("User common flow",() => {
    it("can login and see transaction list",async() => {
        await loginPage.open();
        await loginPage.login();
        await dashboardPage.waitForPageLoad();
    });
});
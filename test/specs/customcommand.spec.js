import { default as dashboardPage } from "../pages/dashboard.page";
import { default as loginPage } from "../pages/login.page";

describe("User common flow",() => {
    it("can check and scroll to last element of dashboard list",async() => {
        await loginPage.open();
        await loginPage.login();
        await dashboardPage.waitForPageLoad();
        await $('//*[@role="rowgroup"]/div[5]').waitAndClick();
    });
});
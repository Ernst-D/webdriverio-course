import { default as dashboardPage } from "../../pages/dashboard.page";
import { default as loginPage } from "../../pages/login.page";
import usersettingsPage from "../../pages/usersettings.page";

const clearValue = async (inputElement) => {
    let selectorValue = await inputElement.getValue();
    let backSpaces = new Array(selectorValue.length).fill('Backspace');
    await inputElement.setValue(backSpaces);
};

describe("User account test suite",() => {
    it("can edit user's email in My Account",async () => {
        await loginPage.open();
        await loginPage.login();
        await dashboardPage.waitForPageLoad();
        await dashboardPage.userSettings.click();
        let userEmail = await usersettingsPage.emailInput.getValue();
        await clearValue(usersettingsPage.emailInput);
        await usersettingsPage.emailInput.setValue("testEmail@gmail.com");
        await clearValue(usersettingsPage.emailInput);
        await usersettingsPage.emailInput.setValue(userEmail);
        await usersettingsPage.submitBtn.click();
    });
});
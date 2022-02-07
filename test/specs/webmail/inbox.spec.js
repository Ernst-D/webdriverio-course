import { default as webmailPage } from "../../pages/webmail.page";

describe("Inbox test suite",() => {
    before("User navigates to inbox", async () => {
        await browser.maximizeWindow();
        await webmailPage.open();    
    });

    it("can see its profile name on Inbox", async () => {
        let username = "Andrew Fuller";
        let profileName = await webmailPage.inboxName.getText();
        expect(profileName).toEqual(username);
    });
    it.skip("can see content of message",() => {
       // TBA
    });
    it.skip("can create and send message",() => {
       // TBA
    });
    it("can check profile sidebar", async () => {
       await webmailPage.inboxName.click();
       let settingsLinks = await $$('[class="profile-content"] [class="about-anchor"]');
       settingsLinks.forEach(link => {
           expect(link).toBeExisting();
       }); 
    });    
});
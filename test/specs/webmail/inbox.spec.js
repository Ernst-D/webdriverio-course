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
    it("can see content of message",() => {
       // TBA
    });
    it("can create and send message",() => {
       // TBA
    });
    it("can check profile sidebar",() => {
       // TBA
    });    
});
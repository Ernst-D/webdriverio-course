import fs from "fs";
import { default as webmailPage } from "../../pages/webmail.page";

const fsPromise = fs.promises;

describe("Inbox test suite",() => {
    before("User navigates to inbox", async () => {
        await browser.maximizeWindow();
        await webmailPage.open();    
    });
    it("can create and send message", async () => {
        let confirmationMessage = "Your mail has been sent successfully.";

        await $('#e-tbr-btn_0').click();
        await $('//button[@id="btnTo"]//parent::div').click();
        await (await $$('ul[id="autoTo_options"] [alt="employee"]')).shift().click();
        await $('//button[@id="btnCc"]//parent::div').click();
        await $$('ul[id="autoCc_options"] [alt="employee"]')[3].click();
        await $('[id="txtSubject"]').setValue("Message subject");
        let message = await fsPromise.readFile("./webmail.message.txt");
        await $('[id="mailContentMessage"]').setValue(message.toString());
        await $('[id="btnSend"]').click();
        let confirmationModal = await $('[id="sentMailDialog_dialog-content"]');

        expect(confirmationModal).toBeDisplayed();
        expect(await confirmationModal.getText()).toEqual(confirmationMessage);
    });
    it("can check profile sidebar",() => {
       // TBA
    });    
});
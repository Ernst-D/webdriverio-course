describe("Test suite",()=>{
    it("Test case",async()=>{
        await browser.url("/");
        let usernameInput = await $('#username');
        let passwordInput = await $("#password")
        await usernameInput.waitForDisplayed();
        await usernameInput.setValue("Adolfo.Skiles80");
        await passwordInput.setValue("s3cret");
        await $('[data-test="signin-submit"]').waitForEnabled();
        await $('[data-test="signin-submit"]').click();
        await browser.saveScreenshot("./image.png");
    })
})
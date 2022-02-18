describe("Parametrized test suite",() => {
    const testData = ["cypress","playwright","webdriverio"];

    testData.forEach(data => {
        it("can search automation frameworks in google", async () => {
            await browser.url("https://google.com");
            await $("[name='q']").setValue(data);
            await browser.keys(["Enter"]);
            await $(`[data-async-context="query:${data}"] > div`).waitForDisplayed();
            await browser.saveScreenshot(`./${data}.png`);
        });
    });
});
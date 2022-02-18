describe("Parametrized test suite",() => {
    const testData = ["cypress","playwright","webdriverio"];
    
    testData.forEach(data => {
        it("can search automation frameworks in google", async () => {
            await browser.url("https://google.com");
            await $("[name='q']").setValue(data);
            await browser.keys(["Enter"]);
            expect($(`[data-async-context="query:${data}"] > div`)).resolves.toBeDisplayed();
            await browser.saveScreenshot(`./${data}.png`);
        });
    });

    const testDataSet = [
        {key:'cypress', value: '[data-async-context="query:cypress"]'},
        {key:'playwright', value:'[data-async-context="query:playwright"]'},
        {key:'playwright', value:'[data-async-context="query:playwright"]'},
    ];

    testDataSet.forEach(({key,value}) => {
        it("can search automation frameworks in google with object data set", async () => {
            await browser.url("https://google.com");
            await $("[name='q']").setValue(key);
            await browser.keys(["Enter"]);
            expect($(value)).resolves.toBeExisting();
        });
    });
});
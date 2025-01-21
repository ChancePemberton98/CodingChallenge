class HomePage
{

    constructor(page)
    {
        this.page=page;
        this.portfolioSideBar="//nav//a[@href='/c/portfolio']";
        this.transactionSideBar="//nav//a[@href='/c/transactions/history']";
        this.maybeLaterButton="//span[contains(text(), 'Maybe later')]/parent::*/parent::button";
    }

    async check2FAPage()
    {
        const maybeLaterVisible = await this.page.$(this.maybeLaterButton);
        if (maybeLaterVisible)
        {
            await this.page.click(this.maybeLaterButton);
        }
    }

    async navigateToTransactions()
    {
        await this.page.click(this.transactionSideBar);
    }

    async navigateToPortfolio()
    {
        await this.page.click(this.portfolioSideBar);
    }

}
module.exports=HomePage
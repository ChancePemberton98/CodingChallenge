class HomePage
{

    constructor(page)
    {
        this.page=page;
        this.portfolioSideBar="//nav//a[@href='/c/portfolio']";
        this.transactionSideBar="//nav//a[@href='/c/transactions/history']";
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
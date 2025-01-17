const { expect } = require('@playwright/test');

class PortfolioPage {
    constructor(page) {
        this.page = page;
        this.portfolioBalanceLocator = page.locator("//span[text()='$']/following-sibling::span");
    }

    async validatePortfolioBalance(expectedBalance) {
        await expect(this.portfolioBalanceLocator).toContainText(expectedBalance.toString());
    }
}

module.exports = PortfolioPage;
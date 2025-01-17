class LoginPage
{

    constructor(page)
    {
        this.page=page;
        this.username="//input[@name='username']";
        this.password="//input[@name='password']";
        this.loginButton="//button[@type='submit']";
    }

    async loginToSite(username, password)
    {
        await this.page.fill(this.username, username);
        await this.page.fill(this.password, password);
        await this.page.click(this.loginButton);
    }

}
module.exports=LoginPage
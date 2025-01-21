//ChatGPT was used for error handling and some comments in this file.

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const yaml = require('js-yaml');
const Login = require("../pages/loginpage");
const Email = require("../pages/emaillogic");
const Transaction = require("../pages/transactionpage");
const HomePage = require("../pages/homepage");
const PortfolioPage = require("../pages/portfoliopage");

// Load configuration from YAML
const config = yaml.load(fs.readFileSync('config.yaml', 'utf8'));

test('Login to application and verify email in the same browser', async ({ page }) => {
  // Load email configuration from YAML
  const emailConfig = {
    user: config.user.email, // Email from YAML
    password: config.user.email_password, // Email password from YAML
    host: config.email.host, // IMAP host from YAML
    port: config.email.port, // IMAP port from YAML
    tls: config.email.tls,
    tlsOptions: {
      rejectUnauthorized: config.email.rejectUnauthorized, // TLS options from YAML
    },
  };

  // Initialize page objects
  const login = new Login(page);
  const verifier = new Email(emailConfig, 15000); // Pass emailConfig with timeout
  const transaction = new Transaction(page);
  const home = new HomePage(page);
  const portfolio = new PortfolioPage(page);

  try {
    // Step 1: Navigate to login page and perform login
    await page.goto(config.app.url); // Use app URL from YAML
    await login.loginToSite(config.user.username, config.user.password); // Pass username and password from YAML
    console.log('Login completed. Waiting for email...');

    // Step 2: Fetch the email and get the verification link
    const verificationLink = await verifier.getVerificationLink();
    if (!verificationLink) {
      console.error('Verification link not found');
      return; // Early exit if the link is not found
    }
    console.log('Found verification link:', verificationLink);

    // Step 3: Navigate to the verification URL in the same browser window
    const verificationTab = await page.context().newPage(); // Create a new tab (new page)
    await verificationTab.goto(verificationLink); // Navigate to the verification URL in the new tab
    console.log('Verification link opened in a new tab.');
    await verificationTab.waitForTimeout(3000); // Pause for verification
    await verificationTab.close(); // Close the new tab
    console.log('Verification tab closed after verification link was accessed.');
    await home.check2FAPage();

    // Step 4: Continue with the rest of your test
    await home.navigateToTransactions();
    const bal = await transaction.verifyTransactions();

    // Step 5: Navigate to portfolio and verify portfolio balance is correct
    await home.navigateToPortfolio();
    await portfolio.validatePortfolioBalance(bal);
  } catch (error) {
    console.error('Test failed:', error);
    throw error; // Rethrow to fail the test
  } finally {
    // Teardown: Clean up resources
    console.log('Teardown: Cleaning up resources...');
    if (verifier && verifier.imap) {
      verifier.imap.end(); // Close the IMAP connection
      console.log('IMAP connection closed.');
    }
  }
});

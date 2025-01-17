# Playwright Automated Test Setup

This project uses Playwright to run automated end-to-end tests. It includes functionality to log in to an application, verify an email link (opened in a new tab), and check portfolio balance information.

## Prerequisites

Before running the tests, ensure you have the following installed on your local machine:

1. **Node.js** (v16 or later)** - To install [Node.js](https://nodejs.org/).
2. **Playwright** - For end-to-end browser automation.
3. **IMAP-Compatible Email Account** - You'll need a valid email account configured with IMAP access to fetch the email verification link.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

Install project dependencies:

npm install

Ensure your IMAP server credentials and app URL are configured in the config.yaml file. If the config.yaml file does not exist, create one based on the template below:
Example config.yaml

app:
  url: 'https://your-app.com'

user:
  username: 'your-username'
  password: 'your-password'
  email: 'your-email@example.com'
  email_password: 'your-email-password'

email:
  host: 'imap.gmail.com'   # Change based on your email provider
  port: 993                # IMAP port for secure connection
  tls: true                # Use TLS encryption
  rejectUnauthorized: false # Set to true if using secure connections

Ensure Playwright browsers are installed:

    npx playwright install

Test Structure

    Tests Directory: All Playwright test scripts are located in the tests/ directory.
        BalanceTest.spec.js: Main test file that logs in, fetches the email verification link, and checks the portfolio balance.

    Pages Directory: This contains classes that represent individual pages and actions in the application.
        loginpage.js: Login functionality.
        emaillogic.js: Logic to fetch and verify the email containing the verification link.
        transactionpage.js: Handles transaction-related actions.
        homepage.js: Handles the homepage navigation and interactions.
        portfoliopage.js: Handles the portfolio page validation.

Running the Tests

To run the tests, use the Playwright test runner with the following command:

    npx playwright test

Running a Specific Test

If you'd like to run a specific test file, use the --test flag:

    npx playwright test tests/BalanceTest.spec.js

Running the Tests in Headless Mode

By default, Playwright runs tests in headless mode (without launching a visible browser). You can override this by setting the headless option to false in your test configuration file (playwright.config.js) under the use section.

    use: {
      headless: false,  // Set to false to run with a visible browser
    }

Configuration Details

    Email Configuration:
        The email credentials (user email, password) and IMAP settings are specified in config.yaml.
        This information is used to connect to your email account and fetch the verification link for the login process.
        When using the email password for sites that use 2FA (Gmail, Outlook, etc.), you will need to set up an Application 

    Test Timeout:
        The timeout before fetching the email verification link is set to 15 seconds by default (15000 ms). You can adjust this by passing a different value to the EmailLinkVerifier class.
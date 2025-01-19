# Playwright Automated Test Setup

This project uses Playwright to run automated end-to-end tests. It includes functionality to log in to an application, verify an email link (opened in a new tab), and check portfolio balance information.

## Prerequisites

Before running the tests, ensure you have the following installed on your local machine:

- **Node.js (v16 or later)** - To install Node.js.
- **Playwright** - For end-to-end browser automation. Install it with:
  ```bash
  npm install playwright
  ```
- **IMAP-Compatible Email Account** - You'll need a valid email account configured with IMAP access to fetch the email verification link.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Ensure your IMAP server credentials, app URL, and site login information are configured in the `config.yaml` file. If the `config.yaml` file does not exist, create one based on the template below:

   ### Example `config.yaml`
   ```yaml
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
   ```

4. Ensure Playwright browsers are installed:
   ```bash
   npx playwright install
   ```

## Test Structure

### Tests Directory
All Playwright test scripts are located in the `tests/` directory.

- **BalanceTest.spec.js**: Main test file that logs in, fetches the email verification link, and checks the portfolio balance.

### Pages Directory
This contains classes that represent individual pages and actions in the application.

- **loginpage.js**: Login functionality.
- **emaillogic.js**: Logic to fetch and verify the email containing the verification link.
- **transactionpage.js**: Handles transaction-related actions.
- **homepage.js**: Handles the homepage navigation and interactions.
- **portfoliopage.js**: Handles the portfolio page validation.

## Running the Tests
**Note:** These tests need to be run one project at a time (e.g., chromium, firefox, or webkit). Running all projects simultaneously is not supported in this setup.

To run the tests, use the Playwright test runner with the following command:
```bash
npx playwright test
```

### Running a Specific Test

If you'd like to run a specific test file, use the `--test` flag:
```bash
npx playwright test tests/BalanceTest.spec.js
```

### Running the Tests for a Specific Browser
You can run tests for a specific browser using the `--project` flag:
```bash
npx playwright test tests/BalanceTest.spec.js --project=chromium
```
Replace `chromium` with `firefox` or `webkit` to test on those browsers.

### Running the Tests in Headed Mode
By default, Playwright runs tests in headless mode (without launching a visible browser). To run in headed mode:
```bash
npx playwright test tests/BalanceTest.spec.js --headed
```

## Configuration Details

### Email Configuration
- The email credentials (user email, password) and IMAP settings are specified in `config.yaml`.
- This information is used to connect to your email account and fetch the verification link for the login process.
- When using email passwords for accounts with two-factor authentication (e.g., Gmail, Outlook), you will need to set up an [Application Password](https://support.google.com/accounts/answer/185833?hl=en).

### Test Timeout
- The timeout before fetching the email verification link is set to **15 seconds** by default (15000 ms). You can adjust this by passing a different value to the `EmailLinkVerifier` class.

### Browser Arguments
- The `--disable-blink-features=AutomationControlled` flag is added to reduce detection of automated browser sessions by websites. This is configured in `playwright.config.js` under the `args` property for each browser project.

### Debugging Tips
- Use the `trace` option to collect traces for failed tests:
  ```js
  trace: 'on-first-retry'
  ```
- Traces can be opened in the Playwright Trace Viewer for detailed debugging.

### Dependency Management
- Make sure to run `npx playwright install` after cloning the repository to ensure that the required browser binaries are installed.

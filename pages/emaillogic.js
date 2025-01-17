/*
*****NOTE**** This was mostly generated using ChatGPT to save some time during this project. The idea of using IMAP was purely my idea, but I needed some help creating this file to stay within the needed time for this project.
In an ideal world I wouldn't go through the process of using IMAP and I would use a third party email verification, but I didn't want to spend the time setting that up for this.
*/

const Imap = require('imap');
const { inspect } = require('util');

class EmailLinkVerifier {
  constructor(emailConfig, delayBeforeFetching = 15000) {
    this.emailConfig = emailConfig;
    this.delayBeforeFetching = delayBeforeFetching; // Delay in milliseconds
    this.imap = new Imap(emailConfig);
  }

  // Helper method to delay fetching email
  async delayBeforeFetchingEmail() {
    console.log(`Waiting ${this.delayBeforeFetching / 1000} seconds before checking for the email...`);
    return new Promise((resolve) => setTimeout(resolve, this.delayBeforeFetching)); // Delay here
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', resolve);
      this.imap.once('error', reject);
      this.imap.connect();
    });
  }

  openInbox() {
    return new Promise((resolve, reject) => {
      this.imap.openBox('INBOX', false, (err, box) => {
        if (err) reject(err);
        else resolve(box);
      });
    });
  }

  fetchLatestEmail(subjectFilter) {
    return new Promise((resolve, reject) => {
      const searchCriteria = ['UNSEEN'];
  
      // Add subject filter if provided
      if (subjectFilter) {
        searchCriteria.push(['HEADER', 'SUBJECT', subjectFilter]);
      }
  
      this.imap.search(searchCriteria, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
  
        if (!results || results.length === 0) {
          console.log('No new emails found matching the criteria.');
          resolve(null);
          return;
        }
  
        const fetch = this.imap.fetch(results.slice(-1), { bodies: '' });
        fetch.on('message', (msg) => {
          let emailBody = '';
  
          msg.on('body', (stream) => {
            stream.on('data', (chunk) => {
              emailBody += chunk.toString('utf8');
            });
          });
  
          msg.once('end', () => {
            resolve(emailBody);
          });
        });
  
        fetch.once('error', (err) => {
          reject(err);
        });
  
        fetch.once('end', () => {
          console.log('Done fetching all messages!');
        });
      });
    });
  }

  extractLink(emailBody) {
    const linkRegex = /https?:\/\/[^\s"]+/g;
    const links = emailBody.match(linkRegex);
    if (links && links.length > 0) {
      console.log('Extracted link:', links[0]);
      return links[0]; // Return the first link
    }
    console.log('No links found in the email body');
    return null;
  }

  async getVerificationLink(subjectFilter = "A new device is trying to sign in") {
    await this.delayBeforeFetchingEmail(); // Add delay

    try {
      await this.connect();
      console.log('Connected to IMAP server.');

      await this.openInbox();
      console.log('Inbox opened.');

      const emailBody = await this.fetchLatestEmail(subjectFilter);
      if (!emailBody) {
        console.log('No email found.');
        return null;
      }

      return this.extractLink(emailBody); // Return the extracted link
    } catch (error) {
      console.error('Error processing email:', error);
      return null;
    } finally {
      this.imap.end();
    }
  }

  async verifyLink(link) {
    if (!link) {
      console.log('No link to verify.');
      return;
    }

    const browser = await require('playwright').chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(link);
      console.log('Navigated to link successfully:', link);

      // Add your verification logic here (example below)
      const isTextVisible = await page.isVisible('text=Expected Text'); // Modify this selector as needed
      console.log('Is expected text visible?', isTextVisible);
    } catch (error) {
      console.error('Error navigating to the link:', error);
    } finally {
      await browser.close();
    }
  }
}

module.exports = EmailLinkVerifier;



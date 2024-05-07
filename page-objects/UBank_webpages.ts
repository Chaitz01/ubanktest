import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly uBankLogo: Locator;
  readonly findMoreButton: Locator;
  readonly everyDayMoneyMenu: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uBankLogo = page.getByRole("banner").getByLabel("Return to homepage");
    this.findMoreButton = page
      .locator("pw-banner")
      .getByRole("link", { name: "Find out more" });
    this.everyDayMoneyMenu = page.getByRole("link", { name: "Everyday money" });
    this.contactUsLink = page.getByRole("link", { name: "Get help" });
  }

  async navigateTo() {
    await this.page.goto("/");
    await this.uBankLogo.click();
    await expect(this.uBankLogo).toBeVisible();
  }

  async navigateToSavingsAccount() {
    await this.findMoreButton.click();
    await expect(this.page).toHaveURL(/.*savings-account/);
  }

  async navigateToContactUs() {
    await this.contactUsLink.click();
    await expect(this.page).toHaveURL(/.*contact-us/);
  }
}

export class ContactUsPage {
  readonly page: Page;
  readonly sendMessageButton: Locator;
  readonly emailField: Locator;
  readonly mobileNumberField: Locator;
  readonly helpDropdown: Locator;
  readonly enquiryDropdown: Locator;
  readonly moreInfoField: Locator;
  readonly submitButton: Locator;
  readonly thankYouMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sendMessageButton = page.getByLabel("Send us a message");
    this.emailField = page.getByText(" What's your email?");
    this.mobileNumberField = page.getByText(" What's your mobile number?");
    this.helpDropdown = page.getByLabel("What can we help you with?");
    this.enquiryDropdown = page.getByLabel(
      " Let us know what your enquiry most closely relates to"
    );
    this.moreInfoField = page.getByText(
      " Tell us a bit more and make sure to let us know the best way to contact you"
    );
    this.submitButton = page.locator(
      '[sp-automation-id="sp-form-submit-button"]'
    );
    this.thankYouMessage = page.locator(
      '[sp-automation-id="info-box-message"]'
    );
  }
}

import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en";

test.beforeEach(async ({ page }) => {
  // Navigate to the UBank Website(desktop) HomePage - BaseURL set in Playwright config file
  await page.goto("/");
});

test.describe("UBank website tests", () => {
  // Homepage load logo assertion
  test("Navigate to UBankHomePage & check for the bank logo", async ({
    page,
  }) => {
    // Check for the elements on UBankHomePage
    const uBankLogo = page.getByRole("banner").getByLabel("Return to homepage");
    await uBankLogo.click();
    await expect(uBankLogo).toBeVisible();
  });

  // Page Navigation via link in the Homepage
  test("Page navigation - via 'Find out more' button on HomePage", async ({
    page,
  }) => {
    // Navigation Test
    const findMoreButton = page.locator("pw-banner").getByRole("link", {
      name: "Find out more",
    });
    await findMoreButton.click();
    await expect(page).toHaveURL(/.*savings-account/);
  });

  test("Home Page Mega menu - 'Everyday Money' - Lists and dropwdowns", async ({
    page,
  }) => {
    // select list/dropdown & click
    const everyDayMoneyMenuOpen = page.getByRole("link", {
      name: "Everyday money",
    });
    const everyDayMoneyMenuClose = page.getByRole("link", {
      name: "Everyday money",
    });
    await everyDayMoneyMenuOpen.click();

    // Selectors for 'Everyday money' Hero menu items
    const everydayMoneyText = page.locator(".pw-nav__heading", {
      hasText: "Everyday money",
    });
    const everydayMoneyLink = page.locator("a", {
      hasText: "Explore ubank everyday",
    });
    const transactionAccountLink = page.locator(
      '[pw-automation-id="pw-nav-header-link-1-column-2-link-1"]'
    );
    const billsAccountLink = page.locator(
      '[pw-automation-id="pw-nav-header-link-1-column-2-link-2"]'
    );
    const savingsAccountLink = page.locator(
      '[pw-automation-id="pw-nav-header-link-1-column-2-link-3"]'
    );
    const sharedAccountsLink = page.locator(
      '[pw-automation-id="pw-nav-header-link-1-column-2-link-4"]'
    );

    // Assertions below to ensure each link in the Every day money Mega menu is visible, their corresponding URLs and contains relevant text
    // Menu item 1: 'Explore ubank everyday' - link
    await expect(everydayMoneyText).toBeVisible();
    await expect(everydayMoneyLink).toBeVisible();
    await expect(everydayMoneyLink).toHaveAttribute("href", "/banking");

    // Menu item 2: 'Spend with confidence' - link
    await expect(transactionAccountLink).toBeVisible();
    await expect(transactionAccountLink).toContainText("Spend with confidence");
    await expect(transactionAccountLink).toHaveAttribute(
      "href",
      "/banking/transaction-account"
    );

    // Menu item 3: 'A seperate place for bills' - link
    await expect(billsAccountLink).toBeVisible();
    await expect(billsAccountLink).toContainText("A separate place for bills");
    await expect(billsAccountLink).toHaveAttribute(
      "href",
      "/banking/bills-account"
    );

    // Menu item 4: 'Become a successful saver' - link
    await expect(savingsAccountLink).toBeVisible();
    await expect(savingsAccountLink).toContainText("Become a successful saver");
    await expect(savingsAccountLink).toHaveAttribute(
      "href",
      "/banking/savings-account"
    );

    // Menu item 5: 'Share your finances' - link
    await expect(sharedAccountsLink).toBeVisible();
    await expect(sharedAccountsLink).toContainText("Share your finances");
    await expect(sharedAccountsLink).toHaveAttribute(
      "href",
      "/banking/shared-accounts"
    );
    await everyDayMoneyMenuClose.click();
  });

  test("Submit Contact Us Form on the UBank website", async ({ page }) => {
    // Navigate to the Contact Us page
    const getHelpMenu = page.getByRole("link", { name: "Get help" });
    await getHelpMenu.click();

    const contactUsPageLink = page.locator(
      '[pw-automation-id="pw-nav-header-link-5-column-2-link-2"]'
    );
    await contactUsPageLink.click();
    await expect(page.locator("h1")).toContainText("Contact us");
    await expect(page).toHaveURL(/.*contact-us/);

    // Click on 'SendUsMessage' button on ContactUs page to open the form and submit
    const sendUsMessage = page.getByLabel("Send us a message");
    const sendUsMessagePageText = page.getByText("Get in touch about current");
    await sendUsMessage.click();

    // Check that the 'Send us a message' page is displayed
    await expect(sendUsMessagePageText).toBeVisible();
    await expect(page).toHaveURL(/.*send-a-message/);
    await expect(page.getByText("Shoot us a message")).toBeVisible();
    await expect(page.getByText(" What's your email?")).toBeVisible();
    await expect(page.getByText("What's your mobile number?")).toBeVisible();

    // Select drop down in the form
    const fillEmailFieldForm = page.getByText(" What's your email?");
    const fillMobileNumberFieldForm = page.getByText(
      " What's your mobile number?"
    );
    const formSelectDropDown = page.getByLabel("What can we help you with?");
    const enquirySelectDropDown = page.getByLabel(
      " Let us know what your enquiry most closely relates to"
    );

    const tellUsBitMoreTextField = page.getByText(
      " Tell us a bit more and make sure to let us know the best way to contact you"
    );

    // Options selector on both dropdowns
    const selectListOptions = page.locator(
      '[pw-automation-id="pw-form-section-web-select-option"]'
    );

    const enquirySelectListOptions = page.locator(
      '[pw-automation-id="pw-form-section-web-select-option"]'
    );

    // Generate fake test data
    const email = faker.internet.email();
    // const mobileNumber = faker.phone.area("041111111121-###-###");
    const randomSentence = faker.lorem.sentence();
    const mobileNumber =
      "04" + faker.datatype.number({ min: 10000000, max: 99999999 });
    console.log(mobileNumber);

    await fillEmailFieldForm.fill(email);
    await fillMobileNumberFieldForm.fill(mobileNumber);

    // select a list item and click - 1st dropwdown in the form
    await formSelectDropDown.click();
    await selectListOptions.filter({ hasText: " General Enquiry" }).click();

    // select a list item and click - 2nd dropdown in the form
    await enquirySelectDropDown.click();
    await enquirySelectListOptions.filter({ hasText: " Home Loans " }).click();

    await tellUsBitMoreTextField.fill(randomSentence);

    await page.locator('[sp-automation-id="sp-form-submit-button"]').click();

    const thankYouMessageAfterFormSubmit = page.locator(
      '[sp-automation-id="info-box-message"]'
    );

    await expect(thankYouMessageAfterFormSubmit).toBeVisible();
  });
});

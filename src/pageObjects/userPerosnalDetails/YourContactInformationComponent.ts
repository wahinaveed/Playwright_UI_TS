import { Locator, Page } from "@playwright/test";
import { PlaywrightWrapper } from "../../utilities/wrappers/playwrightWrapper";
import { faker } from "@faker-js/faker";
import { UserDetails } from "../../pageVerifications/YourContactInformationVerification";

export class YourContactInformationComponent extends PlaywrightWrapper {
  page: Page;
  civilityRadioButton: Locator;
  firstName: Locator;
  lastName: Locator;
  dateOfBirth: Locator;
  mailId: Locator;
  mobileNum: Locator;
  saveAndContinueButton: Locator;

  constructor(page: Page) {
    super();
    this.page = page;
    this.civilityRadioButton = page.locator("label[for='MR']");
    this.firstName = page.locator(`#fieldControl-input-firstName`);
    this.lastName = page.locator(`#fieldControl-input-lastName`);
    this.dateOfBirth = page.locator(`#fieldControl-input-dateOfBirth`);
    this.mailId = page.locator("#fieldControl-input-email");
    this.mobileNum = page.locator(`#fieldControl-input-mobilePhoneNumber`);
    this.saveAndContinueButton = page.getByRole("button", {
      name: "Sauvegarder et Continuer",
    });
  }

  async fillContactInformation(userDetails: UserDetails): Promise<void> {
    await this.civilityRadioButton.check({ force: true });
    await this.clearAndSendText(
      this.firstName,
      userDetails.firstName,
      "first name"
    );
    await this.clearAndSendText(
      this.lastName,
      userDetails.lastName,
      "last name"
    );
    await this.clearAndSendText(
      this.dateOfBirth,
      userDetails.dateOfBirth,
      "date of birth"
    );
    await this.clearAndSendText(this.mailId, userDetails.email, "Mail Id");
    await this.clearAndSendText(
      this.mobileNum,
      userDetails.mobileNumber,
      "Mobile number"
    );
    await this.clickElement(this.saveAndContinueButton, "save and continue");
    await this.sleep("low");
  }
}

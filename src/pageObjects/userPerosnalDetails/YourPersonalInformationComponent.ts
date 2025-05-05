import { expect, Locator, Page } from "@playwright/test";
import { PlaywrightWrapper } from "../../utilities/wrappers/playwrightWrapper";

export class CardsDescriptionPage extends PlaywrightWrapper {
  page: Page;
  birthNameCheckBox: Locator;
  placeOfBirthTextbox: Locator;
  birthDepartmentDropDown: Locator;
  countryOfBirthDropDown: Locator;
  nationalityDropDown: Locator;
  streetNameTextbox: Locator;
  postalCodeTextBox: Locator;
  cityTextBox: Locator;
  presidentialStatusTextBox: Locator;




  constructor(page: Page) {
    super();
    this.page = page;
    this.civilityRadioButton = page.locator(``)
    this.fisrtName = page.locator(``)
    this.name = page.locator(``)
    this.dateOfBirth = page.locator(``)
    this.mailId = page.locator(``)
    this.mobileNum = page.locator(``)
    this.saveAndContinueButton = page.locator(``)

  }

  async fillContactInformation(): Promise<boolean | null> {
    return await this.isElementVisible(this.requestYourCardButton, "Request Your Card Button");
  }

  async clickRequestYourCardButton(): Promise<void> {
    await this.clickElement(this.requestYourCardButton, 'Request Your Card')
  }

}
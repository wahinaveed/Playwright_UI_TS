import { expect, Locator, Page } from "@playwright/test";
import { PlaywrightWrapper } from "../../utilities/wrappers/playwrightWrapper";
import { faker } from '@faker-js/faker';

export class YourContactInformationComponent extends PlaywrightWrapper {
  page: Page;
  civilityRadioButton: Locator;
  fisrtName: Locator;
  lastName: Locator;
  dateOfBirth: Locator;
  mailId: Locator;
  mobileNum: Locator;
  saveAndContinueButton: Locator;


  constructor(page: Page) {
    super();
    this.page = page;
    this.civilityRadioButton = page.locator('input#MR')
    this.fisrtName = page.locator(`#fieldControl-input-firstName`)
    this.lastName = page.locator(`#fieldControl-input-lastName`)
    this.dateOfBirth = page.locator(`fieldControl-input-dateOfBirth`)
    this.mailId = page.locator('#fieldControl-input-email')
    this.mobileNum = page.locator(`#fieldControl-input-mobilePhoneNumber`)
    this.saveAndContinueButton = page.getByRole('button', { name: 'Sauvegarder et Continuer' })

  }

  async fillContactInformation(): Promise<void> {
    const dobFormatted = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
      .toLocaleDateString('en-GB');
      //await this.civilityRadioButton.check({ force: true });
   // await this.clickElement(this.civilityRadioButton, 'Civility Radio Button')
    await this.clearAndSendText(this.fisrtName, faker.person.firstName(), 'first name')
    await this.clearAndSendText(this.lastName, faker.person.lastName(), 'last name')
    await this.clearAndSendText(this.dateOfBirth, dobFormatted, 'date of birth')
    await this.clearAndSendText(this.mailId, faker.internet.email(), 'Mail Id')
    await this.clearAndSendText(this.mobileNum, faker.string.numeric('6 ## ## ## ##'), 'Mobile number')
    await this.clickElement(this.saveAndContinueButton, 'save and continue')

  }

}
import { expect, Locator, Page } from "@playwright/test";
import { PlaywrightWrapper } from "../utilities/wrappers/playwrightWrapper";

export class CardsDescriptionPage extends PlaywrightWrapper {
  page: Page;
  requestYourCardButton: Locator;


  constructor(page: Page) {
    super();
    this.page = page;
    this.requestYourCardButton = page.locator(`a[href*='GoldCardAmericanExpress-btm']`)
  }

  async isRequestYourCardButtonVisible(): Promise<boolean | null> {
    return await this.isElementVisible(this.requestYourCardButton, "Request Your Card Button");
  }

  async clickRequestYourCardButton(): Promise<void> {
    await this.clickElement(this.requestYourCardButton, 'Request Your Card')
  }

}
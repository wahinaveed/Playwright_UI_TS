import { expect, Locator, Page } from "@playwright/test";
import { PlaywrightWrapper } from "../utilities/wrappers/playwrightWrapper";

export class AllCardsPage extends PlaywrightWrapper {
  page: Page;
  headerTitle: Locator;
  

  constructor(page: Page) {
    super();
    this.page = page;
    this.headerTitle = page.getByText('Les Cartes American Express®', { exact: false });
  
  
  }

  async getHeaderTitle(): Promise<string | null> {
    return await this.getElementValue(this.headerTitle, "text");
  }

  async clickLearnMoreButton(cardType: string): Promise<void> {
    const learnMoreButton = this.page.locator(`//a[contains(@href, '${cardType}') and @alt='En savoir plus']`)
    await this.clickElement(learnMoreButton, 'Learn More')
  }
}
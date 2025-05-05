import { Locator, Page } from "@playwright/test";
import { PlaywrightWrapper } from "../utilities/wrappers/playwrightWrapper";

export class HomePage extends PlaywrightWrapper {
  tcAcceptButton: Locator;
  page: Page;
  cardsLink: Locator;
  americanExpressCardsLink: Locator;

  constructor(page: Page) {
    super();
    this.page = page;
    this.tcAcceptButton = page.locator('#user-consent-management-granular-banner-accept-all-button')
    this.cardsLink = page.locator('#label-tab-open-cards');
    this.americanExpressCardsLink = page.locator('div:has-text("Cartes Particuliers") a[href*="fr_menu_cards_pccards"]')
  }

  async clickTermsAndConditions(): Promise<void> {
    if (await this.isElementVisible(this.tcAcceptButton, 'Terms And Conditions'))
      await this.clickElement(this.tcAcceptButton, 'Terms And Conditions')
  }

  async clickCardsLink(): Promise<void> {
    await this.clickElement(this.cardsLink, 'Cards')
  }

  async clickAmericanExpressCardsLink(): Promise<void> {
    await this.clickFirstElement(this.americanExpressCardsLink, 'American Express Cards')
  }

 
}

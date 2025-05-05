import { expect, Page } from "@playwright/test";
import { PageManager } from "../pageManager/pageManager";

let pageManager: PageManager = PageManager.getInstance();

export class HomePageVerification {

  async acceptTermsAndConditions(): Promise<void> {
    await pageManager
      .getHomePage()
      .clickTermsAndConditions();
  }

  async navigateToCardsLink(): Promise<void> {
    await pageManager
      .getHomePage()
      .clickCardsLink();
  }

  async navigateToAmericanExpressCardsLink(): Promise<void> {
    await pageManager
      .getHomePage()
      .clickAmericanExpressCardsLink();
  }

}

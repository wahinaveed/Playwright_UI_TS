import { expect } from "@playwright/test";
import { PageManager } from "../pageManager/pageManager";

let pageManager: PageManager = PageManager.getInstance();

export class AllCardsPageVerification {
  async verify_cards_links_navigation(): Promise<void> {
    const actualMessage = await pageManager.getAllCardsPage().getHeaderTitle();
    if (actualMessage !== null) {
      expect(actualMessage.replace(/\u00A0/g, " ")).toBe(
        "Les Cartes American Express® "
      );
    }
  }

  async navigateToCardDescriptionPage(
    cardType: "gold" | "blue" | "platinum"
  ): Promise<void> {
    await pageManager.getAllCardsPage().clickLearnMoreButton(cardType);
  }
}

import { expect } from "@playwright/test";
import { PageManager } from "../pageManager/pageManager";

let pageManager: PageManager = PageManager.getInstance();

export class CardsDescriptionPageVerification {
  async verifyRequestYourCardButton(): Promise<void> {
    const isButtonVisible = await pageManager
      .getCardsDescriptionPage()
      .isRequestYourCardButtonVisible();
    if (isButtonVisible !== null) {
      expect(
        isButtonVisible,
        "Request Your Button is not present"
      ).toBeTruthy();
    }
  }

  async navigateToCardDetailsApplyPage(): Promise<void> {
    await pageManager.getCardsDescriptionPage().clickRequestYourCardButton();
  }
}

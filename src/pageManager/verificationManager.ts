import { Page } from "@playwright/test";
import { YourContactInformationVerification } from "../pageVerifications/YourContactInformationVerification";
import { HomePageVerification } from "../pageVerifications/HomePageVerification";
import { AllCardsPageVerification } from "../pageVerifications/AllCardsPageVerification";
import { CardsDescriptionPageVerification } from "../pageVerifications/CardsDescriptionPageVerification"

export class VerificationManager {
  private static instance: VerificationManager;
  private homePageVerification: HomePageVerification | undefined;
  private allCardsPageVerification: AllCardsPageVerification | undefined;
  private cardsDescriptionPageVerification:
    | CardsDescriptionPageVerification
    | undefined;
  private yourContactInformationVerification:
    | YourContactInformationVerification
    | undefined;

  private page: Page | undefined;

  public static getInstance(): VerificationManager {
    if (!VerificationManager.instance) {
      VerificationManager.instance = new VerificationManager();
    }
    return VerificationManager.instance;
  }

  getHomePageVerification(): HomePageVerification {
    if (!this.homePageVerification) {
      this.homePageVerification = new HomePageVerification();
    }
    return this.homePageVerification;
  }

  getAllCardsPageVerification(): AllCardsPageVerification {
    if (!this.allCardsPageVerification) {
      this.allCardsPageVerification = new AllCardsPageVerification();
    }
    return this.allCardsPageVerification;
  }

  getCardsDescriptionPageVerification(): CardsDescriptionPageVerification {
    if (!this.cardsDescriptionPageVerification) {
      this.cardsDescriptionPageVerification =
        new CardsDescriptionPageVerification();
    }
    return this.cardsDescriptionPageVerification;
  }

  getYourContactInformationVerification(): YourContactInformationVerification {
    if (!this.yourContactInformationVerification) {
      this.yourContactInformationVerification =
        new YourContactInformationVerification();
    }
    return this.yourContactInformationVerification;
  }
}

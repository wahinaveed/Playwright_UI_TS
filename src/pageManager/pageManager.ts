import { Page } from "@playwright/test";
import { HomePage } from "../pageObjects/HomePage";
import { AllCardsPage } from "../pageObjects/AllCardsPage";
import { CardsDescriptionPage } from "../pageObjects/CardsDescriptionPage";
import { YourContactInformationVerification } from "../pageVerifications/YourContactInformationVerification";
import { YourContactInformationComponent } from "../pageObjects/userPerosnalDetails/YourContactInformationComponent";

export class PageManager {
  private static instance: PageManager;
  private homePage: HomePage | undefined;
  private allCardsPage: AllCardsPage | undefined;
  private cardsDescriptionPage: CardsDescriptionPage | undefined;
  private yourContactInformationComponent:
    | YourContactInformationComponent
    | undefined;

  private page: Page | undefined;

  public static getInstance(): PageManager {
    if (!PageManager.instance) {
      PageManager.instance = new PageManager();
    }
    return PageManager.instance;
  }

  // Setter method to store the page object
  public setPage(page: Page): void {
    this.page = page;
    console.log("Page is created in pageManager.ts");
    if (!this.page) {
      throw new Error("Page is not set. Please set the page first.");
    }
  }

  // Getter method to retrieve the page object
  public getPage(): Page {
    if (!this.page) {
      throw new Error("Page is not set. Please set the page first.");
    }
    return this.page;
  }

  getHomePage(): HomePage {
    if (!this.homePage) {
      this.homePage = new HomePage(this.getPage());
    }
    return this.homePage;
  }

  getAllCardsPage(): AllCardsPage {
    if (!this.allCardsPage) {
      this.allCardsPage = new AllCardsPage(this.getPage());
    }
    return this.allCardsPage;
  }

  getCardsDescriptionPage(): CardsDescriptionPage {
    if (!this.cardsDescriptionPage) {
      this.cardsDescriptionPage = new CardsDescriptionPage(this.getPage());
    }
    return this.cardsDescriptionPage;
  }

  getYourContactInformationPage(): YourContactInformationComponent {
    if (!this.yourContactInformationComponent) {
      this.yourContactInformationComponent =
        new YourContactInformationComponent(this.getPage());
    }
    return this.yourContactInformationComponent;
  }
}

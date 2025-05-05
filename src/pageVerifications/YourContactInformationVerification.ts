import { expect } from "@playwright/test";
import { PageManager } from "../pageManager/pageManager";

let pageManager: PageManager = PageManager.getInstance();

export class YourContactInformationVerification {

  async provideContactDetails(): Promise<void> {
    await pageManager
      .getYourContactInformationPage()
      .fillContactInformation();
  }
}

exports.mdul

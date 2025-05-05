import { BrowserContext, expect, Page, test } from "@playwright/test";
import { PageManager } from "../pageManager/pageManager";
import Logger from "../utilities/logger/reportLogger";
import { PlaywrightWrapper } from "../utilities/wrappers/playwrightWrapper";
import { setupTest } from "../testHelpers/testSetup";
import { VerificationManager } from "../pageManager/verificationManager";

let pageManager: PageManager;
let verificationManager: VerificationManager;

let playwrightWrapper: PlaywrightWrapper;
const logger = Logger.getInstance();
let webContext: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }, testInfo) => {
  const setup = await setupTest(
    process.env.HOME_PAGE_URL!,
    "Home Page",
    browser,
    testInfo
  );
  pageManager = setup.pageManager;
  playwrightWrapper = setup.playwrightWrapper;
  webContext = setup.webContext;
  page = setup.page;
  logger.logMessage(" -------- Test Started -------", "info");
});

test.describe("American Express - All pages sanity tests", () => {
  test.only("@Regression User navigates through Home, All Cards, and User Details pages and submits valid user information'", async ({}) => {
    verificationManager = new VerificationManager();

    await verificationManager
      .getHomePageVerification()
      .acceptTermsAndConditions();
    await verificationManager.getHomePageVerification().navigateToCardsLink();
    await verificationManager
      .getHomePageVerification()
      .navigateToAmericanExpressCardsLink();
    await verificationManager
      .getHomePageVerification()
      .acceptTermsAndConditions();

    await verificationManager
      .getAllCardsPageVerification()
      .verify_cards_links_navigation();
    await verificationManager
      .getAllCardsPageVerification()
      .navigateToCardDescriptionPage("gold");

    await verificationManager
      .getCardsDescriptionPageVerification()
      .verifyRequestYourCardButton();
    await verificationManager
      .getCardsDescriptionPageVerification()
      .navigateToCardDetailsApplyPage();

    await verificationManager
      .getYourContactInformationVerification()
      .provideContactDetails();

    logger.logMessage(" -------- Test Completed -------", "info");
  });
});

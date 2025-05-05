import { BrowserContext, expect, Page, test } from "@playwright/test";
import { PageManager } from "../pageManager/pageManager";
import Logger from "../utilities/logger/reportLogger";
import { HomePageVerification } from "../pageVerifications/HomePageVerification";
import { PlaywrightWrapper } from "../utilities/wrappers/playwrightWrapper";
import { setupTest } from "../testHelpers/testSetup";
import { AllCardsPageVerification } from "../pageVerifications/AllCardsPageVerification";
import { CardsDescriptionPageVerification } from "../pageVerifications/CardsDescriptionPageVerification";
import { YourContactInformationVerification } from "../pageVerifications/YourContactInformationVerification";
import { VerificationManager } from "../pageManager/verificationManager";

let pageManager: PageManager;
let verificationManager: VerificationManager;
let homePageVerification: HomePageVerification;
let allCardsPageVerification: AllCardsPageVerification;
let cardsDescriptionPageVerification: CardsDescriptionPageVerification
let yourContactInformationVerification: YourContactInformationVerification
let playwrightWrapper: PlaywrightWrapper;
const logger = Logger.getInstance();
let webContext: BrowserContext;
let page: Page;

const AMERICAN_EXPRESS_LINK_1 =
  "https://www.americanexpress.com/fr-fr/?inav=NavLogo";


test.beforeAll(async ({ browser }, testInfo) => {
  const setup = await setupTest(process.env.HOME_PAGE_URL!, 'Home Page', browser, testInfo);
  pageManager = setup.pageManager;
  playwrightWrapper = setup.playwrightWrapper;
  webContext = setup.webContext;
  page = setup.page;
  logger.logMessage(" -------- Test Started -------", "info");
});

test.describe("American Express - All pages sanity tests", () => {
  test.only("@Tests Navigate to Home page and verify navigation was successful", async ({ }) => {
    verificationManager = new VerificationManager()

    await verificationManager.getHomePageVerification().acceptTermsAndConditions()
    await verificationManager.getHomePageVerification().navigateToCardsLink();
    await verificationManager.getHomePageVerification().navigateToAmericanExpressCardsLink();
    await verificationManager.getHomePageVerification().acceptTermsAndConditions();

    await verificationManager.getAllCardsPageVerification().verify_cards_links_navigation();
    await verificationManager.getAllCardsPageVerification().navigateToCardDescriptionPage('gold')

    await verificationManager.getCardsDescriptionPageVerification().verifyRequestYourCardButton()
    await verificationManager.getCardsDescriptionPageVerification().navigateToCardDetailsApplyPage()

    await verificationManager.getYourContactInformationVerification().provideContactDetails()

    logger.logMessage(" -------- Test Completed -------", "info");
  });
});

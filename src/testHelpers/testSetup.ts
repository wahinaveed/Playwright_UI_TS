// testSetup.ts
import { Browser, Page, TestInfo } from "@playwright/test";
import { PageManager } from "../pageManager/pageManager";
import { PlaywrightWrapper } from "../utilities//wrappers/playwrightWrapper";
import Logger from "../utilities/logger/reportLogger";

const logger = Logger.getInstance();

export async function setupTest(
  url: string,
  urlDescription: string,
  browser: Browser,
  testInfo: TestInfo
) {
  logger.setTestInfo(testInfo);
  const context = await browser.newContext();
  const page = await context.newPage();

  const pageManager = PageManager.getInstance();
  pageManager.setPage(page);
  const playwrightWrapper = new PlaywrightWrapper();

  await playwrightWrapper.navigateToUrl(url, urlDescription);

  await context.storageState({ path: "SessionState.json" });
  const webContext = await browser.newContext({
    storageState: "SessionState.json",
  });

  return {
    page,
    pageManager,
    playwrightWrapper,
    webContext,
  };
}

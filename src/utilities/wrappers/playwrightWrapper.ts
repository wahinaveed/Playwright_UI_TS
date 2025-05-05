import { expect, Locator, Page } from "@playwright/test";
import Logger from "../logger/reportLogger";
import { PageManager } from "../../pageManager/pageManager";

const logger = Logger.getInstance();
let pageManager: PageManager;

export class PlaywrightWrapper {
  page: Page;

  constructor() {
    pageManager = PageManager.getInstance();
    this.page = pageManager.getPage();
  }

  /**
   * Use this method to manage the wait between actions with sleep
   * @param type The type of wait - allowed : low, medium, high
   * @author
   */
  public async sleep(type: "low" | "medium" | "high") {
    try {
      switch (type) {
        case "low":
          await this.page.waitForTimeout(4000);
          break;
        case "medium":
          await this.page.waitForTimeout(8000);
          break;
        case "high":
          await this.page.waitForTimeout(15000);
          break;
        default:
          await this.page.waitForTimeout(4000);
          break;
      }
    } catch (error: any) { }
  }

  /**
   * Use this method to get specific values from a web element identified by a Playwright Locator.
   * The method supports fetching different types of values, such as text content, input value, tag name, attribute value,
   * @param locator - The Playwright Locator object used to identify the web element on the page.
   * @param type - The type of value to be fetched from the DOM/UI. Supported values are:
   *               - `'text'`: Fetches the text content of the element (including hidden text).
   *               - `'value'`: Fetches the value of an input, textarea, or select element.
   *               - `'tagName'`: Fetches the tag name of the element (e.g., `'H1'`, `'INPUT'`).
   *               - `'attribute'`: Fetches the value of a specific attribute of the element (requires the `attribute` parameter).
   * @param attribute - (Optional) The name of the attribute to fetch when `type` is `'attribute'`
   * @return - The fetched value as a `string` or `null`. If the value cannot be fetched or an error occurs, an empty string (`''`) is returned.
   */
  public async getElementValue(
    locator: Locator,
    type: "text" | "value" | "tagName" | "attribute",
    attribute?: string
  ): Promise<string | null> {
    try {
      switch (type) {
        case "text":
          const textContent = await locator.textContent();
          logger.logMessage(
            `Successfully fetched text content: ${textContent}`,
            "info"
          );
          return textContent;
        case "value":
          const inputValue = await locator.inputValue();
          logger.logMessage(
            `Successfully fetched input value: ${inputValue}`,
            "info"
          );
          return inputValue;
        case "tagName":
          const tagName = await locator.evaluate((el) => el.tagName);
          logger.logMessage(
            `Successfully fetched tag name: ${tagName}`,
            "info"
          );
          return tagName;

        case "attribute":
          if (!attribute) {
            throw new Error('Attribute name is required for type "attribute"');
          }
          const attributeValue = await locator.getAttribute(attribute);
          logger.logMessage(
            `Successfully fetched attribute ${attribute}: ${attributeValue}`,
            "info"
          );
          return attributeValue;
        default:
          throw new Error(`Unsupported type: ${type}`);
      }
    } catch (error: any) {
      // Simple error logging
      logger.logMessage(
        `Error in getElementValue: ${error instanceof Error ? error.message : error
        }`,
        "error"
      );
    }
    return "";
  }

  /**
   * Use this method to wait for and click an element.
   * @param locator The locator to identify the element.
   * @param elementName The name or description of the element (for logging purposes)
   */
  public async clickElement(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    try {
      await locator.scrollIntoViewIfNeeded();
      await locator.first().click();
      await this.page.waitForLoadState('networkidle')
      await logger.logMessage(`The ${elementName} button is clicked`, "info");
    } catch (error: any) {
      const errorMessage = `Failed to click the ${elementName} button. Error: ${error.message}`;
      await logger.logMessage(errorMessage, "error");
      throw new Error(errorMessage);
    }
  }

  /**
   * Use this method to wait for and click the first element.
   * @param locator The locator to identify the element.
   * @param elementName The name or description of the element (for logging purposes)
   */
  public async clickFirstElement(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    try {
      await locator.first().click();
      await this.page.waitForLoadState('networkidle')
      await logger.logMessage(`The ${elementName} button is clicked`, "info");
    } catch (error: any) {
      const errorMessage = `Failed to click the ${elementName} button. Error: ${error.message}`;
      await logger.logMessage(errorMessage, "error");
      throw new Error(errorMessage);
    }
  }

  /**
   * Use this method to check if an element is visible.
   * @param locator The Playwright locator to identify the element.
   * @param elementName The name or description of the element (for logging purposes).
   * @param timeout Optional custom timeout in milliseconds (default is 5000ms).
   * @returns A boolean indicating whether the element is clickable.
   */
  public async isElementVisible(
    locator: Locator,
    elementName: string,
    timeout: number = 5000 // Default timeout of 5 seconds
  ): Promise<boolean> {
    try {
      await locator.waitFor({ state: "visible", timeout });
      await logger.logMessage(`The ${elementName} is visible`, "info");
      return true;
    } catch (error: any) {

    }
    return false;
  }

  /**
   * Use this method to clear an input field and type text into it.
   * @param locator The Playwright locator to identify the input field.
   * @param text The text to type into the input field.
   * @param elementName The name or description of the element (for logging purposes).
   */
  public async clearAndSendText(
    locator: Locator,
    text: string,
    elementName: string
  ): Promise<void> {
    try {
      await locator.clear();
      await locator.fill(text);
      await logger.logMessage(
        `Typed "${text}" into the ${elementName} input field`,
        "info"
      );
    } catch (error: any) {
      const errorMessage = `Failed to type "${text}" into the ${elementName} input field. Error: ${error.message}`;
      await logger.logMessage(errorMessage, "error");
      throw new Error(errorMessage);
    }
  }

  /**
   * Use this method to navigate to a specific URL.
   * @param page The Playwright page object.
   * @param url The URL to navigate to.
   * @param description A description of the URL (for logging purposes).
   */
  public async navigateToUrl(url: string, description: string): Promise<void> {
    try {
      await this.page.goto(url, { waitUntil: "networkidle" });
      await logger.logMessage(`Navigated to ${description}: ${url}`, "info");
    } catch (error: any) {
      const errorMessage = `Failed to navigate to ${description}: ${url}. Error: ${error.message}`;
      await logger.logMessage(errorMessage, "error");
      throw new Error(errorMessage);
    }
  }

}

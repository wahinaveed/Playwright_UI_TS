// logger.ts
import { TestInfo } from "@playwright/test";
import dotenv from "dotenv";

const timestamp = new Date().toISOString();
dotenv.config();

// ANSI escape codes for colors
const colors = {
  reset: "\x1b[0m", // Reset all styles
  bright: "\x1b[1m", // Bright/Bold text
  dim: "\x1b[2m", // Dim text
  underscore: "\x1b[4m", // Underline text
  blink: "\x1b[5m", // Blinking text
  reverse: "\x1b[7m", // Reverse colors
  hidden: "\x1b[8m", // Hidden text

  // Text colors
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",

  // Background colors
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

export default class Logger {
  private static instance: Logger;
  private testInfo: TestInfo | null = null;

  // Private constructor to enforce singleton pattern
  private constructor() {}

  // Get the singleton instance
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Set the TestInfo for the current test
  public setTestInfo(testInfo: TestInfo): void {
    this.testInfo = testInfo;
  }

  // Add a log message
  public async addLogToReport(
    message: string,
    level: "info" | "warn" | "error" = "info"
  ): Promise<void> {
    if (!this.testInfo) {
      throw new Error(
        "TestInfo is not set. Call setTestInfo() before logging."
      );
    }

    this.testInfo.annotations.push({
      type: "test_log",
      description: `[${timestamp}] [${level.toUpperCase()}] ${message}`,
    });
  }

  public async addLogToConsole(
    message: string,
    level: "info" | "warn" | "error" = "info"
  ): Promise<void> {
    let color = colors.reset;

    switch (level) {
      case "error":
        color = colors.red; // Red color for errors
        break;
      case "warn":
        color = colors.yellow; // Yellow color for warnings
        break;
      case "info":
        color = colors.green; // Green color for info
        break;
      default:
        color = colors.reset;
        break;
    }

    // Format the log message with colors
    const formattedMessage = `${color}[${timestamp}] [${level.toUpperCase()}] ${message}${
      colors.dim
    }`;

    // Log to the console
    if (level === "error") {
      console.error(formattedMessage);
    } else if (level === "warn") {
      console.warn(formattedMessage);
    } else {
      console.log(formattedMessage);
    }
  }

  public async logMessage(
    message: string,
    logLevel: "info" | "warn" | "error" = "info"
  ): Promise<void> {
    // Read environment variables to control logging behavior
    const logToConsole = process.env.LOG_TO_CONSOLE === "true";
    const logToReport = process.env.LOG_TO_REPORT === "true";

    // Log to console if enabled
    if (logToConsole) {
      await this.addLogToConsole(message, logLevel);
    }

    // Log to report if enabled
    if (logToReport) {
      await this.addLogToReport(message, logLevel);
    }
  }

  // Add a screenshot as an attachment
  public async addScreenshot(name: string, page: any): Promise<void> {
    if (!this.testInfo) {
      throw new Error(
        "TestInfo is not set. Call setTestInfo() before adding attachments."
      );
    }

    const screenshotPath = `screenshots/${this.testInfo.title}-${name}.png`;
    await page.screenshot({ path: screenshotPath });
    this.testInfo.attachments.push({
      name,
      path: screenshotPath,
      contentType: "image/png",
    });
    this.addLogToReport(`Screenshot captured: ${name}`);
  }

  // Add a custom attachment (e.g., JSON, text)
  public addAttachment(name: string, body: string, contentType: string): void {
    if (!this.testInfo) {
      throw new Error(
        "TestInfo is not set. Call setTestInfo() before adding attachments."
      );
    }

    this.testInfo.attachments.push({
      name,
      body: Buffer.from(body),
      contentType,
    });
    this.addLogToReport(`Attachment added: ${name}`);
  }
}

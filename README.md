# 🎯 Playwright TypeScript UI Automation Framework

This is a robust, scalable UI automation framework built using **Playwright with TypeScript**, following best practices such as **Single Responsibility Principle (SRP)**, modular structure, and clean separation of concerns.

---

## 📁 Folder Structure Overview

```
configurations/
│   └── playwright.ui.config.ts            # Main Playwright configuration file

src/
├── pageManager/
│   └── pageManager.ts                     # Creates and manages instances of all page objects using SRP
│
├── pageObjects/
│   └── *.ts                               # Contains all page classes – only Selenium-style reusable actions
│
├── pageVerifications/
│   └── *.ts                               # Contains all Playwright `expect()` assertions; interacts with pageObject classes
│
├── testData/
│   ├── .env                               # Environment-specific variables
│   └── *.properties                       # Key-value based test data storage
│
├── testHelpers/
│   └── testSetup.ts                       # Stores cookies once and reuses context using `context.storageState({ path: "SessionState.json" })`
│
├── utilities/
│   ├── logger.ts                          # Custom logging functionality
│   ├── playwright-wrapper.ts              # Selenium-like reusable wrapper methods using Playwright APIs
│   └── custom-reporter.ts                 # Integrated Monocart custom reporter

tests/
└── *.spec.ts                              # All test case files with proper scenario coverage

reports/
└── *                                      # Stores Monocart/HTML reports after execution

package.json                               # Script and dependency management
```

---

## 🚀 Command to Run the Tests

Execute the following command to run UI tests:

```bash
npm run UITestPlaywright
```

This will launch Playwright with the configured options and generate reports under `/reports`.

---

## 🧪 Key Features

- ✅ Follows Page Object Model and Single Responsibility Principle
- ✅ Clear separation between actions (`pageObjects`) and verifications (`pageVerifications`)
- ✅ `pageManager.ts` handles centralized creation of all page classes
- ✅ Session handling using Playwright’s `storageState()` to avoid repeated logins
- ✅ Dynamic data handling using `.env` and `.properties` files
- ✅ Reusable helper methods in `playwright-wrapper.ts`
- ✅ Custom logging with `logger.ts`
- ✅ Integrated Monocart reporter for rich, visual test reports

---

## 📝 Session State Setup (testSetup.ts)

Cookies and login state are saved once and reused across tests:

```ts
await context.storageState({ path: "SessionState.json" });
```

This improves test speed and reliability by avoiding repetitive authentication.

---

## 📄 Reports

Test reports are automatically generated and saved under:

```
/reports/
```

You can open the Monocart HTML report from this directory for a detailed view.

---

## 📦 Tools & Technologies Used

- ✅ Playwright
- ✅ TypeScript
- ✅ Node.js
- ✅ dotenv
- ✅ Monocart HTML Reporter

---

## 📌 Notes

- Framework is designed for **easy scaling and test maintenance**
- All test scripts should go under `/tests`
- Make sure to configure `.env` and property files as needed for test environments

---

## 🙋 Need Help or Want to Contribute?

Feel free to open issues or submit pull requests for improvements!


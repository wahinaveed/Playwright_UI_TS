import { devices, defineConfig } from "@playwright/test";
import CustomReporter from "../src/utilities/reporter/custom-reporter";
import path from "path";

export default defineConfig({
  testDir: "../src/tests",
  outputDir: "../reports/playwright",
  timeout: 45000 * 1000,
  globalTimeout: 60000,
  expect: {
    timeout: 15000,
  },

  use: {
    trace: "off",
    actionTimeout: 5000,
  },

  /* Run test files in parallel */
  fullyParallel: false,

  /* Retry on CI based on conditions */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 2 : undefined,

  projects: [
    {
      name: "Chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: "off",
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
        trace: "on",
      },
    },
    {
      name: "Safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        video: "on",
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
        trace: "on",
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: false,
        screenshot: "on",
        trace: "on",
      },
    },
  ],

  reporter: [
    ["list"],
    ["../src/utilities/reporter/custom-reporter.ts"],
    [
      "monocart-reporter",
      {
        name: "Keystone - Test Automation Report",
        outputFile: path.resolve(
          __dirname,
          "../reports/monocart-report/index.html"
        ),
        onEnd: (reportData) => {
          console.log = () => {};
        },
        columns: (defaultColumns: any) => {
          const index = defaultColumns.findIndex(
            (column) => column.id === "duration"
          );
          defaultColumns.splice(
            index,
            0,
            {
              id: "owner",
              name: "Owner",
              align: "center",
              searchable: true,
              styleMap: {
                "font-weight": "normal",
              },
            },
            {
              id: "jira",
              name: "JIRA Key",
              width: 100,
              searchable: true,
              styleMap: "font-weight:normal;",
              formatter: (v, rowItem, columnItem) => {
                const key = rowItem[columnItem.id];
                return `<a href="https://your-jira-url/${key}" target="_blank">${v}</a>`;
              },
            }
          );

          const durationColumn = defaultColumns.find(
            (column) => column.id === "duration"
          );
          durationColumn.formatter = function (value, rowItem, columnItem) {
            if (typeof value === "number" && value) {
              return `<i>${value.toLocaleString()} ms</i>`;
            }
            return value;
          };

          const titleColumn = defaultColumns.find(
            (column) => column.id === "title"
          );
          titleColumn.formatter = function (
            value,
            rowItem,
            columnItem,
            cellNode
          ) {
            const perviousFormatter = this.getFormatter("tree");
            const v = perviousFormatter(value, rowItem, columnItem, cellNode);
            if (rowItem.type === "step") {
              return `${v}<div style="position:absolute;top:0;right:5px;">✅</div>`;
            }
            return v;
          };
        },
      },
    ],
  ],
});

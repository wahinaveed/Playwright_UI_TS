import {
  Reporter,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";

class CustomReporter implements Reporter {
  private testResults: {
    describeDescription: string; // Description of the describe block
    testName: string; // Name of the test case
    status: string; // Status of the test case (passed/failed/skipped)
  }[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    // Get the describe block name from the test's parent (suite)
    const describeDescription = test.parent.title;

    // Collect test details
    this.testResults.push({
      describeDescription, // Description of the describe block
      testName: test.title, // Name of the test case
      status: result.status, // Status of the test case
    });
  }

  onEnd(result: FullResult) {
    // Aggregate results by describeDescription
    const moduleResults: {
      [key: string]: {
        totalExecuted: number; // Total test cases executed
        totalPassed: number; // Total test cases passed
        totalFailed: number; // Total test cases failed
        totalTestCases: number; // Total test cases in the module
      };
    } = {};

    for (const testResult of this.testResults) {
      const { describeDescription, status } = testResult;

      // Initialize the module if it doesn't exist
      if (!moduleResults[describeDescription]) {
        moduleResults[describeDescription] = {
          totalExecuted: 0,
          totalPassed: 0,
          totalFailed: 0,
          totalTestCases: 0,
        };
      }

      // Update counts
      moduleResults[describeDescription].totalExecuted++;
      if (status === "passed") {
        moduleResults[describeDescription].totalPassed++;
      } else if (status === "failed") {
        moduleResults[describeDescription].totalFailed++;
      }
      moduleResults[describeDescription].totalTestCases++;
    }

    // Print the aggregated results in a table format
    console.table(
      Object.entries(moduleResults).map(([describeDescription, counts]) => ({
        Module: describeDescription,
        "Total TCs Executed": counts.totalExecuted,
        "Total TCs Passed": counts.totalPassed,
       // "Total Test Cases": counts.totalTestCases,
        Failed: counts.totalFailed,
      }))
    );
  }
}

export default CustomReporter;
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

  constructor() {
    // Fallback to print results if process exits unexpectedly
    process.on("exit", () => {
      this.printResults("⚠️ Fallback on exit: Partial results due to abrupt termination");
    });
  }

  onTestEnd(test: TestCase, result: TestResult) {
    try {
      const describeDescription = test.parent?.title ?? "Unnamed Suite";

      // Log result for each test
      const status = result.status;
      
      // Handle the case where the test is skipped
      if (status === 'skipped') {
        this.testResults.push({
          describeDescription,
          testName: test.title,
          status: "skipped", // Mark as skipped
        });
      } else {
        // If the test is completed (passed/failed)
        this.testResults.push({
          describeDescription,
          testName: test.title,
          status: status, // "passed" or "failed"
        });
      }
    } catch (error) {
      console.error("Error in onTestEnd:", error);
    }
  }

  onEnd(result: FullResult) {
    this.printResults("✅ Final Test Report");
  }

  private printResults(header: string) {
    if (this.testResults.length === 0) {
      console.log(`${header}: No test results to display.`);
      return;
    }

    const moduleResults: {
      [key: string]: {
        totalExecuted: number;
        totalPassed: number;
        totalFailed: number;
        totalSkipped: number; // New field for skipped tests
        totalTestCases: number;
      };
    } = {};

    for (const testResult of this.testResults) {
      const { describeDescription, status } = testResult;

      if (!moduleResults[describeDescription]) {
        moduleResults[describeDescription] = {
          totalExecuted: 0,
          totalPassed: 0,
          totalFailed: 0,
          totalSkipped: 0,  // Initialize skipped count
          totalTestCases: 0,
        };
      }

      moduleResults[describeDescription].totalExecuted++;
      if (status === "passed") {
        moduleResults[describeDescription].totalPassed++;
      } else if (status === "failed") {
        moduleResults[describeDescription].totalFailed++;
      } else if (status === "skipped") {
        moduleResults[describeDescription].totalSkipped++; // Increment skipped count
      }
      moduleResults[describeDescription].totalTestCases++;
    }

    const resultsArray = Object.entries(moduleResults).map(
      ([describeDescription, counts]) => ({
        Module: describeDescription,
        "TCs Executed": counts.totalExecuted,
        "TCs Passed": counts.totalPassed,
        "TCs Failed": counts.totalFailed,
        "TCs Skipped": counts.totalSkipped, 
        //"Failed": counts.totalFailed,
      })
    );

    console.log(`\n${header}`);
    console.table(resultsArray);
  }
}

export default CustomReporter;

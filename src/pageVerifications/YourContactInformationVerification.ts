import { PageManager } from "../pageManager/pageManager";
import { faker } from "@faker-js/faker";

let pageManager: PageManager = PageManager.getInstance();

export type UserDetails = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
};

export class YourContactInformationVerification {
  async provideContactDetails(): Promise<void> {
    const user: UserDetails = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date
        .birthdate({ min: 18, max: 65, mode: "age" })
        .toLocaleDateString("en-GB"),
      email: faker.internet.email(),
      mobileNumber: `06 ${faker.string.numeric(8)}`,
    };

    await pageManager
      .getYourContactInformationPage()
      .fillContactInformation(user);
  }
}

exports.mdul;

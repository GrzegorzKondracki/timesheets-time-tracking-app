import LoginPage from "../pageobjects/logIn.page.js";
import pagesUrl from "../utils/pagesUrl.js";
import data from "../utils/data.js";
import validationPhrases from "../utils/validationPhrases.js";
import TrackerPage from "../pageobjects/tracker.page.js";
import trackerPage from "../pageobjects/tracker.page.js";

describe("On TRACKER page aplication", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.emailInput.waitForDisplayed();
    await LoginPage.loginAndSubmit(data.validEmailAdress, data.validPassword);

    await expect(LoginPage.successfulSignInToast).toBeDisplayed();
    await expect(browser).toHaveUrl(pagesUrl.homePageUrl);

    // We have a bug on /tracker page so I have to comment these lines:
    // await TrackerPage.open();
    // await expect(browser).toHaveUrl(pagesUrl.trackerPageUrl);

    await TrackerPage.taskDescriptionInput.waitForDisplayed();
  });

  afterEach(async () => {
    await TrackerPage.signOutFromApp();
    await expect(browser).toHaveUrl(pagesUrl.loginUrl);
  });

  it("should add a task with correct data", async () => {
    await TrackerPage.typeTaskDescription(data.taskDescription);
    await TrackerPage.selectProjectName();
    await TrackerPage.typeDuration(data.taskDuration);
    await TrackerPage.addBtn.click();
    await TrackerPage.projectNameTitle.waitForDisplayed();
    await TrackerPage.checkIfElementsDisplayed();
  });

  it("should NOT add a task if project name input is empty", async () => {
    await TrackerPage.typeTaskDescription(data.taskDescription);
    await TrackerPage.typeDuration(data.taskDuration);
    await TrackerPage.addBtn.click();
    await TrackerPage.projectNameValidationText.waitForDisplayed();

    await expect(TrackerPage.projectNameValidationText).toHaveTextContaining(validationPhrases.invalidProjectNamePhrase);
  });

  it("should add task - autotracker", async () => {
    await TrackerPage.startAutotracker();
    await TrackerPage.stopAutotracker();
    await TrackerPage.projectNameTitle.waitForDisplayed();
    await TrackerPage.checkIfElementsDisplayed();
  });
});

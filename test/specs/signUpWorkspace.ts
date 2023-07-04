import SignUpWorkspacePage from "../pageobjects/signUpWorkspace.page.js";
import SignUpPage from "../pageobjects/signUp.page.js";
import HomePage from "../pageobjects/tracker.page.js";
import pagesUrl from "../utils/pagesUrl.js";
import data from "../utils/data.js";
import validationPhrases from "../utils/validationPhrases.js";

describe("On SIGN UP WORKSPACE page aplication", () => {
  beforeEach(async () => {
    const validUserEmail = await SignUpPage.randomValidUserEmail();
    await SignUpPage.openSignUp();
    await SignUpPage.emailInput.waitForDisplayed();
    await SignUpPage.typeSignUpData(validUserEmail, data.validPassword);
    await SignUpPage.markCheckbox();
    await SignUpPage.signUpBtn.click();
    await SignUpWorkspacePage.firstNameInput.waitForDisplayed();

    await expect(browser).toHaveUrl(pagesUrl.signUpWorkspaceUrl);
  });

  afterEach(async () => {
    await browser.reloadSession();
  });

  it("should NOT sign up with empty first name input", async () => {
    await SignUpWorkspacePage.typeWorkspaceData(data.emptyString, data.lastName, data.organisationName, []);
    await expect(SignUpWorkspacePage.firstNameValidationText).toHaveTextContaining(validationPhrases.emptyInputPhrase);
  });

  it("should NOT sign up with digit in first name and last name", async () => {
    await SignUpWorkspacePage.typeWorkspaceData(data.digitInString, data.digitInString, data.organisationName, []);
    await SignUpWorkspacePage.getStartedBtn.click();

    await expect(SignUpWorkspacePage.firstNameValidationText).toHaveTextContaining(validationPhrases.digitInStringValidationPhrase);
    await expect(SignUpWorkspacePage.lastNameValidationText).toHaveTextContaining(validationPhrases.digitInStringValidationPhrase);
  });

  it("should NOT sign up with invalid team email adress", async () => {
    const randomName = await SignUpWorkspacePage.randomNameGenerator();
    await SignUpWorkspacePage.typeWorkspaceData(randomName, randomName, randomName, [data.invalidEmailAdress]);
    await SignUpWorkspacePage.getStartedBtn.click();

    await expect(SignUpWorkspacePage.teamEmailsInputValidationText).toBeDisplayed();
    await expect(SignUpWorkspacePage.teamEmailsInputValidationText).toHaveTextContaining(validationPhrases.invalidEmailPhrase);
  });

  it("can go to login page", async () => {
    await SignUpWorkspacePage.backBtn.click();

    await expect(SignUpWorkspacePage.backBtn).toHaveUrl(pagesUrl.loginUrl);
  });

  it("should sign up with proper personal information and team emails", async () => {
    const randomName = await SignUpWorkspacePage.randomNameGenerator();
    await SignUpWorkspacePage.typeWorkspaceData(randomName, randomName, randomName, [data.correctUserEmail1, data.correctUserEmail2]);
    await SignUpWorkspacePage.getStartedBtn.click();

    await SignUpWorkspacePage.workspaceCreatedToast.waitForDisplayed();
    await expect(SignUpWorkspacePage.workspaceCreatedToast).toHaveTextContaining(validationPhrases.signUpSuccessfulPhrase);

    await HomePage.headlineTracker.waitForDisplayed();

    await expect(HomePage.headlineTracker).toBeDisplayed();
    await expect(browser).toHaveUrlContaining(pagesUrl.homePageUrl);
  });
});

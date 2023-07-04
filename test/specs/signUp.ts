import SignUpPage from "../pageobjects/signUp.page.js";
import SignUpWorkspacePage from "../pageobjects/signUpWorkspace.page.js";
import data from "../utils/data.js";
import validationPhrases from "../utils/validationPhrases.js";
import pagesUrl from "../utils/pagesUrl.js";

describe("On SIGN UP page aplication", () => {
  beforeEach(async () => {
    await SignUpPage.openSignUp();
    await SignUpPage.emailInput.waitForDisplayed();

    await expect(SignUpPage.emailInput).toBeDisplayed();
    await expect(SignUpPage.passwordInput).toBeDisplayed();
    await expect(SignUpPage.signUpBtn).toBeDisplayed();
    await expect(SignUpPage.sigUpGoogleBtn).toBeDisplayed();
  });

  it("should NOT sign up with invalid email", async () => {
    await SignUpPage.typeSignUpData(data.invalidEmailAdress, data.validPassword);
    await SignUpPage.signUpBtn.click();

    await expect(SignUpPage.emailValidationText).toBeDisplayed();
    await expect(SignUpPage.emailValidationText).toHaveTextContaining(validationPhrases.invalidEmailPhrase);
    await expect(browser).toHaveUrl(pagesUrl.signUpUrl);
  });

  it("should NOT sign up with empty email", async () => {
    await SignUpPage.typeSignUpData(data.emptyString, data.validPassword);
    await SignUpPage.signUpBtn.click();

    await expect(SignUpPage.emailValidationText).toBeDisplayed();
    await expect(SignUpPage.emailValidationText).toHaveTextContaining(validationPhrases.emptyInputPhrase);
    await expect(browser).toHaveUrl(pagesUrl.signUpUrl);
  });

  it("should NOT sign up with invalid password - missing one digit", async () => {
    await SignUpPage.typeSignUpData(data.validEmailAdress, data.invalidPassNoDigit);
    await SignUpPage.markCheckbox();
    await SignUpPage.signUpBtn.click();
    await SignUpPage.passwordValidationText.waitForDisplayed();

    await expect(SignUpPage.passwordValidationText).toBeDisplayed();
    await expect(SignUpPage.passwordValidationText).toHaveTextContaining(validationPhrases.missingOneDigitValidationPhrase);
    await expect(browser).toHaveUrl(pagesUrl.signUpUrl);
  });

  it("should NOT sign up with invalid password - missing uppercase letter", async () => {
    await SignUpPage.typeSignUpData(data.validEmailAdress, data.invalidPassNoUppercaseLetter);
    await SignUpPage.signUpBtn.click();
    await SignUpPage.passwordValidationText.waitForDisplayed();

    await expect(SignUpPage.passwordValidationText).toHaveTextContaining(validationPhrases.missingUppercaseLetterPhrase);
    await expect(browser).toHaveUrl(pagesUrl.signUpUrl);
  });

  it("should NOT login with invalid password - less then 8 characters", async () => {
    await SignUpPage.typeSignUpData(data.validEmailAdress, data.invalidPassLessThan8Characters);
    await SignUpPage.markCheckbox();
    await SignUpPage.signUpBtn.click();
    await SignUpPage.passwordValidationText.waitForDisplayed();

    await expect(SignUpPage.passwordValidationText).toBeDisplayed();
    await expect(SignUpPage.passwordValidationText).toHaveTextContaining(validationPhrases.lessThan8CharactersPhrase);
    await expect(browser).toHaveUrl(pagesUrl.signUpUrl);
  });

  it("should check if typed password is hidden by default", async () => {
    await SignUpPage.typeSignUpData(data.validEmailAdress, data.invalidPassLessThan8Characters);

    await expect(SignUpPage.passwordInput).toHaveAttributeContaining("type", "password");
  });

  it("should be able to show and hide password", async () => {
    await SignUpPage.typeSignUpData(data.validEmailAdress, data.validPassword);
    await SignUpPage.showPassIcon.click();

    await expect(SignUpPage.passwordInput).toHaveAttributeContaining("type", "text");

    await SignUpPage.showPassIcon.click();

    await expect(SignUpPage.passwordInput).toHaveAttributeContaining("type", "password");
  });

  it("should NOT sign up without marked agreement checkbox", async () => {
    await SignUpPage.typeSignUpData(data.validEmailAdress, data.validPassword);

    await expect(SignUpPage.signUpBtn).toBeClickable();

    await SignUpPage.signUpBtn.click();

    await expect(SignUpPage.noAgreementToPolicyToast).toBeDisplayed();
  });

  it("should sign up with valid data and agreement checkbox marked", async () => {
    let validUserEmail = await SignUpPage.randomValidUserEmail();
    await SignUpPage.typeSignUpData(validUserEmail, data.validPassword);
    await SignUpPage.markCheckbox();
    await SignUpPage.signUpBtn.click();
    await SignUpWorkspacePage.firstNameInput.waitForDisplayed();

    await expect(browser).toHaveUrl(pagesUrl.signUpWorkspaceUrl);
  });

  it("user can go to login page", async () => {
    await SignUpPage.loginLink.waitForDisplayed();
    await SignUpPage.loginLink.click();

    await expect(browser).toHaveUrl(pagesUrl.loginUrl2);
  });
});

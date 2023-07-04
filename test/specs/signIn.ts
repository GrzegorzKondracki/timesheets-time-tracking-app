import LoginPage from "../pageobjects/logIn.page.js";
import data from "../utils/data.js";
import validationPhrases from "../utils/validationPhrases.js";
import pagesUrl from "../utils/pagesUrl.js";
import Page from "../pageobjects/page.js";

describe("On SIGN IN page application", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.emailInput.waitForDisplayed();
  });

  afterEach(async () => {
    await browser.reloadSession();
  });

  it("should NOT login with invalid email", async () => {
    await LoginPage.typeLoginData(data.invalidEmailAdress, data.validPassword);

    await expect(LoginPage.invalidEmailText).toBeDisplayed();
    await expect(LoginPage.invalidEmailText).toHaveTextContaining(validationPhrases.invalidEmailPhrase);
    await expect(browser).toHaveUrl(pagesUrl.loginUrl);
  });

  it("should NOT login with empty email input", async () => {
    await LoginPage.typeLoginData(data.emptyString, data.validPassword);

    await expect(LoginPage.emptyEmailText).toBeDisplayed();
    await expect(LoginPage.emptyEmailText).toHaveTextContaining(validationPhrases.emptyInputPhrase);
    await expect(browser).toHaveUrl(pagesUrl.loginUrl);
  });

  it("should NOT login with invalid password - missing one digit", async () => {
    await LoginPage.typeLoginData(data.validEmailAdress, data.invalidPassNoDigit);
    await LoginPage.passwordValidationText.waitForDisplayed();

    await expect(LoginPage.passwordValidationText).toBeDisplayed();
    await expect(LoginPage.passwordValidationText).toHaveTextContaining(validationPhrases.missingOneDigitValidationPhrase);
    await expect(browser).toHaveUrl(pagesUrl.loginUrl);
  });

  it("should NOT login with invalid password - less then 8 characters", async () => {
    await LoginPage.typeLoginData(data.validEmailAdress, data.invalidPassLessThan8Characters);
    await LoginPage.passwordValidationText.waitForDisplayed();

    await expect(LoginPage.passwordValidationText).toBeDisplayed();
    await expect(LoginPage.passwordValidationText).toHaveTextContaining(validationPhrases.lessThan8CharactersPhrase);
    await expect(browser).toHaveUrl(pagesUrl.loginUrl);
  });

  it("should NOT login with invalid password - missing uppercase character", async () => {
    await LoginPage.typeLoginData(data.validEmailAdress, data.invalidPassNoUppercaseLetter);
    await LoginPage.passwordValidationText.waitForDisplayed();

    await expect(LoginPage.passwordValidationText).toBeDisplayed();
    await expect(LoginPage.passwordValidationText).toHaveTextContaining(validationPhrases.missingUppercaseLetterPhrase);
    await expect(browser).toHaveUrl(pagesUrl.loginUrl);
  });

  it("should check if typed password is hidden by default", async () => {
    await LoginPage.typeLoginData(data.validEmailAdress, data.validPassword);

    await expect(LoginPage.passwordInput).toHaveAttributeContaining("type", "password");
  });

  it("should be able to show and hide password", async () => {
    await LoginPage.typeLoginData(data.validEmailAdress, data.validPassword);
    await LoginPage.showPassIcon.click();

    await expect(LoginPage.passwordInput).toHaveAttributeContaining("type", "text");

    await LoginPage.showPassIcon.click();

    await expect(LoginPage.passwordInput).toHaveAttributeContaining("type", "password");
  });

  it("should login with valid credentials", async function () {
    // this.retries(1);

    await LoginPage.loginAndSubmit(data.validEmailAdress, data.validPassword);
    await LoginPage.successfulSignInToast.waitForDisplayed();

    await expect(LoginPage.successfulSignInToast).toBeDisplayed();
    await expect(LoginPage.successfulSignInToast).toHaveTextContaining(validationPhrases.signInSuccessfulPhrase);
    await expect(browser).toHaveUrl(pagesUrl.homePageUrl);

    // await LoginPage.checkIfMenuItemsDisplayed();
  });
});

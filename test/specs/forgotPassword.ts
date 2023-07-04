import ForgotPassPage from "../pageobjects/forgotPass.page.js";
import LoginPage from "../pageobjects/logIn.page.js";
import pagesUrl from "../utils/pagesUrl.js";
import data from "../utils/data.js";
import validationPhrases from "../utils/validationPhrases.js";
import ResetPassPage from "../pageobjects/resetPassSuccess.page.js";

describe("On FORGOT PASSWORD PAGE application", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.forgotPassBtn.waitForDisplayed();
    await LoginPage.forgotPassBtn.click();

    await expect(browser).toHaveUrl(pagesUrl.resetPassUrl);
    await expect(ForgotPassPage.emailInput).toBeDisplayed();
  });

  it("should NOT reset pasword with incorrect email", async () => {
    await ForgotPassPage.typeEmail(data.invalidEmailAdress);
    await ForgotPassPage.headlineText.click();

    await expect(ForgotPassPage.emailValidationMessage).toBeDisplayed();
    await expect(ForgotPassPage.emailValidationMessage).toHaveTextContaining(validationPhrases.forgotPassInvalidEmailPhrase);
  });

  it("should show validation if email input is empty", async () => {
    await ForgotPassPage.typeEmail(data.emptyString);
    await ForgotPassPage.resetPassBtn.click();

    await expect(ForgotPassPage.emailValidationMessage).toBeDisplayed();
    await expect(ForgotPassPage.emailValidationMessage).toHaveTextContaining(validationPhrases.emptyInputValidationPhrase);
  });

  it("should reset password with correct email and check if 'Back to start' button redirects to login page", async () => {
    await ForgotPassPage.typeEmail(data.validEmailAdress);
    await ForgotPassPage.resetPassBtn.click();

    await expect(browser).toHaveUrl(pagesUrl.resetPassSuccessUrl);
    await expect(ForgotPassPage.headlineText).toBeDisplayed();
    await expect(ForgotPassPage.backToStartBtn).toBeDisplayed();

    await ResetPassPage.backToStartBtn.click();

    await expect(browser).toHaveUrl(pagesUrl.loginUrl2);
    await expect(LoginPage.emailInput).toBeDisplayed();
  });

  it("should go to previous page with back to start button", async () => {
    await ForgotPassPage.backToStartBtn.waitForDisplayed();
    await ForgotPassPage.backToStartBtn.parentElement().click();

    await expect(browser).toHaveUrl(pagesUrl.loginUrl2);
    await expect(LoginPage.emailInput).toBeDisplayed();
  });
});

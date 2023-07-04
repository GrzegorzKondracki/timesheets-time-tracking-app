import Page from "./page.js";
import data from "../utils/data.js";

class SignUpPage extends Page {
  get emailInput() {
    return $('input[data-cy="signup-input-email"]');
  }

  get passwordInput() {
    return $('input[data-cy="signup-input-password"]');
  }

  get agreementCheckbox() {
    return $('input[data-cy="signup-input-privacyPolicy"]');
  }

  get signUpBtn() {
    return $('div[data-cy="signup-button"]');
  }

  get sigUpGoogleBtn() {
    return $('div[data-cy="login-button-google"]');
  }

  get invalidEmailText() {
    return $("//span[contains(text(), 'Not valid email address')]");
  }

  get emailValidationText() {
    return $("[for='email'] + span");
  }

  get passwordValidationText() {
    return $("[for='password'] + span");
  }

  get notSuccessfulSignUpToast() {
    return $("//span[contains(text(), 'Sign in not successful')]");
  }

  get noAgreementToPolicyToast() {
    return $("//span[contains(text(), 'You have to agree to Timesheets Policy')]");
  }

  get showPassIcon() {
    return $(".Input_showPassword__PaHu2");
  }

  get loginLink() {
    return $("a[data-cy='signup-link-login']");
  }

  async typeSignUpData(username: string, password: string) {
    await this.emailInput.setValue(username);
    await this.passwordInput.setValue(password);
  }

  async markCheckbox() {
    await this.agreementCheckbox.previousElement().waitForDisplayed();
    await this.agreementCheckbox.previousElement().click();
  }

  randomValidUserEmail() {
    let alias = Math.floor(Math.random() * 1000000 + 1);
    let randomValidUserEmail = `${data.emailFirstPart}${alias}${data.emailLastPart}`;
    return randomValidUserEmail;
  }

  async checkIfPassIsHidden() {
    await expect(this.passwordInput).toHaveAttributeContaining("type", "password");
  }

  async checkIfPassIsShown() {
    await expect(this.passwordInput).toHaveAttributeContaining("type", "text");
  }
}

export default new SignUpPage();

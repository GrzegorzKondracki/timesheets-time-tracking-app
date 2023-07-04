import Page from "./page.js";

class ForgotPassPage extends Page {
  get emailInput() {
    return $('input[data-cy="reset-password-input-email"]');
  }

  get resetPassBtn() {
    return $('div[data-cy="reset-password-button-send-reset"]');
  }

  get backToStartBtn() {
    return $('//span[contains(text(), "Back to start")]');
  }

  get emailValidationMessage() {
    return $('[for="email"] + span');
  }

  get headlineText() {
    return $('//div[contains(text(), "Enter your e-mail")]');
  }

  typeEmail(username: string) {
    return this.emailInput.setValue(username);
  }
}

export default new ForgotPassPage();

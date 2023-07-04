import { ChainablePromiseElement } from "webdriverio";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */

  get emailInput() {
    return $('input[data-cy="login-input-email"]');
  }

  get passwordInput() {
    return $('input[data-cy="login-input-password"]');
  }

  get showPassIcon() {
    return $(".Input_showPassword__PaHu2");
  }

  get submitBtn() {
    return $('div[data-cy="login-button"]');
  }

  get successfulSignInToast() {
    return $("//span[contains(text(), 'Sign in successful')]");
  }

  get notSuccessfulSignInToast() {
    return $("//span[contains(text(), 'Sign in not successful')]");
  }

  get invalidEmailText() {
    return $("//span[contains(text(), 'Not valid email address')]");
  }

  get emptyEmailText() {
    return $("//span[contains(text(), 'Value is required')]");
  }

  get forgotPassBtn() {
    return $("//span[contains(text(), 'Forgot password?')]");
  }

  get passwordValidationText() {
    return $("[for='password'] + span");
  }

  get headline() {
    return $("//div[contains(text(), 'Welcome back!')]");
  }

  get tableMenuItemTitles() {
    return $$(".MenuItem_menuItem__Uim2u > div:nth-child(2)");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  async loginAndSubmit(username: string, password: string) {
    await this.emailInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.submitBtn.click();
  }

  async typeLoginData(username: string, password: string) {
    await this.emailInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.headline.click();
  }

  async checkIfMenuItemsDisplayed() {
    const expectedMenuItems = ["TRACKER", "REPORTS", "PROJECTS", "USERS", "SETTINGS"];

    const actualMenuItems = [];
    const tableMenuItemTitles = await this.tableMenuItemTitles;

    for (const menuItemTitle of tableMenuItemTitles) {
      actualMenuItems.push(await menuItemTitle.getText());
    }

    await expect(expectedMenuItems).toEqual(actualMenuItems);
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("");
  }
}

export default new LoginPage();

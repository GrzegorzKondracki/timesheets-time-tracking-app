import Page from "./page.js";

class ResetPassPage extends Page {
  get headlineText() {
    return $('//div[contains(text(), "We have sent you an e-mail")]');
  }

  get subHeadlineText() {
    return $('//div[contains(text(), "Click the link in the e-mail")]');
  }

  get backToStartBtn() {
    return $('//span[contains(text(), "Back to start")]');
  }
}

export default new ResetPassPage();

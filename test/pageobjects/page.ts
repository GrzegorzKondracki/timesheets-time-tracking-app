import pagesUrl from "../utils/pagesUrl.js";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */

  open(path: string) {
    return browser.url(`${pagesUrl.homePageUrl}${path}`);
  }

  openSignUp() {
    return browser.url(pagesUrl.signUpUrl);
  }
}

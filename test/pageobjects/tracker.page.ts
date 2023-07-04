import Page from "./page.js";
import data from "../utils/data.js";

class TrackerPage extends Page {
  get headlineTracker() {
    return $('//span[contains(text(), "Tracker")]');
  }

  get todayBtn() {
    return $('//button span[contains(text(), "Today")]');
  }

  get taskDescriptionInput() {
    return $(".Input_input__kFLXT input");
  }

  get projectNameInput() {
    return $(".Autocomplete_autocomplete__6SXFh input");
  }

  get durationInput() {
    return $(".TimeEntryForm_duration__nKdDT input");
  }

  get addBtn() {
    return $(".TimeEntryForm_button__2SB3n");
  }

  get defaultProjectName() {
    return $(".Tag_tag__YIIZx");
  }

  get projectNameTitle() {
    return $(".List_title__zX5yS");
  }

  get listHeader() {
    return $(".ListHeader_listHeader__rDzuL");
  }

  get personHeadline() {
    return $("//div[contains(text(), 'Person')]");
  }

  get taskHeadline() {
    return $("//div[contains(text(), 'Task')]");
  }

  get tagsHeadline() {
    return $("//div[contains(text(), 'Tags')]");
  }

  get durationHeadline() {
    return $("//div[contains(text(), 'Duration')]");
  }

  get dropdownMenu() {
    return $(".DropdownMenu_dropdown__Xl9RH");
  }

  get signOutBtn() {
    return $("//span[contains(text(), 'Sign out')]");
  }

  get projectDescriptionValidationText() {
    return $("//span[contains(text(), 'Description should be')]");
  }

  get projectNameValidationText() {
    return $("//span[contains(text(), 'Please select a project')]");
  }

  get taskDescriptionAutotrackerInput() {
    return $(".AutoTrackerForm_root__vksQ0 input[name='timer-title']");
  }

  get projectNameAutotrackerInput() {
    return $(".Input_input__kFLXT");
  }

  get switchToAutotrackerBtn() {
    return $(".Switch_option__o98t4");
  }

  get autotrackerStartBtn() {
    return $(".AutoTrackerForm_button__l53Pe");
  }

  get autotrackerStopBtn() {
    return $(".ProgressCircle_children__h4jaH");
  }

  get defaultAutotrackerProjectName() {
    return $(".AutoTrackerForm_project__jWTDh .Suggestions_chip__nJOOv");
  }

  async typeTaskDescription(descriptionText: string) {
    await this.taskDescriptionInput.click();
    await this.taskDescriptionInput.setValue(descriptionText);
  }

  async selectProjectName() {
    await this.projectNameInput.click();
    await this.defaultProjectName.click();
  }

  async typeDuration(durationInput: string) {
    await this.durationInput.click();
    await this.durationInput.setValue(durationInput);
  }

  async startAutotracker() {
    await this.switchToAutotrackerBtn.click();
    await this.taskDescriptionAutotrackerInput.click();
    await this.taskDescriptionAutotrackerInput.setValue(data.taskDescription);
    await this.defaultAutotrackerProjectName.click();
    await this.autotrackerStartBtn.click();
  }

  async stopAutotracker() {
    await this.autotrackerStopBtn.click();
  }

  async signOutFromApp() {
    this.dropdownMenu.click();
    this.signOutBtn.click();
  }

  async checkIfElementsDisplayed() {
    const trackerPageElements = [
      this.projectNameTitle,
      this.listHeader,
      this.personHeadline,
      this.taskHeadline,
      this.tagsHeadline,
      this.durationHeadline,
    ];

    for (let el of trackerPageElements) {
      await el.waitForExist();
      await expect(el).toBeDisplayed();
    }
  }

  open() {
    return super.open("tracker");
  }
}

export default new TrackerPage();

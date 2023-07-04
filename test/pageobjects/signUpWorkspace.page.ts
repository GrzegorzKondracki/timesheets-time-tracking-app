import Page from "./page.js";

class SignUpWorkspacePage extends Page {
  get firstNameInput() {
    return $('input[data-cy="workspace-input-firstName"]');
  }

  get lastNameInput() {
    return $('input[data-cy="workspace-input-lastName"]');
  }

  get organizationWorkspaceNameInput() {
    return $('input[data-cy="workspace-input-organization"]');
  }

  get teamEmailsInput() {
    return $('input[data-cy="workspace-input-team"]');
  }

  get teamEmailsInputValidationText() {
    return $("//span[text()='Not valid email address']");
  }

  get getStartedBtn() {
    return $('div[data-cy="workspace-button-getStarted"]');
  }

  get workspaceCreatedToast() {
    return $('//span[contains(text(), "Workspace created")]');
  }

  get emptyTextInput() {
    return $("//span[contains(text(), 'Value is required')]");
  }

  get firstNameValidationText() {
    return $("[for='First Name'] + span");
  }

  get lastNameValidationText() {
    return $("[for='Last Name'] + span");
  }

  get backBtn() {
    return $("//span[text()='Back']");
  }

  async typeWorkspaceData(firstName: string, lastName: string, workspaceName: string, inviteTeamEmails: string[]) {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.organizationWorkspaceNameInput.setValue(workspaceName);
    await this.teamEmailsInput.setValue(inviteTeamEmails.join(" "));
  }

  randomNameGenerator() {
    const chars = "ABCDEFGHIJKLMNOPRSTUWXYZ";
    const charsNumber = 10;
    let randomName = "";

    for (let i = 0; i < charsNumber; i++) {
      const index = Math.floor(Math.random() * 24);
      randomName += chars[index];
    }
    return randomName;
  }
}

export default new SignUpWorkspacePage();
